const express = require("express");
const router = express.Router();

const { authenticate, bearer, keySecretVerify } = require("../../middlewares");

const { MrController } = require("../../controllers/1.0");

router.get("/", MrController.list);
router.get("/:id", MrController.listById);
router.get("/wildcard/:id", MrController.listLikeById);
router.post("/add", MrController.create);
router.put("/update", MrController.update);
router.delete("/delete/:id", MrController.delete);
module.exports = router;
