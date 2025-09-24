import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
    id: string
    phone_number: string
    username: string
    full_name: string
    city: string | null
    profile: Record<string, any>
    password: string | null
    psych_profile: any | null
    currentDay: number
    currentStepId: string
    xp: number
    progress: Record<string, any>
    createdAt: string
    updatedAt: string
}

interface AuthState {
    token: string | null
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null

    // Actions
    setToken: (token: string) => void
    setUser: (user: User) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    logout: () => void
    clearError: () => void
    setAuth: (user: User, token: string) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            setToken: (token: string) => {
                set({ token, isAuthenticated: true })
                if (typeof window !== "undefined") {
                    document.cookie = `auth-token=${token}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 days
                }
            },

            setUser: (user: User) => set({ user }),

            setLoading: (isLoading: boolean) => set({ isLoading }),

            setError: (error: string | null) => set({ error }),

            logout: () => {
                set({
                    token: null,
                    user: null,
                    isAuthenticated: false,
                    error: null,
                })
                if (typeof window !== "undefined") {
                    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
                }
            },

            clearError: () => set({ error: null }),

            setAuth: (user: User, token: string) => {
                set({
                    user,
                    token,
                    isAuthenticated: true,
                })
                if (typeof window !== "undefined") {
                    document.cookie = `auth-token=${token}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 days
                }
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        },
    ),
)
