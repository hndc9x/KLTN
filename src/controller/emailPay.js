const nodemailer = require('nodemailer');

exports.sendEmailPay = (req,res) => {
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth:{
            user : process.env.EMAIL,
            pass : process.env.PASS
        }
    });
   // console.log(`email list = ${jsonObject["emails"]}`);
    const mailOption = {
        from : process.env.EMAIL,
        to : req.body.email,
        subject : "Thanh Toán Thành Công",
        //text : req.body.text
        html : `<h2>Cảm ơn đã tin tưởng vào shop chúng tôi</h2> 
        <p>Chúc mừng bạn đã thành toán thành công</p>
        <p>Thông tin hóa đơn</p>
        <p>Mã hóa đơn: ${req.body.id}</p>
        <p>Tên Khách Hàng: ${req.body.name}</p>
        <p>Địa chỉ email: ${req.body.email}</p>
        <p>Địa chỉ: ${req.body.address} </p>
        <p>Loại thanh toán : ${req.body.card} </p>
        <p>Loại thẻ: ${req.body.brand}</p>`
    };
    transporter.sendMail(mailOption,(error , info) => {
        if (error) {
            console.log(error);
            return res.status(400).json({
                message : error
            });
        }else{
            return res.status(200).json({
                message: "Email sent" + info.response
              });
        }
    });
}

exports.sendEmailOrder = (req,res) => {
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth:{
            user : process.env.EMAIL,
            pass : process.env.PASS
        }
    });
   // console.log(`email list = ${jsonObject["emails"]}`);
    const mailOption = {
        from : process.env.EMAIL,
        to : req.body.email,
        subject : "Đặt Hàng Thành Công",
        //text : req.body.text
        html : `<h2>Cảm ơn đã tin tưởng vào shop chúng tôi</h2> 
        <p>Chúc mừng bạn đã đặt hàng thành công</p>
        <p>Thông tin hóa đơn</p>
        <p>Mã hóa đơn: ${req.body.orderid}</p>
        <p>Tên Khách Hàng: ${req.body.name}</p>
        <p>Địa chỉ email: ${req.body.email}</p>
        <p>Địa chỉ: ${req.body.address} </p>
        <p>Tổng Tiền: ${req.body.total}</p>
        <p>Loại thanh toán : COD </p>`
    };
    transporter.sendMail(mailOption,(error , info) => {
        if (error) {
            console.log(error);
            return res.status(400).json({
                message : error
            });
        }else{
            return res.status(200).json({
                message: "Email sent" + info.response
              });
        }
    });
}

