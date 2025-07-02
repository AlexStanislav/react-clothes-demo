import "../assets/css/components/ProductCard.css";
import type { Product, CartItem } from "../types";
import { useNavigate } from "react-router-dom";
import { useFavorites, useCart, useModal } from "../store";

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  const [favorites, favoriteDispatch] = useFavorites() as [
    Product[],
    React.Dispatch<{ type: string; payload: Product }>
  ];

  const [, cartDispatch] = useCart() as [
    CartItem[],
    React.Dispatch<{ type: string; payload: CartItem }>
  ];

  const [, modalDispatch] = useModal() as [
    { isOpen: boolean; children: React.ReactNode },
    React.Dispatch<{ type: string; payload: React.ReactNode }>
  ];

  const isAlreadyFavorite = favorites.some(
    (favorite) => favorite.id === product.id
  );

  const addToFavorites = () => {
    favoriteDispatch({
      type: "ADD_TO_FAVORITES",
      payload: product,
    });

    modalDispatch({
      type: "OPEN_MODAL",
      payload: <span className="added-to-favorites">ADDED TO FAVORITES</span>,
    })

    setTimeout(() => {
      modalDispatch({
        type: "CLOSE_MODAL",
        payload: null,
      });
    }, 1000);
  };

  const removeFromFavorites = () => {
    favoriteDispatch({
      type: "REMOVE_FROM_FAVORITES",
      payload: product,
    });
  };

  const addToCart = () => {
    const cartProduct = {
      ...product,
      quantity: 1,
      selectedColor: product.colors[0],
      selectedSize: product.sizes[0],
    };
    cartDispatch({
      type: "ADD_TO_CART",
      payload: cartProduct,
    });

    const modalPayload = <span className="added-to-cart">ADDED TO CART</span>;

    modalDispatch({
      type: "OPEN_MODAL",
      payload: modalPayload,
    });

    setTimeout(() => {
      modalDispatch({
        type: "CLOSE_MODAL",
        payload: null,
      });
    }, 1000);
  };

  return (
    <div className="product-card">
      <div className="product-card__actions">
        <i className="pi pi-shopping-cart" onClick={addToCart}></i>
        <i
          className="pi pi-heart-fill"
          style={{ display: isAlreadyFavorite ? "none" : "" }}
          onClick={addToFavorites}
        ></i>
        <i
          className="pi pi-trash"
          style={{ display: isAlreadyFavorite ? "" : "none" }}
          onClick={removeFromFavorites}
        ></i>
      </div>
      <div className="product-card__loader">
        <div className="loader"></div>
      </div>
      <img
        className="product-card__image"
        src={product.image}
        alt={product.name}
        onClick={() => navigate(`/products/${product.id}`)}
      />
      <div className="product-card__overlay">
        <span className="product-card__name">{product.name}</span>
        <span className="product-card__price">${product.price}</span>
      </div>
      <div
        className="product-card__cta"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        MORE DETAILS
      </div>
    </div>
  );
}

export default ProductCard;
