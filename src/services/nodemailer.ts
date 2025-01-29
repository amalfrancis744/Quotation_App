import * as nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_KEY
    }
  })

  /**
 * message template
 */
export const sendEmail = async (msg: any) => {
    try {
      const info = await transporter.sendMail(msg)
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  export const forgetPasswordMail = async (
    link: string,
    toEmail: string,
  ) => {
    const msg = {
      from: 'support@subtraid.com',
      subject: 'Reset password',
      to: toEmail,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dcdcdc; border-radius: 10px;">
      <p style="font-size: 16px; color: #333;">Dear Sir/Madam,</p>
      <p style="font-size: 16px; color: #333;">We have received a request to reset your password. Please click on the following link to reset your password:</p>
      <p style="text-align: center;">
        <a href="${link}" style="display: inline-block; background-color: rgb(17, 70, 132); color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Password</a>
      </p>
      <p style="font-size: 16px; color: #333;">This link will expire in 10 minitues.</p>
      <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
      <p style="font-size: 16px; color: #333;">This is an auto-generated email, for help email us at <a href="mailto:support@gmail.com" style="color: rgb(17, 70, 132); text-decoration: none;">support@gmail.com</a></p>
      <p style="font-size: 16px; color: #333;">Thank you,</p>
      <p style="font-size: 16px; color: #333;">Support Team</p>
      <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
        <p>© 2024 All rights reserved.</p>
      </div>
    </div>`
    }
  
    await sendEmail(msg)
  }
  


