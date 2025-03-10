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

export const sendEmail = async (
  to: string,
  name: string,
  activationCode: string
) => {
  // Template path
  const templatePath = path.join(process.cwd(), "src/utils/mailTemplate.html");

  // Read HTML file
  let htmlTemplate = fs.readFileSync(templatePath, "utf8");

  // Replace placeholders with actual data
  htmlTemplate = htmlTemplate
    .replace("{{name}}", name)
    .replace("{{activationCode}}", activationCode);

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.node_env === "production", // true for port 465, false for other ports

    auth: {
      user: "ahmedpolash732@gmail.com",
      pass: "fbra rbqc xkms jdck",
    },
  });

  // Send mail
  await transporter.sendMail({
    from: "ahmedpolash732@gmail.com",
    to,
    subject: "Activate Your LMS Account",
    html: htmlTemplate,
  });
};
