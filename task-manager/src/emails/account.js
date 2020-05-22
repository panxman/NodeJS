const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "your@email.com",
        subject: "Thanks for joining in",
        text: `Dear ${name}, welcome to the Task Manager App!`,
    });
};

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "your@email.com",
        subject: "Account Cancelation",
        text: `Dear ${name}, we are sorry to see you leave us. We would love to hear back from you!`,
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
};