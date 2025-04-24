import { Router } from "express";
const router = Router();
const bcrypt = require("bcrypt");
const sqlite3 = require("better-sqlite3");
const db = sqlite3("./database.db");

router.post("/", (req: any, res) => {
  const { email, password } = req.body;

  const sanitizedEmail = email.toLowerCase().trim().replace(/\s/g, "");

  if (!sanitizedEmail || !password) {
    res.json({ success: false });
    return;
  }

  try {
    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(sanitizedEmail);
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user.email;
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ error });
  }
});

router.post("/test", (req: any, res) => {
  req.session.user = "test@user1.com"
  res.json({ success: true });
});

module.exports = router;
