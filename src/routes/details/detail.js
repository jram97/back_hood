const express = require("express");
const router = express.Router();
const Detalle = require("../../models/detalle");

const { auth } = require("../../lib/utils");

router.post("/ws/details/new", auth, async (req, res) => {
    const detail = new Detalle(req.body);
    detail.usuario = req.decoded.id;
    res.status(200).json({
        ok: true,
        msg: "success",
        data: await detail.save()
    });
});

router.get("/ws/details/all", async (req, res) => {
    const nuevaData = await Detalle.find({})
        .populate('usuario', 'nombre usuario foto correo')
        .populate('empresa', 'nombre usuario foto correo')
        .populate('direccion')
        .populate('menu', 'nombre descripcion precio');

    if (nuevaData.length) {
        res.status(200).json({
            ok: true,
            msg: "success",
            data: nuevaData
        });
    } else {
        res.status(404).json({
            ok: false,
            msg: "Data empty",
            data: []
        });
    }
});

router.get("/ws/details/:id", async (req, res) => {
    const nuevaData = await Detalle.findOne({ _id: req.params.id }).populate('usuario').populate('empresa').populate('menu');
    res.status(200).json({
        ok: true,
        msg: "success",
        data: nuevaData
    });
});

router.get("/ws/details/user/me", auth, async (req, res) => {
    const nuevaData = await Detalle.find({ usuario: req.decoded.id })
        .populate('usuario', 'nombre usuario foto correo')
        .populate('empresa', 'nombre usuario foto correo num_votes total_score rating')
        .populate('direccion')
        .populate('menu');
    res.status(200).json({
        ok: true,
        msg: "success",
        data: nuevaData
    });
});

router.delete("/ws/details/delete/:id", async (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "Delete successfully",
        data: await Detalle.findOneAndDelete(req.params.id)
    });
});

router.put("/ws/details/update/:id", async (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "Order was update successfully",
        data: await Detalle.findByIdAndUpdate(req.params.id, { ...req.body })
    });
});

module.exports = router;
