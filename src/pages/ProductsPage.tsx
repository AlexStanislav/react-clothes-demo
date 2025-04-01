import "@/assets/css/pages/ProductsPage.css";
import { useEffect, useState } from "react";
import type { Product } from "@/types";
import { parseProducts } from "@/utils";
// import ProductTable from "@/components/ProductTable";
import DataTable from "@/components/DataTable";
import EditProduct from "@/components/EditProduct";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Modal from "@/components/Modal";

function ProductsPage() {
  const [addNewProduct, setAddNewProduct] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const productsPerPage = 14;
  const productColumns = [
    "ID",
    "Name",
    "Price",
    "Category",
    "Rating",
    "Collection",
    "Actions",
  ];

  const apiURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : window.location.origin;

  // Fetch products from the API on component mount
  useEffect(() => {
    fetch(`${apiURL}/products/getAll`)
      .then((res) => res.json())
      .then((data) => {
        // Parse the fetched products data
        const parsedProducts = parseProducts(data.products);
        // Update products state
        setProducts(parsedProducts);
        setDisplayProducts(parsedProducts.slice(0, productsPerPage));
      })
      .catch((err) => console.log(err)); // Log errors
  }, [apiURL]);

  /**
   * Filters products based on the search query.
   * @returns {Product[]} Filtered list of products.
   */
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Filters products based on the search query and updates the displayed products.
   * @param {string} query The search query string.
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const productsToDisplay =
      query === ""
        ? products.slice(0, productsPerPage) // Display all products if query is empty
        : filteredProducts.slice(0, productsPerPage); // Filtered products if query is not empty
    setDisplayProducts(productsToDisplay);
  };

  /**
   * Updates the displayed products based on the active page number.
   * @param {number} page The active page number.
   */
  const handlePageChange = (page: number) => {
    const startIndex = (page - 1) * productsPerPage; // Calculate the starting index of the page
    const endIndex = startIndex + productsPerPage; // Calculate the ending index of the page
    const productsToDisplay = products.slice(startIndex, endIndex); // Slice the products array to get the products to display
    setActivePage(page);
    setDisplayProducts(productsToDisplay);
  };

  /**
   * Handles adding a new product.
   * Creates a new product object with default values.
   * Sets the addNewProduct state to true.
   * Sets the productToEdit state to the new product.
   */
  const handleAddProduct = () => {
    const newProduct: Product = {
      id: products.length,
      name: "New Product",
      category: "men",
      description: "New Product",
      collection: "New",
      brand: "Asics",
      colors: [],
      sizes: ["S", "M", "L", "XL", "XXL"],
      price: 0,
      old_price: 0,
      rating: 0,
      image: "https://picsum.photos/350/600?random=1",
    };
    // Set addNewProduct state to true to indicate a new product is being added
    setAddNewProduct(true);
    // Set productToEdit state to the new product to edit
    setProductToEdit(newProduct);
  };

  /**
   * Handles saving changes to an edited product.
   *
   * If addNewProduct is true, sends a POST request to the API to create a new product.
   * If addNewProduct is false, sends a PUT request to the API to update the product.
   * @param {Product} updatedProduct The updated product.
   */
  const handleSaveEditChanges = (updatedProduct: Product) => {
    if (addNewProduct) {
      // Send POST request to API to create a new product
      fetch(`${apiURL}/products/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      })
        .then(async () => {
          // Add the new product to the products state
          setProducts([...products, updatedProduct]);
          // Add the new product to the displayProducts state
          setDisplayProducts([...displayProducts, updatedProduct]);
          // Set addNewProduct state to false to indicate that a new product is no longer being added
          setAddNewProduct(false);
        })
        .catch((err) => console.log(err));
    } else {
      // Send PUT request to API to update the product
      fetch(`${apiURL}/products/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      })
        .then(() => {
          // Update the products state with the updated product
          const updatedProducts = products.map((product) => {
            if (product.id === updatedProduct.id) {
              return updatedProduct;
            }
            return product;
          });
          setProducts(updatedProducts);

          // Update the displayed products with the updated product
          const updatedDisplayProducts = displayProducts.map((product) => {
            if (product.id === updatedProduct.id) {
              return updatedProduct;
            }
            return product;
          });

          setDisplayProducts(updatedDisplayProducts);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleViewProduct = ({ id }: { id: number }) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setProductToEdit(product);
    }
  };

  /**
   * Handles deleting a product with the given ID.
   * @param {number} id The ID of the product to delete.
   */
  const handleDeleteProduct = (id: number) => {
    // Send DELETE request to API to delete the product
    fetch(`${apiURL}/products/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then(() => {
        // Update the products state by removing the deleted product
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
      })
      .catch((err) => console.log(err));

    // Update the displayed products by removing the deleted product
    setDisplayProducts((prevProducts) => {
      return prevProducts.filter((product) => product.id !== id);
    });
  };

  return (
    <>
      <section className="main__products">
        <div className="main__search">
          <Search searchQuery={searchQuery} search={handleSearch} />
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#editProductModal"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        </div>
        <DataTable
          columns={productColumns}
          values={displayProducts}
          actions={{
            view: handleViewProduct,
            delete: handleDeleteProduct,
            sort: setDisplayProducts,
          }}
          modalId="editProductModal"
          canDeleteValues={true}
        />
      </section>

      <Pagination
        activePage={activePage}
        changePage={handlePageChange}
        totalRows={products.length}
      />

      <Modal modalTitle="Product" modalId="editProductModal">
        {productToEdit && (
          <EditProduct
            productData={productToEdit}
            saveChanges={handleSaveEditChanges}
          />
        )}
      </Modal>
    </>
  );
}

export default ProductsPage;
