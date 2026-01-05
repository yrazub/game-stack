'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

export default function HeroBanner({ banners }: { banners: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-slide logic
  useEffect(() => {
    if (banners.length <= 1) return // Don't slide if there's only one

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(timer) // Cleanup timer on unmount
  }, [banners.length])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={urlFor(banner.image).url()}
            alt={banner.title}
            fill
            priority={index === 0} // Only prioritize the first image
            className="object-cover"
            sizes="100vw"
          />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          <div className="absolute bottom-12 left-10 z-20">
            <h1 className="text-5xl md:text-7xl font-black italic uppercase text-white tracking-tighter drop-shadow-2xl">
              {banner.title}
            </h1>
            {banner.subtitle && (
              <p className="text-blue-400 font-bold uppercase tracking-widest mt-2">
                {banner.subtitle}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-5 right-10 z-30 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`cursor-pointer h-1 transition-all duration-300 ${
                i === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-slate-500'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}