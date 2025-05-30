import { sql } from "./db"
import { sendTimeCapsuleEmail } from "./email"

export async function checkAndDeliverCapsules() {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0]

    // Find all pending capsules that should be delivered today
    const capsulestoDeliver = await sql`
      SELECT c.*, u.name as user_name
      FROM capsules c
      JOIN users u ON c.user_id = u.id
      WHERE c.delivery_date = ${today}
      AND c.status = 'pending'
    `

    console.log(`Found ${capsulestoDeliver.length} capsules to deliver today`)

    let deliveredCount = 0
    let failedCount = 0

    // Process each capsule
    for (const capsule of capsulestoDeliver) {
      try {
        // Send email
        const emailResult = await sendTimeCapsuleEmail(
          capsule.delivery_email,
          capsule.title,
          capsule.message,
          capsule.created_at,
        )

        if (emailResult.success) {
          // Mark as delivered
          await sql`
            UPDATE capsules 
            SET status = 'delivered', delivered_at = CURRENT_TIMESTAMP
            WHERE id = ${capsule.id}
          `
          deliveredCount++
          console.log(`Successfully delivered capsule ${capsule.id} to ${capsule.delivery_email}`)
        } else {
          // Mark as failed
          await sql`
            UPDATE capsules 
            SET status = 'failed'
            WHERE id = ${capsule.id}
          `
          failedCount++
          console.log(`Failed to deliver capsule ${capsule.id}:`, emailResult.error)
        }
      } catch (error) {
        console.error(`Error processing capsule ${capsule.id}:`, error)
        failedCount++
      }
    }

    return {
      success: true,
      message: `Delivery complete: ${deliveredCount} delivered, ${failedCount} failed`,
      delivered: deliveredCount,
      failed: failedCount,
    }
  } catch (error) {
    console.error("Cron job error:", error)
    return { success: false, error: "Internal server error" }
  }
}
