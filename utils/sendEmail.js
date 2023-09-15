const { createTransport } = require('nodemailer');

const resetPasswordMail = async (name, email, resetToken) => {
  try {
    const transporter = createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: process.env.emailUser,
        pass: process.env.emailPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: process.env.emailUser,
      to: email,
      subject: 'For reset password',
      html: `Hii ${name}, Click the following link to reset your password: <a href="http://localhost:5000/verify-reset-password/${resetToken} "target=_blank> Click Here </a> and reset your password `,
    };
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error(err.message);
        return 0;
      }
      transporter.close();
      return 0;
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = resetPasswordMail;
