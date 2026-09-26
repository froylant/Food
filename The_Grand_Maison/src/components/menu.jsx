import Food from "./food.jsx";

const categories = ["All", "Starters", "Mains", "Desserts"];

function Menu({ foods, category, onCategoryChange, onAddToCart, formatPrice }) {
  return (
    <section className="menu-section" id="menu" aria-labelledby="menu-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">FROM OUR KITCHEN</p>
          <h2 id="menu-title">The menu</h2>
        </div>
        <span className="menu-count">{foods.length} dishes</span>
      </div>

      <div
        className="category-tabs"
        role="group"
        aria-label="Filter menu by category"
      >
        {categories.map((item) => (
          <button
            className={
              category === item ? "category-tab active" : "category-tab"
            }
            key={item}
            onClick={() => onCategoryChange(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="food-grid">
        {foods.map((food) => (
          <article className="dish" key={food.id}>
            <Food {...food} price={formatPrice(food.price)} />
            <p className="dish-note">{food.note}</p>
            <div className="dish-action">
              <span>{formatPrice(food.price)}</span>
              <button type="button" onClick={() => onAddToCart(food)}>
                Add <span aria-hidden="true">+</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Menu;
