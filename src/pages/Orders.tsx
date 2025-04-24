import "../assets/css/pages/Orders.css";
import { useEffect, useState } from "react";
import { useLoggedStatus } from "../store";
import { parseOrders } from "../utils/functions";
import { Order } from "../types";

function Orders() {
  const [loggedStatus] = useLoggedStatus();
  const [orders, setOrders] = useState<Order[]>([]);
  const [displayOrders, setDisplayOrders] = useState<Order[]>([]);

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : window.location.origin;

  useEffect(() => {
    if (!loggedStatus) return;
    else {
      fetch(`${apiUrl}/orders/getAll`)
        .then((res) => res.json())
        .then((data) => {
          const parsedOrders = parseOrders(data.orders);
          setOrders(parsedOrders);
          setDisplayOrders(parsedOrders);
        });
    }
  }, [apiUrl, loggedStatus]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    const filteredOrders = orders.filter((order) => {
      const idMatch = order.id.toString().toLowerCase() === query;
      const createdAtMatch = order.created_at
        .toDateString()
        .toLocaleLowerCase()
        .includes(query);
      const shipping_address =
        `${order.shipping_address.street}, ${order.shipping_address.city}, ${order.shipping_address.state}, ${order.shipping_address.zip}`.toLowerCase();
      const billing_address =
        `${order.billing_address.street}, ${order.billing_address.city}, ${order.billing_address.state}, ${order.billing_address.zip}`.toLowerCase();

      const addressMatch =
        shipping_address.includes(query) || billing_address.includes(query);

      return idMatch || createdAtMatch || addressMatch;
    });

    setDisplayOrders(filteredOrders);
  };

  return (
    <section className="orders">
      {loggedStatus ? (
        <div className="orders__container">
          <h2 className="orders__title">Your orders</h2>
          <div className="orders__search">
            <input
              type="text"
              placeholder="Search orders"
              className="orders__search-input"
              onChange={handleSearch}
            />
          </div>
          {displayOrders.length > 0 ? (
            <div className="orders__wrapper">
              <ul className="orders__header">
                <li className="header__item">Order ID</li>
                <li className="header__item">Date</li>
                <li className="header__item">Shipping Address</li>
                <li className="header__item">Billing Address</li>
              </ul>
              <ul className="orders__list">
                {displayOrders.map((order) => (
                  <li className="list__wrapper" key={order.id}>
                    <div className="list__row">
                      <span className="list__column">{order.id}</span>
                      <span className="list__column">
                        {order.created_at.toDateString()}
                      </span>
                      <span className="list__column">
                        {`${order.shipping_address.street}, ${order.shipping_address.city}, ${order.shipping_address.state}, ${order.shipping_address.zip}`}
                      </span>
                      <span className="list__column">
                        {`${order.billing_address.street}, ${order.billing_address.city}, ${order.billing_address.state}, ${order.billing_address.zip}`}
                      </span>
                    </div>
                    <div className="orders__cart">
                      <ul className="cart__header">
                        <li className="header__item">Product</li>
                        <li className="header__item">Quantity</li>
                        <li className="header__item">Price Per Unit</li>
                        <li className="header__item">Total Price</li>
                      </ul>
                      {order.cart.map((item) => (
                        <ul className="cart__list">
                          <li className="cart__item">{item.name}</li>
                          <li className="cart__item">{item.quantity}</li>
                          <li className="cart__item">{item.price_per_unit} &euro;</li>
                          <li className="cart__item">{item.total_price} &euro;</li>
                        </ul>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="no-orders">No orders found</p>
          )}
        </div>
      ) : (
        <p className="login-message">Log in to see your orders</p>
      )}
    </section>
  );
}

export default Orders;
