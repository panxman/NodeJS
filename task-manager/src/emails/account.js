const sgMail = require("@sendgrid/mail");

const sendgridApiKey = "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";

sgMail.setApiKey(sendgridApiKey);

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