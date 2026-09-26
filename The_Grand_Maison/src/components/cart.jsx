function Cart({ prodId, name, price, qty, subtotal }) {
  return (
    <article className="cart-item">
      <h2>{name}</h2>
      <dl>
        <div>
          <dt>Product ID</dt>
          <dd>{prodId}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>{price}</dd>
        </div>
        <div>
          <dt>Quantity</dt>
          <dd>{qty}</dd>
        </div>
        <div>
          <dt>Subtotal</dt>
          <dd>{subtotal}</dd>
        </div>
      </dl>
    </article>
  );
}

export default Cart;
