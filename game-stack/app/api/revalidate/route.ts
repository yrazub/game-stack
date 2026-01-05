// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // 1. (Optional) Verify a secret for security
    // This prevents random people from pinging your API to drain your build minutes
    const secret = req.nextUrl.searchParams.get('secret')
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret ' + secret }, { status: 401 })
    }

    // 2. Clear the cache for the home page
    // You can also clear specific paths based on the Sanity document type
    revalidatePath('/')
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: "Cache purged successfully" 
    })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}