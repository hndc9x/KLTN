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
const pageRoutes = require('./routes/admin/page');
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const adminOrderRoute = require("./routes/admin/order.routes");
const adminSendEmail = require("./routes/admin/email");

// cài đặt môi trường env
env.config();

// kết nối mongodb
// mongodb+srv://root:<password>@cluster0.e5qsb.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_DB_USER}:${process.env.MONGODB_DB_PASS}@cluster0.e5qsb.mongodb.net/${process.env.MONGODB_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
).then(() => {
    console.log('MongoDB Connected');
});


//const mongoose = require('mongoose')
// const connectDB = async()=>{
//     const connection = await mongoose.connect(process.env.MONGO_URL,{
//         useNewUrlParser:true,
//         useCreateIndex:true,
//         useFindAndModify : false,
//         useUnifiedTopology:true
//     });
//     console.log(`MongoDB Connected: ${connection.connection.host}`)

// }
// connectDB() 

app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',initalDataRoutes);
app.use('/api',pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoute);
app.use("/api", adminSendEmail);


app.listen(process.env.PORT,()=>{
    console.log(`Server is running is port ${process.env.PORT}`);
});