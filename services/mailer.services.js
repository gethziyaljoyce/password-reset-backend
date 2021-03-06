const mailer = require("nodemailer");

//mail transporting
const send_mail = async (email, subject, content) => {
    let transporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAILER_USERNAME,
            pass: process.env.MAILER_PASSWORD,
        },
    });

    //developer mail detail
    let mailOptions = {
        from: "jc.getjoy@gmail",
        to: email,
        subject: subject,
        text: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error in sending mail:", error);
        } else {
            console.log("Email successfully sent:", info.response);
        }
    });
};

module.exports = send_mail;
