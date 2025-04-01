import "@/assets/css/components/ProductTable.css";
import type { Product } from "@/types";
import { useEffect, useState } from "react";

function ProductTable({
  products,
  editProduct,
  deleteProduct,
}: {
  products: Product[];
  editProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
}) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [currentConfirmId, setCurrentConfirmId] = useState<number | null>(null);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortDirectionDisplay, setSortDirectionDisplay] = useState({
    id: "asc",
    name: "asc",
    price: "asc",
    category: "asc",
    brand: "asc",
    rating: "asc",
  });

  /**
   * When the products prop changes, update the displayProducts state.
   * This is needed because we are sorting and filtering the products.
   */
  useEffect(() => {
    setDisplayProducts(products);
  }, [products]);

  /**
   * Sort the products by a given column.
   * @param {keyof Product} column The column to sort by.
   */
  const sortColumn = (column: keyof Product) => {
    const sortedProducts = [...displayProducts].sort((a, b) => {
      if (sortDirection === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });

    // Toggle the sort direction and update the state
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortDirectionDisplay({
      ...sortDirectionDisplay,
      [column]: sortDirection,
    });
    setDisplayProducts(sortedProducts);
  };

  /**
   * Shows the delete confirmation modal for the given product ID.
   * @param {number} id The ID of the product to delete.
   */
  const handleShowConfirmation = (id: number) => {
    setCurrentConfirmId(id);
    setShowDeleteConfirmation(true);
  };

  /**
   * Confirms the deletion of the product with the given ID.
   * @param {number} id The ID of the product to delete.
   */
  const handleConfirmDelete = (id: number) => {
    deleteProduct(id);
    setShowDeleteConfirmation(false);
    setCurrentConfirmId(null);
  };

  return (
    <table className="main__table table">
      <thead>
        <tr>
          <th>
            <div className="table__head">
              ID
              <i
                className={
                  "bi bi-sort-alpha-" +
                  (sortDirectionDisplay.id === "asc" ? "up" : "down")
                }
                onClick={() => sortColumn("id")}
              ></i>
            </div>
          </th>
          <th>
            <div className="table__head">
              Name
              <i
                className={
                  "bi bi-sort-alpha-" +
                  (sortDirectionDisplay.name === "asc" ? "up" : "down")
                }
                onClick={() => sortColumn("name")}
              ></i>
            </div>
          </th>
          <th>
            <div className="table__head">
              Price{" "}
              <i
                className={
                  "bi bi-sort-alpha-" +
                  (sortDirectionDisplay.price === "asc" ? "up" : "down")
                }
                onClick={() => sortColumn("price")}
              ></i>
            </div>
          </th>
          <th>
            <div className="table__head">
              Category
              <i
                className={
                  "bi bi-sort-alpha-" +
                  (sortDirectionDisplay.category === "asc" ? "up" : "down")
                }
                onClick={() => sortColumn("category")}
              ></i>
            </div>
          </th>
          <th>
            <div className="table__head">
              Brand
              <i
                className={
                  "bi bi-sort-alpha-" +
                  (sortDirectionDisplay.brand === "asc" ? "up" : "down")
                }
                onClick={() => sortColumn("brand")}
              ></i>
            </div>
          </th>
          <th>
            <div className="table__head">
              Rating
              <i
                className={
                  "bi bi-sort-alpha-" +
                  (sortDirectionDisplay.rating === "asc" ? "up" : "down")
                }
                onClick={() => sortColumn("rating")}
              ></i>
            </div>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {displayProducts.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.category}</td>
            <td>{product.brand}</td>
            <td>{product.rating}</td>
            <td className="table__actions">
              <i
                className="bi bi-pencil-fill"
                data-bs-toggle="modal"
                data-bs-target="#editProductModal"
                onClick={() => editProduct(product)}
              ></i>
              <i
                className="bi bi-trash-fill"
                onClick={() => handleShowConfirmation(product.id)}
              ></i>
              {showDeleteConfirmation && currentConfirmId === product.id && (
                <div data-confirm-id={product.id} className="delete-confirm">
                  <i className="bi bi-exclamation-triangle"></i>
                  <span>Are you sure you want to delete this product?</span>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleConfirmDelete(product.id)}
                  >
                    Yes
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteConfirmation(false)}
                  >
                    No
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
