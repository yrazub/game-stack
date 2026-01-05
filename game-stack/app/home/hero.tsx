// components/HeroBanner.tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

export default function HeroBanner({ banner }: { banner: any }) {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      <Image
        src={urlFor(banner.image).url()} // The base image
        alt={banner.title}
        fill // Makes the image fill the container
        priority // Ensures this high-priority asset loads first (LCP)
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        // Next.js uses 'sizes' to decide which resolution to download
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent" />
      <div className="absolute bottom-10 left-10">
        <h1 className="text-5xl font-black italic uppercase text-white tracking-tighter">
          {banner.title}
        </h1>
      </div>
    </div>
  )
}