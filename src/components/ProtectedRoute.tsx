"use client"

import type React from "react"

import { useAuth } from "@/hooks/useAuth"
import { useEffect, useState } from "react"

interface ProtectedRouteProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth(true)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    // Show loading during hydration
    if (!isClient) {
        return (
            fallback || (
                <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F7B844] mx-auto mb-4"></div>
                        <p className="text-gray-600 font-[family-name:var(--font-space-grotesk)]">Loading...</p>
                    </div>
                </div>
            )
        )
    }

    // If not authenticated, useAuth hook will redirect to login
    if (!isAuthenticated) {
        return (
            fallback || (
                <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-600 font-[family-name:var(--font-space-grotesk)]">Redirecting to login...</p>
                    </div>
                </div>
            )
        )
    }

    return <>{children}</>
}
