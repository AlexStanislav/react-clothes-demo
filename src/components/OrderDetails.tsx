import "@/assets/css/components/OrderDetails.css";
import type { Order, OrderItem } from "@/types";
import DataTable from "./DataTable";
import { useEffect, useState } from "react";

function OrderDetails({ order }: { order: Order | undefined }) {
  const [orderCart, setOrderCart] = useState(order?.cart as OrderItem[]);

  useEffect(() => {
    setOrderCart(order?.cart as OrderItem[]);
  }, [order]);

  const orderColumns = [
    "ID",
    "Name",
    "Quantity",
    "Price per Unit",
    "Total Price",
  ];

  return (
    <div className="order-details">
      <div className="row">
        <div className="col-4">
          <div className="form-floating">
            <input
              type="text"
              name="id"
              className="form-control"
              readOnly
              defaultValue={order?.id}
            ></input>
            <label htmlFor="id" className="form-label">
              Order ID
            </label>
          </div>
        </div>
        <div className="col-4">
          <div className="form-floating">
            <input
              type="text"
              name="email"
              className="form-control"
              readOnly
              defaultValue={order?.email}
            ></input>
            <label htmlFor="email" className="form-label">
              Email
            </label>
          </div>
        </div>
        <div className="col-4">
          <div className="form-floating">
            <input
              type="text"
              name="payment"
              className="form-control"
              readOnly
              defaultValue={order?.payment_method}
            ></input>
            <label htmlFor="payment" className="form-label">
              Payment Method
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <div className="form-floating">
            <input
              type="text"
              name="shipping_state"
              className="form-control"
              readOnly
              defaultValue={order?.shipping_address?.state}
            ></input>
            <label htmlFor="shipping_state" className="form-label">
              Shipping State
            </label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <input
              type="text"
              name="shipping_city"
              className="form-control"
              readOnly
              defaultValue={order?.shipping_address?.city}
            ></input>
            <label htmlFor="shipping_city" className="form-label">
              Shipping City
            </label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <input
              type="text"
              name="shipping_street"
              className="form-control"
              readOnly
              defaultValue={order?.shipping_address?.street}
            ></input>
            <label htmlFor="shipping_street" className="form-label">
              Shipping Street
            </label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <input
              type="text"
              name="shipping_zip"
              className="form-control"
              readOnly
              defaultValue={order?.shipping_address?.zip}
            ></input>
            <label htmlFor="shipping_zip" className="form-label">
              Shipping Zip Code
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <div className="form-floating">
            <input
              type="text"
              name="billing_state"
              className="form-control"
              readOnly
              defaultValue={order?.billing_address?.state}
            ></input>
            <label htmlFor="billing_state" className="form-label">
              Billing State
            </label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <input
              type="text"
              name="billing_city"
              className="form-control"
              readOnly
              defaultValue={order?.billing_address?.city}
            ></input>
            <label htmlFor="billing_city" className="form-label">
              Billing City
            </label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <input
              type="text"
              name="billing_street"
              className="form-control"
              readOnly
              defaultValue={order?.billing_address?.street}
            ></input>
            <label htmlFor="billing_street" className="form-label">
              Billing Street
            </label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <input
              type="text"
              name="billing_zip"
              className="form-control"
              readOnly
              defaultValue={order?.billing_address?.zip}
            ></input>
            <label htmlFor="billing_zip" className="form-label">
              Billing Zip Code
            </label>
          </div>
        </div>
      </div>
      <div className="row order-details__table">
        <DataTable
          values={orderCart}
          columns={orderColumns}
          actions={{
            sort: setOrderCart,
          }}
        />
      </div>
      <div className="order-details__total">
        <h4>Total: ${order?.total}</h4>
      </div>
    </div>
  );
}

export default OrderDetails;
