import "../assets/css/pages/HomeView.css";
import Carousel from "../components/Carousel.tsx";
import type { Product } from "../types";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../store";

function Home() {
  const store = useProducts() as { products: Product[] };
  const products = store.products;
  
  const collections = ["new", "hot", "fall", "winter", "spring", "summer"];
  const [activeCollection, setActiveCollection] = useState(collections[0]);

  const filterByCollection = (collection: string) => {
    return products.filter((product) => product.collection === collection);
  };

  const filteredProducts = filterByCollection(activeCollection);

  return (
    <>
      <section className="carousel-section">
        <Carousel />
      </section>
      <section className="products-section">
        <h2 className="products-section__title">COLLECTIONS</h2>
        <nav className="products-section__nav">
          {collections.map((collection) => (
            <div
              className={
                activeCollection === collection
                  ? "products-section__link products-section__link--active"
                  : "products-section__link"
              }
              key={collection}
              onClick={() => setActiveCollection(collection)}
            >
              {collection}
            </div>
          ))}
        </nav>
        <div className="products-section__list">
          {filteredProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
