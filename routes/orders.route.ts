import { Router } from "express";
import sqlite3 from "better-sqlite3";
const db = sqlite3("./database.db");

const router = Router();

router.get("/getAll", (req: any, res) => {
  try {
    const orders = db.prepare("SELECT * FROM orders").all();
    res.json({ orders });
  } catch (error) {
    res.json({ error });
  }
});

router.get("/getByUser", (req: any, res) => {
  try {
    const orders = db.prepare("SELECT * FROM orders WHERE email = ?").all(
      req.session.user
    );
    res.json({ orders });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/new", (req: any, res) => {
  const { email, items } = req.body;
  const mappedItems = items.map((item: any) => {
    return {
      ...item,
      price_per_unit: item.price / item.quantity,
      total_price: item.price
    };
  })
  const cart = JSON.stringify(mappedItems);
  const shipping_address = {
    street: "123 Main St",
    city: "Anytown",
    state: "N/A",
    zip: "12345",
  };
  const billing_address = {
    street: "123 Main St",
    city: "Anytown",
    state: "N/A",
    zip: "12345",
  };
  const total = items.reduce((acc: number, item: any) => acc + item.price, 0);
  const payment_method = "Credit Card";
  try {
    db.prepare(
      "INSERT INTO orders (email, cart, shipping_address, billing_address, total, payment_method) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(email, cart, JSON.stringify(shipping_address), JSON.stringify(billing_address), total, payment_method);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
})

module.exports = router;
