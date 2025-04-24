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

module.exports = router;
