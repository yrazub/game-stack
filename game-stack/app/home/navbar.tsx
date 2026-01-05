// navbar.tsx (Client Component)
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function Navbar() {
  const [user, setUser] = useState<unknown>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await (await supabase).auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <nav className="flex justify-between items-center p-6 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="font-black text-xl tracking-widest uppercase">GameStack</div>
      <div>
        {user ? (
          <Link href="/dashboard" className="bg-blue-600 px-4 py-2 rounded font-bold">Dashboard</Link>
        ) : (
          <Link href="/login" className="border border-slate-700 px-4 py-2 rounded">Login</Link>
        )}
      </div>
    </nav>
  )
}