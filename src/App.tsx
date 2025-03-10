import "./App.css";
import { Route, Routes } from "react-router-dom";

import productsFile from "../products.json";

import Home from "./pages/HomeView";
import Products from "./pages/ProductsView";
import About from "./pages/About";
import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";
import ProductPage from "./pages/ProductPageView";
import Favorites from "./pages/FavoritesView";
import Cart from "./pages/CartView";
import Contact from "./pages/Contact";
import { ProductsContext } from "./store";
import { GlobalCartProvider, GlobalFavoriteProvider } from "./utils/providers";

function App() {
  const products = productsFile;

  return (
    <>
      <GlobalCartProvider>
        <GlobalFavoriteProvider>
          <header className="header">
            <div className="header__top-bar">
              <span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </span>
              <section className="header__social">
                <i className="pi pi-facebook"></i>
                <i className="pi pi-twitter"></i>
                <i className="pi pi-youtube"></i>
                <i className="pi pi-instagram"></i>
              </section>
            </div>

            <DesktopNav />
            <MobileNav />
          </header>
          <ProductsContext.Provider value={{ products }}>
            <main className="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
          </ProductsContext.Provider>
        </GlobalFavoriteProvider>
      </GlobalCartProvider>

      <footer className="footer">
        <section className="footer__section">
          <div className="footer__logo">DEMO CLOTHES</div>
          <p className="footer__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            perferendis eveniet eius ducimus accusantium, a eos dolorem officia
            numquam illo temporibus natus, dicta fuga reprehenderit nulla, esse
            maiores tempore. Iure! Lorem ipsum, dolor sit amet consectetur
            adipisicing elit...
          </p>
          <ul className="footer__list footer__social">
            <li className="footer__social-icon">
              <i className="pi pi-facebook"></i> Facebook
            </li>
            <li className="footer__social-icon">
              <i className="pi pi-twitter"></i> Twitter
            </li>
            <li className="footer__social-icon">
              <i className="pi pi-youtube"></i> Youtube
            </li>
            <li className="footer__social-icon">
              <i className="pi pi-instagram"></i> Instagram
            </li>
          </ul>
        </section>
        <section className="footer__section section__middle">
          <div className="section__wrapper">
            <h3 className="footer__title">ABOUT STORE</h3>
            <ul className="footer__list footer__links">
              <li className="footer__link">About Us</li>
              <li className="footer__link">Delivery Information</li>
              <li className="footer__link">Privacy Policy</li>
              <li className="footer__link">Terms & Conditions</li>
              <li className="footer__link">Contact Us</li>
            </ul>
          </div>
          <div className="section__wrapper">
            <h3 className="footer__title">COLLECTIONS</h3>
            <ul className="footer__list">
              <li className="footer__link">SUMMER</li>
              <li className="footer__link">SPRING</li>
              <li className="footer__link">WINTER</li>
              <li className="footer__link">FALL</li>
              <li className="footer__link">NEW</li>
              <li className="footer__link">HOT</li>
            </ul>
          </div>
        </section>
        <section className="footer__section">
          <h3 className="footer__title">NEWSLETTER</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <form className="footer__form">
            <input
              className="footer__email"
              type="email"
              placeholder="Email address"
            />
            <button
              className="footer__button"
              onClick={(e) => e.preventDefault()}
            >
              SUBSCRIBE
            </button>
          </form>
          <h3 className="footer__title">CONTACT</h3>
          <ul className="footer__list footer__contact">
            <li className="footer__contact-item">
              <i className="pi pi-phone"></i> +1 234 567 890
            </li>
            <li className="footer__contact-item">
              <i className="pi pi-inbox"></i> fake.example@email.com
            </li>
            <li className="footer__contact-item">
              <i className="pi pi-map-marker"></i> 123 Any St, Anytown, USA
            </li>
            <li className="footer__contact-item">
              <i className="pi pi-globe"></i> www.example.com
            </li>
          </ul>
        </section>
        <div className="footer__copyright">
          <span>Copyright &copy; 2025</span>
          <span>All photos copyright belongs to their respective owners.</span>
        </div>
      </footer>
    </>
  );
}

export default App;
