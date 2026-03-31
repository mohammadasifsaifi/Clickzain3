import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // Socket.io Logic
  let activeVisitors = 0;
  io.on("connection", (socket) => {
    activeVisitors++;
    io.emit("visitorCount", activeVisitors);
    console.log(`User connected. Total visitors: ${activeVisitors}`);

    socket.on("disconnect", () => {
      activeVisitors--;
      io.emit("visitorCount", activeVisitors);
      console.log(`User disconnected. Total visitors: ${activeVisitors}`);
    });
  });

  // Email Transporter (Flexible for Gmail or Hostinger SMTP)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '465'),
    secure: process.env.EMAIL_SECURE !== 'false', // Default to true for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Add connection timeout to avoid hanging
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  // Gemini AI Setup
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  app.post("/api/chat-transcript", async (req, res) => {
    const { userInfo, messages } = req.body;
    
    if (!userInfo || !messages || messages.length === 0) {
      return res.status(400).json({ success: false, message: "Missing transcript data." });
    }

    const transcriptHtml = messages.map((msg: any) => `
      <div style="margin-bottom: 15px; padding: 10px; border-radius: 10px; background-color: ${msg.role === 'user' ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.05)'};">
        <strong style="color: ${msg.role === 'user' ? '#00FF88' : '#ffffff'}; text-transform: uppercase; font-size: 10px;">${msg.role === 'user' ? userInfo.name : 'AI Assistant'}:</strong>
        <p style="margin: 5px 0; color: #ffffff; font-size: 14px;">${msg.text}</p>
      </div>
    `).join('');

    const mailOptions = {
      from: process.env.EMAIL_USER || 'clickzaindigitalsolutions@gmail.com',
      to: [userInfo.email, 'clickzaindigitalsolutions@gmail.com'],
      subject: `📄 Chat Transcript: ${userInfo.name} x Clickzain AI`,
      html: `
        <div style="font-family: sans-serif; padding: 40px; color: #ffffff; background-color: #050505; border-radius: 20px; max-width: 600px; margin: auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00FF88; margin: 0; font-size: 24px;">Chat Transcript</h1>
            <p style="color: rgba(255,255,255,0.4); font-size: 12px;">Session with ${userInfo.name}</p>
          </div>
          
          <div style="background-color: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; margin-bottom: 30px;">
            <h3 style="margin-top: 0; font-size: 14px; color: #00FF88;">User Info</h3>
            <p style="margin: 5px 0; font-size: 13px;"><strong>Name:</strong> ${userInfo.name}</p>
            <p style="margin: 5px 0; font-size: 13px;"><strong>Email:</strong> ${userInfo.email}</p>
            <p style="margin: 5px 0; font-size: 13px;"><strong>Phone:</strong> ${userInfo.phone}</p>
          </div>

          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
            ${transcriptHtml}
          </div>

          <div style="text-align: center; margin-top: 30px; color: rgba(255,255,255,0.3); font-size: 11px;">
            <p>© 2026 Clickzain AI Agency • All rights reserved.</p>
          </div>
        </div>
      `
    };

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
          await transporter.sendMail(mailOptions);
          console.log(`Chat transcript for ${userInfo.name} sent successfully.`);
          res.status(200).json({ success: true });
        } catch (emailError: any) {
          console.error("Error sending transcript email (SMTP issue):", emailError.message);
          console.warn("Falling back to console logging for transcript.");
          console.log("Transcript for:", userInfo.name, messages);
          
          let helpfulMessage = "Email delivery failed";
          if (emailError.message.includes('535')) {
            helpfulMessage = "CRITICAL: Invalid SMTP login (535). If using Gmail, you MUST use an 'App Password'. Go to https://myaccount.google.com/apppasswords to create one.";
          }
          
          res.status(200).json({ success: true, mock: true, error: helpfulMessage });
        }
      } else {
        console.warn("Email credentials missing. Transcript logged to console.");
        console.log("Transcript for:", userInfo.name, messages);
        res.status(200).json({ success: true, mock: true });
      }
    } catch (error) {
      console.error("Error in chat transcript process:", error);
      res.status(500).json({ success: false });
    }
  });

  app.post("/api/generate-logo", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not configured on the server.");
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: 'A professional, modern, and minimalist logo for a digital marketing agency named "ClickZain". The logo should feature a stylized mouse pointer or a "Z" integrated with a click symbol. Color palette: neon green and black. High resolution, 1024x1024, clean design.',
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          },
        },
      });

      let base64Data = "";
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          base64Data = part.inlineData.data;
          break;
        }
      }

      if (!base64Data) throw new Error("No image data returned from AI");

      res.json({ success: true, imageUrl: `data:image/png;base64,${base64Data}` });
    } catch (error: any) {
      console.error("Logo generation error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  });

  app.post("/api/lead", async (req, res) => {
    console.log("Received new lead submission:", req.body);
    const { fullName, email, phone, businessName, monthlyBudget, message } = req.body;

    if (!fullName || !email || !phone || !businessName || !monthlyBudget) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || 'clickzaindigitalsolutions@gmail.com',
      to: 'clickzaindigitalsolutions@gmail.com',
      subject: `👉 🔥 New High-Intent Lead from Clickzain Website`,
      text: `
New Lead Details:

Name: ${fullName}
Phone: ${phone || 'N/A'}
Email: ${email}
Business Name: ${businessName}
Monthly Budget: ${monthlyBudget}
Message: ${message || 'N/A'}

Source: Website Form
      `,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #ffffff; background-color: #050505; border-radius: 20px; max-width: 600px; margin: auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00FF88; margin: 0; font-size: 28px; letter-spacing: -1px;">CLICKZAIN</h1>
            <p style="color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-top: 5px;">High-Intent Lead Captured</p>
          </div>
          
          <div style="background-color: rgba(255,255,255,0.05); padding: 30px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="font-size: 18px; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">Lead Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: rgba(255,255,255,0.5); width: 140px;">Full Name</td>
                <td style="padding: 10px 0; font-weight: bold;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: rgba(255,255,255,0.5);">Phone Number</td>
                <td style="padding: 10px 0; font-weight: bold; color: #00FF88;">${phone || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: rgba(255,255,255,0.5);">Email Address</td>
                <td style="padding: 10px 0; font-weight: bold;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: rgba(255,255,255,0.5);">Business Name</td>
                <td style="padding: 10px 0; font-weight: bold;">${businessName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: rgba(255,255,255,0.5);">Monthly Budget</td>
                <td style="padding: 10px 0; font-weight: bold;">${monthlyBudget}</td>
              </tr>
            </table>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="color: rgba(255,255,255,0.5); margin-bottom: 10px;">Message</p>
              <p style="line-height: 1.6; margin: 0;">${message || 'No message provided.'}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: rgba(255,255,255,0.3); font-size: 11px;">
            <p>Source: Website Lead Form • Clickzain AI Agency</p>
          </div>
        </div>
      `,
    };

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        // Verify transporter before sending
        try {
          await transporter.verify();
          await transporter.sendMail(mailOptions);
          console.log("Lead email sent successfully to clickzaindigitalsolutions@gmail.com");
          res.status(200).json({ success: true, message: "Lead submitted successfully" });
        } catch (verifyError: any) {
          console.error("Nodemailer verification failed. If using Gmail, ensure you use an 'App Password', not your regular password.");
          console.error("SMTP Error Details:", verifyError.message);
          console.warn("Falling back to console logging for lead data.");
          console.log("Lead Data:", req.body);
          
          // Provide a very specific error message for 535 errors
          let helpfulMessage = "Lead captured (Email delivery failed: Check SMTP credentials)";
          if (verifyError.message.includes('535')) {
            helpfulMessage = "Lead captured (CRITICAL: Invalid SMTP login (535). If using Gmail, you MUST use an 'App Password'. Go to https://myaccount.google.com/apppasswords to create one.)";
          }
          
          res.status(200).json({ 
            success: true, 
            message: helpfulMessage,
            isMock: true,
            error: verifyError.message
          });
        }
      } else {
        console.warn("Email credentials (EMAIL_USER/EMAIL_PASS) not set in environment. Lead data logged to console.");
        console.log("Lead Data:", req.body);
        res.status(200).json({ 
          success: true, 
          message: "Lead captured (Mock Mode: Set EMAIL_USER/PASS for real emails)",
          isMock: true 
        });
      }
    } catch (error: any) {
      console.error("Error in lead submission process:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to submit lead. Please try again later." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
