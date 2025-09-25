import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Prepare the form data for Web3Forms
    const formData = new FormData()
    formData.append("access_key", "1b983734-3a1b-4fdb-a919-829a3aeb3698")
    formData.append("subject", `Contact Form - ${body.subject}`)
    formData.append("from_name", `${body.firstName} ${body.lastName}`)
    formData.append("email", body.email)
    formData.append("phone", body.phone || "Not provided")
    formData.append("inquiry_type", body.subject)
    formData.append("message", body.message)

    // Send to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })

    const result = await response.json()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Contact form submitted successfully",
      })
    } else {
      throw new Error(result.message || "Failed to submit contact form")
    }
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
  }
}
