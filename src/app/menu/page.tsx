"use client"

import Header from "@/components/Header"
import BottomNavigation from "@/components/BottomNavigation"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import {
    Newspaper,
    ShieldCheck,
    CheckCircle,
    User,
    Library,
    Users,
    Award,
    MessageSquare,
    LogOut,
    ChevronRight,
} from "lucide-react"

export default function MenuPage() {
    const { logout } = useAuthStore()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    const menuItems = [
        { icon: Newspaper, label: "News", path: "/news" },
        { icon: ShieldCheck, label: "Double Protection", path: "/protection" },
        { icon: CheckCircle, label: "Confirmation", path: "/confirmation" },
        { icon: User, label: "Account", path: "/account" },
        { icon: Award, label: "Achievements", path: "/achievements" },
        { icon: Users, label: "Peer Support", path: "/community" },
        { icon: Library, label: "Library", path: "/library" },
        { icon: MessageSquare, label: "Chat", path: "/chat" },
        { icon: LogOut, label: "Logout", path: "/logout", isLogout: true },
    ]

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#F8F7F4" }}>
            <div className="px-4 pt-6 pb-24">
                <Header />

                <h1
                    className="text-4xl font-bold text-[#111111] mt-8 font-[family-name:var(--font-unbounded)]"
                    style={{ lineHeight: "1.1" }}
                >
                    Preference
                    <br />
                    Your Setting
                </h1>

                <div className="rounded-3xl p-6 mt-6" style={{ backgroundColor: "#FFDCEF" }}>
                    <div className="space-y-3">
                        {menuItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <div
                                    key={item.path}
                                    className="bg-white rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => {
                                        if (item.isLogout) {
                                            handleLogout()
                                        } else {
                                            console.log(`Navigate to ${item.path}`)
                                        }
                                    }}
                                >
                                    <Icon className="w-5 h-5" style={{ color: "#888888" }} />
                                    <span className="flex-1 font-medium text-[#111111] font-[family-name:var(--font-space-grotesk)]">
                    {item.label}
                  </span>
                                    <ChevronRight className="w-4 h-4" style={{ color: "#888888" }} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <BottomNavigation />
        </div>
    )
}
