"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { authService, type QuizQuestion } from "@/services/authService"

export function PsychologicalQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0) // Start from 0 for array indexing
    const [selectedAnswer, setSelectedAnswer] = useState<string>("")
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes in seconds
    const [questions, setQuestions] = useState<QuizQuestion[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>("")
    const [submitting, setSubmitting] = useState(false)
    const [tokenChecked, setTokenChecked] = useState(false) // Track if we've checked for token
    const router = useRouter()
    const { token } = useAuthStore()

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!tokenChecked) {
                setTimeout(() => setTokenChecked(true), 1000) // Give token 1 second to load
                return
            }

            if (!token) {
                console.log("[v0] No token available after waiting")
                setError("Authentication required")
                setLoading(false)
                return
            }

            console.log("[v0] Token available, fetching questions...")

            try {
                const response = await authService.generateOnboardingQuiz(token)
                console.log("[v0] Quiz questions response:", response)

                if (!response || !response.questions || !Array.isArray(response.questions)) {
                    console.error("[v0] Invalid response structure:", response)
                    setError("Invalid quiz data received from server")
                    setLoading(false)
                    return
                }

                const validQuestions = response.questions.filter((q: QuizQuestion) => {
                    const isValid = q && q.question && q.options && typeof q.options === "object"
                    if (!isValid) {
                        console.error("[v0] Invalid question structure:", q)
                    }
                    return isValid
                })

                if (validQuestions.length === 0) {
                    setError("No valid questions received from server")
                    setLoading(false)
                    return
                }

                console.log("[v0] Valid questions loaded:", validQuestions.length)
                setQuestions(validQuestions)
                setLoading(false)
            } catch (error) {
                console.error("[v0] Failed to fetch quiz questions:", error)
                setError(error instanceof Error ? error.message : "Failed to load quiz")
                setLoading(false)
            }
        }

        fetchQuestions()
    }, [token, tokenChecked]) // Also depend on tokenChecked

    // Timer logic
    useEffect(() => {
        if (loading) return

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
    }, [loading])

    // Format time remaining as MM:SS
    const formatTimeRemaining = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const handleAnswerSelect = (optionKey: string) => {
        setSelectedAnswer(optionKey)
    }

    const handleSubmit = async () => {
        if (selectedAnswer) {
            const questionKey = `question${currentQuestion + 1}`
            const newAnswers = { ...answers, [questionKey]: selectedAnswer }
            setAnswers(newAnswers)

            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
                setSelectedAnswer("")
            } else {
                await submitQuiz(newAnswers)
            }
        }
    }

    const submitQuiz = async (finalAnswers: Record<string, string>) => {
        if (!token) {
            console.error("No auth token available for quiz submission")
            return
        }

        setSubmitting(true)
        try {
            const response = await authService.submitOnboardingQuiz(finalAnswers, token)
            console.log("[v0] Quiz submission response:", response)

            // Pass results data to results page via URL params or localStorage
            if (response.results) {
                localStorage.setItem("quizResults", JSON.stringify(response.results))
            }

            router.push("/results")
        } catch (error) {
            console.error("Failed to submit quiz:", error)
            setError("Failed to submit quiz. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F7B844] mx-auto mb-4"></div>
                    <p className="text-[#212121]/70 font-[family-name:var(--font-space-grotesk)]">Quiz is loading...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-[family-name:var(--font-unbounded)] font-medium text-[#212121] mb-2">
                        Unable to Load Quiz
                    </h2>
                    <p className="text-[#212121]/70 font-[family-name:var(--font-space-grotesk)] mb-6">{error}</p>
                    <Button
                        onClick={() => router.push("/dashboard")}
                        className="bg-[#F7B844] hover:bg-[#F7B844]/90 text-[#212121] font-medium rounded-2xl px-6 py-2"
                    >
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        )
    }

    const currentQuestionData = questions[currentQuestion]
    const progress = Math.round(((currentQuestion + 1) / questions.length) * 100)

    console.log("[v0] Current question index:", currentQuestion)
    console.log("[v0] Current question data:", currentQuestionData)
    console.log("[v0] Questions array length:", questions.length)

    return (
        <div className="min-h-screen bg-[#F8F7F4] flex flex-col">
            {/* Header with progress and timer */}
            <header className="w-full max-w-3xl mx-auto px-4 py-6 flex flex-col gap-3">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-sm font-medium text-[#212121]/70 font-[family-name:var(--font-space-grotesk)]">
                        Psychological Assessment
                    </h2>
                    <div className="text-sm text-[#212121]/60 flex items-center gap-1 font-[family-name:var(--font-space-grotesk)]">
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
            Question {currentQuestion + 1} of {questions.length}
          </span>
                    <span>{progress}% complete</span>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-2xl">
                    {currentQuestionData && currentQuestionData.options && (
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
                                    {Object.entries(currentQuestionData.options).map(([key, option]) => (
                                        <button
                                            key={key}
                                            onClick={() => handleAnswerSelect(key)}
                                            className={`w-full flex items-center px-6 py-4.5 text-left transition-all duration-200 font-[family-name:var(--font-space-grotesk)] ${
                                                selectedAnswer === key ? "bg-[#25D366]/10 border-l-4 border-[#25D366]" : "hover:bg-[#F8F7F4]/50"
                                            }`}
                                        >
                                            <div
                                                className={`w-6 h-6 rounded-full flex items-center justify-center font-medium text-sm mr-4 flex-shrink-0 transition-all duration-200 ${
                                                    selectedAnswer === key ? "bg-[#25D366] text-white" : "bg-[#212121]/20 text-[#212121]/70"
                                                }`}
                                            >
                                                {key}
                                            </div>
                                            <span className="text-[#212121]">{typeof option === "string" ? option : option.text}</span>
                                        </button>
                                    ))}
                                </div>
                            </Card>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!selectedAnswer || submitting}
                                    className="w-full h-12 bg-[#F7B844] hover:bg-[#F7B844]/90 text-[#212121] font-medium rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-space-grotesk)]"
                                >
                                    {submitting
                                        ? "Submitting..."
                                        : currentQuestion === questions.length - 1
                                            ? "Complete Assessment"
                                            : "Continue"}
                                </Button>
                            </div>
                        </div>
                    )}

                    {!currentQuestionData && !loading && (
                        <div className="text-center">
                            <p className="text-[#212121]/70 font-[family-name:var(--font-space-grotesk)]">
                                Question data is not available. Please refresh the page.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
