import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, phone, category, urgency, request: prayerRequest, anonymous } = body

        // 1. Save to Supabase
        const { error: supabaseError } = await supabase.from("prayer_requests").insert([
            {
                name: anonymous ? "Anonymous" : name,
                email,
                phone: phone || null,
                subject: `Prayer Request - ${category} (${urgency})`,
                message: prayerRequest,
                status: "new",
            },
        ])

        if (supabaseError) {
            console.error("Supabase Error:", supabaseError)
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
            subject: `Prayer Request - ${category} (${urgency})`,
            text: `
        Name: ${anonymous ? "Anonymous" : name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Category: ${category}
        Urgency: ${urgency}
        Anonymous: ${anonymous ? "Yes" : "No"}

        Prayer Request:
        ${prayerRequest}
      `,
        }

        await transporter.sendMail(mailOptions)

        return NextResponse.json({
            success: true,
            message: "Prayer request submitted successfully",
        })
    } catch (error) {
        console.error("Error processing prayer request:", error)
        return NextResponse.json({ error: "Failed to submit prayer request" }, { status: 500 })
    }
}
