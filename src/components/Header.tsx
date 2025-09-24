"use client"

import Avatar from "react-nice-avatar"
import {useAuthStore} from "@/store/authStore"

interface HeaderProps {
    showExpProgress?: boolean
    title?: string
    subtitle?: string
}

export default function Header({showExpProgress = false, title, subtitle}: HeaderProps) {
    const {user} = useAuthStore()

    // Use real user data or fallback to defaults
    const currentExp = user?.xp || 0
    const currentLevel = Math.floor(currentExp / 1000) + 1 // Simple level calculation
    const expForCurrentLevel = (currentLevel - 1) * 1000
    const expForNextLevel = currentLevel * 1000
    const progressInLevel = currentExp - expForCurrentLevel
    const expNeededForLevel = expForNextLevel - expForCurrentLevel
    const progressPercentage = (progressInLevel / expNeededForLevel) * 100

    return (
        <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center justify-between">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
                    <Avatar
                        style={{width: "20px", height: "20px"}}
                        sex="man"
                        faceColor="#F9C9B6"
                        earSize="small"
                        eyeStyle="circle"
                        noseStyle="short"
                        mouthStyle="peace"
                        shirtStyle="hoody"
                        glassesStyle="none"
                        hairColor="#724133"
                        hairStyle="normal"
                        hatStyle="none"
                        hatColor="#000"
                        shirtColor="#9287FF"
                        bgColor="transparent"
                    />
                    <span
                        className="font-semibold text-[#111111] font-[family-name:var(--font-space-grotesk)] whitespace-nowrap">
            {user?.full_name || "Guest User"}
          </span>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2 shadow-sm">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center"
                         style={{backgroundColor: "#F7B844"}}>
                        <div className="w-3 h-3 bg-yellow-300 rounded-full"/>
                    </div>
                    <span className="font-semibold text-[#111111] font-[family-name:var(--font-space-grotesk)]">
            {currentExp.toLocaleString()}
          </span>
                </div>
            </div>

            {(title || showExpProgress) && (
                <div className="flex items-center justify-between">
                    {title && (
                        <div>
                            <h1
                                className="text-2xl font-bold text-[#111111] leading-tight font-[family-name:var(--font-unbounded)]"
                                style={{lineHeight: "1.1"}}
                            >
                                {title}
                            </h1>
                            {subtitle && (
                                <p className="text-sm text-gray-600 mt-1 font-[family-name:var(--font-space-grotesk)]">{subtitle}</p>
                            )}
                        </div>
                    )}

                    {showExpProgress && (
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm">
                            <div className="flex flex-col items-end gap-1">
                                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 font-[family-name:var(--font-space-grotesk)]">
                    LVL {currentLevel}
                  </span>
                                    <span
                                        className="text-xs font-semibold text-[#111111] font-[family-name:var(--font-space-grotesk)]">
                    {progressInLevel}/{expNeededForLevel}
                  </span>
                                </div>
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full transition-all duration-300"
                                        style={{
                                            backgroundColor: "#F7B844",
                                            width: `${progressPercentage}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
