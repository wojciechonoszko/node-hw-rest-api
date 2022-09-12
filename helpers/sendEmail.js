const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) =>{
    const msg = {
        ...data,
        // to: ["wojciechonoszko@gmail.com"],
    
        // replyTo: "wojciechonoszko+replyTo@gmail.com",
    
        from: "wojciechonoszko@gmail.com",
        // cc: "wojciechonoszko@gmail.com",
        // bcc: "wojciechonoszko@gmail.com",
        // subject: "Sending with SendGrid",
        // text: "https://google.com - link do google",
        // html: "<b><a href='https://google.com'>Link do google</a></b>",
    };
    await sgMail.send(msg);
    return true;
}

module.exports = { sendEmail };
