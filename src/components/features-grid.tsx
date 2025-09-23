"use client"

import { Card } from "@/components/ui/card"

const features = [
  {
    title: "3D Typography",
    description: "Playful, chunky letters that bring personality to every interaction",
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
  },
  {
    title: "Interactive Design",
    description: "Engaging animations and micro-interactions that delight users",
    color: "bg-gradient-to-br from-[color:var(--color-robot-coral)] to-red-400",
  },
  {
    title: "Modern Aesthetics",
    description: "Clean, contemporary design with organic shapes and soft gradients",
    color: "bg-gradient-to-br from-green-400 to-emerald-600",
  },
  {
    title: "Responsive Experience",
    description: "Seamlessly adapts to any device while maintaining visual impact",
    color: "bg-gradient-to-br from-[color:var(--color-robot-purple)] to-purple-600",
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-balance">
            Get to know your <span className="text-[color:var(--color-robot-purple)]">customers</span>
            <br />
            with forms worth filling out
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Collect all the data you need to <span className="font-semibold text-foreground">understand customers</span>{" "}
            with forms designed to be refreshingly different.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] bg-white/80 backdrop-blur-sm"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.color} mb-6 flex items-center justify-center`}>
                <div className="w-8 h-8 bg-white/30 rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
