const express = require("express");
const router = express.Router();
const Users = require("../../../config");

router
  .route("/")
  .post(async (req, res) => {
    const data = req.body;
    await Users.add(data);
    res.send({ pesan: "Data berhasil ditambah!" });
  })
  .get(async (req, res) => {});

router
  .route("/:id")
  .get(async (req, res) => {})
  .put(async (req, res) => {
    const ID = req.params.id;
    const data = req.body;
    await Users.doc(ID).update(data);
    res.send({ pesan: "Data berhasil diubah!" });
  })
  .delete(async (req, res) => {
    const ID = req.params.id;
    await Users.doc(ID).delete();
    res.send({ pesan: "Data berhasil dihapus!" });
  });

module.exports = router;
