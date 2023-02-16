var express = require('express');
var mongoose = require('mongoose');
var Odeme = require('../models/odemeModels.js'); // bu oluşturduğumuz db için model

const router = express.Router();

// siralama isteği
router.get("/", async (req, res)=>{  
    Odeme.find()
    .then((Odeme)=> {
        res.json(Odeme);
    })
    .catch((err)=> {
            res.json(err);
        });
})

// id'ye göre iş getirme isteği
router.get("/:id", async (req, res)=>{  
    Odeme.findById(req.params.id)
    .then((Odeme)=> {
        res.json(Odeme);
    })
    .catch((err)=> {
            res.json(err);
        });
})

//  post (ekleme) isteği
router.post("/", async (req, res)=>{  
    try {  

     const {  odemeBaslik, odemeMiktar, odemeUserID, odemeDate  } = req.body;

     const createdOdeme= await Odeme.create({ // yeni ödeme oluşturma
        odemeBaslik,
        odemeMiktar,
        odemeUserID,
        odemeDate 
    })

    return res.status(201).json(createdOdeme);
 
    }
    catch (error) {
        console.log(error)
        return res.json({mesaj: "Ödeme Oluşturulmadı!"})
    }

})

// update isteği
router.put("/:id", async (req, res)=>{  
    Odeme.findByIdAndUpdate(req.params.id,{
        
        odemeBaslik: req.body.odemeBaslik,
        odemeMiktar: req.body.odemeMiktar,
        odemeUserID: req.body.odemeUserID,
        odemeDate: req.body.odemeDate
    })
    .then((Odeme)=> {
        res.json(Odeme);
    })
    .catch((err)=> {
            res.json(err);
        });
})

// silme isteği
router.delete("/:id", async (req, res)=>{  
    Odeme.findByIdAndDelete(req.params.id)
    .then((Odeme)=> {
        res.json(Odeme);
    })
    .catch((err)=> {
            res.json(err);
        });
})

module.exports = router;