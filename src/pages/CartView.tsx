import "../assets/css/pages/CartView.css";
import type { CartItem } from "../types";
import { useCart } from "../store";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cart, cartDispatch] = useCart() as [
    CartItem[],
    React.Dispatch<{ type: string; payload: CartItem }>
  ];

  const removeFromCart = (item: CartItem) => {
    cartDispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });
  };

  const incrementQuantity = (item: CartItem) => {
    cartDispatch({
      type: "INCREMENT_QUANTITY",
      payload: item,
    });
  };

  const decrementQuantity = (item: CartItem) => {
    if (item.quantity === 1) return;
    cartDispatch({
      type: "DECREMENT_QUANTITY",
      payload: item,
    });
  };

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className="cart">
      <div className="cart__content">
        {cart.map((item) => (
          <div className="item" key={item.id}>
            <img className="item__image" src={item.image} alt={item.name} />
            <div className="item__info">
              <h3
                className="item__name"
                onClick={() => navigate(`/products/${item.id}`)}
              >
                {item.name}
              </h3>
              <p className="item__brand">{item.brand}</p>
              <ul className="item__details">
                <li className="details__item">
                  Color: {item.selectedColor}{" "}
                  <div
                    className="item__color"
                    style={{ backgroundColor: item.selectedColor }}
                  ></div>
                </li>
                <li className="details__item">Size: {item.selectedSize}</li>
                <li className="details__item">
                  Quantity:
                  <i
                    className="pi pi-plus"
                    onClick={() => incrementQuantity(item)}
                  ></i>
                  {item.quantity}
                  <i
                    className="pi pi-minus"
                    onClick={() => decrementQuantity(item)}
                  ></i>
                </li>
              </ul>
              <span className="item__price">${item.price * item.quantity}</span>
              <i
                className="pi pi-trash"
                onClick={() => removeFromCart(item)}
              ></i>
            </div>
          </div>
        ))}
      </div>
      <div
        className="cart__empty"
        style={{ display: cart.length === 0 ? "block" : "none" }}
      >
        <p>Cart is empty</p>
      </div>
      <footer className="cart__footer">
        {cart.length > 0 && (
          <span className="cart__total">Total: ${cartTotal}</span>
        )}
      </footer>
    </section>
  );
}

export default Cart;
