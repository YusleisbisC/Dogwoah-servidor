import express, { json } from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
const allowedOrigins = ["http://localhost:3000"];

app.use(json());
app.use(
  cors({
    origin: allowedOrigins,
  })
);

const products = [];

app.get("/", (req, res) => {
  res.send("Node JS api");
});

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).send("Produto no encontrado");
  else res.send(product);
});

app.post("/api/products", (req, res) => {
  const product = {
    id: uuidv4(),
    nome: req.body.nome,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
  };

  products.push(product);
  res.send(product);
});

app.put("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).send("Contacto no encontrado");
  }

  const updatedProduct = {
    id: productId,
    nome: req.body.nome,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
  };

  products[productIndex] = updatedProduct;
  res.send(updatedProduct);
});

app.delete("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).send("Produto no encontrado");
  const index = products.indexOf(product);
  products.splice(index, 1);
  res.send(product);
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));
