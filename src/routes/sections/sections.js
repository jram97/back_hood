const express = require("express");
const router = express.Router();
const Menu = require("../../models/menu");
const Section = require('../../models/secciones')
var mongoose = require('mongoose');
const { remove } = require("../../models/menu");

router.post("/ws/menu/:id/section/add", async (req, res) => {
    try {
        var section = {
            nombre : req.body.nombre,
            multiple: req.body.multiple,
            limitOptions : req.body.limitOptions,
            opciones : []
        }
        
        const newSection = new Section(section)
    
        await newSection.save()
        
        await Menu.findByIdAndUpdate(
            { _id : req.params.id },
            {
                $push : {
                    secciones : newSection.id
                }
            }
        )
        
        res.send({
            message : 'section added'
        })
    } catch (error) {
        res.send({
            error : error
        })
    }
    
});

router.post('/ws/section/:id/options/add', async(req, res)=>{
    try {
        var option = {
            opcion : req.body.option,
            precio : req.body.price,
            selected : false
        }

        const setOptionToSection = await Section.findOneAndUpdate(
            {
                _id : req.params.id
            },
            {
                $push : {
                    opciones : option
                }
            }
        )

        if(setOptionToSection){
            res.send({
                message : 'Option added to section succesfully'
            })
        }


    } catch (error) {
        res.send({
            error : error
        })
    }
})

module.exports = router