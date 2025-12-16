import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendMail(to: string, subject: string, html: string) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"JobBoard" <noreply@jobboard.com>',
      to,
      subject,
      html,
    });
    console.log("✅ Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("❌ Email error:", error);
    return { success: false, error: error.message };
  }
}

// Email Templates
export const emailTemplates = {
  welcome: (name: string, role: string) => `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 10px;">
        <h1 style="color: #8b5cf6;">🎉 Welcome to JobBoard!</h1>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for joining us as a <strong>${role}</strong>!</p>
        <p>Get started by completing your profile and exploring opportunities.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
           style="display: inline-block; padding: 12px 30px; background: #8b5cf6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Go to Dashboard →
        </a>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          © 2024 JobBoard. All rights reserved.
        </p>
      </div>
    </body>
    </html>
  `,

  passwordReset: (name: string, resetLink: string) => `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 10px;">
        <h1 style="color: #8b5cf6;">🔑 Password Reset Request</h1>
        <p>Hi <strong>${name}</strong>,</p>
        <p>You requested to reset your password. Click the button below:</p>
        <a href="${resetLink}" 
           style="display: inline-block; padding: 12px 30px; background: #8b5cf6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Reset Password
        </a>
        <p style="color: #dc2626; font-weight: bold;">This link expires in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    </body>
    </html>
  `,

  passwordChanged: (name: string) => `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 10px;">
        <h1 style="color: #10b981;">✅ Password Changed</h1>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Your password was successfully changed.</p>
        <p>If you didn't make this change, please contact support immediately.</p>
      </div>
    </body>
    </html>
  `,

  loginAlert: (name: string, ip: string, time: string) => `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 10px;">
        <h1 style="color: #f59e0b;">🔐 New Login Detected</h1>
        <p>Hi <strong>${name}</strong>,</p>
        <p>We detected a new login to your account:</p>
        <ul>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>IP:</strong> ${ip}</li>
        </ul>
        <p>If this wasn't you, secure your account immediately.</p>
      </div>
    </body>
    </html>
  `,
};
