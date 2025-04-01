import "@/assets/css/components/EditProduct.css";
import type { Product } from "@/types";
import { useEffect, useState } from "react";

const productBrands = [
  "Asics",
  "Puma",
  "Apple",
  "Rolex",
  "Hermes",
  "Adidas",
  "Casio",
  "Samsung",
  "Versace",
  "Hollister",
  "Zara",
  "H&M",
  "Louis Vuitton",
];

function EditProduct({
  productData,
  saveChanges,
}: {
  productData: Product;
  saveChanges: (product: Product) => void;
}) {
  const [product, setProduct] = useState<Product>(productData);
  const [newColor, setNewColor] = useState({
    label: "",
    value: "",
  });

  // Synchronize product state with incoming productData
  useEffect(() => {
    setProduct(productData);
  }, [productData]);

  /**
   * Handles change events for input elements and updates the product state.
   * @param {React.ChangeEvent<HTMLSelectElement | HTMLInputElement>} event - The change event containing name and value of the input.
   */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value }); // Update the product state with new input value
  };

  /**
   * Adds a new color to the product's colors array.
   */
  const handleColorAdd = () => {
    const { label, value } = newColor;
    setProduct({ ...product, colors: [...product.colors, { label, value }] }); // Add new color to product colors
  };

  return (
    <div className="edit-product">
      <img className="edit-product__image" src={product.image} alt="" />
      <form className="edit-product__form" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="col-12">
            <div className="form-floating mb-3">
              <input
                name="image"
                id="image"
                type="text"
                className="form-control"
                value={product.image}
                onChange={handleInputChange}
              />
              <label htmlFor="image">Image URL</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="form-floating mb-3">
              <input
                name="name"
                id="name"
                type="text"
                className="form-control"
                value={product.name}
                onChange={handleInputChange}
              />
              <label htmlFor="name">Name</label>
            </div>
          </div>
          <div className="col-4">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="category"
                id="category"
                value={product.category}
                onChange={handleInputChange}
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
              <label htmlFor="category">Category</label>
            </div>
          </div>
          <div className="col-4">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="brand"
                id="brand"
                value={product.brand}
                onChange={handleInputChange}
              >
                {productBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <label htmlFor="brand">Brand</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                name="price"
                id="price"
                type="number"
                className="form-control"
                value={product.price}
                onChange={handleInputChange}
              />
              <label htmlFor="price">Price</label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                name="old_price"
                id="old_price"
                type="number"
                className="form-control"
                value={product.old_price}
                onChange={handleInputChange}
              />
              <label htmlFor="old_price">Old price</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                name="rating"
                id="rating"
                type="number"
                className="form-control"
                value={product.rating}
                onChange={handleInputChange}
              />
              <label htmlFor="rating">Rating</label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="collection"
                id="collection"
                value={product.collection}
                onChange={handleInputChange}
              >
                <option value="new">New</option>
                <option value="hot">Hot</option>
                <option value="fall">Fall</option>
                <option value="winter">Winter</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
              </select>
              <label htmlFor="collection">Collection</label>
            </div>
          </div>
        </div>
        <div className="row">
          <h5 className="col-12">
            Available colors
            <hr />
          </h5>
          <div className="col-6 mb-3">
            {product.colors.map((color) => (
              <span
                className="badge edit-product__color"
                style={{ backgroundColor: color.value }}
                key={color.label}
              >
                {color.label}
              </span>
            ))}
          </div>
          <div className="col-6">
            <div className="mb-3 input-group">
              <input
                type="color"
                className="form-control form-control-color"
                value={newColor.value}
                onChange={(e) =>
                  setNewColor({ label: newColor.label, value: e.target.value })
                }
              />
              <input
                name="newColor"
                id="newColor"
                type="text"
                className="form-control edit-product__color-input"
                placeholder="Input new color name"
                value={newColor.label}
                onChange={(e) =>
                  setNewColor({ label: e.target.value, value: newColor.value })
                }
              />
              <button className="btn btn-success" onClick={handleColorAdd}>
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-floating mb-3">
              <textarea
                name="description"
                id="description"
                className="form-control"
                value={product.description}
              ></textarea>
              <label htmlFor="description">Description</label>
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary save-button"
          data-bs-toggle="modal"
          data-bs-target="#editProductModal"
          onClick={() => {
            saveChanges(product);
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
