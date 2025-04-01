import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import Sidebar from "./components/Sidebar";
import StatisticsPage from "./pages/StatisticsPage";

function App() {
  return (
    <>
      <section className="app">
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Routes>
        </main>
      </section>
    </>
  );
}

export default App;
