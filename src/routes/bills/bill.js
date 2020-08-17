const express = require("express");
const router = express.Router();
const Factura = require("../../models/factura");

const { auth } = require("../../lib/utils");
//crear una factura
router.post("/ws/bills/new", auth, async (req, res) => {
    
    const bill = new Factura(req.body)
    await bill.save()

    res.send({
        'message':'factura realizada'
    })

});
//obtener todas las facturas
router.get("/ws/bills/all", async (req, res) => {
    const nuevaData = await Factura.find({}).populate({
        path:'detalle.platillo',
        select:'nombre'
    }).populate({
        path:'detalle.secciones.section',
        select:'nombre'
    })

    
    
    res.status(200).json({
        ok: true,
        msg: "success",
        data: nuevaData
    });
});
//obtener una factura
router.get("/ws/bills/:id", async (req, res) => {

    var populateBill = [
        {
            path:'usuario',
            select:'nombre'
        },
        {
            path:'empresa',
            select:'nombre'
        },
        {
            path:'detalle.platillo',
            select:'nombre'
        },
        {
            path:'detalle.secciones.section',
            select:'nombre'
        }

    ]
    const nuevaData = await Factura.findOne({ _id: req.params.id }).populate(populateBill)
    res.status(200).json({
        ok: true,
        msg: "success",
        data: nuevaData
    });
});

router.get("/ws/bills/user/me", auth, async (req, res) => {
    const nuevaData = await Factura.find({ usuario: req.decoded.id })
        .populate('usuario', 'nombre usuario foto correo')
        .populate('detalle');
    res.status(200).json({
        ok: true,
        msg: "success",
        data: nuevaData
    });
});

router.delete("/ws/bills/delete/:id", async (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "Delete successfully",
        data: await Factura.findOneAndDelete(req.params.id)
    });
});

router.put("/ws/bills/update/:id", async (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "Order was update successfully",
        data: await Factura.findByIdAndUpdate(req.params.id, { ...req.body })
    });
});

module.exports = router;
