"use client"

import {useState, useEffect} from "react"
import {ArrowLeft, Trophy, Clock, Loader2} from "lucide-react"
import {useRouter} from "next/navigation"
import {useAuthStore} from "@/store/authStore"

interface CaseStudyData {
    title: string
    protagonist_profile: {
        name: string
        analysis: string
    }
    case_file: {
        the_setup: string
        chapter_1_the_lay_of_the_land: string
        chapter_2_ghosts_in_the_machine: string
        chapter_3_the_informant: string
        chapter_4_the_reveal: string
        the_debriefing_the_path_forward: string
    }
    strategic_quiz: Array<{
        question: string
        options: string[]
    }>
}

// Default fallback case study data
const defaultCaseStudy = {
    title: "The Coffee Shop Mystery",
    protagonist_profile: {
        name: "Sarah Chen",
        analysis:
            "Sarah Chen, owner of 'Bean There' coffee shop in downtown Portland. Former marketing executive turned entrepreneur, opened the shop 18 months ago with high hopes and a solid business plan.",
    },
    case_file: {
        the_setup:
            "Bean There was thriving in its first year, averaging 200 customers daily. But over the past 6 months, foot traffic has dropped to just 80 customers per day. Revenue is down 60%, and Sarah is struggling to understand why.",
        chapter_1_the_lay_of_the_land:
            "Recent observations: 1) New Starbucks opened 2 blocks away, 2) Several regular customers haven't been seen in months, 3) Online reviews mention 'slow services' and 'limited seating', 4) Morning rush seems particularly affected, 5) Afternoon sales remain relatively stable.",
        chapter_2_ghosts_in_the_machine:
            "Regular customer Mike: 'I used to come every morning, but the wait got too long.' Barista Jenny: 'We're understaffed during peak hours.' Neighbor business owner: 'That new Starbucks has a drive-thru, very convenient for commuters.'",
        chapter_3_the_informant:
            "Your mission: Identify the core problem affecting Bean There's morning rush business and propose a solution based on customer interviews.",
        chapter_4_the_reveal: "",
        the_debriefing_the_path_forward: "",
    },
    strategic_quiz: [
        {
            question: "Based on the case file, what is the primary time period when Bean There is losing customers?",
            options: ["All day equally", "Morning rush hours", "Afternoon period", "Evening hours"],
        },
        {
            question: "What is the most likely reason customers are avoiding Bean There during morning rush?",
            options: ["Poor coffee quality", "Long wait times", "High prices", "Limited menu"],
        },
        {
            question: "What competitive advantage does the new Starbucks have that Bean There lacks?",
            options: ["Better coffee", "Lower prices", "Drive-thru services", "Larger space"],
        },
        {
            question: "Who is Bean There's most affected customer segment?",
            options: ["Students", "Morning commuters", "Afternoon workers", "Evening socializers"],
        },
        {
            question: "What operational issue is contributing to the problem?",
            options: ["Equipment failure", "Understaffing", "Poor location", "Expensive rent"],
        },
        {
            question: "Based on the evidence, what type of solution would most likely help Bean There?",
            options: ["Lower prices", "Faster services", "New menu items", "Bigger space"],
        },
        {
            question: "What remains stable in Bean There's business?",
            options: ["Morning sales", "Evening sales", "Afternoon sales", "Weekend sales"],
        },
        {
            question: "How significant is the business impact on Bean There?",
            options: ["Minor (10-20% drop)", "Moderate (30-40% drop)", "Severe (60% drop)", "Critical (80% drop)"],
        },
        {
            question: "What research method would be most valuable for understanding this problem?",
            options: ["Online surveys", "Customer interviews", "Competitor analysis", "Financial analysis"],
        },
        {
            question: "What should be the primary focus of customer interviews for this case?",
            options: ["Product preferences", "Pricing sensitivity", "Service experience", "Brand perception"],
        },
    ],
}

export default function CustomerDetectiveLevel() {
    const router = useRouter()
    const [currentStage, setCurrentStage] = useState(1)
    const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0)
    const [quizAnswers, setQuizAnswers] = useState<number[]>([])
    const [quizScore, setQuizScore] = useState(0)
    const [textAnswers, setTextAnswers] = useState<string[]>([])
    const [currentTextAnswer, setCurrentTextAnswer] = useState("")
    const [showQuizFeedback, setShowQuizFeedback] = useState(false)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false)
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
    const [isLoadingEndOfDay, setIsLoadingEndOfDay] = useState(false)
    const {
        currentCaseStudy,
        token,
        setQuizSubmissionResult,
        setPsychologyCourse,
        psychologyCourse,
        setEndOfDaySummary,
        endOfDaySummary,
    } = useAuthStore()
    const [caseStudy, setCaseStudy] = useState<CaseStudyData>(defaultCaseStudy)

    useEffect(() => {
        if (currentCaseStudy) {
            setCaseStudy(currentCaseStudy)
        }
    }, [currentCaseStudy])

    useEffect(() => {
        if (!endOfDaySummary && !isLoadingEndOfDay && currentStage === 6) {
            fetchEndOfDaySummary()
        }
    }, [endOfDaySummary, isLoadingEndOfDay, currentStage])

    const handleBackToDashboard = () => {
        router.push("/dashboard")
    }

    // Progress bar component
    const ProgressBar = ({current, total}: { current: number; total: number }) => (
        <div className="flex gap-1 mb-8">
            {Array.from({length: total}, (_, i) => (
                <div key={i} className={`flex-1 h-2 rounded-full ${i < current ? "bg-gray-800" : "bg-gray-300"}`}/>
            ))}
        </div>
    )

    const handleQuizSubmission = async () => {
        if (selectedOption === null || !token || !currentCaseStudy) return

        setIsSubmittingQuiz(true)

        try {
            // Prepare answers in the required format
            const answers: Record<string, string> = {}
            const currentQ = currentCaseStudy.strategic_quiz[currentQuizQuestion]
            answers[currentQ.question] = currentQ.options[selectedOption]

            // First API call: Submit case study quiz
            const quizResponse = await fetch("https://backend-ifcu.onrender.com/api/game/day/1/submit-case-study-quiz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({answers}),
            })

            const quizResult = await quizResponse.json()

            if (!quizResponse.ok) {
                throw new Error(quizResult.message || "Failed to submit quiz")
            }

            // Store quiz submission result
            setQuizSubmissionResult(quizResult)
            console.log("Day 1 case study quiz submitted successfully")

            // Second API call: Generate psychology course (only after quiz submission succeeds)
            const psychologyResponse = await fetch("https://backend-ifcu.onrender.com/api/game/day/1/generate-psychology-course", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const psychologyResult = await psychologyResponse.json()

            if (!psychologyResponse.ok) {
                throw new Error(psychologyResult.message || "Failed to generate psychology course")
            }

            // Store psychology course data
            setPsychologyCourse(psychologyResult)
            console.log("Day 1 psychology course generated successfully")

            // Update local state
            const newAnswers = [...quizAnswers, selectedOption]
            setQuizAnswers(newAnswers)
            setQuizScore(quizScore + 1) // For now, count all answers as correct
            setShowQuizFeedback(true)
        } catch (error) {
            console.error("Error submitting quiz or generating psychology course:", error)
            // Still show feedback even if API calls fail to maintain user experience
            const newAnswers = [...quizAnswers, selectedOption]
            setQuizAnswers(newAnswers)
            setQuizScore(quizScore + 1)
            setShowQuizFeedback(true)
        } finally {
            setIsSubmittingQuiz(false)
        }
    }

    const fetchEndOfDaySummary = async () => {
        if (!token) return

        setIsLoadingEndOfDay(true)

        try {
            const response = await fetch("https://backend-ifcu.onrender.com/api/game/day/1/end-of-day-summary", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || "Failed to fetch end-of-day summary")
            }

            setEndOfDaySummary(result)
            console.log("End-of-day summary fetched successfully")
        } catch (error) {
            console.error("Error fetching end-of-day summary:", error)
            setEndOfDaySummary({
                summary_title: "Day 1: Great Start!",
                narrative:
                    "You've completed your first day as a Customer Detective! Your analytical skills and dedication to understanding customer needs show great promise for entrepreneurial success.",
                key_wins: [
                    "Successfully analyzed the coffee shop case study",
                    "Completed customer interview training",
                    "Demonstrated strong problem-solving abilities",
                ],
                focus_areas: [
                    "Continue developing customer empathy skills",
                    "Practice active listening techniques",
                    "Build confidence in customer interactions",
                ],
                suggested_plan_for_tomorrow: [
                    "Review today's learnings and take notes",
                    "Practice interview questions with friends or family",
                    "Observe customer behavior in real-world settings",
                ],
            })
        } finally {
            setIsLoadingEndOfDay(false)
        }
    }

    // Stage 1: Study the Case File
    if (currentStage === 1) {
        return (
            <div className="min-h-screen bg-[#F8F7F4] px-4 py-6 max-w-sm mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={handleBackToDashboard}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E0E0E0]"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600"/>
                    </button>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600"/>
                        <span className="text-sm text-gray-600 font-medium">04:50</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-[#111111] mb-6 leading-tight">{caseStudy.title}</h1>
                    </div>

                    <div className="bg-white rounded-3xl p-6 space-y-6 border border-[#E0E0E0]">
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-3">Protagonist Profile</h2>
                            <div className="space-y-2">
                                <p className="text-gray-900 font-semibold">{caseStudy.protagonist_profile.name}</p>
                                <p className="text-gray-700 leading-relaxed">{caseStudy.protagonist_profile.analysis}</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-3">The Setup</h2>
                            <p className="text-gray-700 leading-relaxed">{caseStudy.case_file.the_setup}</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-3">Chapter 1: The Lay of the Land</h2>
                            <p className="text-gray-700 leading-relaxed">{caseStudy.case_file.chapter_1_the_lay_of_the_land}</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-3">Chapter 2: Ghosts in the Machine</h2>
                            <p className="text-gray-700 leading-relaxed">{caseStudy.case_file.chapter_2_ghosts_in_the_machine}</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-3">Chapter 3: The Informant</h2>
                            <p className="text-gray-700 leading-relaxed">{caseStudy.case_file.chapter_3_the_informant}</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-3">Chapter 4: The Reveal</h2>
                            <p className="text-gray-700 leading-relaxed">{caseStudy.case_file.chapter_4_the_reveal}</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-3">The Debriefing: The Path Forward</h2>
                            <p className="text-gray-700 leading-relaxed">{caseStudy.case_file.the_debriefing_the_path_forward}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setCurrentStage(2)}
                        className="w-full bg-[#212121] text-white rounded-full py-4 font-bold"
                    >
                        Start the Investigation
                    </button>
                </div>
            </div>
        )
    }

    // Stage 2: Analyze the Case (MCQ Quiz)
    if (currentStage === 2) {
        const currentQ = caseStudy.strategic_quiz[currentQuizQuestion]

        if (showQuizFeedback) {
            return (
                <div className="min-h-screen bg-[#F8F7F4] px-4 py-6 max-w-sm mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={handleBackToDashboard}
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E0E0E0]"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600"/>
                        </button>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-600"/>
                            <span className="text-sm text-gray-600 font-medium">04:50</span>
                        </div>
                    </div>

                    <ProgressBar current={currentQuizQuestion + 1} total={caseStudy.strategic_quiz.length}/>

                    <div className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-[#111111] mb-4 leading-tight">Answer submitted!</h1>
                        </div>

                        <div className="bg-white rounded-3xl p-6 border border-[#E0E0E0]">
                            <p className="text-gray-700 leading-relaxed">
                                Thank you for your response. {"Let's"} continue with the next question.
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                setShowQuizFeedback(false)
                                setSelectedOption(null)
                                if (currentQuizQuestion < caseStudy.strategic_quiz.length - 1) {
                                    setCurrentQuizQuestion(currentQuizQuestion + 1)
                                } else {
                                    setCurrentStage(3)
                                }
                            }}
                            className="w-full bg-[#212121] text-white rounded-full py-4 font-bold"
                        >
                            {currentQuizQuestion < caseStudy.strategic_quiz.length - 1 ? "Next Question" : "Continue to Training"}
                        </button>
                    </div>
                </div>
            )
        }

        return (
            <div className="min-h-screen bg-[#F8F7F4] px-4 py-6 max-w-sm mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={handleBackToDashboard}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E0E0E0]"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600"/>
                    </button>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600"/>
                        <span className="text-sm text-gray-600 font-medium">04:50</span>
                    </div>
                </div>

                <ProgressBar current={currentQuizQuestion + 1} total={caseStudy.strategic_quiz.length}/>

                <div className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-[#111111] mb-4 leading-tight">{currentQ.question}</h1>
                    </div>

                    <div className="space-y-3">
                        {currentQ.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedOption(index)}
                                disabled={isSubmittingQuiz}
                                className={`w-full p-4 rounded-full text-left font-medium transition-colors ${
                                    selectedOption === index
                                        ? "bg-yellow-400 text-black"
                                        : "bg-yellow-200 text-gray-800 hover:bg-yellow-300"
                                } ${isSubmittingQuiz ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleQuizSubmission}
                        disabled={selectedOption === null || isSubmittingQuiz}
                        className={`w-full rounded-full py-4 font-bold text-white flex items-center justify-center gap-2 ${
                            selectedOption !== null && !isSubmittingQuiz ? "bg-[#212121]" : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        {isSubmittingQuiz ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin"/>
                                Submitting...
                            </>
                        ) : (
                            "Submit Answer"
                        )}
                    </button>
                </div>
            </div>
        )
    }

    // Stage 3: Learn Interview Psychology
    if (currentStage === 3) {
        if (!psychologyCourse) {
            return (
                <div className="min-h-screen bg-[#F8F7F4] px-4 py-6 max-w-sm mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={handleBackToDashboard}
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E0E0E0]"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600"/>
                        </button>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-600"/>
                            <span className="text-sm text-gray-600 font-medium">04:50</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-[#111111] mb-4 leading-tight">Loading Psychology
                                Course...</h1>
                        </div>

                        <div className="bg-white rounded-3xl p-6 border border-[#E0E0E0]">
                            <p className="text-gray-700 leading-relaxed text-center">
                                Please wait while we prepare your personalized psychology course content.
                            </p>
                        </div>
                    </div>
                </div>
            )
        }

        const currentModule = psychologyCourse.modules[currentModuleIndex]
        const currentLesson = currentModule?.lessons[currentLessonIndex]

        return (
            <div className="min-h-screen bg-[#F8F7F4] px-4 py-6 max-w-sm mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={handleBackToDashboard}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E0E0E0]"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600"/>
                    </button>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600"/>
                        <span className="text-sm text-gray-600 font-medium">04:50</span>
                    </div>
                </div>

                <ProgressBar current={3} total={6}/>

                <div className="space-y-6">
                    {/* Course Header */}
                    {currentModuleIndex === 0 && currentLessonIndex === 0 && (
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-[#111111] mb-2 leading-tight">{psychologyCourse.course_title}</h1>
                            <p className="text-gray-600 text-sm leading-relaxed">{psychologyCourse.introduction}</p>
                        </div>
                    )}

                    {/* Module Header */}
                    <div className="bg-blue-50 rounded-3xl p-4 border border-blue-200">
                        <h2 className="text-lg font-bold text-blue-900 mb-2">{currentModule.module_title}</h2>
                        <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                Focus: {currentModule.focus_trait}
              </span>
                        </div>
                        <p className="text-blue-800 text-sm leading-relaxed">{currentModule.importance}</p>
                    </div>

                    {/* Lesson Content */}
                    <div className="bg-white rounded-3xl p-6 border border-[#E0E0E0] space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{currentLesson.lesson_title}</h3>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Concept:</h4>
                                <p className="text-gray-700 leading-relaxed text-sm">{currentLesson.concept}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Action Steps:</h4>
                                <div className="space-y-2">
                                    {currentLesson.actionable_steps.map((step, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                            <div
                                                className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-xs font-bold text-gray-700">{index + 1}</span>
                                            </div>
                                            <span className="text-gray-700 text-sm leading-relaxed">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                                <h4 className="font-semibold text-yellow-800 mb-2">Example:</h4>
                                <p className="text-yellow-800 text-sm leading-relaxed">{currentLesson.example_scenario}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-3">
                        {(currentModuleIndex > 0 || currentLessonIndex > 0) && (
                            <button
                                onClick={() => {
                                    if (currentLessonIndex > 0) {
                                        setCurrentLessonIndex(currentLessonIndex - 1)
                                    } else if (currentModuleIndex > 0) {
                                        setCurrentModuleIndex(currentModuleIndex - 1)
                                        setCurrentLessonIndex(psychologyCourse.modules[currentModuleIndex - 1].lessons.length - 1)
                                    }
                                }}
                                className="flex-1 bg-gray-200 text-gray-800 rounded-full py-4 font-bold"
                            >
                                Previous
                            </button>
                        )}

                        <button
                            onClick={() => {
                                const isLastLessonInModule = currentLessonIndex === currentModule.lessons.length - 1
                                const isLastModule = currentModuleIndex === psychologyCourse.modules.length - 1

                                if (isLastLessonInModule && isLastModule) {
                                    // Finished all modules, go to next stage
                                    setCurrentStage(4)
                                } else if (isLastLessonInModule) {
                                    // Move to next module
                                    setCurrentModuleIndex(currentModuleIndex + 1)
                                    setCurrentLessonIndex(0)
                                } else {
                                    // Move to next lesson
                                    setCurrentLessonIndex(currentLessonIndex + 1)
                                }
                            }}
                            className="flex-1 bg-[#212121] text-white rounded-full py-4 font-bold"
                        >
                            {currentLessonIndex === currentModule.lessons.length - 1 &&
                            currentModuleIndex === psychologyCourse.modules.length - 1
                                ? "Complete Training"
                                : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Stage 4: Match with a Customer (Action Prompt)
    if (currentStage === 4) {
        return (
            <div className="min-h-screen bg-[#F8F7F4] px-4 py-6 max-w-sm mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={handleBackToDashboard}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E0E0E0]"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600"/>
                    </button>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600"/>
                        <span className="text-sm text-gray-600 font-medium">04:50</span>
                    </div>
                </div>

                <ProgressBar current={4} total={6}/>

                <div className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-[#111111] mb-6 leading-tight">
                            {
                                "You're ready for the field. Conduct your interview with the matched customer. Take notes, and return here when you're ready to summarize your findings."
                            }
                        </h1>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-[#E0E0E0]">
                        <div className="text-center mb-6">
                            <div
                                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Field Mission</h2>
                            <p className="text-gray-600">Interview one person about their coffee shop experiences</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                                <span
                                    className="text-gray-700 font-medium">Find someone who drinks coffee regularly</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                                <span
                                    className="text-gray-700 font-medium">Ask about their coffee shop preferences</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                                <span className="text-gray-700 font-medium">Take detailed notes</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setCurrentStage(5)}
                        className="w-full bg-[#212121] text-white rounded-full py-4 font-bold"
                    >
                        {"I've"} Completed the Interview
                    </button>
                </div>
            </div>
        )
    }

    // Stage 5: Summarize the Meet
    if (currentStage === 5) {
        return (
            <div className="min-h-screen bg-[#F8F7F4] px-4 py-6 max-w-sm mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={handleBackToDashboard}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E0E0E0]"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600"/>
                    </button>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600"/>
                        <span className="text-sm text-gray-600 font-medium">04:50</span>
                    </div>
                </div>

                <ProgressBar current={5} total={6}/>

                <div className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-[#111111] mb-4 leading-tight">
                            {
                                "Welcome back, Detective. Based on your conversation, what was the customer's single biggest pain point? Describe it in one sentence."
                            }
                        </h1>
                    </div>

                    <div className="bg-yellow-400 rounded-3xl p-6 min-h-[120px] flex items-center">
            <textarea
                value={currentTextAnswer}
                onChange={(e) => setCurrentTextAnswer(e.target.value)}
                placeholder="Write down your answer here..."
                className="w-full bg-transparent text-black placeholder-gray-700 resize-none focus:outline-none text-lg font-medium"
                rows={4}
            />
                    </div>

                    <button
                        onClick={() => {
                            setTextAnswers([...textAnswers, currentTextAnswer])
                            setCurrentTextAnswer("")
                            setCurrentStage(6)
                        }}
                        disabled={!currentTextAnswer.trim()}
                        className={`w-full rounded-full py-4 font-bold text-white ${
                            currentTextAnswer.trim() ? "bg-[#212121]" : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Submit Answer
                    </button>
                </div>
            </div>
        )
    }

    // Stage 6: Show the Results (Mission Debriefing)
    if (currentStage === 6) {
        if (isLoadingEndOfDay || !endOfDaySummary) {
            return (
                <div className="min-h-screen bg-[#F8F7F4] px-4 py-6 max-w-sm mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={handleBackToDashboard}
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E0E0E0]"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600"/>
                        </button>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-600"/>
                            <span className="text-sm text-gray-600 font-medium">04:50</span>
                        </div>
                    </div>

                    <ProgressBar current={6} total={6}/>

                    <div className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-[#111111] mb-4 leading-tight">Generating Your
                                Results...</h1>
                        </div>

                        <div className="bg-white rounded-3xl p-6 border border-[#E0E0E0]">
                            <div className="flex items-center justify-center">
                                <Loader2 className="w-8 h-8 animate-spin text-gray-600"/>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-center mt-4">
                                Please wait while we calculate your performance and generate your personalized summary.
                            </p>
                        </div>
                    </div>
                </div>
            )
        }

        const randomScore = Math.floor(Math.random() * 30) + 70 // Random score between 70-100
        const randomXP = randomScore * 5 + Math.floor(Math.random() * 50) // XP based on score with some randomness

        return (
            <div className="min-h-screen bg-[#F8F7F4] px-4 py-6 max-w-sm mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={handleBackToDashboard}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E0E0E0]"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600"/>
                    </button>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600"/>
                        <span className="text-sm text-gray-600 font-medium">04:50</span>
                    </div>
                </div>

                <ProgressBar current={6} total={6}/>

                <div className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-[#111111] mb-4 leading-tight">{endOfDaySummary.summary_title}</h1>
                    </div>

                    <div className="bg-gradient-to-br from-orange-400 to-yellow-500 rounded-3xl p-6 text-white">
                        <div className="text-center mb-6">
                            <div
                                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trophy className="w-8 h-8 text-white"/>
                            </div>
                            <div className="text-4xl font-bold mb-2">{randomScore}/100</div>
                            <div className="text-lg font-medium">Overall Score</div>
                        </div>

                        <div className="bg-white/20 rounded-2xl p-4 mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">XP Gained</span>
                                <span className="font-bold">+{randomXP} XP</span>
                            </div>
                            <div className="bg-white rounded-full h-3">
                                <div className="bg-white rounded-full h-3"
                                     style={{width: `${Math.min(randomScore, 100)}%`}}></div>
                            </div>
                        </div>

                        <div className="bg-white/20 rounded-2xl p-4 mb-4">
                            <p className="text-sm leading-relaxed">{endOfDaySummary.narrative}</p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-bold text-lg">Key Wins:</h3>
                            <div className="space-y-2">
                                {endOfDaySummary.key_wins.map((win, index) => (
                                    <div key={index} className="bg-white/20 rounded-xl p-3">
                                        <span className="text-sm">✓ {win}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 space-y-3">
                            <h3 className="font-bold text-lg">Focus Areas:</h3>
                            <div className="space-y-2">
                                {endOfDaySummary.focus_areas.map((area, index) => (
                                    <div key={index} className="bg-white/20 rounded-xl p-3">
                                        <span className="text-sm">→ {area}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 space-y-3">
                            <h3 className="font-bold text-lg">{"Tomorrow's"} Plan:</h3>
                            <div className="space-y-2">
                                {endOfDaySummary.suggested_plan_for_tomorrow.map((plan, index) => (
                                    <div key={index} className="bg-white/20 rounded-xl p-3">
                    <span className="text-sm">
                      {index + 1}. {plan}
                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleBackToDashboard}
                        className="w-full bg-[#212121] text-white rounded-full py-4 font-bold"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        )
    }

    return null
}
