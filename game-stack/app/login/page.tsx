// app/login/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default function LoginPage() {
  async function login(formData: FormData) {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?error=Could not authenticate user')
    }

    return redirect('/dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <form action={login} className="p-8 bg-slate-800 rounded-lg shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6">Player Login</h1>
        
        <label className="block mb-2 text-sm">Email (player_1@example.com)</label>
        <input name="email" type="email" required className="w-full p-2 mb-4 bg-slate-700 rounded border border-slate-600" />

        <label className="block mb-2 text-sm">Password (password123)</label>
        <input name="password" type="password" required className="w-full p-2 mb-6 bg-slate-700 rounded border border-slate-600" />

        <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded font-bold transition">
          Enter Game Site
        </button>
      </form>
    </div>
  )
}