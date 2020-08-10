const express = require("express");
const router = express.Router();
const Favorite = require("../../models/favorito");

const { auth } = require("../../lib/utils");

router.post("/ws/favorite/new", auth, async (req, res) => {
    const favorite = new Favorite(req.body);
    favorite.usuario = req.decoded.id
    res.status(200).json({
        ok: true,
        msg: "success",
        data: await favorite.save()
    });
});

router.get("/ws/favorite/all", async (req, res) => {
    const nuevaData = await Favorite.find({}).populate('usuario', 'nombre, usuario, foto, correo').populate('menu', 'nombre');
    if(nuevaData.length){
        res.status(200).json({
            ok: true,
            msg: "success",
            data: nuevaData
        });
    }else {
        res.status(404).json({
            ok: false,
            msg: "Data empty",
            data: []
        });
    }
});

router.get("/ws/favorite/:id", async (req, res) => {
    const nuevaData = await Favorite.findOne({ _id: req.params.id }).populate('usuario', 'nombre, usuario, foto, correo').populate('menu', 'nombre');
    if(nuevaData.length){
        res.status(200).json({
            ok: true,
            msg: "success",
            data: nuevaData
        });
    }else {
        res.status(404).json({
            ok: false,
            msg: "Data empty",
            data: []
        });
    }
});

router.get("/ws/favorite/user", auth, async (req, res) => {
    const nuevaData = await Comments.find({ usuario: req.decoded.id }).populate('usuario', 'nombre usuario foto correo').populate('menu', 'nombre');
    if(nuevaData.length){
        res.status(200).json({
            ok: true,
            msg: "success",
            data: nuevaData
        });
    }else {
        res.status(404).json({
            ok: false,
            msg: "Data empty",
            data: []
        });
    }
});

router.delete("/ws/favorite/delete/:id", async (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "Delete successfully",
        data: await Favorite.findOneAndDelete(req.params.id)
    });
});

module.exports = router;