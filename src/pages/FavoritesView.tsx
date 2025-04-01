import "@/assets/css/pages/FavoritesView.css";
import type { Product } from "@/types";
import { useFavorites } from "@/store";
import ProductCard from "@/components/ProductCard";

function Favorites() {
  const [favorites] = useFavorites() as [
    Product[],
    React.Dispatch<Product>
  ];

  if (!favorites.length) {
    return (
      <section className="favorites">
        <h2 className="favorites__title">No favorites yet</h2>
      </section>
    );
  } else {
    return (
      <section className="favorites">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    );
  }
}

export default Favorites;
