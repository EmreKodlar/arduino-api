var express = require('express');
var mongoose = require('mongoose');
var Work = require('../models/workModels.js'); // bu oluşturduğumuz db için model

const router = express.Router();

// siralama isteği
router.get("/", async (req, res)=>{  
    Work.find()
    .then((Work)=> {
        res.json(Work);
    })
    .catch((err)=> {
            res.json(err);
        });
})

// id'ye göre iş getirme isteği
router.get("/:id", async (req, res)=>{  
    Work.findById(req.params.id)
    .then((Work)=> {
        res.json(Work);
    })
    .catch((err)=> {
            res.json(err);
        });
})

//  post (ekleme) isteği
router.post("/", async (req, res)=>{  
    try {  

     const { workname, workprice, workcustomer } = req.body;

     const createdWork = await Work.create({ // yeni work oluşturma
        workname,
        workprice,
        workcustomer
    })

    return res.status(201).json(createdWork);
 
    }
    catch (error) {
        console.log(error)
        return res.json({mesaj: "İş Oluşturulmadı!"})
    }

})

// update isteği
router.put("/:id", async (req, res)=>{  
    Work.findByIdAndUpdate(req.params.id,{
        workname: req.body.workname,
        workprice: req.body.workprice,
        workcustomer: req.body.workcustomer 
    })
    .then((Work)=> {
        res.json(Work);
    })
    .catch((err)=> {
            res.json(err);
        });
})

// silme isteği
router.delete("/:id", async (req, res)=>{  
    Work.findByIdAndDelete(req.params.id)
    .then((Work)=> {
        res.json(Work);
    })
    .catch((err)=> {
            res.json(err);
        });
})

module.exports = router;