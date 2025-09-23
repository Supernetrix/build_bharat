"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Login attempt:", { email, password })
        router.push("/character")
    }

    return (
        <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-sm border-0 shadow-sm rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#111111] font-[family-name:var(--font-unbounded)] mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600 font-[family-name:var(--font-space-grotesk)]">
                        Sign in to continue your learning journey
                    </p>
                </div>

                <div className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    className="w-full h-14 text-lg font-bold bg-[#F7B844] hover:bg-[#F7B844]/90 text-[#111111] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] font-[family-name:var(--font-space-grotesk)]"
                >
                    LOGIN
                </Button>

                <div className="text-center space-y-2">
                    <button
                        type="button"
                        className="text-[#25D366] hover:underline font-medium font-[family-name:var(--font-space-grotesk)]"
                    >
                        Forgot password?
                    </button>
                    <p className="text-gray-500 font-[family-name:var(--font-space-grotesk)]">
                        {"Don't have an account? "}
                        <button type="button" className="text-[#25D366] hover:underline font-medium">
                            Sign up
                        </button>
                    </p>
                </div>
            </form>
        </Card>
    )
}
