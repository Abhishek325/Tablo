const express = require("express");
const router = express.Router();

const dataController = require("../controller/data");

router.get("/:id", dataController.getData);
router.post("/delete", dataController.deleteData);
router.post("/add", dataController.addData);

module.exports = router;
