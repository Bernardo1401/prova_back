const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const upload = require("../config/upload.js");
const apiKeyMiddleware = require("../config/apiKey");


router.use(apiKeyMiddleware);
router.get("/clientes", clienteController.getAllClientes);
router.get("/clientes/:id", clienteController.getClienteById);
router.post("/clientes", upload.single("foto"), clienteController.createCliente);
router.put("/clientes/:id", clienteController.updateCliente);
router.delete("/clientes/:id", clienteController.deleteCliente);

module.exports = router;
