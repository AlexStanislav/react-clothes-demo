import "../assets/css/pages/ProductPageView.css";
import { useParams } from "react-router-dom";
import { useCart, useFavorites, useProducts, useModal } from "../store";
import type { Product, CartItem } from "../types";
import { useState } from "react";
import ProductCard from "../components/ProductCard";

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const products = useProducts() as { products: Product[] };
  const product = products.products.find(
    (product) => product.id === Number(id)
  );

  const recommendedProducts = products.products
    .filter((p) => p.category === product?.category)
    .slice(0, 6);

  const initialColor = product?.colors[0] || "purple";
  const initialSize = product?.sizes[0] || "S";

  const [color, setColor] = useState(initialColor as string);
  const [size, setSize] = useState(initialSize as string);

  const [, cartDispatch] = useCart() as [
    CartItem[],
    React.Dispatch<{ type: string; payload: CartItem }>
  ];
  const [favorites, favoriteDispatch] = useFavorites() as [
    Product[],
    React.Dispatch<{ type: string; payload: Product }>
  ];
  const [, modalDispatch] = useModal() as [
    { isOpen: boolean; children: React.ReactNode },
    React.Dispatch<{ type: string; payload: React.ReactNode }>
  ];

  const [quantity, setQuantity] = useState(1);
  if (quantity < 1) setQuantity(1);

  const addToCart = () => {
    if (product) {
      const productToAdd: CartItem = {
        ...product,
        quantity,
        selectedColor: color!,
        selectedSize: size!,
      };
      cartDispatch({
        type: "ADD_TO_CART",
        payload: productToAdd,
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
      }, 2500);
    }
  };

  const addToFavorites = () => {
    const productIsFavorite = favorites.includes(product as Product);
    if (productIsFavorite) {
      favoriteDispatch({
        type: "REMOVE_FROM_FAVORITES",
        payload: product as Product,
      });
    } else {
      favoriteDispatch({
        type: "ADD_TO_FAVORITES",
        payload: product as Product,
      });
    }
  };

  return (
    <section className="product-page">
      <section className="product-page__content">
        <section className="product-page__left">
          <img className="product-page__image" src={product?.image} />
        </section>
        <section className="product-page__right">
          <h2 className="product-page__name">{product?.name}</h2>
          {product?.description && <p>{product?.description}</p>}

          <ul className="product-page__details details__list">
            <li className="details__list-item">
              <div className="label">Collection:</div>
              {product?.collection}
            </li>
            <li className="details__list-item">
              <div className="label">Category:</div>
              {product?.category}
            </li>
            <li className="details__list-item">
              <div className="label">Brand:</div>
              {product?.brand}
            </li>
          </ul>

          <div className="product-page__rating">
            {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
              <i
                key={star}
                className={
                  star <= (product?.rating as number)
                    ? "pi pi-star-fill"
                    : "pi pi-star"
                }
              ></i>
            ))}
          </div>

          <div className="product-page__price-wrapper">
            <span className="price">${product?.price}</span>
            {product?.old_price !== 0 && (
              <span className="old-price">${product?.old_price}</span>
            )}
          </div>

          <div className="product-page__quantity-wrapper">
            <i
              className="pi pi-minus"
              onClick={() => setQuantity(quantity - 1)}
            ></i>
            <input
              className="product-page__quantity"
              type="number"
              min={1}
              value={quantity}
              readOnly
            />
            <i
              className="pi pi-plus"
              onClick={() => setQuantity(quantity + 1)}
            ></i>
          </div>

          <div className="product-page__selectors">
            <label className="selector__label" htmlFor="colors">
              Select color:
            </label>
            <select
              className="selector"
              name="colors"
              onChange={(e) => setColor(e.target.value)}
              value={color}
            >
              {product?.colors.map((color) => (
                <option className="selector__option" key={color.toString()} value={color.toString()}>
                  {color.toString().toUpperCase()}
                </option>
              ))}
            </select>
            <div
              className="color__display"
              style={{ backgroundColor: color }}
            ></div>

            <label htmlFor="sizes" className="selector__label">
              Select size:
            </label>
            <select
              name="sizes"
              className="selector"
              onChange={(e) => setSize(e.target.value)}
              value={size}
            >
              {product?.sizes.map((size) => (
                <option className="selector__option" key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="product-page__cta">
            <button
              className="product-page__button cart-button"
              onClick={addToCart}
            >
              <i className="pi pi-shopping-cart"></i>
              ADD TO CART
            </button>
            <button
              className={
                favorites.includes(product as Product)
                  ? "product-page__button favorite-button favorite-button--active"
                  : "product-page__button favorite-button"
              }
              onClick={addToFavorites}
            >
              <i
                className={
                  favorites.includes(product as Product)
                    ? "pi pi-heart-fill"
                    : "pi pi-heart"
                }
              ></i>
              FAVORITE
            </button>
          </div>
        </section>
      </section>
      <h1 className="product-page__recommended">You may also like</h1>
      <section className="product-page__recommended">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </section>
  );
}

export default ProductPage;
