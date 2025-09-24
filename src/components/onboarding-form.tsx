"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { authService } from "@/services/authService"

interface OnboardingStep {
    id: number
    question: string
    placeholder: string
    type: "textarea" | "select"
    options?: string[]
}

const onboardingSteps: OnboardingStep[] = [
    {
        id: 1,
        question: "Write a brief about your business idea",
        placeholder: "Describe your innovative business concept here...",
        type: "textarea",
    },
    {
        id: 2,
        question: "Which industry does your idea belong to?",
        placeholder: "Select your industry or write a custom one...",
        type: "textarea",
    },
    {
        id: 3,
        question: "Tell us a little about yourself",
        placeholder: "Share your background and experience...",
        type: "textarea",
    },
]

export function OnboardingForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedArchetype, setSelectedArchetype] = useState<string>("I will give you a business idea. From the following five archetypes — Hero, Mentor, Shadow, Trickster, Innocent —  Hero, Mentor, Shadow, Trickster, Innocent — choose one based on the business idea.")
    const router = useRouter()
    const { user, token } = useAuthStore()

    useEffect(() => {
        const archetype = localStorage.getItem("selectedArchetype")
        if (archetype) {
            setSelectedArchetype(archetype)
        }
    }, [])

    const handleAnswerChange = (stepId: number, value: string) => {
        setAnswers((prev) => ({ ...prev, [stepId]: value }))
    }

    const handleProceed = async () => {
        if (currentStep < onboardingSteps.length) {
            setCurrentStep(currentStep + 1)
        } else {
            await completeOnboarding()
        }
    }

    const completeOnboarding = async () => {
        if (!token || !selectedArchetype || !answers[1]) {
            console.error("Missing required data for onboarding completion")
            return
        }

        setIsSubmitting(true)
        try {
            await authService.completeOnboardingProfile(
                selectedArchetype,
                answers[1], // Business idea from step 1
                token,
            )

            // Clear the stored archetype
            localStorage.removeItem("selectedArchetype")

            console.log("Onboarding completed successfully")
            router.push("/character")
        } catch (error) {
            console.error("Failed to complete onboarding:", error)
            // Handle error - maybe show a toast or error message
        } finally {
            setIsSubmitting(false)
        }
    }

    const currentStepData = onboardingSteps.find((step) => step.id === currentStep)
    const progress = (currentStep / onboardingSteps.length) * 100

    return (
        <div className="min-h-screen bg-[#F8F7F4] relative overflow-hidden">
            <div className="absolute w-16 h-16 bg-[#F7B844] rounded-full top-20 left-8 opacity-60"></div>
            <div className="absolute w-12 h-12 bg-[#F95C8A] rounded-full top-32 right-12 opacity-60"></div>
            <div className="absolute w-20 h-20 bg-[#25D366] rounded-full bottom-40 left-16 opacity-60"></div>
            <div className="absolute w-14 h-14 bg-[#F7B844] rounded-full bottom-20 right-20 opacity-60"></div>
            <div className="absolute w-10 h-10 bg-[#F95C8A] rounded-full top-1/2 left-4 opacity-60"></div>
            <div className="absolute w-18 h-18 bg-[#25D366] rounded-full top-1/3 right-8 opacity-60"></div>

            {/* Abstract pattern overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
            </div>

            <div className="relative z-10 px-6 py-8">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="flex space-x-2">
                            {onboardingSteps.map((step) => (
                                <div
                                    key={step.id}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        step.id <= currentStep ? "bg-[#212121]" : "bg-white/50"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2 max-w-xs mx-auto">
                        <div
                            className="bg-[#212121] h-2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div className="max-w-md mx-auto">
                    {currentStepData && (
                        <div className="animate-slide-up">
                            <h1 className="text-2xl font-[family-name:var(--font-unbounded)] font-bold text-[#212121] mb-8 text-center leading-tight">
                                {currentStepData.question}
                            </h1>

                            <Card className="bg-white/95 backdrop-blur-sm border-0 rounded-3xl p-6 shadow-sm mb-6 animate-bounce-in">
                                <Textarea
                                    placeholder={currentStepData.placeholder}
                                    value={answers[currentStep] || ""}
                                    onChange={(e) => handleAnswerChange(currentStep, e.target.value)}
                                    className="min-h-[200px] bg-transparent border-0 text-[#212121] placeholder:text-[#212121]/60 text-lg resize-none focus:ring-0 focus:outline-none font-[family-name:var(--font-space-grotesk)]"
                                    style={{ boxShadow: "none" }}
                                />

                                {/* Proceed Button */}
                                <div className="mt-6">
                                    <Button
                                        onClick={handleProceed}
                                        disabled={!answers[currentStep]?.trim() || isSubmitting}
                                        className="w-full h-14 bg-[#F7B844] hover:bg-[#F7B844]/90 text-[#212121] text-lg font-bold rounded-2xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-[family-name:var(--font-space-grotesk)]"
                                    >
                                        {isSubmitting ? "Completing..." : currentStep === onboardingSteps.length ? "Complete" : "Proceed"}
                                    </Button>
                                </div>
                            </Card>

                            {/* Step indicator */}
                            <div className="text-center">
                <span className="text-[#212121]/60 text-sm font-[family-name:var(--font-space-grotesk)]">
                  Step {currentStep} of {onboardingSteps.length}
                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
