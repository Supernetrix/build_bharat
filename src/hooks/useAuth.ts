"use client"

import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useAuth(requireAuth = false) {
    const { token, user, isAuthenticated, logout } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        if (requireAuth && !isAuthenticated) {
            router.push("/")
        }
    }, [requireAuth, isAuthenticated, router])

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    return {
        token,
        user,
        isAuthenticated,
        logout: handleLogout,
    }
}
