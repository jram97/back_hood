const express = require("express");
const router = express.Router();
const Menu = require("../../models/menu");
const Seccion = require("../../models/secciones");
const Comentario = require("../../models/comentario");
var mongoose = require('mongoose');


const { auth } = require("../../lib/utils");


router.post("/ws/menu/new", auth, async (req, res) => {
    const newMenu = new Menu(req.body);
    newMenu.usuario = req.decoded.id;

    res.status(200).json({
        ok: true,
        msg: "success",
        data: await newMenu.save()
    });
});

router.put("/ws/menu/:id/update/sections", auth, async (req, res) => {
    
    var ingredient = {
        _id : mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        selected : false
    }

    const setIngredient = await Menu.findOneAndUpdate(
        { _id : req.params.id },
        {
            $push : {
                ingredientes : ingredient
            }
        }
    )

    if(setIngredient.id){
        res.status(200).json({
            message : 'Ingredient was added',
            ingredient : ingredient
        })
    }
    else{
        res.json({
            message : 'Ingredient didnt added',
            status:false
        })
    }
})

router.delete('/ws/menu/:id/clear/sections', auth, async(req, res)=>{
    
    var sections = []
    //get id's 

    const menuSections = await Menu.findById(req.params.id)
    
    sections = menuSections.secciones
    
    Seccion.deleteMany({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
        }
    );

    await Menu.findByIdAndUpdate(
        { _id : req.params.id },
        {
            $set : {
                secciones : []
            }
        }
    )

    console.log(Seccion.length)
    
    
    
    
})

router.get("/ws/restaurant/:id/menu/all", async (req, res) => {
    const nuevaData = await Menu.find({'usuario' : req.params.id}).populate('usuario secciones').sort('createAt');
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

router.get("/ws/menu/:id", async (req, res) => {
    const nuevaData = await Menu.findOne({ _id: req.params.id });
    res.status(200).json({
        ok: true,
        msg: "success",
        data: nuevaData
    });
});

router.get("/ws/menu/user/me", auth, async (req, res) => {
    const nuevaData = await Menu.find({ usuario: req.decoded.id }).populate('usuario', 'nombre usuario foto correo');
    res.status(200).json({
        ok: true,
        msg: "success",
        data: nuevaData
    });
});

router.get("/ws/menu/user/:id", async (req, res) => {
    const nuevaData = await Menu.find({ usuario: req.params.id }).populate('usuario', 'nombre usuario foto correo');
    res.status(200).json({
        ok: true,
        msg: "success",
        data: nuevaData
    });
});

router.delete("/ws/menu/delete/:id", auth, async (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "Delete successfully",
        data: await Menu.findOneAndDelete(req.params.id)
    });
});

router.put("/ws/menu/update/:id", async (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "Menu was update successfully",
        data: await Menu.findByIdAndUpdate(req.params.id, { ...req.body })
    });
});

router.put('/ws/menu/comments', auth, async (req, res) => {
    try {
        const newComentario = new Comentario(req.body);
        newComentario.por_usuario = req.decoded.id;

        const comments = await newComentario.save();

        const menu = await Menu.findOne({ _id: req.body.para_menu });

        const votes = parseInt(menu.num_votes + 1);
        const tScore = parseInt(menu.total_score + req.body.rating);
        const nRating =
            parseInt(menu.total_score) / parseInt(menu.num_votes);

        await Menu.findByIdAndUpdate(menu._id, {
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

module.exports = router;
