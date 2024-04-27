import nodemailer from 'nodemailer';
import generateErrorsUtils from "./generateErrorsUtils.js";

const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS} = process.env;

const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
    }
});

const sendMailUtils = async (email, subject, body) => {
        const mailOptions = {from: SMTP_USER, to: email, subject: subject, html: body};
        transport.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                throw generateErrorsUtils('Error al enviar el email!', 500);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
}

export default sendMailUtils;