const nodeMailer = require('nodemailer');
const {SMTP_MAIL, SMTP_PASS} = process.env;


const sendMail = async (email, mailSubject, content)=>{

    try {
        const transport= nodeMailer.createTransport ({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            requireTLS: true,
            auth: {
                user: SMTP_MAIL,
                pass: SMTP_PASS
            },
          
        })

        const mailOptions = {
            form: SMTP_MAIL,
            to: email,
            subject: mailSubject,
            html: content  
        }

      
        transport.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log("Mail send Successfully", info.response);
            }
        })

    } catch (error) {
        console.log(error.message);
    }
}


module.exports = sendMail;