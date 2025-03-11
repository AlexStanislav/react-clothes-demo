import express from "express";
import sqlite3 from "better-sqlite3";
const app = express();
const port = process.env.PORT || 3000;

const db = sqlite3("./database.db");

app.use(express.static("public"));
app.use(express.json());

app.get("/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();
  res.json({ products });
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
