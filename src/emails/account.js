const MY_EMAIL = 'akshit_sahani@hotmail.com';

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = ({email, name}) => {
  sgMail.send({
    to: email,
    from: MY_EMAIL,
    subject: 'Welcome to the Task App',
    text: `Hello ${name}! welcome!`
  });
}

const sendGoodbyeEmail = ({email, name}) => {
  sgMail.send({
    to: email,
    from: MY_EMAIL,
    subject: 'Sorry to see you go!',
    text: `Goodbye ${name}! What could we have done to retain you as a customer?`
  });
}

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail,
};