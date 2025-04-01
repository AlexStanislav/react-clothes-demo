import express from "express";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.use("/products", require("./routes/products.route"));
app.use("/orders", require("./routes/orders.route"));

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
