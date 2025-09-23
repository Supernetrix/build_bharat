"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"

export default function ResultsPage() {
    const [showContent, setShowContent] = useState(false)
    const [showScore, setShowScore] = useState(false)
    const [showCharacter, setShowCharacter] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const contentTimer = setTimeout(() => setShowContent(true), 300)
        const scoreTimer = setTimeout(() => setShowScore(true), 800)
        const characterTimer = setTimeout(() => setShowCharacter(true), 1200)

        return () => {
            clearTimeout(contentTimer)
            clearTimeout(scoreTimer)
            clearTimeout(characterTimer)
        }
    }, [])

    const score = 498
    const characterName = "Creative Innovator"
    const characterEmoji = "🎨"
    const keyTraits = [
        "Highly imaginative & original",
        "Loves to express ideas freely",
        "Enjoys exploring new perspectives",
        "Seeks unique solutions to problems",
    ]

    const handleContinue = () => {
        router.push("/explore")
    }

    const handleFindBuddy = () => {
        router.push("/find-buddy")
    }

    return (
        <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-start relative overflow-hidden font-[family-name:var(--font-space-grotesk)]">
            <div
                className={`flex flex-col items-center justify-center flex-grow w-full max-w-md mt-4 transition-all duration-700 ease-out transform ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
                <div
                    className={`relative mb-10 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${showScore ? "scale-100" : "scale-0"}`}
                >
                    <div className="bg-white/95 backdrop-blur-sm text-[#212121] px-6 py-3 rounded-full font-bold text-xl shadow-lg z-10 relative border border-white/20 font-[family-name:var(--font-unbounded)]">
                        {score} PTS!
                    </div>
                    <div className="absolute inset-0 bg-[#F7B844] rounded-full filter blur-md opacity-30 z-0"></div>
                </div>

                <div
                    className={`relative mb-10 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${showCharacter ? "scale-100 rotate-0" : "scale-0 -rotate-45"}`}
                >
                    <div className="w-48 h-28 bg-[#25D366] rounded-t-full rounded-b-[40%] relative flex items-center justify-center shadow-lg">
                        <div className="absolute top-8 left-1/4 -translate-x-1/2 w-10 h-10 bg-white rounded-full border-2 border-[#212121] flex items-center justify-center overflow-hidden">
                            <div className="w-5 h-5 bg-[#212121] rounded-full"></div>
                        </div>
                        <div className="absolute top-8 right-1/4 translate-x-1/2 w-10 h-10 bg-white rounded-full border-2 border-[#212121] flex items-center justify-center overflow-hidden">
                            <div className="w-5 h-5 bg-[#212121] rounded-full"></div>
                        </div>
                        <div className="absolute bottom-6 w-20 h-8 bg-[#F7B844] rounded-full flex items-center justify-center overflow-hidden">
                            <div className="w-16 h-6 bg-[#F95C8A] rounded-full"></div>
                        </div>
                        <div className="absolute top-12 left-10 w-8 h-2 border-b-2 border-gray-400 rotate-45 transform skew-x-12 opacity-70"></div>
                        <div className="absolute top-12 right-10 w-8 h-2 border-b-2 border-gray-400 -rotate-45 transform -skew-x-12 opacity-70"></div>
                    </div>

                    <div className="absolute -top-10 -left-6 w-16 h-8 bg-[#25D366] rounded-full rotate-45 flex items-center justify-center shadow-md">
                        <div className="w-5 h-5 bg-white rounded-full border border-gray-400 flex items-center justify-center text-sm font-bold text-gray-700">
                            #
                        </div>
                    </div>
                    <div className="absolute -top-10 -right-6 w-16 h-8 bg-[#25D366] rounded-full -rotate-45 flex items-center justify-center shadow-md">
                        <div className="w-5 h-5 bg-white rounded-full border border-gray-400 flex items-center justify-center text-sm font-bold text-gray-700">
                            #
                        </div>
                    </div>

                    <div className="absolute bottom-[-60px] left-1/4 -translate-x-1/2 w-16 h-20 bg-[#25D366] rounded-t-none rounded-b-3xl shadow-md flex justify-center items-end pb-2">
                        <div className="w-14 h-8 bg-[#F7B844] rounded-full flex items-center justify-center text-white text-xs">
                            <span className="w-2 h-2 rounded-full bg-white opacity-70"></span>
                        </div>
                    </div>
                    <div className="absolute bottom-[-60px] right-1/4 translate-x-1/2 w-16 h-20 bg-[#25D366] rounded-t-none rounded-b-3xl shadow-md flex justify-center items-end pb-2">
                        <div className="w-14 h-8 bg-[#F7B844] rounded-full flex items-center justify-center text-white text-xs">
                            <span className="w-2 h-2 rounded-full bg-white opacity-70"></span>
                        </div>
                    </div>

                    <div className="absolute top-0 left-20 text-[#F7B844] text-3xl animate-pulse">✨</div>
                    <div className="absolute bottom-10 right-20 text-[#F7B844] text-2xl animate-spin">⭐</div>
                </div>

                <div className="text-center mb-10 px-4">
                    <h1 className="text-4xl font-extrabold text-[#212121] mb-4 leading-tight font-[family-name:var(--font-unbounded)]">
                        You're a {characterName}! {characterEmoji}
                    </h1>
                    <p className="text-lg text-[#212121]/70 mb-6 max-w-sm mx-auto">Here are your key traits:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {keyTraits.map((trait, index) => (
                            <span
                                key={index}
                                className={`bg-white/95 backdrop-blur-sm text-[#212121] px-4 py-2 rounded-full shadow-sm text-sm font-medium border border-white/20 transition-all duration-500 ease-out transform ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                                style={{ transitionDelay: `${1500 + index * 100}ms` }}
                            >
                {trait}
              </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4 w-full max-w-sm px-4 pb-24">
                    <button
                        onClick={handleContinue}
                        className={`w-full h-14 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold text-lg rounded-2xl shadow-lg transition-all duration-300 ease-out flex items-center justify-center gap-2 font-[family-name:var(--font-unbounded)] ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                        style={{ transitionDelay: "2000ms" }}
                    >
                        Continue
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <button
                        onClick={handleFindBuddy}
                        className={`w-full h-14 bg-white/95 backdrop-blur-sm border-2 border-[#212121] hover:bg-white text-[#212121] font-bold text-lg rounded-2xl shadow-lg transition-all duration-300 ease-out flex items-center justify-center gap-2 font-[family-name:var(--font-unbounded)] ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                        style={{ transitionDelay: "2200ms" }}
                    >
                        Find a Buddy
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14c-1.49 0-2.873.06-4.162.188M12 14v4m0 0h4.5M12 14h-4.5m4.5 0v4m0 0l-2.5 1.5M17.5 14h-5.01"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
