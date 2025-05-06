import "../assets/css/components/MobileNav.css";
import type { CartItem, Product } from "../types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart, useFavorites } from "../store";
import UserPanel from "./UserPanel";

function MobileNav() {
  const [navOpen, setNavOpen] = useState(false);
  const [cart] = useCart() as [
    CartItem[],
    React.Dispatch<{ type: string; payload: CartItem }>
  ];
  const [favorites] = useFavorites() as [
    Product[],
    React.Dispatch<{ type: string; payload: Product }>
  ];

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="mobile-nav">
      <i className="pi pi-bars" onClick={() => setNavOpen(!navOpen)}></i>
      <div className="logo">
        <Link to="/">DEMO CLOTHES</Link>
      </div>
      <span className="mobile-nav__icons">
        <Link to="/cart">
          <i className="pi pi-shopping-cart">{totalCartItems}</i>
        </Link>
        <Link to="/favorites">
          <i className="pi pi-heart">{favorites.length}</i>
        </Link>
      </span>

      <section
        className="mobile-nav__sidebar"
        style={{ transform: navOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="overlay"></div>
        <div className="mobile-nav__content">
          <i className="pi pi-times" onClick={() => setNavOpen(false)}></i>
          <h2 className="mobile-nav__title">Menu</h2>
          <ul className="mobile-nav__links">
            <li>
              <UserPanel />
            </li>
            <li onClick={() => setNavOpen(false)}>
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            <li onClick={() => setNavOpen(false)}>
              <Link className="link" to="/products">
                Products
              </Link>
            </li>
            <li onClick={() => setNavOpen(false)}>
              <Link className="link" to="/about">
                About
              </Link>
            </li>
            <li onClick={() => setNavOpen(false)}>
              <Link className="link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </nav>
  );
}

export default MobileNav;
