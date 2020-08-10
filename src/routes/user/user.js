const express = require("express");
const router = express.Router();
const Usuario = require("../../models/usuario");
const Comentario = require("../../models/comentario")

const { auth } = require("../../lib/utils");

router.get('/ws/user/all', async (req, res) => {
    try {
        switch (req.query.role) {
            case 'adm':
                res.status(200).json({
                    ok: true,
                    msg: "success",
                    data: await Usuario.find({ role: 'isAdmin' })
                });
                break;
            case 'ent':
                res.status(200).json({
                    ok: true,
                    msg: "success",
                    data: await Usuario.find({ role: 'isEnterprise' })
                });
                break;
            case 'cli':
                res.status(200).json({
                    ok: true,
                    msg: "success",
                    data: await Usuario.find({ role: 'isClient' })
                });
                break;
            case 'del':
                res.status(200).json({
                    ok: true,
                    msg: "success",
                    data: await Usuario.find({ role: 'isDelivery' })
                });
                break;

            default:
                res.status(200).json({
                    ok: true,
                    msg: "success",
                    data: await Usuario.find({})
                });
                break;
        }
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: error,
            data: []
        });
    }
});

router.put('/ws/user/comments', auth, async (req, res) => {
    try {

        const newComentario = new Comentario(req.body);
        newComentario.por_usuario = req.decoded.id;

        const comments = await newComentario.save();

        const user = await Usuario.findOne({ _id: req.body.para_usuario });

        const votes = parseInt(user.num_votes + 1);
        const tScore = parseInt(user.total_score + rating);
        const nRating =
            parseInt(user.total_score) / parseInt(user.num_votes);

        await Usuario.findByIdAndUpdate(user._id, {
            num_votes: votes,
            total_score: tScore,
            rating: nRating ? nRating : 0,
        });

        res.status(200).json({
            ok: true,
            msg: "success",
            data: comments
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: error,
            data: []
        });
    }
});

router.get("/ws/user/:id", async (req, res) => {
    const user = await Usuario.findOne({ _id: req.params.id })
    res.status(200).json({
        ok: true,
        msg: "success",
        data: user
    });
});

router.put("/ws/user/update", auth, async (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "User was update successfully",
        data: await Usuario.findByIdAndUpdate(req.body._id, { ...req.body })
    });
});

router.put("/ws/user/update/me", auth, async (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "User was update successfully",
        data: await Usuario.findByIdAndUpdate(req.decoded.id, { ...req.body })
    });
});

module.exports = router;