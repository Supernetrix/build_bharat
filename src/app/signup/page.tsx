import { SignupForm } from "@/components/SignupForm"

export default function SignupPage() {
    return (
        <div
            className="min-h-screen relative overflow-hidden flex items-center justify-center px-4"
            style={{ backgroundColor: "#F8F7F4" }}
        >
            <div className="absolute inset-0 opacity-40">
                <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0">
                    <defs>
                        <pattern id="signupWaves" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                            <path d="M0,100 Q50,50 100,100 T200,100 L200,200 L0,200 Z" fill="#F0EFEA" opacity="0.8" />
                            <circle cx="50" cy="75" r="3" fill="#F7B844" opacity="0.6" />
                            <circle cx="150" cy="125" r="2" fill="#F95C8A" opacity="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#signupWaves)" />
                </svg>
            </div>

            <div className="relative z-10">
                <SignupForm />
            </div>
        </div>
    )
}
