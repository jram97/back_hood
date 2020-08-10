const express = require("express");
const router = express.Router();
const Comments = require("../../models/comentario");

const { auth } = require("../../lib/utils");

router.get("/ws/comments/all", async (req, res) => {
    const nuevaData = await Comments.find({}).populate('por_usuario', 'nombre usuario foto correo').populate('para_usuario', 'nombre usuario foto correo');
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

router.get("/ws/comments/:id", async (req, res) => {
    const nuevaData = await Comments.findOne({ _id: req.params.id }).populate('por_usuario', 'nombre usuario foto correo').populate('para_usuario', 'nombre usuario foto correo');
    res.status(200).json({
        ok: true,
        msg: "success",
        data: nuevaData
    });
});

router.get("/ws/comments/user/:id", async (req, res) => {
    const nuevaData = await Comments.find({ "para_usuario._id": req.params.id }).populate('por_usuario', 'nombre usuario foto correo').populate('para_usuario', 'nombre usuario foto correo');
    res.status(200).json({
        ok: true,
        msg: "success",
        data: nuevaData
    });

});

router.get("/ws/comments/menu/:id", async (req, res) => {
    const nuevaData = await Comments.find({ "para_menu._id": req.params.id }).populate('por_usuario', 'nombre usuario foto correo').populate('para_menu');
    res.status(200).json({
        ok: true,
        msg: "success",
        data: nuevaData
    });

});


router.get("/ws/comments/user/me", auth, async (req, res) => {
    const nuevaData = await Comments.find({ "por_usuario._id": req.decoded.id }).populate('por_usuario', 'nombre usuario foto correo').populate('para_usuario', 'nombre usuario foto correo');
    res.status(200).json({
        ok: true,
        msg: "success",
        data: nuevaData
    });
});

router.delete("/ws/comments/delete/:id", auth, async (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "Delete successfully",
        data: await Comments.findOneAndDelete(req.params.id)
    });
});

module.exports = router;
