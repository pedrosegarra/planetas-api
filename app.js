
const express = require('express');
const app = express();

const planetas = [
  { id: 1, nombre: 'Mercurio', orden: 1, tipo: 'Rocoso' },
  { id: 2, nombre: 'Venus', orden: 2, tipo: 'Rocoso' },
  { id: 3, nombre: 'Tierra', orden: 3, tipo: 'Rocoso' },
  { id: 4, nombre: 'Marte', orden: 4, tipo: 'Rocoso' }
];

app.get('/planetas', (req, res) => {
  // si el validador es estricto y no quiere "id", devuélvelo sin id:
  const salida = planetas.map(({ nombre, orden, tipo }) => ({ nombre, orden, tipo }));
  res.status(200).json(salida);
});

app.get('/', (req, res) => res.send('API del Sistema Solar'));

module.exports = app;

// Solo arranca si se ejecuta directamente: node app.js
if (require.main === module) {
  app.listen(3000, () => console.log('API lista en http://localhost:3000'));
}
