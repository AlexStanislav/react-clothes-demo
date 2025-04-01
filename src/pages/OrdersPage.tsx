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
    "Actions",
  ];

  const ordersPerPage = 14;

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : window.location.origin;

  useEffect(() => {
    fetch(`${apiUrl}/orders/getAll`)
      .then((res) => res.json())
      .then((data) => {
        const orders = parseOrders(data.orders);
        setDisplayedOrders(orders.slice(0, ordersPerPage));
        setOrders(orders);
      });
  }, [apiUrl]);

  const handleViewOrder = ({ id }: { id: number }) => {
    const orderToView = orders.find((order) => order.id === id);
    if (orderToView) {
      setOrderToView(orderToView);
    }
  };

  const handlePageChange = (page: number) => {
    const startIndex = (page - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    setDisplayedOrders(orders.slice(startIndex, endIndex));
    setActivePage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredOrders = orders.filter((order) => {
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

      return (
        emailMatch ||
        shippingAddressMatch ||
        billingAddressMatch ||
        paymentMethodMatch
      );
    });
    setDisplayedOrders(filteredOrders.slice(0, ordersPerPage));
    setActivePage(1);
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
