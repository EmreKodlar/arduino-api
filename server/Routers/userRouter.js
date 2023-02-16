var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt'); // bunu npm i bcrypt diye kurduk
var User = require('../models/userModels.js'); // bu oluşturduğumuz db için model

const router = express.Router();

// localhost:5000/users 'a yapılan post isteği
router.post("/signup", async (req, res)=>{ // bu /signup'a gelen post isteği (kayıt olma), postman ile deneyeceğiz
    try {
        //console.log(req.body)
        const { fullname, password, phoneNumber, email } = req.body; // bunlar model de oluşturulan ve kayıt edilecek field'lar
        
        const userExists = await User.findOne({ email }) // aynı email'den var mı kontrol ediyoruz.
        if(userExists)
            return res.status(400).json({ message: 'User already exists.'}) // zaten varsa eklemiyıoruz.

        const hashedPassword = await bcrypt.hash(password, 10) // password için hash'leme işlemi

        const createdUser = await User.create({ // yeni kullanıcı oluşturma
            fullname,
            email,
            password: hashedPassword, // hash'li
            phoneNumber
        })

        return res.status(201).json(createdUser);
    } catch (error) {
        console.log(error)
        return res.json({message: "create user failed"})
    }
})

// localhost:5000/users/signin POST request
router.post("/signin", async (req,res)=>{ // bu da giriş yapma isteği
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user)
            return res.status(400).json({message: "user does not exist"})
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect)
            return res.status(400).json({message: "Wrong Password"})
        
        return res.status(200).json({ user, message: 'Authentication successful' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})


// update isteği
router.put("/:id", async (req, res)=>{  

    const hashedPassword = await bcrypt.hash(req.body.password, 10) // password için hash'leme işlemi
    User.findByIdAndUpdate(req.params.id,{
        fullname: req.body.fullname,
        email: req.body.email,
        
        password:  hashedPassword,
        userType: req.body.userType,
        phoneNumber: req.body.phoneNumber,

    })
    .then((User)=> {
        res.json(User);
    })
    .catch((err)=> {
            res.json(err);
        });
})

// silme isteği
router.delete("/:id", async (req, res)=>{  
    User.findByIdAndDelete(req.params.id)
    .then((User)=> {
        res.json(User);
    })
    .catch((err)=> {
            res.json(err);
        });
})

// siralama isteği
router.get("/", async (req, res)=>{  
    User.find()
    .then((User)=> {
        res.json(User);
    })
    .catch((err)=> {
            res.json(err);
        });
})

// id'ye göre iş getirme isteği
router.get("/:id", async (req, res)=>{  
    User.findById(req.params.id)
    .then((User)=> {
        res.json(User);
    })
    .catch((err)=> {
            res.json(err);
        });
})

module.exports = router;