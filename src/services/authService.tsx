const BASE_URL = "https://backend-ifcu.onrender.com/api"

export interface SendOTPRequest {
    phoneNumber: string
}

export interface VerifyOTPRequest {
    phoneNumber: string
    otp: string
    username: string
    fullName: string
}

export interface User {
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

export interface AuthResponse {
    user: User
    token: string
}

export interface SendOTPResponse {
    success: boolean
    message: string
}

export const authService = {
    async sendOTP(phoneNumber: string): Promise<SendOTPResponse> {
        try {
            const response = await fetch(`${BASE_URL}/users/auth/otp/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phoneNumber }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to send OTP")
            }

            return data
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Network error")
        }
    },

    async verifyOTP(request: VerifyOTPRequest): Promise<AuthResponse> {
        try {
            const response = await fetch(`${BASE_URL}/users/auth/otp/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to verify OTP")
            }

            return {
                user: data.user,
                token: data.token,
            }
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Network error")
        }
    },

    async login(phoneNumber: string, otp: string): Promise<AuthResponse> {
        try {
            const response = await fetch(`${BASE_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phoneNumber, otp }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to login")
            }

            return {
                user: data.user,
                token: data.token,
            }
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Network error")
        }
    },

    async signup(phoneNumber: string, otp: string, username: string, fullName: string): Promise<AuthResponse> {
        try {
            const response = await fetch(`${BASE_URL}/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phoneNumber,
                    otp,
                    username,
                    fullName,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to signup")
            }

            return {
                user: data.user,
                token: data.token,
            }
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Network error")
        }
    },
}
