"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Community {
    id: string
    name: string
    description: string
    color: string
    isNearby: boolean
}

const allCommunities: Community[] = [
    {
        id: "tech-enthusiasts",
        name: "Tech Enthusiasts",
        description: "Connect with fellow technology lovers",
        color: "bg-gradient-to-br from-blue-400 to-blue-500",
        isNearby: true,
    },
    {
        id: "book-club",
        name: "Book Club",
        description: "Share your love for reading",
        color: "bg-gradient-to-br from-purple-400 to-purple-500",
        isNearby: true,
    },
    {
        id: "fitness-crew",
        name: "Fitness Crew",
        description: "Stay active together",
        color: "bg-gradient-to-br from-green-400 to-green-500",
        isNearby: false,
    },
    {
        id: "art-makers",
        name: "Art Club",
        description: "Express creativity together",
        color: "bg-gradient-to-br from-orange-400 to-orange-500",
        isNearby: true,
    },
    {
        id: "gamers-guild",
        name: "Gamers Guild",
        description: "Gaming community",
        color: "bg-gradient-to-br from-indigo-400 to-indigo-500",
        isNearby: false,
    },
    {
        id: "foodies-hangout",
        name: "Food Lovers",
        description: "Discover great food together",
        color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
        isNearby: false,
    },
]

export default function CommunityPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<"nearby" | "all">("nearby")

    const filteredCommunities = activeTab === "nearby" ? allCommunities.filter((comm) => comm.isNearby) : allCommunities

    const handleJoinCommunity = (communityId: string) => {
        console.log(`Joining community: ${communityId}`)
        router.push("/explore-journey")
    }

    return (
        <div className="min-h-screen p-4 flex justify-center">
            <div className="w-full max-w-md">
                {/* Title */}
                <h1
                    className="text-3xl font-[family-name:var(--font-unbounded)] font-bold text-center mb-8"
                    style={{ color: "#212121" }}
                >
                    Join a Community
                </h1>

                {/* Tab Navigation */}
                <nav className="flex bg-white/95 backdrop-blur-sm rounded-2xl p-1 mb-8 shadow-sm">
                    <button
                        onClick={() => setActiveTab("nearby")}
                        className={`flex-1 py-3 px-4 text-center font-[family-name:var(--font-space-grotesk)] font-semibold rounded-xl transition-all duration-300 ${
                            activeTab === "nearby" ? "text-white shadow-sm" : "hover:bg-white/50"
                        }`}
                        style={{
                            backgroundColor: activeTab === "nearby" ? "#25D366" : "transparent",
                            color: activeTab === "nearby" ? "white" : "#666",
                        }}
                    >
                        Nearby
                    </button>
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`flex-1 py-3 px-4 text-center font-[family-name:var(--font-space-grotesk)] font-semibold rounded-xl transition-all duration-300 ${
                            activeTab === "all" ? "text-white shadow-sm" : "hover:bg-white/50"
                        }`}
                        style={{
                            backgroundColor: activeTab === "all" ? "#25D366" : "transparent",
                            color: activeTab === "all" ? "white" : "#666",
                        }}
                    >
                        All Locations
                    </button>
                </nav>

                {/* Community Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {filteredCommunities.map((community) => (
                        <div
                            key={community.id}
                            className={`${community.color} rounded-2xl shadow-sm p-4 flex flex-col justify-between items-center h-40 transition-transform duration-200 hover:scale-105`}
                        >
                            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm">
                                <h3
                                    className="font-[family-name:var(--font-space-grotesk)] font-bold text-center text-sm"
                                    style={{ color: "#212121" }}
                                >
                                    {community.name}
                                </h3>
                            </div>

                            <p className="text-white text-xs text-center font-[family-name:var(--font-space-grotesk)] px-2">
                                {community.description}
                            </p>

                            <button
                                onClick={() => handleJoinCommunity(community.id)}
                                className="bg-white/95 backdrop-blur-sm rounded-xl w-full py-2 px-3 flex items-center justify-center shadow-sm hover:bg-white transition-all duration-200"
                            >
                <span
                    className="font-[family-name:var(--font-space-grotesk)] font-bold text-sm"
                    style={{ color: "#212121" }}
                >
                  Join
                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
