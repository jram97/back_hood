const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const key = require("../../keys");
const Usuario = require("../../models/usuario");

/** AUTH INICIO */
/** registrar */
router.post("/ws/auth/register", async (req, res) => {
  if (req.body.contrasenia == req.body.r_contrasenia) {
    const exist = await Usuario.findOne({ correo: req.body.correo });
    if (!exist) {
      const nuevaData = new Usuario(req.body);
      nuevaData.foto = `https://ui-avatars.com/api/?name=${req.body.nombre}`;
      nuevaData.contrasenia = await nuevaData.encryptPassword(
        req.body.contrasenia
      );
      res.status(200).json({
        ok: true,
        msg: "success",
        data: await nuevaData.save()
      });
    } else {
      res.status(400).json({
        ok: false,
        msg: "This users is already saved",
        data: []
      });
    }
  } else {
    res.status(400).json({
      ok: false,
      msg: "Password is not same",
      data: []
    });
  }
});

/** login */
router.post("/ws/auth", async (req, res) => {
  const { email, pass } = req.body;
  if (email && pass) {
    const userDB = await Usuario.findOne({ correo: email });
    if (!userDB) {
      res.status(400).json({
        ok: false,
        msg: "User not found",
        data: []
      });
    } else {
      const match = await userDB.matchPassword(pass);
      if (match) {
        const payload = {
          username: userDB.usuario,
          id: userDB._id,
          check: true,
        };
        const token = jwt.sign(payload, key.llave, {
          expiresIn: '4h',
        });
        res.status(200).json({
          ok: true,
          msg: "success",
          data: userDB,
          token: token
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: "User or password are wrong",
          data: []
        });
      }
    }
  } else {
    res.status(403).json({
      ok: false,
      msg: "Fields empty",
      data: []
    });
  }
});

module.exports = router;