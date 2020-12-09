const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors');


//route
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initalDataRoutes = require('./routes/admin/initialData');


// cài đặt môi trường env
env.config();

// kết nối mongodb
// mongodb+srv://myMongoDBUser:<password>@cluster0.4cscp.mongodb.net/<dbname>?retryWrites=true&w=majority
//mongo
//const mongoose = require('mongoose')
const connectDB = async()=>{
    const connection = await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify : false,
        useUnifiedTopology:true
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`)

}
connectDB() 

app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',initalDataRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`Server is running is port ${process.env.PORT}`);
});