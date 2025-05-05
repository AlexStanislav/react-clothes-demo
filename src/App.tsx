import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import Sidebar from "./components/Sidebar";
import StatisticsPage from "./pages/StatisticsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <section className="app">
          <Sidebar logOut={setIsLoggedIn} />
          <main className="main">
            <Routes>
              <Route path="/dashboard" element={<ProductsPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
            </Routes>
          </main>
        </section>
      ) : (
        <LoginPage logIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default App;
