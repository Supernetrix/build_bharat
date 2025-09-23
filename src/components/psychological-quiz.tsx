"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface QuizQuestion {
    id: number
    question: string
    options: {
        id: string
        text: string
    }[]
}

const psychologicalQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: "When facing a challenging problem, what's your first instinct?",
        options: [
            { id: "A", text: "Analyze all possible solutions" },
            { id: "B", text: "Ask others for their opinions" },
            { id: "C", text: "Trust your gut feeling" },
            { id: "D", text: "Look for similar past experiences" },
        ],
    },
    {
        id: 2,
        question: "In a team setting, you naturally tend to:",
        options: [
            { id: "A", text: "Take the leadership role" },
            { id: "B", text: "Support and encourage others" },
            { id: "C", text: "Focus on creative solutions" },
            { id: "D", text: "Ensure tasks are completed" },
        ],
    },
    {
        id: 3,
        question: "What motivates you most in your work?",
        options: [
            { id: "A", text: "Making a positive impact" },
            { id: "B", text: "Financial success" },
            { id: "C", text: "Personal growth" },
            { id: "D", text: "Recognition from others" },
        ],
    },
    {
        id: 4,
        question: "How do you prefer to make important decisions?",
        options: [
            { id: "A", text: "Based on data and facts" },
            { id: "B", text: "Considering everyone's input" },
            { id: "C", text: "Following your intuition" },
            { id: "D", text: "Using proven methods" },
        ],
    },
    {
        id: 5,
        question: "What's your approach to risk-taking?",
        options: [
            { id: "A", text: "Calculated risks only" },
            { id: "B", text: "Avoid risks when possible" },
            { id: "C", text: "Embrace bold opportunities" },
            { id: "D", text: "Take moderate, safe risks" },
        ],
    },
]

export function PsychologicalQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [selectedAnswer, setSelectedAnswer] = useState<string>("")
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes in seconds
    const router = useRouter()

    // Timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    // Format time remaining as MM:SS
    const formatTimeRemaining = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const handleAnswerSelect = (optionId: string) => {
        setSelectedAnswer(optionId)
    }

    const handleSubmit = () => {
        if (selectedAnswer) {
            const newAnswers = { ...answers, [currentQuestion]: selectedAnswer }
            setAnswers(newAnswers)

            if (currentQuestion < psychologicalQuestions.length) {
                setCurrentQuestion(currentQuestion + 1)
                setSelectedAnswer("")
            } else {
                console.log("Quiz completed:", newAnswers)
                // Handle quiz completion - could navigate to results or dashboard
                router.push("/results")
            }
        }
    }

    const currentQuestionData = psychologicalQuestions.find((q) => q.id === currentQuestion)
    const progress = Math.round((currentQuestion / psychologicalQuestions.length) * 100)

    return (
        <div className="min-h-screen bg-[#F8F7F4] flex flex-col">
            {/* Header with progress and timer */}
            <header className="w-full max-w-3xl mx-auto px-4 py-6 flex flex-col gap-3">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-sm font-medium text-[#212121]/70 font-[family-name:var(--font-space-grotesk)]">
                        Psychological Assessment
                    </h2>
                    <div className="text-sm text-[#212121]/70 flex items-center gap-1 font-[family-name:var(--font-space-grotesk)]">
                        <span className="font-medium text-[#212121]">{formatTimeRemaining(timeRemaining)}</span>
                        <span>remaining</span>
                    </div>
                </div>

                <div className="w-full bg-white/30 rounded-full h-1.5">
                    <div
                        className="bg-[#F7B844] h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-between text-xs text-[#212121]/60 font-[family-name:var(--font-space-grotesk)]">
          <span>
            Question {currentQuestion} of {psychologicalQuestions.length}
          </span>
                    <span>{progress}% complete</span>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-2xl">
                    {currentQuestionData && (
                        <div className="space-y-8">
                            {/* Question */}
                            <div className="space-y-4">
                                <h1 className="text-3xl font-[family-name:var(--font-unbounded)] font-medium text-[#212121] leading-tight transition-all duration-300">
                                    {currentQuestionData.question}
                                </h1>
                                <div className="w-full h-px bg-[#212121]/20"></div>
                            </div>

                            {/* Answer Options */}
                            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-sm overflow-hidden rounded-2xl">
                                <div className="space-y-1">
                                    {currentQuestionData.options.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handleAnswerSelect(option.id)}
                                            className={`w-full flex items-center px-6 py-4.5 text-left transition-all duration-200 font-[family-name:var(--font-space-grotesk)] ${
                                                selectedAnswer === option.id
                                                    ? "bg-[#25D366]/10 border-l-4 border-[#25D366]"
                                                    : "hover:bg-[#F8F7F4]/50"
                                            }`}
                                        >
                                            <div
                                                className={`w-6 h-6 rounded-full flex items-center justify-center font-medium text-sm mr-4 flex-shrink-0 transition-all duration-200 ${
                                                    selectedAnswer === option.id ? "bg-[#25D366] text-white" : "bg-[#212121]/20 text-[#212121]/70"
                                                }`}
                                            >
                                                {option.id}
                                            </div>
                                            <span className="text-[#212121]">{option.text}</span>
                                        </button>
                                    ))}
                                </div>
                            </Card>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!selectedAnswer}
                                    className="w-full h-12 bg-[#F7B844] hover:bg-[#F7B844]/90 text-[#212121] font-medium rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-space-grotesk)]"
                                >
                                    {currentQuestion === psychologicalQuestions.length ? "Complete Assessment" : "Continue"}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
