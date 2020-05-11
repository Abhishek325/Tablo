const db = require("../utils/database");

exports.addData = (req, res, next) => {
  const fields = req.body.fields;
  const tableId = req.body.id;
  db.execute("SELECT max(record_id)+1 as id FROM user_field_value_map")
    .then((result) => {
      let recordId = result[0][0].id || 1;
      let query =
        "INSERT INTO `user_field_value_map`(`record_id`, `field_id`, `table_id`, `field_value`) VALUES ";
      fields.forEach((f) => {
        query += `(${recordId},${f.id},${tableId},'${f.value}'),`;
      });
      // console.log(query.slice(0, -1));
      db.execute(query.slice(0, -1));
    })
    .then(() => {
      res.status(201).json({
        message: "success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

exports.getData = (req, res, next) => {
  const tableId = req.params.id;
  db.execute(
    "SELECT * FROM `user_field_value_map` WHERE table_id = ? ORDER BY record_id, field_id ",
    [tableId]
  )
    .then((result) => {
      res.status(201).json({
        data: result[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

exports.deleteData = (req, res, next) => {
  const recordId = req.body.id;
  db.execute("DELETE FROM user_field_value_map WHERE record_id = ?", [recordId])
    .then(() => {
      res.status(200).json({
        message: "success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};
