import "@/assets/css/pages/ProductsView.css";
import type { Product } from "@/types";
import { useState, useEffect, useCallback } from "react";
import { useProducts } from "@/store";
import ProductCard from "@/components/ProductCard";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import Checkbox from "@/components/Checkbox";

function ProductsView() {
  const store = useProducts() as { products: Product[] };
  const products = store.products;

  const [searchQuery, setSearchQuery] = useState("");

  const startIndex = 0;
  const productsPerPage = 9;
  const [totalPages, setTotalPages] = useState(
    Math.ceil(products.length / productsPerPage)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [displayProducts, setDisplayProducts] = useState(
    products.slice(startIndex, startIndex + productsPerPage)
  );

  const categories = [...new Set(products.map((product) => product.category))];
  const collections = [
    ...new Set(products.map((product) => product.collection)),
  ];
  const brands = [...new Set(products.map((product) => product.brand))];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");


  const getProducts = useCallback(
    (products: Product[]) => {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      return products.slice(startIndex, endIndex);
    },
    [currentPage, productsPerPage]
  );

  const filterProducts = useCallback(() => {
    const filteredProducts = products.filter((product) => {
      const categoryMatch =
        selectedCategory === "" || product.category === selectedCategory;
      const collectionMatch =
        selectedCollection === "" || product.collection === selectedCollection;
      const brandMatch =
        selectedBrand === "" || product.brand === selectedBrand;
      return categoryMatch && collectionMatch && brandMatch;
    });
    return filteredProducts;
  }, [selectedCategory, selectedCollection, selectedBrand, products]);


  const handlePageChange = (page: number) => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const filteredProducts = filterProducts();
    const queriedProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const finalProducts = queriedProducts.slice(startIndex, endIndex);
    setDisplayProducts(finalProducts);
    setCurrentPage(page);
  };


  const searchProducts = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      const filteredProducts = filterProducts();
      const finalProducts = getProducts(filteredProducts);
      setDisplayProducts(finalProducts);
    } else {
      const products = filterProducts();
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      const finalProducts = getProducts(filteredProducts);
      setDisplayProducts(finalProducts);
      setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
    }
  };

  const searchSuggestions = () => {
    const fillteredProducts = filterProducts();
    return fillteredProducts.map((product) => product.name);
  };



  const showProducts = useCallback(() => {
    const filteredProducts = filterProducts();
    const queriedProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const finalProducts = getProducts(queriedProducts);
    setDisplayProducts(finalProducts);
    setTotalPages(Math.ceil(queriedProducts.length / productsPerPage));
  }, [productsPerPage, filterProducts, getProducts, searchQuery]);

  useEffect(() => {
    showProducts();
  }, [showProducts]);

  return (
    <section className="products">
      <section className="filters">
        <h2 className="products__title">Filters</h2>

        <Search onSearch={searchProducts} suggestions={searchSuggestions()} />

        <div className="filters__wrapper categories">
          <h3 className="filters__title">
            Categories
            <i
              className="pi pi-filter-slash filters__clear"
              onClick={() => setSelectedCategory("")}
              style={{ display: selectedCategory !== "" ? "block" : "none" }}
            ></i>
          </h3>
          {categories.map((category) => (
            <Checkbox
              key={category}
              currentValue={selectedCategory}
              onChange={setSelectedCategory}
              value={category}
            />
          ))}
        </div>

        <div className="filters__wrapper collections">
          <h3 className="filters__title">
            Collections
            <i
              className="pi pi-filter-slash filters__clear"
              onClick={() => setSelectedCollection("")}
              style={{ display: selectedCollection !== "" ? "block" : "none" }}
            ></i>
          </h3>

          <div className="collections__wrapper">
            {collections.map((collection) => (
              <Checkbox
                key={collection}
                currentValue={selectedCollection}
                onChange={setSelectedCollection}
                value={collection}
              />
            ))}
          </div>
        </div>

        <div className="filters__wrapper brands">
          <h3 className="filters__title">
            Brands
            <i
              className="pi pi-filter-slash filters__clear"
              onClick={() => setSelectedBrand("")}
              style={{ display: selectedBrand !== "" ? "block" : "none" }}
            ></i>
          </h3>
          {brands.map((brand) => (
            <Checkbox
              key={brand}
              currentValue={selectedBrand}
              onChange={setSelectedBrand}
              value={brand}
            />
          ))}
        </div>
      </section>
      <section className="products__list">
        <header className="products__header">
          Showing page {currentPage} of {Math.ceil(products.length / 9)}
        </header>

        <div className="products__cards">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Pagination totalRows={totalPages} onPageChange={handlePageChange} />
      </section>
    </section>
  );
}

export default ProductsView;
