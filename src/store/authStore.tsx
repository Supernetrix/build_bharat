import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
    id: string
    phone_number: string
    username: string
    full_name: string
    city: string | null
    profile: Record<string, unknown>
    password: string | null
    psych_profile: Record<string, unknown> | null
    currentDay: number
    currentStepId: string
    xp: number
    progress: Record<string, unknown>
    createdAt: string
    updatedAt: string
}

interface CaseStudyData {
    title: string
    protagonist_profile: {
        name: string
        analysis: string
    }
    case_file: {
        the_setup: string
        chapter_1_the_lay_of_the_land: string
        chapter_2_ghosts_in_the_machine: string
        chapter_3_the_informant: string
        chapter_4_the_reveal: string
        the_debriefing_the_path_forward: string
    }
    strategic_quiz: Array<{
        question: string
        options: string[]
    }>
}

interface QuizSubmissionResponse {
    success: boolean
    message: string
    results?: Record<string, unknown>
}

interface PsychologyCourseData {
    course_title: string
    introduction: string
    modules: Array<{
        module_title: string
        focus_trait: string
        importance: string
        lessons: Array<{
            lesson_title: string
            concept: string
            actionable_steps: string[]
            example_scenario: string
        }>
    }>
}

interface EndOfDaySummary {
    summary_title: string
    narrative: string
    key_wins: string[]
    focus_areas: string[]
    suggested_plan_for_tomorrow: string[]
}

interface AuthState {
    token: string | null
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
    currentCaseStudy: CaseStudyData | null
    quizSubmissionResult: QuizSubmissionResponse | null
    psychologyCourse: PsychologyCourseData | null
    endOfDaySummary: EndOfDaySummary | null

    setToken: (token: string) => void
    setUser: (user: User) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void
    logout: () => void
    clearError: () => void
    setAuth: (user: User, token: string) => void
    setCaseStudy: (caseStudy: CaseStudyData) => void
    setQuizSubmissionResult: (result: QuizSubmissionResponse) => void
    setPsychologyCourse: (course: PsychologyCourseData) => void
    setEndOfDaySummary: (summary: EndOfDaySummary) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            currentCaseStudy: null,
            quizSubmissionResult: null,
            psychologyCourse: null,
            endOfDaySummary: null,

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
                    currentCaseStudy: null,
                    quizSubmissionResult: null,
                    psychologyCourse: null,
                    endOfDaySummary: null,
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

            setCaseStudy: (caseStudy: CaseStudyData) => {
                set({ currentCaseStudy: caseStudy })
            },

            setQuizSubmissionResult: (result: QuizSubmissionResponse) => {
                set({ quizSubmissionResult: result })
            },

            setPsychologyCourse: (course: PsychologyCourseData) => {
                set({ psychologyCourse: course })
            },

            setEndOfDaySummary: (summary: EndOfDaySummary) => {
                set({ endOfDaySummary: summary })
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                currentCaseStudy: state.currentCaseStudy,
                quizSubmissionResult: state.quizSubmissionResult,
                psychologyCourse: state.psychologyCourse,
                endOfDaySummary: state.endOfDaySummary,
            }),
        },
    ),
)
