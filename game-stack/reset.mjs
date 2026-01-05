// reset-players.mjs
import { createClient } from '@supabase/supabase-js'

// Replace with your actual project details
const supabase = createClient(
  'https://yaqapkoxxugmlfruewwj.supabase.co',
  'your-service-role-key' // Use Service Role Key for admin actions
)

async function repairAll() {
  console.log("Starting repair of 50 users...")

  for (let i = 1; i <= 50; i++) {
    const email = `player_${i}@example.com`
    
    // 1. Get the user ID by email
    const { data: { users } } = await supabase.auth.admin.listUsers()
    const user = users.find(u => u.email === email)

    if (!user) {
      console.log(`⏩ Skipping ${email} (not found)`)
      continue
    }

    // 2. Force update password and confirm email
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { 
        password: 'password123',
        email_confirm: true // This is the magic flag
      }
    )

    if (updateError) {
      console.error(`❌ Error updating ${email}:`, updateError.message)
    } else {
      console.log(`✅ Repaired ${email}`)
    }
  }
  console.log("Done!")
}

repairAll()