const express = require("express");
const router = express.Router();
const Menu = require("../../models/menu");
const Section = require('../../models/secciones')
var mongoose = require('mongoose');
const utils = require('../../lib/utils');

router.post("/ws/menu/section/add", async (req, res) => {
    try {
        var section = {
            nombre : req.body.nombre,
            multiple: req.body.multiple,
            limitOptions : req.body.limitOptions,
            opciones : []
        }
        
        const findMenu = await utils.findDocument(Menu, req.body.id)

        if(findMenu){
            
            const newSection = new Section(section)
    
            await newSection.save()
            
            await Menu.findByIdAndUpdate(
                { _id : req.body.id },
                {
                    $push : {
                        secciones : newSection.id
                    }
                }
            )
            
            res.send({
                message : 'section added'
            })
             
        }
        else{
            res.send({
                message : 'Menu not founded'
            })
        }
    } catch (error) {
        res.send({
            error : error
        })
    }
    
});

router.post('/ws/section/:id/options/add', async(req, res)=>{
    try {
        var option = {
            _id : mongoose.Types.ObjectId(),
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

router.delete('/ws/section/:id', async(req, res)=>{
    try {
        const findSection = utils.findDocument(Section, req.params.id)

        if(findSection){
            await Section.findOneAndRemove({
                _id : req.params.id
            })

            await Menu.findByIdAndUpdate(
                req.body.idMenu,
                {
                    $pull:{
                        secciones:req.params.id
                    }
                }
            )

            res.send({
                message : 'Section deleted succesfully!'
            })

            
        }
        else{
            res.send({
                message : 'Section didnt founded'
            })
        }
    } catch (error) {
        res.send({
            error : error
        })
    }
})

module.exports = router