import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import dbConnect from "@/lib/mongodb"
import ContactMessage from "@/lib/models/ContactMessage"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
    try {
        await dbConnect()

        const body = await request.json()
        const { firstName, lastName, email, phone, subject: inquiryType, message } = body

        // 1. Save to MongoDB
        try {
            await ContactMessage.create({
                name: `${firstName} ${lastName}`,
                email,
                phone: phone || null,
                subject: inquiryType,
                message,
                status: "new",
            })
        } catch (dbError) {
            console.error("MongoDB Save Error:", dbError)
            // Continue to email even if DB fails
        }

        // 2. Send Email via SMTP
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST || "smtp.gmail.com",
                    port: Number(process.env.SMTP_PORT) || 465,
                    secure: true,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS,
                    },
                })

                const mailOptions = {
                    from: process.env.SMTP_USER,
                    to: "jcpgimofficial@gmail.com",
                    subject: `Contact Form - ${inquiryType}`,
                    text: `
                First Name: ${firstName}
                Last Name: ${lastName}
                Email: ${email}
                Phone: ${phone || "Not provided"}
                Subject: ${inquiryType}
        
                Message:
                ${message}
              `,
                }

                await transporter.sendMail(mailOptions)
            } catch (emailError) {
                console.error("Email Sending Error:", emailError)
            }
        } else {
            console.warn("SMTP credentials missing. Skipping email notification.")
        }

        return NextResponse.json({
            success: true,
            message: "Contact form submitted successfully",
        })
    } catch (error: any) {
        console.error("Error processing contact form:", error)
        return NextResponse.json({ 
            error: "Failed to submit contact form",
            details: error.message 
        }, { status: 500 })
    }
}
