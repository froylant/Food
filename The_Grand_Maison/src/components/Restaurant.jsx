import { useEffect, useState } from "react";
import Cart from "./cart.jsx";
import Menu from "./menu.jsx";
import Order from "./order.jsx";
import "../App.css";

const menu = [
  {
    id: "S01",
    name: "Burrata & Heirloom Tomato",
    category: "Starters",
    price: 680,
    image:
      "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=85",
    note: "Stone fruit, basil, toasted sourdough",
  },
  {
    id: "S02",
    name: "French Onion Tart",
    category: "Starters",
    price: 560,
    image:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=900&q=85",
    note: "Comté, thyme, slow-cooked onions",
  },
  {
    id: "S03",
    name: "Salade de Chèvre Chaud",
    category: "Starters",
    price: 620,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
    note: "Warm goat cheese, pear, walnuts, garden leaves",
  },
  {
    id: "S04",
    name: "Escargots de Bourgogne",
    category: "Starters",
    price: 760,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    note: "Garlic-parsley butter, toasted country bread",
  },
  {
    id: "M01",
    name: "Roast Chicken à la Maison",
    category: "Mains",
    price: 1280,
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85",
    note: "Herb jus, pommes fondantes, watercress",
  },
  {
    id: "M02",
    name: "Wild Mushroom Risotto",
    category: "Mains",
    price: 1050,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85",
    note: "Carnaroli rice, aged parmesan, chives",
  },
  {
    id: "M03",
    name: "Duck Confit",
    category: "Mains",
    price: 1480,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
    note: "Crisp duck leg, lentils, orange jus",
  },
  {
    id: "M04",
    name: "Pan-Roasted Salmon",
    category: "Mains",
    price: 1390,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85",
    note: "Spring vegetables, beurre blanc, fresh dill",
  },
  {
    id: "D01",
    name: "Vanilla Crème Brûlée",
    category: "Desserts",
    price: 480,
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85",
    note: "Madagascar vanilla, crisp caramel",
  },
  {
    id: "D02",
    name: "Dark Chocolate Mousse",
    category: "Desserts",
    price: 520,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85",
    note: "70% chocolate, crème fraîche, sea salt",
  },
  {
    id: "D03",
    name: "Lemon Tart",
    category: "Desserts",
    price: 560,
    image:
      "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=85",
    note: "Sharp lemon curd, toasted meringue, butter crust",
  },
  {
    id: "D04",
    name: "Paris-Brest",
    category: "Desserts",
    price: 620,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85",
    note: "Choux pastry, praline cream, roasted hazelnut",
  },
];

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
const pages = ["menu", "basket", "payment", "order"];
const paymentMethods = [
  {
    id: "cash",
    label: "Cash on pickup",
    detail: "Pay when you collect your order",
  },
  {
    id: "gcash",
    label: "GCash",
    detail: "Payment remains pending until a provider is connected",
  },
  {
    id: "card",
    label: "Credit or debit card",
    detail: "Payment remains pending until a provider is connected",
  },
];

function Restaurant() {
  const [page, setPage] = useState(() => {
    const initialPage = window.location.hash.slice(1);
    return pages.includes(initialPage) ? initialPage : "menu";
  });
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);
  const [orderNumber, setOrderNumber] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cashReceived, setCashReceived] = useState("");

  useEffect(() => {
    function updatePage() {
      const nextPage = window.location.hash.slice(1);
      setPage(pages.includes(nextPage) ? nextPage : "menu");
    }

    window.addEventListener("hashchange", updatePage);
    return () => window.removeEventListener("hashchange", updatePage);
  }, []);

  useEffect(() => {
    if (window.location.hash.slice(1) !== page) {
      window.location.hash = page;
    }
  }, [page]);

  const visibleMenu =
    category === "All"
      ? menu
      : menu.filter((food) => food.category === category);
  const cartCount = cart.reduce((count, item) => count + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cashReceivedAmount = Number(cashReceived) || 0;
  const changeDue = Math.max(0, cashReceivedAmount - total);
  const cashPaymentInsufficient =
    paymentMethod === "cash" && cashReceivedAmount < total;

  function addToCart(food) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.prodId === food.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.prodId === food.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [
        ...currentCart,
        { prodId: food.id, name: food.name, price: food.price, qty: 1 },
      ];
    });
    setPlacedOrder(null);
  }

  function changeQuantity(prodId, amount) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.prodId === prodId ? { ...item, qty: item.qty + amount } : item,
        )
        .filter((item) => item.qty > 0),
    );
  }

  function continueToPayment(event) {
    event.preventDefault();
    if (cart.length) setPage("payment");
  }

  function placeOrder(event) {
    event.preventDefault();
    if (!cart.length || cashPaymentInsufficient) return;

    setPlacedOrder({
      id: `GM-${String(orderNumber).padStart(6, "0")}`,
      customerName: customerName.trim(),
      items: cart.map((item) => ({ ...item })),
      total,
      status: "Confirmed",
      paymentMethod:
        paymentMethods.find((method) => method.id === paymentMethod)?.label ??
        "Cash on pickup",
      paymentStatus:
        paymentMethod === "cash" ? "Cash received" : "Awaiting payment",
      amountTendered: paymentMethod === "cash" ? cashReceivedAmount : null,
      changeDue: paymentMethod === "cash" ? changeDue : null,
      date: new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date()),
    });
    setOrderNumber((currentNumber) => currentNumber + 1);
    setCart([]);
    setCustomerName("");
    setCashReceived("");
    setPage("order");
  }

  return (
    <main className="maison-app">
      <header className="site-header">
        <a className="brand" href="#menu" aria-label="Maison Grand home">
          <span className="brand-mark" aria-hidden="true">
            M
          </span>
          <span className="brand-name">
            MAISON <small>GRAND</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#menu" aria-current={page === "menu" ? "page" : undefined}>
            Menu
          </a>
          <a
            href="#basket"
            aria-current={page === "basket" ? "page" : undefined}
          >
            Basket <span className="nav-count">{cartCount}</span>
          </a>
          <a
            href="#payment"
            aria-current={page === "payment" ? "page" : undefined}
          >
            Payment
          </a>
          <a href="#order" aria-current={page === "order" ? "page" : undefined}>
            Order
          </a>
        </nav>
      </header>

      {page === "menu" && (
        <>
          <section className="menu-hero" id="top">
            <div className="hero-copy">
              <p className="eyebrow">PARIS · COOKED WITH CARE</p>
              <h1>
                A good meal,
                <br />
                <em>unhurried.</em>
              </h1>
              <p className="hero-description">
                Familiar French favourites, made for the pleasure of staying a
                little longer.
              </p>
            </div>
            <div className="hero-stamp" aria-label="Seasonal menu">
              <span>THE</span>
              <strong>MAISON</strong>
              <span>TABLE · 2026</span>
            </div>
          </section>
          <div className="route-content">
            <Menu
              foods={visibleMenu}
              category={category}
              onCategoryChange={setCategory}
              onAddToCart={addToCart}
              formatPrice={formatPrice}
            />
          </div>
        </>
      )}

      {page === "basket" && (
        <section
          className="route-content route-page"
          aria-labelledby="basket-title"
        >
          <div className="route-heading">
            <p className="eyebrow">REVIEW YOUR SELECTION</p>
            <h1 id="basket-title">Your basket</h1>
            <p>Make any last changes before placing your order.</p>
          </div>
          <div className="basket basket-page">
            {cart.length ? (
              <>
                <div className="basket-items">
                  {cart.map((item) => (
                    <div className="basket-line" key={item.prodId}>
                      <Cart
                        {...item}
                        price={formatPrice(item.price)}
                        subtotal={formatPrice(item.price * item.qty)}
                      />
                      <div
                        className="quantity-control"
                        aria-label={`Quantity for ${item.name}`}
                      >
                        <button
                          aria-label={`Remove one ${item.name}`}
                          onClick={() => changeQuantity(item.prodId, -1)}
                          type="button"
                        >
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button
                          aria-label={`Add one ${item.name}`}
                          onClick={() => changeQuantity(item.prodId, 1)}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="basket-total">
                  <span>Total</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
                <form className="checkout-form" onSubmit={continueToPayment}>
                  <label htmlFor="customer-name">Your name</label>
                  <input
                    id="customer-name"
                    autoComplete="name"
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder="Name for the order"
                    required
                    value={customerName}
                  />
                  <button className="checkout-button" type="submit">
                    Continue to payment <span aria-hidden="true">↗</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="empty-basket">
                <span className="empty-mark" aria-hidden="true">
                  ✳
                </span>
                <p>Your basket is waiting.</p>
                <a href="#menu">
                  Explore the menu <span aria-hidden="true">↗</span>
                </a>
              </div>
            )}
            <p className="basket-note">Prepared fresh in our Paris kitchen.</p>
          </div>
        </section>
      )}

      {page === "payment" && (
        <section
          className="route-content route-page"
          aria-labelledby="payment-title"
        >
          <div className="route-heading">
            <p className="eyebrow">SECURE CHECKOUT</p>
            <h1 id="payment-title">Payment</h1>
            <p>Choose how you would like to pay for your order.</p>
          </div>
          {cart.length ? (
            <div className="payment-layout">
              <form className="payment-panel" onSubmit={placeOrder}>
                <fieldset className="payment-options">
                  <legend>Payment method</legend>
                  {paymentMethods.map((method) => (
                    <label
                      className={
                        paymentMethod === method.id
                          ? "payment-option selected"
                          : "payment-option"
                      }
                      key={method.id}
                    >
                      <input
                        checked={paymentMethod === method.id}
                        name="payment-method"
                        onChange={() => setPaymentMethod(method.id)}
                        type="radio"
                        value={method.id}
                      />
                      <span>
                        <strong>{method.label}</strong>
                        <small>{method.detail}</small>
                      </span>
                    </label>
                  ))}
                </fieldset>
                {paymentMethod === "cash" && (
                  <div className="cash-payment-fields">
                    <label htmlFor="cash-received">Cash received</label>
                    <div className="cash-input-wrap">
                      <span aria-hidden="true">₱</span>
                      <input
                        id="cash-received"
                        min={total}
                        onChange={(event) =>
                          setCashReceived(event.target.value)
                        }
                        placeholder="Enter amount"
                        required
                        step="0.01"
                        type="number"
                        value={cashReceived}
                      />
                    </div>
                    <p
                      className={
                        cashPaymentInsufficient && cashReceived
                          ? "cash-feedback insufficient"
                          : "cash-feedback"
                      }
                      aria-live="polite"
                    >
                      {cashReceivedAmount >= total && cashReceived
                        ? `Sukli: ${formatPrice(changeDue)}`
                        : cashReceived
                          ? `Kulang pa ng ${formatPrice(total - cashReceivedAmount)}`
                          : "Ilagay ang halagang ibinayad."}
                    </p>
                  </div>
                )}
                <p className="payment-disclaimer">
                  Demo checkout. Cash at sukli lang ang kinukuwenta rito; hindi
                  pa talaga sinisingil ang GCash o card.
                </p>
                <button
                  className="checkout-button"
                  disabled={cashPaymentInsufficient}
                  type="submit"
                >
                  Confirm order <span aria-hidden="true">↗</span>
                </button>
              </form>
              <aside className="payment-summary" aria-label="Order summary">
                <p className="eyebrow">ORDER SUMMARY</p>
                <h2>{customerName || "Your order"}</h2>
                <ul>
                  {cart.map((item) => (
                    <li key={item.prodId}>
                      <span>
                        {item.qty} × {item.name}
                      </span>
                      <strong>{formatPrice(item.price * item.qty)}</strong>
                    </li>
                  ))}
                </ul>
                <div className="basket-total">
                  <span>Total</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
              </aside>
            </div>
          ) : (
            <div className="empty-basket order-empty">
              <span className="empty-mark" aria-hidden="true">
                ✳
              </span>
              <p>Your basket is empty.</p>
              <a href="#menu">
                Browse the menu <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}
        </section>
      )}

      {page === "order" && (
        <section
          className="route-content route-page"
          aria-labelledby="order-title"
        >
          <div className="route-heading">
            <p className="eyebrow">MAISON GRAND</p>
            <h1 id="order-title">Your order</h1>
            <p>Order details and confirmation.</p>
          </div>
          {placedOrder ? (
            <section
              className="order-confirmation"
              aria-labelledby="confirmation-title"
            >
              <div>
                <p className="eyebrow">
                  THANK YOU, {placedOrder.customerName.toUpperCase()}
                </p>
                <h2 id="confirmation-title">Your order is with us.</h2>
              </div>
              <Order
                {...placedOrder}
                total={formatPrice(placedOrder.total)}
                amountTendered={
                  placedOrder.amountTendered === null
                    ? null
                    : formatPrice(placedOrder.amountTendered)
                }
                changeDue={
                  placedOrder.changeDue === null
                    ? null
                    : formatPrice(placedOrder.changeDue)
                }
              />
            </section>
          ) : (
            <div className="empty-basket order-empty">
              <span className="empty-mark" aria-hidden="true">
                ✳
              </span>
              <p>No order yet.</p>
              <a href="#menu">
                Browse the menu <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}
        </section>
      )}

      <footer className="site-footer">
        <a className="brand" href="#menu">
          <span className="brand-mark" aria-hidden="true">
            M
          </span>
          <span className="brand-name">
            MAISON <small>GRAND</small>
          </span>
        </a>
        <span>PARIS · FRANCE</span>
        <span>MADE FOR THE TABLE</span>
      </footer>
    </main>
  );
}

export default Restaurant;
