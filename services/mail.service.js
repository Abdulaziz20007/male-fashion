const nodemailer = require("nodemailer");
const config = require("config");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "mail",
      host: config.get("smtpHost"),
      port: config.get("smtpPort"),
      secure: true,
      auth: {
        user: config.get("smtpUser"),
        pass: config.get("smtpPassword"),
      },
    });
  }
  async sendMailActivationCode(toEmail, link) {
    console.log("Recipient email:", toEmail);
    await this.transporter.sendMail({
      from: config.get("smtpUser"),
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
