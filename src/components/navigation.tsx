"use client"

import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[color:var(--color-robot-gold)] rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold">RoboApp</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium hover:text-[color:var(--color-robot-purple)] transition-colors">
              WORK
            </a>
            <a href="#" className="text-sm font-medium hover:text-[color:var(--color-robot-purple)] transition-colors">
              OUR STORY
            </a>
            <a href="#" className="text-sm font-medium hover:text-[color:var(--color-robot-purple)] transition-colors">
              INSIGHTS
            </a>
            <a href="#" className="text-sm font-medium hover:text-[color:var(--color-robot-purple)] transition-colors">
              CONNECT
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button size="sm" className="bg-black text-white hover:bg-gray-800 rounded-full">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
