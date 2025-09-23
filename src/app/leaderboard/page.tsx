"use client"

import Avatar from "react-nice-avatar"
import { Globe, Users } from "lucide-react"
import { useState } from "react"
import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"

const leaderboardData = [
    {
        rank: "1st",
        name: "Nt",
        avatar: { sex: "woman", faceColor: "#F9C9B6", hairColor: "#724133", shirtColor: "#FF6B6B" },
        score: "5.4 Million",
    },
    {
        rank: "2nd",
        name: "Zhi",
        avatar: { sex: "man", faceColor: "#F9C9B6", hairColor: "#2C1B18", shirtColor: "#4ECDC4" },
        score: "5.3 Million",
    },
    {
        rank: "3rd",
        name: "Sai",
        avatar: { sex: "woman", faceColor: "#F9C9B6", hairColor: "#A8E6CF", shirtColor: "#A8E6CF" },
        score: "5.2 Million",
    },
    {
        rank: "4th",
        name: "Siti",
        avatar: { sex: "woman", faceColor: "#F9C9B6", hairColor: "#8B4513", shirtColor: "#FFB6C1" },
        score: "5.2 Million",
    },
]

export default function LeaderboardPage() {
    const [activeTab, setActiveTab] = useState("global")

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#F8F7F4", padding: "16px" }}>
            <Header title="See Other People Rank" subtitle="Compare your progress with others" />

            {/* Tab Navigation */}
            <div
                className="flex p-1 mb-4"
                style={{
                    backgroundColor: "#EFEFEF",
                    borderRadius: "999px",
                    marginTop: "24px",
                }}
            >
                <button
                    onClick={() => setActiveTab("global")}
                    className={`flex items-center gap-2 px-4 py-2.5 font-semibold font-[family-name:var(--font-space-grotesk)]`}
                    style={{
                        borderRadius: "999px",
                        backgroundColor: activeTab === "global" ? "#FF6B6B" : "transparent",
                        color: activeTab === "global" ? "#FFFFFF" : "#888888",
                    }}
                >
                    <Globe className="w-4 h-4" />
                    Global Rank
                </button>
                <button
                    onClick={() => setActiveTab("friend")}
                    className={`flex items-center gap-2 px-4 py-2.5 font-semibold font-[family-name:var(--font-space-grotesk)]`}
                    style={{
                        borderRadius: "999px",
                        backgroundColor: activeTab === "friend" ? "#FF6B6B" : "transparent",
                        color: activeTab === "friend" ? "#FFFFFF" : "#888888",
                    }}
                >
                    <Users className="w-4 h-4" />
                    Friend Rank
                </button>
            </div>

            {/* Leaderboard Container */}
            <div
                className="p-4 mb-24"
                style={{
                    backgroundColor: "#D6EFFF",
                    borderRadius: "24px",
                    marginTop: "16px",
                }}
            >
                {/* Top 4 Rankings */}
                {leaderboardData.map((user, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center p-3 mb-2"
                        style={{
                            backgroundColor: "white",
                            borderRadius: "16px",
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <Avatar
                                style={{ width: "32px", height: "32px" }}
                                sex={user.avatar.sex as "man" | "woman"}
                                faceColor={user.avatar.faceColor}
                                hairColor={user.avatar.hairColor}
                                shirtColor={user.avatar.shirtColor}
                                bgColor="transparent"
                            />
                            <div>
                                <div className="text-xs font-[family-name:var(--font-space-grotesk)]" style={{ color: "#888888" }}>
                                    {user.rank}
                                </div>
                                <div
                                    className="text-base font-semibold font-[family-name:var(--font-space-grotesk)]"
                                    style={{ color: "#111111" }}
                                >
                                    {user.name}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
              <span className="font-semibold font-[family-name:var(--font-space-grotesk)]" style={{ color: "#111111" }}>
                {user.score}
              </span>
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#F7B844" }} />
                        </div>
                    </div>
                ))}

                {/* User's Rank */}
                <div
                    className="flex justify-between items-center p-3"
                    style={{
                        backgroundColor: "#C8B6FF",
                        borderRadius: "16px",
                    }}
                >
                    <div className="flex items-center gap-3">
                        <Avatar
                            style={{ width: "32px", height: "32px" }}
                            sex="man"
                            faceColor="#F9C9B6"
                            hairColor="#724133"
                            shirtColor="#9287FF"
                            bgColor="transparent"
                        />
                        <div>
                            <div className="text-xs font-[family-name:var(--font-space-grotesk)]" style={{ color: "#888888" }}>
                                Unranked
                            </div>
                            <div
                                className="text-base font-semibold font-[family-name:var(--font-space-grotesk)]"
                                style={{ color: "#111111" }}
                            >
                                You
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
            <span className="font-semibold font-[family-name:var(--font-space-grotesk)]" style={{ color: "#111111" }}>
              32,503
            </span>
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#F7B844" }} />
                    </div>
                </div>
            </div>

            <BottomNavigation />
        </div>
    )
}
