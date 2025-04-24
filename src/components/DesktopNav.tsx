import "../assets/css/components/DesktopNav.css";
import { Link } from "react-router-dom";
import { CartItem, Product } from "../types";
import { useCart, useFavorites, useLoggedStatus } from "../store";
import UserPanel from "./UserPanel";
function DesktopNav() {
  const [cart] = useCart() as [
    CartItem[],
    React.Dispatch<{ type: string; payload: CartItem }>
  ];

  const [favorites] = useFavorites() as [
    Product[],
    React.Dispatch<{ type: string; payload: Product }>
  ];

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalFavoriteItems = favorites.length;

  const [isLoggedin] = useLoggedStatus() as [boolean];

  console.log(isLoggedin);

  return (
    <nav className="desktop-nav">
      <div className="logo">DEMO CLOTHES</div>

      <ul className="desktop-nav__links">
        <li className="desktop-nav__link">
          <Link to="/">Home</Link>
        </li>
        <li className="desktop-nav__link">
          <Link to="/products">Products</Link>
        </li>
        <li className="desktop-nav__link">
          <Link to="/about">About</Link>
        </li>
        <li className="desktop-nav__link">
          <Link to="/contact">Contact</Link>
        </li>
        <li className="desktop-nav__link">
          <Link to="/cart">
            <i className="pi pi-shopping-cart"></i>
          </Link>
          <div className="cart-count">{totalCartItems}</div>
        </li>
        <li className="desktop-nav__link">
          <Link to="/favorites">
            <i className="pi pi-heart"></i>
          </Link>
          <div className="favorite-count">{totalFavoriteItems}</div>
        </li>
        <li><UserPanel /></li>
      </ul>
    </nav>
  );
}

export default DesktopNav;
