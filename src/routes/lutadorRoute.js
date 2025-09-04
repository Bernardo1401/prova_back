const express = require("express");
const router = express.Router();
const lutadorController = require("../controllers/lutadorController.js");
const upload = require("../config/upload.js");


router.get("/lutadores", lutadorController.getAllLutadores);
router.get("/lutadores/:id", lutadorController.getLutadorById);
router.post("/lutadores", upload.single("foto_url"), lutadorController.createLutador);
router.put("/lutadores/:id", lutadorController.updateLutador);
router.delete("/lutadores/:id", lutadorController.deleteLutador);

module.exports = router;
