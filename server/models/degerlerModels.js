var mongoose = require('mongoose');

const degerSchema=mongoose.Schema
({
    userid:{type:String, required:true},
    degerDate:{type:Date, default:Date.now},
    karbonMonoksit:{type:String},
    metan:{type:String},
    propan:{type:String},
    butan:{type:String},
    havaTemiz:{type:String}


})

module.exports = mongoose.model('Degerler',degerSchema)
 