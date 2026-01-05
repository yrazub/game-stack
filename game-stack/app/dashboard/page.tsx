// app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  // 1. Get the current session user
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  // If no user is logged in, send them back to login
  if (authError || !user) {
    redirect('/login')
  }

  // 2. Fetch the player's profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-2xl flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">
              Welcome back, {profile?.username || 'Player'}
            </h1>
            <p className="text-slate-400 font-mono text-sm mt-1">UUID: {user.id}</p>
          </div>
          
          <div className="text-right">
            <div className="text-xs text-blue-400 font-bold uppercase tracking-widest">Current Rank</div>
            <div className="text-2xl font-black text-yellow-500">{profile?.tier || 'Unranked'}</div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-8 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div className="flex justify-between mb-2 font-bold">
            <span>XP Progress</span>
            <span className="text-blue-400">{profile?.xp || 0} / 2000 XP</span>
          </div>
          <div className="w-full bg-slate-700 h-4 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-1000" 
              style={{ width: `${Math.min(((profile?.xp || 0) / 2000) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Sign Out Button (form for server action) */}
        <form action="/auth/signout" method="post" className="mt-8">
          <button className="px-6 py-2 bg-red-600/20 hover:bg-red-600/40 border border-red-600/50 rounded-lg text-red-500 font-bold transition">
            Logout
          </button>
        </form>
      </div>
    </div>
  )
}