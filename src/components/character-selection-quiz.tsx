"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface CharacterOption {
    id: string
    name: string
    description: string
    traits: string[]
}

const characterOptions: CharacterOption[] = [
    {
        id: "leader",
        name: "The Leader",
        description: "Natural born leader with strong vision",
        traits: ["Decisive", "Inspiring", "Strategic"],
    },
    {
        id: "innovator",
        name: "The Innovator",
        description: "Creative problem solver and visionary",
        traits: ["Creative", "Analytical", "Forward-thinking"],
    },
    {
        id: "collaborator",
        name: "The Collaborator",
        description: "Team player who brings people together",
        traits: ["Empathetic", "Diplomatic", "Supportive"],
    },
    {
        id: "achiever",
        name: "The Achiever",
        description: "Goal-oriented and results-driven",
        traits: ["Determined", "Focused", "Ambitious"],
    },
]

export function CharacterSelectionQuiz() {
    const [selectedCharacter, setSelectedCharacter] = useState<string>("")
    const router = useRouter()

    const handleCharacterSelect = (characterId: string) => {
        setSelectedCharacter(characterId)
    }

    const handleSubmit = () => {
        if (selectedCharacter) {
            router.push("/onboarding")
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-4">
            {/* Question Text */}
            <h1
                className="text-3xl font-[family-name:var(--font-unbounded)] font-bold text-center mb-8 max-w-md leading-tight"
                style={{ color: "#212121" }}
            >
                Choose your character
            </h1>

            {/* Main Content - Options Grid */}
            <main className="flex-1 w-full max-w-md mx-auto">
                <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-sm">
                    <div className="grid grid-cols-2 gap-4">
                        {characterOptions.map((character, index) => (
                            <Card
                                key={character.id}
                                onClick={() => handleCharacterSelect(character.id)}
                                className={`
                  p-4 bg-white rounded-2xl cursor-pointer transition-all duration-200
                  flex flex-col items-center gap-3 text-center relative
                  border-2 hover:scale-[1.03]
                  ${selectedCharacter === character.id ? "scale-105 shadow-lg" : "shadow-sm"}
                `}
                                style={{
                                    borderColor: selectedCharacter === character.id ? "#F7B844" : "transparent",
                                }}
                            >
                                <div
                                    className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                    style={{ backgroundColor: "#F7B844", color: "#212121" }}
                                >
                                    {String.fromCharCode(65 + index)}
                                </div>

                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                                    style={{ backgroundColor: "#F8F7F4" }}
                                >
                                    {index === 0 ? "👑" : index === 1 ? "💡" : index === 2 ? "🤝" : "🎯"}
                                </div>

                                <div>
                                    <h3
                                        className="font-[family-name:var(--font-space-grotesk)] font-semibold text-sm mb-1"
                                        style={{ color: "#212121" }}
                                    >
                                        {character.name}
                                    </h3>
                                    <p className="font-[family-name:var(--font-space-grotesk)] text-xs" style={{ color: "#666" }}>
                                        {character.description}
                                    </p>
                                </div>
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
                    className="w-full h-14 font-[family-name:var(--font-space-grotesk)] font-bold rounded-2xl text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    style={{
                        backgroundColor: selectedCharacter ? "#212121" : "#ccc",
                        color: "white",
                    }}
                >
                    Submit Answer
                </Button>
            </footer>
        </div>
    )
}
