"use client"

import type React from "react"

import { Star, TrendingUp, Goal as Owl, Target, Flag, Zap, Award } from "lucide-react"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"

interface EventCardProps {
    icon: React.ReactNode
    title: string
    description: string
    timestamp: string
    highlight?: string
    highlightColor?: string
    backgroundColor?: string
    showProgress?: boolean
    progressValue?: number
}

function EventCard({
                       icon,
                       title,
                       description,
                       timestamp,
                       highlight,
                       highlightColor = "#F7B844",
                       backgroundColor = "#FFFFFF",
                       showProgress = false,
                       progressValue = 0,
                   }: EventCardProps) {
    return (
        <div
            className="rounded-2xl p-4 shadow-sm mb-4 cursor-pointer hover:shadow-md transition-shadow"
            style={{ backgroundColor }}
        >
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0">{icon}</div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#111111] font-[family-name:var(--font-space-grotesk)] text-sm mb-1">
                        {title}
                    </h3>
                    <p className="text-[#888888] font-[family-name:var(--font-space-grotesk)] text-xs leading-relaxed">
                        {description}
                        {highlight && (
                            <span className="font-bold ml-1" style={{ color: highlightColor }}>
                {highlight}
              </span>
                        )}
                    </p>

                    {showProgress && (
                        <div className="mt-2">
                            <div className="w-full bg-[#F0EFEA] rounded-full h-2">
                                <div
                                    className="h-2 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${progressValue}%`,
                                        backgroundColor: highlightColor,
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex-shrink-0 text-right">
                    <span className="text-[#888888] font-[family-name:var(--font-space-grotesk)] text-xs">{timestamp}</span>
                </div>
            </div>
        </div>
    )
}

export default function LiveUpdatesPage() {
    const updates = [
        {
            type: "xp_gained",
            icon: (
                <div className="w-10 h-10 rounded-full bg-[#F7B844] flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                </div>
            ),
            title: "XP Gained",
            description: "You earned XP for completing your first interview!",
            highlight: "+100 XP",
            highlightColor: "#F7B844",
            timestamp: "2 min ago",
        },
        {
            type: "level_up",
            icon: (
                <div className="w-10 h-10 rounded-full bg-[#C8B6FF] flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                </div>
            ),
            title: "Level Up!",
            description: "Congratulations! You've reached Level 5: The Strategist.",
            timestamp: "5 min ago",
            backgroundColor: "#C8B6FF20",
        },
        {
            type: "achievement",
            icon: (
                <div className="w-10 h-10 rounded-full bg-[#FF6B6B] flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                </div>
            ),
            title: "Achievement Unlocked!",
            description: "You've earned the 'The Awakening' badge.",
            timestamp: "10 min ago",
        },
        {
            type: "daily_briefing",
            icon: (
                <div className="w-10 h-10 rounded-full bg-[#D6EFFF] flex items-center justify-center">
                    <Owl className="w-5 h-5 text-[#4A90E2]" />
                </div>
            ),
            title: "Your Daily Mission",
            description: "A new case file is available. Today's focus is on customer analysis.",
            timestamp: "1 hour ago",
        },
        {
            type: "ai_feedback",
            icon: (
                <div className="w-10 h-10 rounded-full bg-[#FF8C42] flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                </div>
            ),
            title: "Interview Analysis Complete",
            description: "Your report has been analyzed. Tap to see the full debriefing.",
            timestamp: "2 hours ago",
        },
        {
            type: "peer_shoutout",
            icon: (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F95C8A] to-[#F7B844] flex items-center justify-center text-white font-bold text-sm">
                    JM
                </div>
            ),
            title: "Peer Shoutout!",
            description: "Jaka Manterna just reached Level 10! Send them some kudos.",
            timestamp: "3 hours ago",
        },
        {
            type: "team_challenge",
            icon: (
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                    <Flag className="w-5 h-5 text-white" />
                </div>
            ),
            title: "Team Challenge Update",
            description: "Your team is of the way to the weekly XP goal!",
            highlight: "75%",
            highlightColor: "#25D366",
            timestamp: "4 hours ago",
            showProgress: true,
            progressValue: 75,
        },
        {
            type: "streak_bonus",
            icon: (
                <div className="w-10 h-10 rounded-full bg-[#F95C8A] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                </div>
            ),
            title: "Streak Bonus!",
            description: "You've maintained a 7-day learning streak. Keep it up!",
            highlight: "+50 XP",
            highlightColor: "#F95C8A",
            timestamp: "1 day ago",
        },
    ]

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#F8F7F4" }}>
            <div className="px-6 pt-4">
                <Header title="Live Updates" />
            </div>

            <div className="px-6 pb-24">
                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-sm">
                    <div className="space-y-3">
                        {updates.map((update, index) => (
                            <EventCard
                                key={index}
                                icon={update.icon}
                                title={update.title}
                                description={update.description}
                                timestamp={update.timestamp}
                                highlight={update.highlight}
                                highlightColor={update.highlightColor}
                                backgroundColor={update.backgroundColor}
                                showProgress={update.showProgress}
                                progressValue={update.progressValue}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <BottomNavigation />
        </div>
    )
}
