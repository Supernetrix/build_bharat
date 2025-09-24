"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useAuthStore } from "@/store/authStore"
import { authService } from "@/services/authService"

export function SignupForm() {
    const [step, setStep] = useState<"details" | "otp">("details")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [username, setUsername] = useState("")
    const [fullName, setFullName] = useState("")
    const [otp, setOtp] = useState("")

    const router = useRouter()
    const { setAuth, setLoading, setError, isLoading, error, clearError } = useAuthStore()

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!phoneNumber.trim() || !username.trim() || !fullName.trim()) return

        setLoading(true)
        clearError()

        try {
            const response = await authService.sendOTP(phoneNumber)
            if (response.success) {
                setStep("otp")
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to send OTP")
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!otp.trim() || otp.length !== 6) return

        setLoading(true)
        clearError()

        try {
            // Use signup endpoint with all user details
            const response = await authService.signup(phoneNumber, otp, username, fullName)

            // Set both user and token in the store
            setAuth(response.user, response.token)
            router.push("/")
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to verify OTP")
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        setStep("details")
        setOtp("")
        clearError()
    }

    return (
        <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-sm border-0 shadow-sm rounded-3xl">
            {step === "details" ? (
                <form onSubmit={handleSendOTP} className="space-y-6">
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
                            placeholder="Phone Number (e.g., +1234567890)"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="h-14 text-lg bg-gray-50 border-2 border-gray-200 rounded-2xl px-6 placeholder:text-gray-400 focus:border-[#F7B844] focus:ring-[#F7B844] font-[family-name:var(--font-space-grotesk)]"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading || !phoneNumber.trim() || !username.trim() || !fullName.trim()}
                        className="w-full h-14 text-lg font-bold bg-[#F7B844] hover:bg-[#F7B844]/90 text-[#111111] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] font-[family-name:var(--font-space-grotesk)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? "SENDING..." : "SEND OTP"}
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
            ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-6">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-[#111111] font-[family-name:var(--font-unbounded)] mb-2">
                            Verify OTP
                        </h1>
                        <p className="text-gray-600 font-[family-name:var(--font-space-grotesk)]">
                            Enter the code sent to {phoneNumber}
                        </p>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                            <p className="text-red-600 text-sm font-[family-name:var(--font-space-grotesk)]">{error}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)} className="gap-2">
                                <InputOTPGroup className="gap-2">
                                    <InputOTPSlot
                                        index={0}
                                        className="w-12 h-12 text-lg border-2 border-gray-200 rounded-xl focus:border-[#F7B844] bg-gray-50 font-[family-name:var(--font-space-grotesk)]"
                                    />
                                    <InputOTPSlot
                                        index={1}
                                        className="w-12 h-12 text-lg border-2 border-gray-200 rounded-xl focus:border-[#F7B844] bg-gray-50 font-[family-name:var(--font-space-grotesk)]"
                                    />
                                    <InputOTPSlot
                                        index={2}
                                        className="w-12 h-12 text-lg border-2 border-gray-200 rounded-xl focus:border-[#F7B844] bg-gray-50 font-[family-name:var(--font-space-grotesk)]"
                                    />
                                    <InputOTPSlot
                                        index={3}
                                        className="w-12 h-12 text-lg border-2 border-gray-200 rounded-xl focus:border-[#F7B844] bg-gray-50 font-[family-name:var(--font-space-grotesk)]"
                                    />
                                    <InputOTPSlot
                                        index={4}
                                        className="w-12 h-12 text-lg border-2 border-gray-200 rounded-xl focus:border-[#F7B844] bg-gray-50 font-[family-name:var(--font-space-grotesk)]"
                                    />
                                    <InputOTPSlot
                                        index={5}
                                        className="w-12 h-12 text-lg border-2 border-gray-200 rounded-xl focus:border-[#F7B844] bg-gray-50 font-[family-name:var(--font-space-grotesk)]"
                                    />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            type="button"
                            onClick={handleBack}
                            variant="outline"
                            className="flex-1 h-14 text-lg font-bold border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 font-[family-name:var(--font-space-grotesk)] bg-transparent"
                        >
                            BACK
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || otp.length !== 6}
                            className="flex-1 h-14 text-lg font-bold bg-[#F7B844] hover:bg-[#F7B844]/90 text-[#111111] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] font-[family-name:var(--font-space-grotesk)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? "CREATING..." : "CREATE ACCOUNT"}
                        </Button>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleSendOTP}
                            className="text-[#25D366] hover:underline font-medium font-[family-name:var(--font-space-grotesk)]"
                        >
                            Resend OTP
                        </button>
                    </div>
                </form>
            )}
        </Card>
    )
}
