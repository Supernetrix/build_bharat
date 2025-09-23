"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"

interface Buddy {
    id: number
    name: string
    age: number
    personality: string
    interests: string[]
    avatar: string
    bio: string
}

const mockBuddies: Buddy[] = [
    {
        id: 1,
        name: "Alex Chen",
        age: 24,
        personality: "Creative Innovator",
        interests: ["Design", "Tech", "Music"],
        avatar: "🎨",
        bio: "Love creating digital art and exploring new technologies!",
    },
    {
        id: 2,
        name: "Maya Rodriguez",
        age: 26,
        personality: "Strategic Thinker",
        interests: ["Business", "Travel", "Books"],
        avatar: "📚",
        bio: "Passionate about building sustainable businesses and exploring cultures.",
    },
    {
        id: 3,
        name: "Jordan Kim",
        age: 23,
        personality: "Social Connector",
        interests: ["Sports", "Cooking", "Gaming"],
        avatar: "🎮",
        bio: "Always up for a good game or trying new recipes with friends!",
    },
    {
        id: 4,
        name: "Sam Taylor",
        age: 25,
        personality: "Analytical Mind",
        interests: ["Science", "Photography", "Hiking"],
        avatar: "📸",
        bio: "Love capturing nature's beauty and solving complex problems.",
    },
    {
        id: 5,
        name: "Riley Johnson",
        age: 27,
        personality: "Creative Innovator",
        interests: ["Art", "Yoga", "Sustainability"],
        avatar: "🌱",
        bio: "Creating a more sustainable world through mindful living and art.",
    },
]

export default function FindBuddyPage() {
    const router = useRouter()
    const [currentBuddyIndex, setCurrentBuddyIndex] = useState(0)
    const [ignoredCount, setIgnoredCount] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
    const cardRef = useRef<HTMLDivElement>(null)

    const currentBuddy = mockBuddies[currentBuddyIndex]
    const hasMoreBuddies = currentBuddyIndex < mockBuddies.length - 1

    const handleSwipe = (direction: "left" | "right") => {
        if (isAnimating) return

        setIsAnimating(true)
        setSwipeDirection(direction)

        setTimeout(() => {
            if (direction === "left") {
                setIgnoredCount((prev) => prev + 1)
            } else {
                router.push("/explore-journey")
                return
            }

            if (hasMoreBuddies) {
                setCurrentBuddyIndex((prev) => prev + 1)
            } else {
                router.push("/explore-journey")
                return
            }

            setIsAnimating(false)
            setSwipeDirection(null)
        }, 300)
    }

    const handleSkipBuddies = () => {
        router.push("/")
    }

    if (!currentBuddy) {
        return null
    }

    return (
        <div className="min-h-screen bg-[#F8F7F4] relative overflow-hidden font-[family-name:var(--font-space-grotesk)]">
            <Header />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-16 h-16 bg-[#F7B844]/20 rounded-full"></div>
                <div className="absolute top-40 right-8 w-12 h-12 bg-[#F95C8A]/20 rounded-full"></div>
                <div className="absolute bottom-32 left-6 w-20 h-20 bg-[#25D366]/20 rounded-full"></div>
                <div className="absolute bottom-20 right-12 w-14 h-14 bg-[#F7B844]/20 rounded-full"></div>
            </div>

            <div className="relative z-10 bg-white/95 backdrop-blur-sm border-b border-white/20 p-4 mt-16">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#F7B844] rounded-full flex items-center justify-center text-2xl">🤖</div>
                    <div>
                        <h3 className="font-semibold text-[#212121] font-[family-name:var(--font-unbounded)]">Your Profile</h3>
                        <p className="text-sm text-[#212121]/70">Creative Innovator • Tech, Design, Music</p>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-160px)] p-6">
                <div className="w-full max-w-sm mx-auto">
                    <div
                        ref={cardRef}
                        className={`relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden transition-all duration-300 border border-white/20 ${
                            isAnimating
                                ? swipeDirection === "left"
                                    ? "transform -translate-x-full rotate-12 opacity-0"
                                    : "transform translate-x-full rotate-12 opacity-0"
                                : "transform translate-x-0 rotate-0 opacity-100"
                        }`}
                    >
                        <div className="p-8 text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-[#F7B844] to-[#F95C8A] rounded-full flex items-center justify-center text-6xl mx-auto mb-6 shadow-lg">
                                {currentBuddy.avatar}
                            </div>

                            <h2 className="text-2xl font-bold text-[#212121] mb-2 font-[family-name:var(--font-unbounded)]">
                                {currentBuddy.name}
                            </h2>
                            <p className="text-[#F7B844] font-semibold mb-1">{currentBuddy.personality}</p>
                            <p className="text-[#212121]/70 text-sm mb-4">Age {currentBuddy.age}</p>

                            <p className="text-[#212121]/80 mb-6 leading-relaxed">{currentBuddy.bio}</p>

                            <div className="flex flex-wrap gap-2 justify-center mb-8">
                                {currentBuddy.interests.map((interest, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-[#F7B844]/20 text-[#212121] rounded-full text-sm font-medium"
                                    >
                    {interest}
                  </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-8 mt-8">
                        <button
                            onClick={() => handleSwipe("left")}
                            disabled={isAnimating}
                            className="w-16 h-16 bg-[#F95C8A] rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-[#F95C8A]/90 transition-colors disabled:opacity-50"
                        >
                            ✕
                        </button>
                        <button
                            onClick={() => handleSwipe("right")}
                            disabled={isAnimating}
                            className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-[#25D366]/90 transition-colors disabled:opacity-50"
                        >
                            ♥
                        </button>
                    </div>

                    {ignoredCount >= 3 && (
                        <div className="text-center mt-6">
                            <button
                                onClick={handleSkipBuddies}
                                className="px-6 py-3 bg-[#212121]/70 text-white rounded-full font-semibold hover:bg-[#212121]/80 transition-colors font-[family-name:var(--font-unbounded)]"
                            >
                                Skip Choosing Buddies
                            </button>
                        </div>
                    )}

                    <div className="text-center mt-6">
                        <p className="text-[#212121]/60 text-sm">
                            {currentBuddyIndex + 1} of {mockBuddies.length} • Ignored: {ignoredCount}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
