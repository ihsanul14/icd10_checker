const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res
    .status(200)
    .json({
      message: "Welcome to ICD10_Checker Service, please read documentation.",
    });
});

/**
 * Endpoint Version 1
 */
const v1 = require("./1.0");
router.use("/", v1);

/**
 * Version published
 */
router.use("/", v1);

module.exports = router;
