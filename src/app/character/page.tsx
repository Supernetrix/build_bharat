import { CharacterSelectionQuiz } from '@/components/character-selection-quiz'

/**
 * Character Selection Page
 * 
 * This page displays a personality-based character selection quiz
 * allowing users to choose one of four character types that best
 * represents their personality traits.
 */
export default function CharacterPage() {
  return (
    <div className="min-h-screen bg-background text-[#100F06] flex flex-col">
      {/* Add subtle yellow theme background pattern for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#FFDA57] blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#FFD000] blur-3xl"></div>
      </div>
      
      <CharacterSelectionQuiz />
    </div>
  )
}