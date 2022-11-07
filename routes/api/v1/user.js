const express = require("express");
const router = express.Router();
const Users = require("../../../config");

/// firestore uses the same as gRPC status code
/// https://github.com/grpc/grpc/blob/master/doc/statuscodes.md
/// 5 = NOT_FOUND
/// 6 = ALREADY_EXISTS

const getErrorMessage = (statusCode) => {
  let message;
  switch (statusCode) {
    case 5:
      message = "User tidak dapat ditemukan";
      break;
    case 6:
      message = "Data yang sama sudah ada di dalam database";
      break;
    default:
      message = "Unknown Error";
      break;
  }

  return message;
};

router
  .route("/")
  .post(async (req, res) => {
    try {
      const data = req.body;
      await Users.add(data);
      res.status(201).send({
        success: true,
        message: "Data berhasil ditambah!",
      });
    } catch (e) {
      console.error(e);
      res.send({
        success: false,
        message: getErrorMessage(e?.code ?? 2),
      });
    }
  })
  .get(async (req, res) => {
    try {
      let users = await Users.get();
      const data = [];

      users.forEach((user) => {
        data.push({ id: user.id, ...user.data() });
      });

      return res.status(200).send({
        success: true,
        data,
      });
    } catch (e) {
      console.error(e);
      res.send({
        success: false,
        message: getErrorMessage(e?.code ?? 2),
      });
    }
  });

router
  .route("/:id")
  .put(async (req, res) => {
    try {
      const ID = req.params.id;
      const data = req.body;

      /* 
      No need to use this code because
      firestore will throw an error if the user is not found.
      
      let user = await Users.doc(ID).get();
      if (!user.exists) {
        return res.status(404).send({
          success: false,
          message: getErrorMessage(5),
        });

      } */

      await Users.doc(ID).update(data);
      res.status(200).send({ success: true, message: "Data berhasil diubah!" });
    } catch (e) {
      console.error(e);
      res.send({
        success: false,
        message: getErrorMessage(e?.code ?? 2),
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const ID = req.params.id;
      let userRef = Users.doc(ID);
      let user = await userRef.get();

      // Check if user exists
      if (!user.exists) {
        return res.status(404).send({
          success: false,
          message: getErrorMessage(5),
        });
      }

      await userRef.delete();

      return res.status(204).send();
    } catch (e) {
      console.error(e);
      res.send({
        success: false,
        message: getErrorMessage(e?.code ?? 2),
      });
    }
  });

module.exports = router;
