var express = require('express');
var mongoose = require('mongoose');
var Degerler = require('../models/degerlerModels.js'); // bu oluşturduğumuz db için model

const router = express.Router();

//not: index.js içerisinde 
//var degerlerRouter = require('./Routers/degerlerRouter.js'); //ve
//app.use("/degerler", degerlerRouter); //eklemen lazım

//-----------getir---------------
 
router.get("/", async (req, res)=>{  
    Degerler.find()
    .then((Degerler)=> {
        res.json(Degerler);
    })
    .catch((err)=> {
            res.json(err);
        });
})

// id'ye göre iş getirme isteği
router.get("/:id", async (req, res)=>{  
    Degerler.findById(req.params.id)
    .then((Degerler)=> {
        res.json(Degerler);
    })
    .catch((err)=> {
            res.json(err);
        });
})

//-----------ekle---------------
 
router.post("/", async (req, res)=>{  
    try {  

     const { userid, karbonMonoksit, metan, propan, butan, havaTemiz } = req.body;

     const createdDeger = await Degerler.create({ // yeni deger oluşturma
        userid, karbonMonoksit, metan, propan, butan, havaTemiz
    })

    return res.status(201).json(createdDeger);
 
    }
    catch (error) {
        console.log(error)
        return res.json({mesaj: "Değer Oluşturulmadı!"})
    }

})
// update isteği
router.put("/:id", async (req, res)=>{  
    Degerler.findByIdAndUpdate(req.params.id,{
        userid: req.body.userid,
        karbonMonoksit: req.body.karbonMonoksit,
        metan: req.body.metan,
        propan: req.body.userid,
        butan: req.body.karbonMonoksit,
        havaTemiz: req.body.metan

    })
    .then((Degerler)=> {
        res.json(Degerler);
    })
    .catch((err)=> {
            res.json(err);
        });
})

// silme isteği
router.delete("/:id", async (req, res)=>{  
    Degerler.findByIdAndDelete(req.params.id)
    .then((Degerler)=> {
        res.json(Degerler);
    })
    .catch((err)=> {
            res.json(err);
        });
})

 

module.exports = router;