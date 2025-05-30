import nodemailer from "nodemailer"

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendTimeCapsuleEmail(to: string, title: string, message: string, createdDate: string) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Time Capsule Has Arrived!</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .logo { font-size: 24px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">⏰ TimeCapsule</div>
          <h1>Your Time Capsule Has Arrived!</h1>
          <p>A message from your past self</p>
        </div>
        <div class="content">
          <h2>${title}</h2>
          <div class="message-box">
            <p><strong>Your message:</strong></p>
            <p style="font-style: italic; font-size: 16px;">"${message}"</p>
          </div>
          <p><strong>Created on:</strong> ${new Date(createdDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
          <p><strong>Delivered on:</strong> ${new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
          <div class="footer">
            <p>This time capsule was delivered by TimeCapsule</p>
            <p>Create more memories at <a href="https://${process.env.NEXT_PUBLIC_APP_URL}">TimeCapsule</a></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: `"TimeCapsule" <${process.env.SMTP_USER}>`,
    to,
    subject: `📬 Your Time Capsule: "${title}"`,
    html: htmlContent,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Time capsule email sent to ${to}`)
    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error }
  }
}
