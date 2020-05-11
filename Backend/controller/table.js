const db = require("../utils/database");

exports.getAllTables = (req, res, next) => {
  db.execute(
    "SELECT a.id,a.name as name,count(b.name) as fields, createdOn FROM collections a LEFT join fields b on a.id = b.table_id GROUP BY a.id"
  )
    .then((result) => {
      res.status(200).json({
        data: result[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

exports.getFieldsForTable = (req, res, next) => {
  db.execute(
    "SELECT a.name as TableName,b.id,b.name,createdOn FROM collections a LEFT join fields b on a.id = b.table_id where a.id = ? ORDER BY b.id",
    [req.params.id]
  )
    .then((result) => {
      res.status(200).json({
        data: result[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

exports.addTable = (req, res, next) => {
  const tableName = req.body.name;
  const fields = req.body.fields;
  // Add table:
  db.query("INSERT INTO `collections` (`name`) VALUES (?)", [tableName])
    .then(() => {
      if (fields) {
        //get last inserted colelction id
        db.execute("SELECT MAX(ID) as id FROM collections").then(
          (lastInsertedRowResult) => {
            // Insert fields into map
            let query = "INSERT INTO `fields`(`name`, `table_id`) VALUES ";
            fields.forEach((field) => {
              query += `('${field.name}',${lastInsertedRowResult[0][0].id}),`;
            });
            db.query(query.slice(0, -1));
          }
        );
      } else {
        res.status(201).json({
          message: "success",
        });
      }
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

exports.deleteTable = (req, res, next) => {
  console.log(req.body.id);
  const id = req.body.id;
  db.execute("DELETE FROM fields WHERE table_id = ?", [id])
    .then(() => {
      db.execute("DELETE FROM collections WHERE id = ? ", [id]);
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

exports.updateById = (req, res, next) => {
  const tableId = req.body.table.id;
  const tableName = req.body.table.name;
  const fields = req.body.table.fields;
  const deletedFields = req.body.deletedFieldIds;
  const newlyAddedFields = req.body.newFields;

  db.query("UPDATE collections SET name = ? WHERE id = ?", [tableName, tableId])
    .then(() => {
      //UPDATE existing fields
      let query = "";
      fields.forEach((f) => {
        if (f.id) {
          query = `UPDATE fields SET name = '${f.name}' WHERE id = ${f.id} AND table_id = ${tableId}; `;
          db.execute(query);
        }
      });

      //REMOVE deleted fields
      if (deletedFields.length > 0) {
        query = `DELETE FROM fields where id IN (${deletedFields.join(
          ","
        )}) AND table_id = ${tableId};`;
        db.execute(query);
      }

      //INSERT new fields
      if (newlyAddedFields.length > 0) {
        query = "INSERT INTO `fields`(`name`, `table_id`) VALUES ";
        newlyAddedFields.forEach((field) => {
          query += `('${field.name}',${tableId}),`;
        });
        query = query.slice(0, -1);
        db.execute(query);
      }
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
