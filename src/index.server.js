const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


//route
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');


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

app.use(bodyParser());
app.use('/api',authRoutes);
app.use('/api',adminRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`Server is running is port ${process.env.PORT}`);
});