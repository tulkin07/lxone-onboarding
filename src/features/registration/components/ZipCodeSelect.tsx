"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"
import { Input } from "@/components/Input"

interface ZipAutocompleteProps {
  value?: string
  onSelect: (data: { zip: string; city: string; state: string }) => void
}

export default function ZipAutocomplete({ value, onSelect }: ZipAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [internalValue, setInternalValue] = useState(value || "")

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  useEffect(() => {
    if (!isScriptLoaded || !inputRef.current) return

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["(regions)"],
        componentRestrictions: { country: "us" },
        fields: ["address_components", "formatted_address"],
      },
    )

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace()
      if (!place.address_components) return

      let zipCode = ""
      let cityName = ""
      let stateName = ""

      for (const component of place.address_components) {
        const type = component.types[0]
        switch (type) {
          case "postal_code":
            zipCode = component.long_name
            break
          case "locality":
            cityName = component.long_name
            break
          case "administrative_area_level_1":
            stateName = component.long_name 
            break
        }
      }

      if (!zipCode && place.formatted_address) {
        const zipMatch = place.formatted_address.match(/\b\d{5}(?:-\d{4})?\b/)
        if (zipMatch) zipCode = zipMatch[0]
      }

      setInternalValue(place.formatted_address || "")

      onSelect({ zip: zipCode, city: cityName, state: stateName })
    })
  }, [isScriptLoaded])

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&language=en`}
        strategy="afterInteractive"
        onLoad={() => setIsScriptLoaded(true)}
        onError={() => console.error("Google Maps API load error")}
      />

      <Input
        ref={inputRef}
        type="text"
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        placeholder="Enter ZIP code or city"
        className="w-80"
      />
    </>
  )
}
