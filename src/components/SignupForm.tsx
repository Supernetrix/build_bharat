"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useAuthStore } from "@/store/authStore"
import { authService } from "@/services/authService"

export function SignupForm() {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [username, setUsername] = useState("")
    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()
    const { setAuth, setLoading, setError, isLoading, error, clearError } = useAuthStore()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!phoneNumber.trim() || !username.trim() || !fullName.trim() || !password.trim()) return

        setLoading(true)
        clearError()

        try {
            const response = await authService.signup(username, fullName, phoneNumber, password)

            // Set both user and token in the store
            setAuth(response.user, response.token)
            router.push("/onboarding")
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to create account")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-sm border-0 shadow-sm rounded-3xl">
            <form onSubmit={handleSignup} className="space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#111111] font-[family-name:var(--font-unbounded)] mb-2">
                        Create Account
                    </h1>
                    <p className="text-gray-600 font-[family-name:var(--font-space-grotesk)]">
                        Enter your details to get started
                    </p>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                        <p className="text-red-600 text-sm font-[family-name:var(--font-space-grotesk)]">{error}</p>
                    </div>
                )}

                <div className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-14 text-lg bg-gray-50 border-2 border-gray-200 rounded-2xl px-6 placeholder:text-gray-400 focus:border-[#F7B844] focus:ring-[#F7B844] font-[family-name:var(--font-space-grotesk)]"
                        required
                    />

                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-14 text-lg bg-gray-50 border-2 border-gray-200 rounded-2xl px-6 placeholder:text-gray-400 focus:border-[#F7B844] focus:ring-[#F7B844] font-[family-name:var(--font-space-grotesk)]"
                        required
                    />

                    <Input
                        type="tel"
                        placeholder="Phone Number (e.g., 1234567899)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="h-14 text-lg bg-gray-50 border-2 border-gray-200 rounded-2xl px-6 placeholder:text-gray-400 focus:border-[#F7B844] focus:ring-[#F7B844] font-[family-name:var(--font-space-grotesk)]"
                        required
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-14 text-lg bg-gray-50 border-2 border-gray-200 rounded-2xl px-6 placeholder:text-gray-400 focus:border-[#F7B844] focus:ring-[#F7B844] font-[family-name:var(--font-space-grotesk)]"
                        required
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isLoading || !phoneNumber.trim() || !username.trim() || !fullName.trim() || !password.trim()}
                    className="w-full h-14 text-lg font-bold bg-[#F7B844] hover:bg-[#F7B844]/90 text-[#111111] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] font-[family-name:var(--font-space-grotesk)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                </Button>

                <div className="text-center">
                    <p className="text-gray-500 font-[family-name:var(--font-space-grotesk)]">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => router.push("/login")}
                            className="text-[#25D366] font-medium hover:underline"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </form>
        </Card>
    )
}
