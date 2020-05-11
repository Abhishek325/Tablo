const express = require("express");
const router = express.Router();

const tableController = require("../controller/table");

router.get("/list", tableController.getAllTables);
router.get("/:id", tableController.getFieldsForTable);
router.post("/add", tableController.addTable);
router.post("/delete", tableController.deleteTable);
router.post("/update", tableController.updateById);

module.exports = router;
