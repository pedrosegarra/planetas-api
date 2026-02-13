
const http = require("http");
const app = require("../app"); // <- si app.js está en la raíz y test/ dentro, esto está bien

let server;
const PORT = 3000;
const BASE_URL = `http://127.0.0.1:${PORT}`;

function getJSON(path) {
  return new Promise((resolve, reject) => {
    http
      .get(BASE_URL + path, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            body: JSON.parse(data),
          });
        });
      })
      .on("error", reject);
  });
}

beforeAll((done) => {
  server = app.listen(PORT, done);
});

afterAll((done) => {
  server.close(done);
});

test("🧪 Test estricto /planetas", async () => {
  const esperado = [
    { nombre: "Mercurio", orden: 1, tipo: "Rocoso" },
    { nombre: "Venus", orden: 2, tipo: "Rocoso" },
    { nombre: "Tierra", orden: 3, tipo: "Rocoso" },
    { nombre: "Marte", orden: 4, tipo: "Rocoso" }
  ];

  const res = await getJSON("/planetas");

  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual(esperado); // igualdad estricta (sin campos extra)
});
