"use client"

import { ArrowLeft, Lock, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import BottomNavigation from "@/components/BottomNavigation"
import Header from "@/components/Header"

interface Achievement {
    id: string
    name: string
    description: string
    illustration: string
    backgroundColor: string
    isUnlocked: boolean
    unlockedDate?: string
    xpReward?: number
    hint?: string
}

const achievements: Achievement[] = [
    {
        id: "market-explorer",
        name: "Market Explorer",
        description: "Complete your first market analysis",
        illustration: "🦁",
        backgroundColor: "#D7C4F7",
        isUnlocked: true,
        unlockedDate: "24 Sep",
        xpReward: 100,
    },
    {
        id: "data-detective",
        name: "Data Detective",
        description: "Solve 5 customer cases",
        illustration: "🐱",
        backgroundColor: "#FDC3D1",
        isUnlocked: true,
        unlockedDate: "22 Sep",
        xpReward: 250,
    },
    {
        id: "speed-runner",
        name: "Speed Runner",
        description: "Complete a case in under 5 minutes",
        illustration: "🐻",
        backgroundColor: "#FDE397",
        isUnlocked: false,
        hint: "Complete your first case file quickly",
    },
    {
        id: "team-player",
        name: "Team Player",
        description: "Collaborate on 3 team challenges",
        illustration: "🦊",
        backgroundColor: "#FACDA8",
        isUnlocked: false,
        hint: "Join team challenges to unlock",
    },
    {
        id: "knowledge-seeker",
        name: "Knowledge Seeker",
        description: "Read 10 learning materials",
        illustration: "🐸",
        backgroundColor: "#C4E7D4",
        isUnlocked: true,
        unlockedDate: "20 Sep",
        xpReward: 150,
    },
    {
        id: "mentor",
        name: "Mentor",
        description: "Help 5 other users",
        illustration: "🐰",
        backgroundColor: "#B8E6FF",
        isUnlocked: false,
        hint: "Help others in the community",
    },
]

export default function AchievementsPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<"unlocked" | "locked">("unlocked")

    const unlockedAchievements = achievements.filter((a) => a.isUnlocked)
    const lockedAchievements = achievements.filter((a) => !a.isUnlocked)
    const displayedAchievements = activeTab === "unlocked" ? unlockedAchievements : lockedAchievements

    return (
        <div className="min-h-screen pb-24" style={{ backgroundColor: "#F8F7F4" }}>
            <div className="px-6 pt-6">
                {/* Header */}
                <Header />

                {/* Page Title */}
                <h1 className="text-3xl font-bold text-[#111111] mb-6 font-[family-name:var(--font-unbounded)]">
                    Achievements
                </h1>

                {/* Tab Navigation */}
                <div className="bg-white rounded-full p-2 shadow-sm mb-6 flex">
                    <button
                        onClick={() => setActiveTab("unlocked")}
                        className={`flex-1 py-2 px-4 rounded-full font-medium text-sm font-[family-name:var(--font-space-grotesk)] transition-all ${
                            activeTab === "unlocked" ? "bg-[#82A7F8] text-white" : "text-[#111111]"
                        }`}
                    >
                        Unlocked
                    </button>
                    <button
                        onClick={() => setActiveTab("locked")}
                        className={`flex-1 py-2 px-4 rounded-full font-medium text-sm font-[family-name:var(--font-space-grotesk)] transition-all ${
                            activeTab === "locked" ? "bg-[#82A7F8] text-white" : "text-[#111111]"
                        }`}
                    >
                        Locked
                    </button>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {displayedAchievements.map((achievement) => (
                        <AchievementCard key={achievement.id} achievement={achievement} />
                    ))}
                </div>
            </div>

            <BottomNavigation />
        </div>
    )
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
    if (achievement.isUnlocked) {
        return (
            <div className="bg-white rounded-[20px] shadow-sm p-3">
                <div
                    className="rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] relative overflow-hidden"
                    style={{ backgroundColor: achievement.backgroundColor }}
                >
                    {/* Sparkle decorations */}
                    <Sparkles className="absolute top-2 right-2 w-3 h-3 text-white/60" />
                    <Sparkles className="absolute bottom-4 left-2 w-2 h-2 text-white/40" />
                    <Sparkles className="absolute top-1/2 left-1/4 w-2 h-2 text-white/50" />

                    {/* Badge Name */}
                    <div className="bg-white rounded-full px-2 py-1 self-start max-w-full">
            <span className="text-xs font-bold text-[#111111] font-[family-name:var(--font-space-grotesk)] whitespace-nowrap overflow-hidden text-ellipsis block">
              {achievement.name}
            </span>
                    </div>

                    {/* Badge Illustration */}
                    <div className="flex-1 flex items-center justify-center">
                        <span className="text-4xl">{achievement.illustration}</span>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-center mt-2">
          <span className="text-xs text-[#888888] font-[family-name:var(--font-space-grotesk)]">
            Unlocked: {achievement.unlockedDate} • +{achievement.xpReward} XP
          </span>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-[20px] shadow-sm p-3 grayscale">
            <div
                className="rounded-[16px] p-4 flex flex-col justify-between min-h-[140px] relative overflow-hidden"
                style={{ backgroundColor: "#E5E5E5" }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50 rounded-[16px]" />

                {/* Badge Name */}
                <div className="bg-white rounded-full px-2 py-1 self-start relative z-10 max-w-full">
          <span className="text-xs font-bold text-[#111111] font-[family-name:var(--font-space-grotesk)] whitespace-nowrap overflow-hidden text-ellipsis block">
            {achievement.name}
          </span>
                </div>

                {/* Lock Icon */}
                <div className="flex-1 flex items-center justify-center relative z-10">
                    <Lock className="w-8 h-8 text-white" />
                </div>

                {/* Badge Illustration (dimmed) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <span className="text-4xl">{achievement.illustration}</span>
                </div>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-center mt-2">
        <span className="text-xs text-[#888888] font-[family-name:var(--font-space-grotesk)]">
          Hint: {achievement.hint}
        </span>
            </div>
        </div>
    )
}
