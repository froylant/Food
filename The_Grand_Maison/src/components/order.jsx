function Order({
  id,
  customerName,
  items = [],
  total,
  status,
  paymentMethod,
  paymentStatus,
  amountTendered,
  changeDue,
  date,
}) {
  return (
    <article className="order">
      <h2>Order {id}</h2>
      <dl>
        <div>
          <dt>Customer</dt>
          <dd>{customerName}</dd>
        </div>
        <div>
          <dt>Items</dt>
          <dd>
            <ul>
              {items.map((item, index) => (
                <li
                  key={
                    typeof item === "object"
                      ? (item.id ?? item.name ?? index)
                      : `${item}-${index}`
                  }
                >
                  {typeof item === "object" ? item.name : item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd>{total}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{status}</dd>
        </div>
        <div>
          <dt>Payment method</dt>
          <dd>{paymentMethod}</dd>
        </div>
        <div>
          <dt>Payment status</dt>
          <dd>{paymentStatus}</dd>
        </div>
        {amountTendered !== null && amountTendered !== undefined && (
          <>
            <div>
              <dt>Cash received</dt>
              <dd>{amountTendered}</dd>
            </div>
            <div>
              <dt>Change</dt>
              <dd>{changeDue}</dd>
            </div>
          </>
        )}
        <div>
          <dt>Date</dt>
          <dd>{date}</dd>
        </div>
      </dl>
    </article>
  );
}

export default Order;
