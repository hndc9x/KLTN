const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    id:{
        type:String
    },
    sku:{
        type:String,
        default:"masku"
    },
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    slug: { 
        type: String, 
        required: true, 
        unique: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    discount:{
        type:Number,
        required:true
    },
    offerEnd:{
        type : String,
        default : "2020"
    },
    new : {
        type : Boolean,
        default : true
    },
    saleCount: {
        type: Number,
        required: true
    },
    category:[
    ],
    tag:[],
    image: [],
    
    stock:{
        type: String
    },
    // productPictures: [
    //     { img: { type: String } }
    // ],
    shortDescription :{
        type: String,
        required: true,
        trim: true
    },
    fullDescription: {
        type: String,
        required: true,
        trim: true
    },
    //category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: Date,

}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);