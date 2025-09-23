"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Define the character data structure to match the UI
interface CharacterOption {
  id: string
  name: string
  image: string // URL to the character's image
}

// Populate with data from the screenshot
const characterOptions: CharacterOption[] = [
  {
    id: "soekarno",
    name: "Ir. Soekarno",
    // Placeholder image - replace with your actual image paths
    image: "/images/soekarno.jpg",
  },
  {
    id: "soebardjo",
    name: "Achmad Soebardjo",
    image: "/images/soebardjo.jpg",
  },
  {
    id: "sayuti",
    name: "Sayuti Melik",
    image: "/images/sayuti.jpg",
  },
  {
    id: "hatta",
    name: "Mohammad Hatta",
    image: "/images/hatta.jpg",
  },
]

// SVG for the subtle wavy background pattern
const WavyBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
    <svg
      className="absolute text-gray-200/50"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="wavy"
          patternUnits="userSpaceOnUse"
          width="40"
          height="80"
          patternTransform="rotate(45)"
        >
          <path
            d="M 0 40 Q 10 50 20 40 Q 30 30 40 40"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wavy)" />
    </svg>
  </div>
)

export function CharacterSelectionQuiz() {
  const [selectedCharacter, setSelectedCharacter] = useState<string>("")
  const [timeLeft, setTimeLeft] = useState(296) // 04:56 in seconds
  const router = useRouter()

  useEffect(() => {
    if (timeLeft === 0) return
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`
  }

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId)
  }

  const handleSubmit = () => {
    if (selectedCharacter) {
      // Navigate to the next step
      router.push("/results") 
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F4ED] flex flex-col items-center p-4 relative font-sans">
      <WavyBackground />
      {/* Header */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between pt-8 pb-12">
       
      </header>

      {/* Question Text */}
      <h1 className="text-3xl font-extrabold text-[#100F06] text-center mb-8 max-w-md leading-tight">
        Choose your character
      </h1>

      {/* Main Content - Options Grid */}
      <main className="flex-1 w-full max-w-md mx-auto">
        <div className="bg-[#FFDA57] p-4 rounded-3xl shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            {characterOptions.map((character, index) => (
              <Card
                key={character.id}
                onClick={() => handleCharacterSelect(character.id)}
                className={`
                  p-4 bg-white rounded-2xl cursor-pointer transition-all duration-200
                  flex flex-col items-center gap-3 text-center relative
                  border-2
                  ${selectedCharacter === character.id ? "border-[#FFDA57] scale-105 shadow-xl" : "border-transparent hover:scale-[1.03]"}
                `}
              >
                <div className="absolute top-2 left-2 w-6 h-6 bg-gray-200/80 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-gray-200">
                  <Image
                    src={character.image}
                    alt={character.name}
                    layout="fill"
                    objectFit="cover"
                    className="grayscale"
                  />
                </div>
                <h3 className="font-semibold text-sm text-gray-800">
                  {character.name}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer - Submit Button */}
      <footer className="w-full max-w-md mx-auto pt-6 pb-8">
        <Button
          onClick={handleSubmit}
          disabled={!selectedCharacter}
          className="w-full h-14 bg-[#100F06] hover:bg-black text-white font-bold rounded-2xl text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          Submit Answear
        </Button>
      </footer>
    </div>
  )
}