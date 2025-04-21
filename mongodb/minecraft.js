const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    _id: {type: mongoose.Types.ObjectId, required:true},
    name: {type:String, required:true},
    acc: {type:Array, required:true}
});

module.exports = mongoose.model("minecraft", productSchema);