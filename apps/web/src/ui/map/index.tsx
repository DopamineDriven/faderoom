'use client'

import { useState, useEffect } from 'react'
import { LocationMap } from '@/ui/map/LocationMap'

export function GoogleMap() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places,marker&mapIds=2959b320759c0047&v=beta`
      script.async = true
      script.defer = true
      script.onload = () => setIsLoaded(true)
      document.body.appendChild(script)
    }

    loadGoogleMapsScript()

    return () => {
      const script = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')
      if (script) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="min-h-[50vh] bg-fr-bg-main">
      {isLoaded && <LocationMap />}
    </div>
  )
}

