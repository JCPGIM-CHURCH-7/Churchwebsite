import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { firstName, lastName, email, phone, subject: inquiryType, message } = body

        // 1. Save to Supabase
        const { error: supabaseError } = await supabase.from("contact_messages").insert([
            {
                name: `${firstName} ${lastName}`,
                email,
                phone: phone || null,
                subject: inquiryType,
                message,
                status: "new",
            },
        ])

        if (supabaseError) {
            console.error("Supabase Error:", supabaseError)
            // We continue even if DB fails, to try and send the email
        }

        // 2. Send Email via SMTP
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

        return NextResponse.json({
            success: true,
            message: "Contact form submitted successfully",
        })
    } catch (error) {
        console.error("Error processing contact form:", error)
        return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
    }
}
