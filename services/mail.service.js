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
  async sendMailActivationCode(toEmail, verification) {
    const link = `${config.get("apiUrl")}/api/users/verify/${verification}`;
    console.log("Recipient email:", toEmail);
    await this.transporter.sendMail({
      from: config.get("smtpUser"),
      to: toEmail,
      subject: "MALE FASHION akkauntini faollashtirish",
      text: "",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px; text-align: center;">
      <h2 style="color: #333; margin-bottom: 20px;">Akkauntni faollashtirish uchun quyidagi linkni bosing</h2>
      <a href="${link}" style="display: inline-block; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 15px;">FAOLLASHTIRISH</a>
    </div>
        `,
    });
  }
}

module.exports = new MailService();

// FOYDALANISH
// const mailService = require("../services/mail.service");

// await mailService.sendMailActivationCode(value.author_email, link);
