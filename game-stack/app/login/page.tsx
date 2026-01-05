// app/login/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage(props: {
  searchParams: Promise<{ error?: string }>
}) {
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
      console.error(error);
      return redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }

    return redirect('/dashboard')
  }

  const searchParams = await props.searchParams;
  const error = searchParams.error;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <form action={login} className="p-8 bg-slate-800 rounded-lg shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6">Player Login</h1>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="text-red-500 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <div className="text-sm text-red-200 font-medium">
              {error}
            </div>
          </div>
        )}
        
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