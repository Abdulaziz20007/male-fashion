const nodemailer = require("nodemailer");
const config = require("config");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "mail",
      host: config.get("smtp_host"),
      port: config.get("smtp_port"),
      secure: true,
      auth: {
        user: config.get("smtp_user"),
        pass: config.get("smtp_password"),
      },
    });
  }
  async sendMailActivationCode(toEmail, link) {
    console.log("Recipient email:", toEmail);
    await this.transporter.sendMail({
      from: config.get("smtp_user"),
      to: toEmail,
      subject: "ITINFO akkauntini faollashtirish",
      text: "",
      html: `
    <div>
      <h2>Akkauntni faollashtirish uchun quyidagi linkni bosing</h2>
      <a href="${link}">FAOLLASHTIRISH</a>
    </div>
        `,
    });
  }
}

module.exports = new MailService();

// FOYDALANISH
// const mailService = require("../services/mail.service");

// await mailService.sendMailActivationCode(value.author_email, link);
