const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// cài đặt môi trường env
env.config();

// kết nối mongodb


app.use(bodyParser());
app.get('/',(rep,res,next)=>{
    res.status(200).json({
        message : 'Backend của vợ chồng Châu Nhàn'
    });
});

app.post('/data',(rep,res,next)=>{
    res.status(200).json({
        message: rep.body
    });
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running is port ${process.env.PORT}`);
});