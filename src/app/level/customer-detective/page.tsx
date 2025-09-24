"use client"

import { useState } from "react"
import { ArrowLeft, Trophy, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

// Sample case study data
const caseStudy = {
    title: "The Coffee Shop Mystery",
    protagonist_profile:
        "Sarah Chen, owner of 'Bean There' coffee shop in downtown Portland. Former marketing executive turned entrepreneur, opened the shop 18 months ago with high hopes and a solid business plan.",
    case_file: {
        setup:
            "Bean There was thriving in its first year, averaging 200 customers daily. But over the past 6 months, foot traffic has dropped to just 80 customers per day. Revenue is down 60%, and Sarah is struggling to understand why.",
        evidence:
            "Recent observations: 1) New Starbucks opened 2 blocks away, 2) Several regular customers haven't been seen in months, 3) Online reviews mention 'slow services' and 'limited seating', 4) Morning rush seems particularly affected, 5) Afternoon sales remain relatively stable.",
        witness_statements:
            "Regular customer Mike: 'I used to come every morning, but the wait got too long.' Barista Jenny: 'We're understaffed during peak hours.' Neighbor business owner: 'That new Starbucks has a drive-thru, very convenient for commuters.'",
        debriefing:
            "Your mission: Identify the core problem affecting Bean There's morning rush business and propose a solution based on customer interviews.",
    },
    strategic_quiz: [
        {
            question: "Based on the case file, what is the primary time period when Bean There is losing customers?",
            options: ["All day equally", "Morning rush hours", "Afternoon period", "Evening hours"],
            correct: 1,
            rationale:
                "The evidence clearly indicates that 'Morning rush seems particularly affected' while 'Afternoon sales remain relatively stable.'",
        },
        {
            question: "What is the most likely reason customers are avoiding Bean There during morning rush?",
            options: ["Poor coffee quality", "Long wait times", "High prices", "Limited menu"],
            correct: 1,
            rationale:
                "Customer Mike specifically mentioned 'the wait got too long' and the barista noted they're 'understaffed during peak hours.'",
        },
        {
            question: "What competitive advantage does the new Starbucks have that Bean There lacks?",
            options: ["Better coffee", "Lower prices", "Drive-thru services", "Larger space"],
            correct: 2,
            rationale:
                "The neighbor specifically mentioned 'That new Starbucks has a drive-thru, very convenient for commuters.'",
        },
        {
            question: "Who is Bean There's most affected customer segment?",
            options: ["Students", "Morning commuters", "Afternoon workers", "Evening socializers"],
            correct: 1,
            rationale:
                "The evidence points to morning rush being affected, and the drive-thru convenience for commuters suggests this is the key segment.",
        },
        {
            question: "What operational issue is contributing to the problem?",
            options: ["Equipment failure", "Understaffing", "Poor location", "Expensive rent"],
            correct: 1,
            rationale:
                "Barista Jenny directly stated 'We're understaffed during peak hours,' which explains the long wait times.",
        },
        {
            question: "Based on the evidence, what type of solution would most likely help Bean There?",
            options: ["Lower prices", "Faster services", "New menu items", "Bigger space"],
            correct: 1,
            rationale:
                "Since the main issues are long wait times and understaffing during rush hours, improving services speed would address the core problem.",
        },
        {
            question: "What remains stable in Bean There's business?",
            options: ["Morning sales", "Evening sales", "Afternoon sales", "Weekend sales"],
            correct: 2,
            rationale:
                "The case explicitly states 'Afternoon sales remain relatively stable,' indicating this time period is not affected.",
        },
        {
            question: "How significant is the business impact on Bean There?",
            options: ["Minor (10-20% drop)", "Moderate (30-40% drop)", "Severe (60% drop)", "Critical (80% drop)"],
            correct: 2,
            rationale:
                "The case states 'Revenue is down 60%' and daily customers dropped from 200 to 80, which is a 60% decrease.",
        },
        {
            question: "What research method would be most valuable for understanding this problem?",
            options: ["Online surveys", "Customer interviews", "Competitor analysis", "Financial analysis"],
            correct: 1,
            rationale:
                "Since the problem involves customer behavior changes and services experience, direct customer interviews would provide the most valuable insights.",
        },
        {
            question: "What should be the primary focus of customer interviews for this case?",
            options: ["Product preferences", "Pricing sensitivity", "Service experience", "Brand perception"],
            correct: 2,
            rationale:
                "Given that the main issues are wait times and services speed, focusing on services experience would yield the most actionable insights.",
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

    const handleBackToDashboard = () => {
        router.push("/")
    }

    // Progress bar component
    const ProgressBar = ({ current, total }: { current: number; total: number }) => (
        <div className="flex gap-1 mb-8">
            {Array.from({ length: total }, (_, i) => (
                <div key={i} className={`flex-1 h-2 rounded-full ${i < current ? "bg-gray-800" : "bg-gray-300"}`} />
            ))}
        </div>
    )

    // Stage 1: Study the Case File
    if (currentStage === 1) {
        return (
            <div className="min-h-screen bg-[#F8F7F4] px-4 py-6 max-w-sm mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={handleBackToDashboard}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E0E0E0]"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
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
                            <p className="text-gray-700 leading-relaxed">{caseStudy.protagonist_profile}</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-3">The Setup</h2>
                            <p className="text-gray-700 leading-relaxed">{caseStudy.case_file.setup}</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-3">Evidence</h2>
                            <p className="text-gray-700 leading-relaxed">{caseStudy.case_file.evidence}</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-3">Witness Statements</h2>
                            <p className="text-gray-700 leading-relaxed">{caseStudy.case_file.witness_statements}</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-3">The Debriefing</h2>
                            <p className="text-gray-700 leading-relaxed">{caseStudy.case_file.debriefing}</p>
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
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-600 font-medium">04:50</span>
                        </div>
                    </div>

                    <ProgressBar current={currentQuizQuestion + 1} total={10} />

                    <div className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-[#111111] mb-4 leading-tight">
                                {selectedOption === currentQ.correct ? "Correct!" : "Not quite right."}
                            </h1>
                        </div>

                        <div className="bg-white rounded-3xl p-6 border border-[#E0E0E0]">
                            <p className="text-gray-700 leading-relaxed">{currentQ.rationale}</p>
                        </div>

                        <button
                            onClick={() => {
                                setShowQuizFeedback(false)
                                setSelectedOption(null)
                                if (currentQuizQuestion < 9) {
                                    setCurrentQuizQuestion(currentQuizQuestion + 1)
                                } else {
                                    setCurrentStage(3)
                                }
                            }}
                            className="w-full bg-[#212121] text-white rounded-full py-4 font-bold"
                        >
                            {currentQuizQuestion < 9 ? "Next Question" : "Continue to Training"}
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
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600 font-medium">04:50</span>
                    </div>
                </div>

                <ProgressBar current={currentQuizQuestion + 1} total={10} />

                <div className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-[#111111] mb-4 leading-tight">{currentQ.question}</h1>
                    </div>

                    <div className="space-y-3">
                        {currentQ.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedOption(index)}
                                className={`w-full p-4 rounded-full text-left font-medium transition-colors ${
                                    selectedOption === index
                                        ? "bg-yellow-400 text-black"
                                        : "bg-yellow-200 text-gray-800 hover:bg-yellow-300"
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            if (selectedOption !== null) {
                                const newAnswers = [...quizAnswers, selectedOption]
                                setQuizAnswers(newAnswers)
                                if (selectedOption === currentQ.correct) {
                                    setQuizScore(quizScore + 1)
                                }
                                setShowQuizFeedback(true)
                            }
                        }}
                        disabled={selectedOption === null}
                        className={`w-full rounded-full py-4 font-bold text-white ${
                            selectedOption !== null ? "bg-[#212121]" : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Submit Answer
                    </button>
                </div>
            </div>
        )
    }

    // Stage 3: Learn Interview Psychology
    if (currentStage === 3) {
        return (
            <div className="min-h-screen bg-[#F8F7F4] px-4 py-6 max-w-sm mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={handleBackToDashboard}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E0E0E0]"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600 font-medium">04:50</span>
                    </div>
                </div>

                <ProgressBar current={3} total={6} />

                <div className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-[#111111] mb-4 leading-tight">
                            You've learned the 'Five Whys' technique. If a customer says 'I need a faster way to order coffee,' what
                            would your FIRST 'why' question be?
                        </h1>
                    </div>

                    <div className="bg-yellow-400 rounded-3xl p-6 min-h-[120px] flex items-center">
            <textarea
                value={currentTextAnswer}
                onChange={(e) => setCurrentTextAnswer(e.target.value)}
                placeholder="Write your first 'why' question here..."
                className="w-full bg-transparent text-black placeholder-gray-700 resize-none focus:outline-none text-lg font-medium"
                rows={4}
            />
                    </div>

                    <button
                        onClick={() => {
                            setTextAnswers([...textAnswers, currentTextAnswer])
                            setCurrentTextAnswer("")
                            setCurrentStage(4)
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

    // Stage 4: Match with a Customer (Action Prompt)
    if (currentStage === 4) {
        return (
            <div className="min-h-screen bg-[#F8F7F4] px-4 py-6 max-w-sm mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={handleBackToDashboard}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E0E0E0]"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600 font-medium">04:50</span>
                    </div>
                </div>

                <ProgressBar current={4} total={6} />

                <div className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-[#111111] mb-6 leading-tight">
                            You're ready for the field. Conduct your interview with the matched customer. Take notes, and return here
                            when you're ready to summarize your findings.
                        </h1>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-[#E0E0E0]">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Field Mission</h2>
                            <p className="text-gray-600">Interview one person about their coffee shop experiences</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                                <span className="text-gray-700 font-medium">Find someone who drinks coffee regularly</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                                <span className="text-gray-700 font-medium">Ask about their coffee shop preferences</span>
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
                        I've Completed the Interview
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
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600 font-medium">04:50</span>
                    </div>
                </div>

                <ProgressBar current={5} total={6} />

                <div className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-[#111111] mb-4 leading-tight">
                            Welcome back, Detective. Based on your conversation, what was the customer's single biggest pain point?
                            Describe it in one sentence.
                        </h1>
                    </div>

                    <div className="bg-yellow-400 rounded-3xl p-6 min-h-[120px] flex items-center">
            <textarea
                value={currentTextAnswer}
                onChange={(e) => setCurrentTextAnswer(e.target.value)}
                placeholder="Write down your unswear here..."
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
        const finalScore = Math.round((quizScore / 10) * 100)

        return (
            <div className="min-h-screen bg-[#F8F7F4] px-4 py-6 max-w-sm mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={handleBackToDashboard}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E0E0E0]"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600 font-medium">04:50</span>
                    </div>
                </div>

                <ProgressBar current={6} total={6} />

                <div className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-[#111111] mb-6 leading-tight">Case Closed: Debriefing</h1>
                    </div>

                    <div className="bg-gradient-to-br from-orange-400 to-yellow-500 rounded-3xl p-6 text-white">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trophy className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-4xl font-bold mb-2">{finalScore}/100</div>
                            <div className="text-lg font-medium">Overall Score</div>
                        </div>

                        <div className="bg-white/20 rounded-2xl p-4 mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">XP Gained</span>
                                <span className="font-bold">+{finalScore * 5} XP</span>
                            </div>
                            <div className="bg-white/20 rounded-full h-3">
                                <div className="bg-white rounded-full h-3" style={{ width: `${Math.min(finalScore, 100)}%` }}></div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-bold text-lg">Patterns Identified:</h3>
                            <div className="space-y-2">
                                <div className="bg-white/20 rounded-xl p-3">
                                    <span className="text-sm">• Service speed is critical for morning commuters</span>
                                </div>
                                <div className="bg-white/20 rounded-xl p-3">
                                    <span className="text-sm">• Convenience features drive customer loyalty</span>
                                </div>
                                <div className="bg-white/20 rounded-xl p-3">
                                    <span className="text-sm">• Operational efficiency impacts customer experience</span>
                                </div>
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
