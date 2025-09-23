"use client"

import { useRouter } from "next/navigation"
import Header from "@/components/Header"

export default function ExploreJourneyPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-[#F8F7F4] relative overflow-hidden font-[family-name:var(--font-space-grotesk)]">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-[#F7B844]/10 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-8 w-24 h-24 bg-[#F95C8A]/10 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-32 left-6 w-40 h-40 bg-[#25D366]/10 rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-20 right-12 w-28 h-28 bg-[#F7B844]/10 rounded-full animate-pulse delay-1500"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6 text-center">
                <div className="w-40 h-40 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-8xl mb-8 shadow-lg border border-white/20">
                    🚀
                </div>

                <h1 className="text-4xl font-bold text-[#212121] mb-4 text-balance font-[family-name:var(--font-unbounded)]">
                    Ready to Explore Your Journey?
                </h1>

                <p className="text-[#212121]/80 text-lg mb-8 max-w-md text-balance leading-relaxed">
                    Your personality profile is complete! Time to discover amazing opportunities and connect with your community.
                </p>

                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-sm w-full shadow-lg border border-white/20">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-[#F7B844] font-[family-name:var(--font-unbounded)]">5</div>
                            <div className="text-[#212121]/70 text-sm">Matches</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#25D366] font-[family-name:var(--font-unbounded)]">92%</div>
                            <div className="text-[#212121]/70 text-sm">Compatibility</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#F95C8A] font-[family-name:var(--font-unbounded)]">3</div>
                            <div className="text-[#212121]/70 text-sm">Interests</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 w-full max-w-sm">
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="w-full py-4 bg-[#F7B844] hover:bg-[#F7B844]/90 text-[#212121] rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 font-[family-name:var(--font-unbounded)]"
                    >
                        Start Your Journey
                    </button>
                </div>

                <div className="mt-8 text-[#212121]/60 text-sm">✨ You're now part of a community of creative innovators!</div>
            </div>
        </div>
    )
}
