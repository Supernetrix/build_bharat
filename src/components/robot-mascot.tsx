"use client"

import { useState, useEffect } from "react"

export function RobotMascot() {
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 3000)

    return () => clearInterval(blinkInterval)
  }, [])

  return (
    <div className="relative flex items-center justify-center">
      {/* Background blobs */}
      <div className="absolute -top-20 -left-20 w-40 h-40 blob-coral opacity-60 animate-pulse"></div>
      <div className="absolute -bottom-10 -right-16 w-32 h-32 blob-purple opacity-50 animate-pulse"></div>

      {/* Robot container */}
      <div className="relative animate-float">
        {/* Robot body */}
        <div className="w-32 h-40 bg-gradient-to-b from-gray-100 to-gray-200 rounded-3xl shadow-lg relative">
          {/* Robot head */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-20 bg-white rounded-2xl shadow-md border-4 border-[color:var(--color-robot-gold)]">
            {/* Antennas */}
            <div className="absolute -top-4 left-3 w-1 h-4 bg-gray-400 rounded-full"></div>
            <div className="absolute -top-4 right-3 w-1 h-4 bg-gray-400 rounded-full"></div>
            <div className="absolute -top-6 left-3 w-2 h-2 bg-[color:var(--color-robot-gold)] rounded-full animate-pulse-glow"></div>
            <div className="absolute -top-6 right-3 w-2 h-2 bg-[color:var(--color-robot-gold)] rounded-full animate-pulse-glow"></div>

            {/* Eyes */}
            <div className="flex justify-center items-center pt-4 space-x-3">
              <div
                className={`w-4 h-4 bg-[color:var(--color-robot-blue)] rounded-full transition-all duration-150 ${isBlinking ? "h-1" : "h-4"}`}
              >
                <div className="w-2 h-2 bg-white rounded-full ml-0.5 mt-0.5"></div>
              </div>
              <div
                className={`w-4 h-4 bg-[color:var(--color-robot-blue)] rounded-full transition-all duration-150 ${isBlinking ? "h-1" : "h-4"}`}
              >
                <div className="w-2 h-2 bg-white rounded-full ml-0.5 mt-0.5"></div>
              </div>
            </div>

            {/* Smile */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-800 rounded-full"></div>
          </div>

          {/* Robot arms */}
          <div className="absolute top-8 -left-4 w-3 h-12 bg-[color:var(--color-robot-gold)] rounded-full"></div>
          <div className="absolute top-8 -right-4 w-3 h-12 bg-[color:var(--color-robot-gold)] rounded-full"></div>

          {/* Robot chest panel */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-300 rounded-lg border-2 border-[color:var(--color-robot-gold)]">
            <div className="flex justify-center items-center h-full space-x-1">
              <div className="w-1 h-4 bg-[color:var(--color-robot-blue)] rounded-full"></div>
              <div className="w-1 h-3 bg-green-400 rounded-full"></div>
              <div className="w-1 h-2 bg-red-400 rounded-full"></div>
            </div>
          </div>

          {/* Robot legs */}
          <div className="absolute -bottom-2 left-6 w-4 h-6 bg-[color:var(--color-robot-gold)] rounded-b-full"></div>
          <div className="absolute -bottom-2 right-6 w-4 h-6 bg-[color:var(--color-robot-gold)] rounded-b-full"></div>
        </div>
      </div>
    </div>
  )
}
