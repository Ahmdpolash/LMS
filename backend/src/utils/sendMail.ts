// import nodemailer from "nodemailer";
// import config from "../config";

// export const sendEmail = async (to: string, html: string) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: config.node_env === "production", // true for port 465, false for other ports
//     auth: {
//       user: "ahmedpolash732@gmail.com",
//       pass: "fbra rbqc xkms jdck", //
//     },
//   });

//   await transporter.sendMail({
//     from: "ahmedpolash732@gmail.com", // sender address
//     to,
//     subject: "Elearning Activation Code !✔", // Subject line
//     text: " ", // plain text body
//     html,
//   });
// };

import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import config from "../config";

// export const sendEmail = async (
//   to: string,
//   name: string,
//   activationCode: string
// ) => {
//   // Template path
//   const templatePath = path.join(process.cwd(), "src/utils/mailTemplate.html");

//   // Read HTML file
//   let htmlTemplate = fs.readFileSync(templatePath, "utf8");

//   // Replace placeholders with actual data
//   htmlTemplate = htmlTemplate
//     .replace("{{name}}", name)
//     .replace("{{activationCode}}", activationCode);

//   // Create transporter
//   const transporter = nodemailer.createTransport({
//     host: config.emailSender.hostName,
//     port: 587,
//     secure: config.node_env === "production", // true for port 465, false for other ports
//     auth: {
//       user: config.emailSender.email,
//       pass: config.emailSender.app_password,
//     },
//   });

//   // Send mail
//   await transporter.sendMail({
//     from: '"LMS" <ahmedpolash732@gmail.com>',
//     to,
//     subject: "Activate Your LMS Account",
//     html: htmlTemplate,
//   });
// };

interface ISendEmailPayload {
  to: string;
  subject: string;
  templateName: string; // e.g. 'activation', 'replyNotification'
  replacements: { [key: string]: string }; // dynamic placeholders
}

export const sendEmail = async ({
  to,
  subject,
  templateName,
  replacements,
}: ISendEmailPayload) => {
  try {
    // Template path - dynamic template loader
    const templatePath = path.join(
      process.cwd(),
      `src/utils/emailTemplates/${templateName}.html`
    );

    // Read HTML file
    let htmlTemplate = fs.readFileSync(templatePath, "utf8");

    // Replace all placeholders dynamically
    for (const [key, value] of Object.entries(replacements)) {
      const placeholder = `{{${key}}}`;
      htmlTemplate = htmlTemplate.replace(new RegExp(placeholder, "g"), value);
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: config.emailSender.hostName,
      port: 587,
      secure: config.node_env === "production", // true for port 465, false otherwise
      auth: {
        user: config.emailSender.email,
        pass: config.emailSender.app_password,
      },
    });

    // Send mail
    await transporter.sendMail({
      from: `"LMS" <${config.emailSender.email}>`,
      to,
      subject,
      html: htmlTemplate,
    });

    console.log(`✅ Email sent successfully to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw new Error("Email sending failed");
  }
};
