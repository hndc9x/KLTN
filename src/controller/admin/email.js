const nodemailer = require('nodemailer');

exports.sendEmail = (req,res) => {
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
        to : req.body.emails,
        subject : req.body.subject,
       // text : req.body.text
       html : `<h2>${req.body.title}</h2> <p>${req.body.content}</p>`
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
