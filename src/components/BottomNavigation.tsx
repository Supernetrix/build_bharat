"use client"

import { Gamepad2, Bell, Menu, BarChart2, Award } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export default function BottomNavigation() {
    const router = useRouter()
    const pathname = usePathname()

    const navItems = [
        {
            icon: Gamepad2,
            label: "My Games",
            path: "/dashboard",
            isActive: pathname === "/dashboard",
        },
        {
            icon: BarChart2,
            label: "Ranking",
            path: "/leaderboard",
            isActive: pathname === "/leaderboard",
        },
        {
            icon: Award,
            label: "Achievements",
            path: "/achievements",
            isActive: pathname === "/achievements",
        },
        {
            icon: Bell,
            label: "Notifications",
            path: "/notifications",
            isActive: pathname === "/notifications",
        },
        {
            icon: Menu,
            label: "My Menu",
            path: "/menu",
            isActive: pathname === "/menu",
        },
    ]

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-96 max-w-[calc(100vw-2rem)]">
            <div className="rounded-full px-6 py-3 shadow-lg" style={{ backgroundColor: "#1A1A1A", borderRadius: "999px" }}>
                <div className="flex items-center justify-between">
                    {navItems.map((item) => {
                        const Icon = item.icon

                        if (item.isActive) {
                            return (
                                <div
                                    key={item.path}
                                    className="rounded-full px-4 py-2 flex items-center gap-2 whitespace-nowrap"
                                    style={{ backgroundColor: "#25D366" }}
                                >
                                    <Icon className="w-5 h-5 text-white" />
                                    <span className="text-white font-medium text-sm font-[family-name:var(--font-space-grotesk)]">
                    {item.label}
                  </span>
                                </div>
                            )
                        }

                        return (
                            <button
                                key={item.path}
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                onClick={() => router.push(item.path)}
                            >
                                <Icon className="w-5 h-5" style={{ color: "#A0A0A0" }} />
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
