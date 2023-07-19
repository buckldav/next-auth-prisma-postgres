import { createTransport } from "nodemailer";

export async function sendMail(
  to: string,
  from: string,
  subject: string,
  text: string,
  html: string
) {
  const transport = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    from,
  });

  transport.verify(function (error, success) {
    if (error) {
      throw error;
    } else {
      console.log("Server is ready to take our messages");
      transport
        .sendMail({
          to,
          from,
          subject,
          text,
          html,
        })
        .then((result) => {
          console.log(result);
        });
    }
  });
}
