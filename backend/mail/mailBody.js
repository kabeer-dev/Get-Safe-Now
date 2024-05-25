

let OTPcode = Math.floor(1000 + Math.random() * 9000);

let mailSubject = "Mail Varification";
       
let content = '<p>Hay Please Verify your email Address. Your One Time Password is: <h2>' +OTPcode+'</h2>';

module.exports = {OTPcode, mailSubject, content}