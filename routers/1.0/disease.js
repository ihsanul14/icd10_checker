const express = require("express");
const router = express.Router();

const { authenticate, bearer, keySecretVerify } = require("../../middlewares");

const { DiseaseController } = require("../../controllers/1.0");

router.post("/", DiseaseController.list);
router.post("/redis", DiseaseController.listRedis);
router.post("/mongo", DiseaseController.listMongo);
router.post("/redis/add", DiseaseController.store_icd_list);
router.post("/add", DiseaseController.create);
module.exports = router;
