const express = require("express");
const router = express.Router();

const { authenticate, bearer, keySecretVerify } = require("../../middlewares");

const {
  DiseaseController,
  DiseaseMongoController,
} = require("../../controllers/1.0");

router.post("/", DiseaseController.list);
router.post("/mongo", DiseaseMongoController.list);
router.post("/add", DiseaseController.create);
router.put("/update", DiseaseController.update);
router.delete("/delete/:id", DiseaseController.delete);
module.exports = router;
