"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 blob-coral opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 blob-purple opacity-40 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[color:var(--color-robot-blue)]/20 rounded-full animate-bounce"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-6xl md:text-8xl font-black mb-8 text-balance">
          <span className="bg-gradient-to-r from-[color:var(--color-robot-gold)] via-[color:var(--color-robot-coral)] to-[color:var(--color-robot-purple)] bg-clip-text text-transparent">
            IMMERSIVE
          </span>
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
            Website
          </span>
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
            AR / 3D / Website
          </span>
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
            Book Design
          </span>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">The Friendly Robot</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A highly immersive and interactive creative experience that blurs the line between the real world and
            digital innovation, built with cutting-edge technology and playful design.
          </p>
        </div>

        <Button
          size="lg"
          className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          VIEW PROJECT →
        </Button>
      </div>
    </section>
  )
}
