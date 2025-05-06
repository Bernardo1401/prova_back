const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

router.get("/clientes", clienteController.getAllClientes);
router.get("/clientes/:id", clienteController.getClienteById);
router.post("/clientes", upload.single("foto"), clienteController.createCliente);
router.put("/clientes/:id", clienteController.updateCliente);
router.delete("/clientes/:id", clienteController.deleteCliente);

module.exports = router;
