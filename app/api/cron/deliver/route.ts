import { type NextRequest, NextResponse } from "next/server"
import { checkAndDeliverCapsules } from "@/lib/cron"

export async function GET(request: NextRequest) {
  try {
    const result = await checkAndDeliverCapsules()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Cron job error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
