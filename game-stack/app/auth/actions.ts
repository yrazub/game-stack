'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signOut() {
  const supabase = await createClient()
  
  // 1. Tell Supabase to clear the session cookie
  await supabase.auth.signOut()

  // 2. IMPORTANT: Clear the cache so the "User" state resets everywhere
  revalidatePath('/', 'layout')

  // 3. Redirect back to home
  redirect('/')
}
