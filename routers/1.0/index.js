const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome to Project Service Version 1" });
});

const mr = require("./mr");
const disease = require("./disease");

router.use("/api/v1/mr", mr);
router.use("/api/v1/disease", disease);

module.exports = router;
