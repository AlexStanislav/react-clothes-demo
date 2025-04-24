import express from "express";
import { maxHeaderSize } from "http";
const app = express();
const session = require("express-session");
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.static("dashboard"));
app.use(express.json());

app.use(
  session({
    secret: "clotes_demo_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

function checkAuth(req: any, res: any, next: any) {
  if (req.session.user) {
    next();
  } else {
    res.json({ error: "Not authenticated" });
  }
}

app.use("/dashboard", (req: any, res: any, next: any) => {
  res.sendFile(__dirname + "/dashboard/index.html");
});

app.use("/products", require("./routes/products.route"));
app.use("/orders", checkAuth, require("./routes/orders.route"));
app.use("/login", require("./routes/login.route"));

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
