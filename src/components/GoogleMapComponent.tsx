"use client"

import React, { useEffect, useState } from "react"
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "100%",
}

interface Props {
  showMap?: boolean
  data: {
    pickup_latitude: number | null
    pickup_longitude: number | null
    delivery_latitude: number | null
    delivery_longitude: number | null
  }
}

export default function GoogleMapComponent({ showMap = true, data }: Props) {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    id: "google-map-script",
  })

  const hasValidCoords =
    data?.pickup_latitude != null &&
    data?.pickup_longitude != null &&
    data?.delivery_latitude != null &&
    data?.delivery_longitude != null

  useEffect(() => {
    if (!isLoaded || !hasValidCoords) return

    const directionsService = new google.maps.DirectionsService()

    directionsService.route(
      {
        origin: {
          lat: Number(data?.pickup_latitude),
          lng: Number(data?.pickup_longitude),
        },
        destination: {
          lat: Number(data?.delivery_latitude),
          lng: Number(data?.delivery_longitude),
        },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result)
        } else {
          console.error("Directions request failed: ", status)
        }
      },
    )
  }, [isLoaded, hasValidCoords, data])

  if (!showMap || !isLoaded) return null

  if (!hasValidCoords) {
    return (
      <div className="flex items-center justify-center h-full text-red-600 font-medium">
      Pickup and delivery coordinates are missing
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: Number(data?.pickup_latitude),
        lng: Number(data?.pickup_longitude),
      }}
      zoom={12}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  )
}
