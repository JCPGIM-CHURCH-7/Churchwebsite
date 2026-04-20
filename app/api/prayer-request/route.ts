import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import dbConnect from "@/lib/mongodb"
import PrayerRequest from "@/lib/models/PrayerRequest"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
    try {
        await dbConnect()
        
        const body = await request.json()
        const { name, email, phone, category, urgency, request: prayerRequest, anonymous } = body

        // 1. Save to MongoDB
        try {
            await PrayerRequest.create({
                name: anonymous ? "Anonymous" : name,
                email,
                phone: phone || null,
                subject: `Prayer Request - ${category} (${urgency})`,
                message: prayerRequest,
                status: "new",
            })
        } catch (dbError) {
            console.error("MongoDB Save Error:", dbError)
            // We'll continue to try and send the email even if DB fails
        }

        // 2. Send Email via SMTP
        // Note: Using a fallback for development if SMTP is not configured
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
            } catch (emailError) {
                console.error("Email Sending Error:", emailError)
            }
        } else {
            console.warn("SMTP credentials missing. Skipping email notification.")
        }

        return NextResponse.json({
            success: true,
            message: "Prayer request submitted successfully",
        })
    } catch (error: any) {
        console.error("Error processing prayer request:", error)
        return NextResponse.json({ 
            error: "Failed to submit prayer request",
            details: error.message 
        }, { status: 500 })
    }
}
