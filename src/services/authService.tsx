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

export interface SignupRequest {
    username: string
    full_name: string
    phone_number: string
    password: string
}

export interface OnboardingProfileRequest {
    archetype: string
    businessIdea: string
}

export interface OnboardingProfileResponse {
    success: boolean
    message: string
    user?: User
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

export interface QuizQuestion {
    id: number
    question: string
    options: {
        id: string
        text: string
    }[]
}

export interface QuizGenerateResponse {
    questions: QuizQuestion[]
}

export interface QuizSubmitRequest {
    answers: Record<string, string>
}

export interface QuizSubmitResponse {
    success: boolean
    message: string
    results?: any
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

    async signup(username: string, fullName: string, phoneNumber: string, password: string): Promise<AuthResponse> {
        try {
            const response = await fetch(`${BASE_URL}/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    full_name: fullName,
                    phone_number: phoneNumber,
                    password,
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

    async completeOnboardingProfile(
        archetype: string,
        businessIdea: string,
        token: string,
    ): Promise<OnboardingProfileResponse> {
        try {
            const response = await fetch(`${BASE_URL}/users/onboarding/profile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    archetype,
                    businessIdea,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to complete onboarding profile")
            }

            return data
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Network error")
        }
    },

    async generateOnboardingQuiz(token: string): Promise<QuizGenerateResponse> {
        try {
            const response = await fetch(`${BASE_URL}/quiz/onboarding/generate`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to generate quiz")
            }

            return data
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Network error")
        }
    },

    async submitOnboardingQuiz(answers: Record<string, string>, token: string): Promise<QuizSubmitResponse> {
        try {
            const response = await fetch(`${BASE_URL}/quiz/onboarding/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ answers }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to submit quiz")
            }

            return data
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Network error")
        }
    },
}
