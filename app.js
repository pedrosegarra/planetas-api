
const express = require("express");
const app = express();

// Base interna SOLO hasta Tierra
const DB = {
  mercurio: { nombre: "Mercurio", tipo: "Rocoso", lunas: [] },
  venus: { nombre: "Venus", tipo: "Rocoso", lunas: [] },
  tierra: { nombre: "Tierra", tipo: "Rocoso", lunas: ["Luna"] },
};

function norm(s) {
  return String(s).trim().toLowerCase();
}

// GET /sistema?planetas=mercurio,venus,tierra
app.get("/sistema", (req, res) => {
  const raw = req.query.planetas;

  if (!raw || typeof raw !== "string") {
    return res.status(400).json({ error: "Debes pasar ?planetas=..." });
  }

  const pedidos = raw
    .split(",")
    .map(norm)
    .filter((x) => x.length > 0);

  if (pedidos.length === 0) {
    return res.status(400).json({ error: "Lista de planetas vacía" });
  }

  const encontrados = [];
  const noEncontrados = [];

  for (const key of pedidos) {
    if (DB[key]) encontrados.push(DB[key]);
    else noEncontrados.push(key);
  }

  if (noEncontrados.length > 0) {
    return res.status(404).json({
      error: "Algún planeta no existe en la base",
      noEncontrados,
    });
  }

  // Respuesta estricta: solo estos campos
  const salida = encontrados.map(({ nombre, tipo, lunas }) => ({ nombre, tipo, lunas }));
  return res.status(200).json(salida);
});

app.get("/", (req, res) => res.send("API Sistema Solar"));

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log("API lista en http://localhost:3000"));
}
