import { Router } from "express";
import sqlite3 from "better-sqlite3";
const db = sqlite3("./database.db");

const router = Router();

router.get("/getAll", (req, res) => {
  try {
    const products = db.prepare("SELECT * FROM products").all();
    res.json({ products });
  } catch (error) {
    res.json({ error });
  }
});

router.put("/update", (req, res) => {
  const {
    id,
    name,
    price,
    category,
    brand,
    rating,
    image,
    old_price,
    collection,
    description,
    sizes,
    colors,
  } = req.body;

  try {
    db.prepare(
      "UPDATE products SET name = ?, price = ?, category = ?, brand = ?, rating = ?, image = ?, old_price = ?, collection = ?, description = ?, sizes = ?, colors = ? WHERE id = ?"
    ).run(
      name,
      price,
      category,
      brand,
      rating,
      image,
      old_price,
      collection,
      description,
      JSON.stringify(sizes),
      JSON.stringify(colors),
      id
    );
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
    console.log(error);
  }
});

router.post("/create", (req, res) => {
  const {
    id,
    name,
    price,
    category,
    brand,
    rating,
    image,
    old_price,
    collection,
    description,
    sizes,
    colors,
  } = req.body;

  try {
    db.prepare(
      "INSERT INTO products (id, name, price, category, brand, rating, image, old_price, collection, description, sizes, colors) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).run(
      id,
      name,
      price,
      category,
      brand,
      rating,
      image,
      old_price,
      collection,
      description,
      JSON.stringify(sizes),
      JSON.stringify(colors)
    );
    res.status(200).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
    console.log(error);
  }
});

router.delete("/delete", (req, res) => {
  const { id } = req.body;
  try {
    db.prepare("DELETE FROM products WHERE id = ?").run(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
    console.log(error);
  }
});

module.exports = router;
