const sgMail = require("@sendgrid/mail");

require("dotenv").config();

sgMail.setApiKey(process.env.SEND_GRID_PASSWORD);

const msg = {
    to: ["wojciechonoszko@gmail.com"],

    replyTo: "wojciechonoszko+replyTo@gmail.com"

    from:
}