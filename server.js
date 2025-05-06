require("dotenv").config();
const express = require("express");
const cors = require("cors");
const clienteRoutes = require("./src/routes/clienteRoute");
const reservaRoutes = require("./src/routes/reservaRoute");
const path = require("path");


const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", clienteRoutes);
app.use("/api", reservaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
