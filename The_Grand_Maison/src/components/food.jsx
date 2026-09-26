function Food({ id, name, category, price, image }) {
  return (
    <article className="food-item">
      {image && <img src={image} alt={name} />}
      <h2>{name}</h2>
      <dl>
        <div>
          <dt>ID</dt>
          <dd>{id}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{category}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>{price}</dd>
        </div>
      </dl>
    </article>
  );
}

export default Food;
