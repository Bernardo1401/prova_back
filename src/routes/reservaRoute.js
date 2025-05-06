const express = require("express");
const router = express.Router();
const reservaController = require("../controllers/reservaController");

router.get("/reservas", reservaController.getAllReservas);
router.get("/reservas/:id", reservaController.getReservaById);
router.post("/reservas", reservaController.createReserva);
router.put("/reservas/:id", reservaController.editReserva);
router.delete("/reservas/:id", reservaController.deleteReserva);

module.exports = router;