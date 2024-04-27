import nodemailer from 'nodemailer';
import generateErrorsUtils from "./generateErrorsUtils.js";

const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS} = process.env;

const transport = nodemailer.createTransport({
    service: SMTP_HOST,
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
    }
});

const sendMailUtils = async (email, subject, body) => {
    try {
        const mailOptions = {from: SMTP_USER, to: email, subject: subject, html: body};
        const info = await transport.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }catch(error) {
        console.log(error);
        throw generateErrorsUtils('Error al enviar el email!', 500);
    }
}

export default sendMailUtils;