const express = require("express");
const router = express.Router();
const Direccion = require("../../models/direccion");

const { auth } = require("../../lib/utils");

router.post("/ws/direction/new", auth, async (req, res) => {
    const direccion = new Direccion(req.body);
    direccion.usuario = req.decoded.id
    res.status(200).json({
        ok: true,
        msg: "success",
        data: await direccion.save()
    });
});

router.get("/ws/direction/user", auth, async (req, res) => {
    const nuevaData = await Direccion.find({ usuario: req.decoded.id });
    res.status(200).json({
        ok: true,
        msg: "success",
        data: nuevaData
    });
});

router.put("/ws/direction/update/:id", auth, async (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "Direction updated successfully",
        data: await Direccion.findOneAndUpdate(req.params.id, { ...req.body })
    });
});

router.delete("/ws/direction/delete/:id", auth, async (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "Delete successfully",
        data: await Direccion.findOneAndDelete(req.params.id)
    });
});

module.exports = router;