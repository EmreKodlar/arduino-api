var mongoose = require('mongoose');

const workSchema = mongoose.Schema({
     
    workname: {
        type: String,
        required: true
    },
    workprice: {
        type: String,
        required: true
    },
    workcustomer: {
        type: String,
        required: true
    },
    workDate: {
        type: Date,
        default: Date.now
    },
    workState: {
        type: String, 
        default: 'Kayıt'
    },
})

module.exports = mongoose.model('Work', workSchema)
 