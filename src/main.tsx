import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "primeicons/primeicons.css";
import App from "./App.tsx";
import { GlobalModalProvider } from "./utils/providers.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalModalProvider>
        <App />
      </GlobalModalProvider>
    </BrowserRouter>
  </StrictMode>
);
