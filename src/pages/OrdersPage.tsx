import "@/assets/css/pages/OrdersPage.css";
import { useState, useEffect } from "react";
import type { Order } from "@/types";
import { parseOrders } from "@/utils";
import OrderDetails from "@/components/OrderDetails";
import DataTable from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Modal from "@/components/Modal";

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [displayedOrders, setDisplayedOrders] = useState<Order[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [orderToView, setOrderToView] = useState<Order>(displayedOrders[0]);

  const [searchQuery, setSearchQuery] = useState("");
  const ordersColumns = [
    "ID",
    "Email",
    "Shipping Address",
    "Billing Address",
    "Payment Method",
    "Created At",
    "Actions",
  ];

  const ordersPerPage = 14;

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : window.location.origin;

  useEffect(() => {
    // Fetch orders data from the API on component mount
    fetch(`${apiUrl}/orders/getAll`)
      .then((res) => res.json())
      .then((data) => {
        // Parse and set the orders data
        const orders = parseOrders(data.orders);
        setDisplayedOrders(orders.slice(0, ordersPerPage)); // Display initial set of orders
        setOrders(orders); // Store all orders
      });
  }, [apiUrl]);

  /**
   * Sets the order to view in the modal based on the given order ID.
   * @param {Object} param0 An object containing the order ID.
   */
  const handleViewOrder = ({ id }: { id: number }) => {
    const orderToView = orders.find((order) => order.id === id); // Find the order by ID
    if (orderToView) {
      setOrderToView(orderToView); // Set the order to view if found
    }
  };

  /**
   * Updates the displayed orders based on the active page number.
   * @param {number} page The active page number.
   */
  const handlePageChange = (page: number) => {
    const startIndex = (page - 1) * ordersPerPage; // Calculate start index
    const endIndex = startIndex + ordersPerPage; // Calculate end index
    setDisplayedOrders(orders.slice(startIndex, endIndex)); // Update displayed orders
    setActivePage(page); // Set active page number
  };

  /**
   * Filters orders based on the search query and updates the displayed orders.
   * @param {string} query The search query string.
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query); // Update search query state
    const filteredOrders = orders.filter((order) => {
      // Check if any order field matches the search query
      const emailMatch = order.email
        .toLowerCase()
        .includes(query.toLowerCase());

      const shippingAddressMatch = Object.values(order.shipping_address)
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());

      const billingAddressMatch = Object.values(order.billing_address)
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());

      const paymentMethodMatch = order.payment_method
        .toLowerCase()
        .includes(query.toLowerCase());

      const date = `${order.created_at.toLocaleString("default", {
        month: "long",
      })} ${order.created_at.getDate()}, ${order.created_at.getFullYear()}`;

      const dateMatch = date.toLowerCase().includes(query.toLowerCase());

      return (
        emailMatch ||
        shippingAddressMatch ||
        billingAddressMatch ||
        paymentMethodMatch ||
        dateMatch
      );
    });
    setDisplayedOrders(filteredOrders.slice(0, ordersPerPage)); // Update displayed orders
    setActivePage(1); // Reset to first page
  };

  return (
    <>
      <Search searchQuery={searchQuery} search={handleSearch} />
      <DataTable
        columns={ordersColumns}
        actions={{
          view: handleViewOrder,
          sort: setDisplayedOrders,
        }}
        values={displayedOrders}
        modalId="orderDetailsModal"
      />
      <Pagination
        activePage={activePage}
        changePage={handlePageChange}
        totalRows={orders.length}
      />
      <Modal modalTitle="Order Details" modalId="orderDetailsModal">
        <OrderDetails order={orderToView} />
      </Modal>
    </>
  );
}

export default OrdersPage;
