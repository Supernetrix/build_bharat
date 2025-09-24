"use client"
import {
    Play,
    Lock,
    Timer,
    History,
    Calendar,
    RotateCcw,
    Pause,
    SkipForward,
    Target,
    Zap,
    Trophy,
    Star,
    Loader2,
} from "lucide-react"
import {useState, useEffect} from "react"
import {Carousel, CarouselContent, CarouselItem, type CarouselApi} from "@/components/ui/carousel"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"
import {useAuthStore} from "@/store/authStore"
import type React from "react"
import { useRouter } from "next/navigation";

const BASE_URL = "https://backend-ifcu.onrender.com/api"

interface GameCardType {
    id: number
    title: string
    online: string
    bgTop: string
    bgBottom: string
    character: string
    level: number
    isUnlocked: boolean
    isCompleted: boolean
    progress: number
    stars: number
    difficulty: string
    reward: string
}

const gameCards: GameCardType[] = [
    {
        id: 1,
        title: "Tebak Gambar",
        online: "8,472",
        bgTop: "#F7B844",
        bgBottom: "#F95C8A",
        character: "pink",
        level: 1,
        isUnlocked: true,
        isCompleted: true,
        progress: 100,
        stars: 3,
        difficulty: "Easy",
        reward: "50 coins",
    },
    {
        id: 2,
        title: "Word Quest",
        online: "5,231",
        bgTop: "#4ECDC4",
        bgBottom: "#44A08D",
        character: "blue",
        level: 2,
        isUnlocked: false,
        isCompleted: false,
        progress: 65,
        stars: 2,
        difficulty: "Medium",
        reward: "75 coins",
    },
    {
        id: 3,
        title: "Math Hero",
        online: "3,847",
        bgTop: "#A8E6CF",
        bgBottom: "#7FCDCD",
        character: "green",
        level: 3,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        stars: 0,
        difficulty: "Hard",
        reward: "100 coins",
    },
    {
        id: 4,
        title: "Color Match",
        online: "6,592",
        bgTop: "#FFB6C1",
        bgBottom: "#FFA07A",
        character: "coral",
        level: 4,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        stars: 0,
        difficulty: "Medium",
        reward: "80 coins",
    },
    {
        id: 5,
        title: "Brain Teaser",
        online: "4,156",
        bgTop: "#DDA0DD",
        bgBottom: "#9370DB",
        character: "purple",
        level: 5,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        stars: 0,
        difficulty: "Expert",
        reward: "150 coins",
    },
    {
        id: 6,
        title: "Speed Quiz",
        online: "7,823",
        bgTop: "#F0E68C",
        bgBottom: "#DAA520",
        character: "yellow",
        level: 6,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        stars: 0,
        difficulty: "Hard",
        reward: "120 coins",
    },
    {
        id: 7,
        title: "Memory Game",
        online: "2,945",
        bgTop: "#87CEEB",
        bgBottom: "#4682B4",
        character: "sky",
        level: 7,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        stars: 0,
        difficulty: "Expert",
        reward: "200 coins",
    },
]

const difficultyColors = {
    Easy: "#4ADE80",
    Medium: "#F59E0B",
    Hard: "#EF4444",
    Expert: "#8B5CF6",
}

const GameCard = ({game, isActive}: { game: GameCardType; isActive: boolean }) => {
    const [isGeneratingCaseStudy, setIsGeneratingCaseStudy] = useState(false)
    const {token, setCaseStudy} = useAuthStore()
    const router = useRouter();

    const handlePlayClick = async () => {
        if (game.id === 1 && game.isCompleted) {
            try {
                setIsGeneratingCaseStudy(true)

                const response = await fetch(`${BASE_URL}/game/day/1/generate-case-study`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || "Failed to generate case study")
                }

                console.log("Day 1 case study and quiz generated. User state should be at 'day1:case-study-generated'.")

                setCaseStudy(data)
                router.push("/level/customer-detective")
            } catch (error) {
                console.error("Error generating case study:", error)
                router.push("/level/customer-detective")
            } finally {
                setIsGeneratingCaseStudy(false)
            }
        }
    }

    return (
        <div className="relative">
            {game.isCompleted && (
                <div className="absolute -top-2 -right-2 z-20">
                    <div className="relative">
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-ping"/>
                    </div>
                </div>
            )}

            <div
                className={`rounded-3xl relative overflow-hidden shadow-sm transition-all duration-500 ${
                    game.isUnlocked ? "transform" : ""
                }`}
                style={{
                    borderRadius: "24px",
                    height: "360px",
                    width: "300px",
                    filter: game.isUnlocked ? "none" : "grayscale(50%)",
                    backgroundColor: game.bgTop,
                }}
            >
                {!game.isUnlocked && (
                    <div className="absolute inset-0 z-30 bg-black/40 rounded-3xl flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                            <Lock className="w-8 h-8 text-gray-600"/>
                        </div>
                    </div>
                )}

                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute top-4 left-4 w-6 h-6 bg-white/30 rounded-full animate-bounce"
                        style={{animationDelay: "0s"}}
                    />
                    <div
                        className="absolute top-8 right-6 w-4 h-4 bg-white/20 rounded-full animate-bounce"
                        style={{animationDelay: "0.5s"}}
                    />
                    <div
                        className="absolute bottom-12 left-8 w-3 h-3 bg-white/25 rounded-full animate-bounce"
                        style={{animationDelay: "1s"}}
                    />
                </div>

                <div className="relative z-20 p-6 flex flex-col h-full justify-between text-center">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                        <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-xs font-bold text-gray-500 font-[family-name:var(--font-space-grotesk)]">
                LEVEL {game.level}
              </span>
                            <div
                                className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                                style={{backgroundColor: difficultyColors[game.difficulty as keyof typeof difficultyColors]}}
                            >
                                {game.difficulty}
                            </div>
                        </div>
                        <h2 className="text-lg font-bold text-[#111111] font-[family-name:var(--font-unbounded)] leading-tight">
                            {game.title}
                        </h2>
                    </div>

                    <button
                        onClick={handlePlayClick}
                        className={`relative z-40 w-full rounded-2xl py-4 font-bold text-white flex items-center justify-center gap-2 font-[family-name:var(--font-space-grotesk)]`}
                        style={{
                            backgroundColor: game.isUnlocked ? "#212121" : "#666666",
                            transform: isActive ? "translateY(-2px)" : "translateY(0px)",
                        }}
                        disabled={!game.isUnlocked || isGeneratingCaseStudy}
                    >
                        {game.isUnlocked ? (
                            <>
                                {isGeneratingCaseStudy ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin"/>
                                        <span>Loading...</span>
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-5 h-5 fill-current"/>
                                        <span>{game.isCompleted ? "Continue" : "Play"}</span>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <Lock className="w-5 h-5"/>
                                <span>Complete Level {game.level - 1}</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

const PomodoroTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
    const [isActive, setIsActive] = useState(false)
    const [isBreak, setIsBreak] = useState(false)

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            setIsActive(false)
            if (!isBreak) {
                setTimeLeft(5 * 60) // 5 minute break
                setIsBreak(true)
            } else {
                setTimeLeft(25 * 60) // 25 minute work
                setIsBreak(false)
            }
        }
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isActive, timeLeft, isBreak])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const resetTimer = () => {
        setIsActive(false)
        setTimeLeft(isBreak ? 5 * 60 : 25 * 60)
    }

    const skipSession = () => {
        setIsActive(false)
        if (!isBreak) {
            setTimeLeft(5 * 60)
            setIsBreak(true)
        } else {
            setTimeLeft(25 * 60)
            setIsBreak(false)
        }
    }

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-sm mb-6">
            <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Timer className="w-5 h-5 text-[#F7B844]"/>
                    <h3 className="text-lg font-bold text-[#111111] font-[family-name:var(--font-unbounded)]">Pomodoro
                        Timer</h3>
                </div>

                <div className="mb-4">
                    <div
                        className="text-4xl font-bold text-[#111111] font-[family-name:var(--font-space-grotesk)] mb-2">
                        {formatTime(timeLeft)}
                    </div>
                    <div className="text-sm font-medium text-gray-600">{isBreak ? "Break Time" : "Focus Time"}</div>
                </div>

                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={() => setIsActive(!isActive)}
                        className="bg-[#F7B844] hover:bg-[#F7B844]/90 text-white rounded-full p-3 shadow-lg transition-all duration-200"
                    >
                        {isActive ? <Pause className="w-5 h-5"/> : <Play className="w-5 h-5 fill-current"/>}
                    </button>

                    <button
                        onClick={resetTimer}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-3 shadow-lg transition-all duration-200"
                    >
                        <RotateCcw className="w-5 h-5"/>
                    </button>

                    <button
                        onClick={skipSession}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-3 shadow-lg transition-all duration-200"
                    >
                        <SkipForward className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

const DailyQuests = () => {
    const [questApi, setQuestApi] = useState<CarouselApi>()
    const [questCurrent, setQuestCurrent] = useState(0)

    useEffect(() => {
        if (!questApi) {
            return
        }

        setQuestCurrent(questApi.selectedScrollSnap())

        questApi.on("select", () => {
            setQuestCurrent(questApi.selectedScrollSnap())
        })
    }, [questApi])

    interface QuestType {
        id: number
        title: string
        description: string
        progress: number
        target: number
        reward: string
        icon: React.ComponentType<{ className?: string }>
        bgColor: string
        isCompleted: boolean
    }

    const dailyQuests: QuestType[] = [
        {
            id: 1,
            title: "Win 3 Games",
            description: "Complete any 3 games today",
            progress: 1,
            target: 3,
            reward: "100 XP",
            icon: Target,
            bgColor: "#F7B844",
            isCompleted: false,
        },
        {
            id: 2,
            title: "Perfect Score",
            description: "Get 100% in any level",
            progress: 0,
            target: 1,
            reward: "150 XP",
            icon: Star,
            bgColor: "#F95C8A",
            isCompleted: false,
        },
        {
            id: 3,
            title: "Speed Runner",
            description: "Complete a level in under 2 minutes",
            progress: 0,
            target: 1,
            reward: "200 XP",
            icon: Zap,
            bgColor: "#4ECDC4",
            isCompleted: false,
        },
        {
            id: 4,
            title: "Daily Champion",
            description: "Play for 30 minutes today",
            progress: 15,
            target: 30,
            reward: "250 XP",
            icon: Trophy,
            bgColor: "#A8E6CF",
            isCompleted: false,
        },
    ]

    return (
        <div className="mb-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#111111] font-[family-name:var(--font-unbounded)] text-center mb-2">
                    Daily Quest
                </h2>
                <p className="text-sm text-gray-600 font-[family-name:var(--font-space-grotesk)] text-center">
                    Complete challenges to earn bonus XP
                </p>
            </div>

            <div className="mb-6">
                <Carousel
                    setApi={setQuestApi}
                    className="w-full"
                    opts={{
                        align: "center",
                        loop: false,
                    }}
                >
                    <CarouselContent className="-ml-2 md:-ml-4 gap-4">
                        {dailyQuests.map((quest) => {
                            const IconComponent = quest.icon
                            const progressPercentage = (quest.progress / quest.target) * 100

                            return (
                                <CarouselItem key={quest.id} className="pl-2 md:pl-4 basis-1/2">
                                    <button
                                        className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-left w-full h-full">
                                        <div className="flex flex-col h-full">
                                            <div className="flex items-center justify-between mb-3">
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                                                    style={{backgroundColor: quest.bgColor}}
                                                >
                                                    <IconComponent className="w-5 h-5 text-white"/>
                                                </div>

                                                {quest.isCompleted && (
                                                    <div
                                                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                        <Star className="w-3 h-3 text-white fill-current"/>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <h4 className="font-bold text-[#111111] font-[family-name:var(--font-space-grotesk)] text-sm mb-1">
                                                    {quest.title}
                                                </h4>
                                                <p className="text-xs text-gray-600 font-medium mb-3 leading-relaxed">{quest.description}</p>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="h-2 rounded-full transition-all duration-300"
                                                        style={{
                                                            backgroundColor: quest.bgColor,
                                                            width: `${progressPercentage}%`,
                                                        }}
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 font-medium">
                            {quest.progress}/{quest.target}
                          </span>
                                                    <span className="text-xs font-bold" style={{color: quest.bgColor}}>
                            {quest.reward}
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                </Carousel>
            </div>

            <div className="flex justify-center gap-2 mb-4">
                {Array.from({length: Math.ceil(dailyQuests.length / 2)}).map((_, index) => (
                    <div
                        key={index}
                        className="relative transition-all duration-300 cursor-pointer"
                        onClick={() => questApi?.scrollTo(index)}
                    >
                        <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === questCurrent ? "w-6 bg-[#F7B844]" : "w-2 bg-gray-300"
                            }`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

const QuickActionCards = () => {
    interface QuickActionType {
        id: number
        title: string
        icon: React.ComponentType<{ className?: string }>
        bgColor: string
        action: () => void
    }

    const quickActions: QuickActionType[] = [
        {
            id: 1,
            title: "Interview History",
            icon: History,
            bgColor: "#4ECDC4",
            action: () => console.log("Navigate to interview history"),
        },
        {
            id: 2,
            title: "Scheduled Interviews",
            icon: Calendar,
            bgColor: "#F95C8A",
            action: () => console.log("Navigate to scheduled interviews"),
        },
        {
            id: 3,
            title: "Continue Learning",
            icon: Play,
            bgColor: "#A8E6CF",
            action: () => console.log("Continue from last position"),
        },
        {
            id: 4,
            title: "Start New Session",
            icon: Target,
            bgColor: "#F7B844",
            action: () => console.log("Start new interview session"),
        },
    ]

    return (
        <div className="space-y-4 mb-6">
            <h3 className="text-lg font-bold text-[#111111] font-[family-name:var(--font-unbounded)] px-2">Quick
                Actions</h3>

            <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action) => {
                    const IconComponent = action.icon
                    return (
                        <button
                            key={action.id}
                            onClick={action.action}
                            className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <div className="flex flex-col items-center text-center gap-3">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                                    style={{backgroundColor: action.bgColor}}
                                >
                                    <IconComponent className="w-6 h-6 text-white"/>
                                </div>

                                <div>
                                    <h4 className="font-bold text-[#111111] font-[family-name:var(--font-space-grotesk)] text-sm leading-tight">
                                        {action.title}
                                    </h4>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default function GameDashboard() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const {user} = useAuthStore()

    useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <div className="min-h-screen relative overflow-hidden" style={{backgroundColor: "#F8F7F4"}}>
            <div className="absolute inset-0 opacity-40">
                <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0">
                    <defs>
                        <pattern id="celebrationWaves" x="0" y="0" width="200" height="200"
                                 patternUnits="userSpaceOnUse">
                            <path d="M0,100 Q50,50 100,100 T200,100 L200,200 L0,200 Z" fill="#F0EFEA" opacity="0.8"/>
                            <circle cx="50" cy="75" r="3" fill="#F7B844" opacity="0.6"/>
                            <circle cx="150" cy="125" r="2" fill="#F95C8A" opacity="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#celebrationWaves)"/>
                </svg>
            </div>

            <div className="relative z-10 px-4 py-6 max-w-sm mx-auto pb-24">
                <Header
                    title={
                        <div>
                            Hey {user?.full_name?.split(" ")[0] || "there"}!
                            <br/>
                            Pick a Game
                        </div>
                    }
                    showExpProgress={true}
                />

                <div className="mb-6">
                    <Carousel
                        setApi={setApi}
                        className="w-full"
                        opts={{
                            align: "center",
                            loop: false,
                        }}
                    >
                        <CarouselContent className="-ml-2 md:-ml-4 gap-4">
                            {gameCards.map((game, index) => (
                                <CarouselItem key={game.id} className="pl-2 md:pl-4 basis-4/5">
                                    <GameCard game={game} isActive={current === index}/>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                <div className="flex justify-center gap-3 mb-6">
                    {gameCards.map((game, index) => (
                        <div
                            key={game.id}
                            className="relative transition-all duration-300 cursor-pointer"
                            onClick={() => api?.scrollTo(index)}
                        >
                            <div
                                className={`h-3 rounded-full transition-all duration-300 ${index === current ? "w-8" : "w-3"}`}
                                style={{
                                    backgroundColor: game.isCompleted ? "#4ADE80" : game.isUnlocked ? "#212121" : "#D1D5DB",
                                }}
                            />
                        </div>
                    ))}
                </div>

                <DailyQuests/>

                <PomodoroTimer/>

                <QuickActionCards/>

                <BottomNavigation/>
            </div>
        </div>
    )
}
