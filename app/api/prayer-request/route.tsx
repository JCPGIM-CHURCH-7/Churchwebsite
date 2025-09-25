import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Prepare the form data for Web3Forms
    const formData = new FormData()
    formData.append("access_key", "1b983734-3a1b-4fdb-a919-829a3aeb3698")
    formData.append("subject", `Prayer Request - ${body.category} (${body.urgency})`)
    formData.append("from_name", body.anonymous ? "Anonymous" : body.name)
    formData.append("email", body.email)
    formData.append("phone", body.phone || "Not provided")
    formData.append("category", body.category)
    formData.append("urgency", body.urgency)
    formData.append("message", body.request)
    formData.append("anonymous", body.anonymous ? "Yes" : "No")

    // Send to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })

    const result = await response.json()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Prayer request submitted successfully",
      })
    } else {
      throw new Error(result.message || "Failed to submit prayer request")
    }
  } catch (error) {
    console.error("Error processing prayer request:", error)
    return NextResponse.json({ error: "Failed to submit prayer request" }, { status: 500 })
  }
}
