"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface Community {
  id: string
  name: string
  character: string // Changed from 'icon' to 'character' for clarity
  color: string
  isNearby: boolean
}

// Updated data with a more vibrant color palette to match the image
const allCommunities: Community[] = [
  {
    id: "tech-enthusiasts",
    name: "Techies",
    character: "🤖",
    color: "bg-violet-400",
    isNearby: true,
  },
  {
    id: "book-club",
    name: "Book Club",
    character: "🤓",
    color: "bg-rose-400",
    isNearby: true,
  },
  {
    id: "fitness-crew",
    name: "Fitness Crew",
    character: "🤸",
    color: "bg-amber-400",
    isNearby: false,
  },
  {
    id: "art-makers",
    name: "Art Club",
    character: "🧑‍🎨",
    color: "bg-orange-400",
    isNearby: true,
  },
  {
    id: "gamers-guild",
    name: "Gamers Guild",
    character: "👾",
    color: "bg-sky-400",
    isNearby: false,
  },
  {
    id: "foodies-hangout",
    name: "Foodies",
    character: "😋",
    color: "bg-lime-400",
    isNearby: false,
  },
  {
    id: "travel-buddies",
    name: "Explorers",
    character: "🗺️",
    color: "bg-teal-400",
    isNearby: false,
  },
  {
    id: "music-lovers",
    name: "Jammers",
    character: "🎶",
    color: "bg-fuchsia-400",
    isNearby: true,
  },
]

export default function CommunityPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"nearby" | "all">("nearby")
  const [userPoints, setUserPoints] = useState(32503)

  const filteredCommunities = activeTab === "nearby"
    ? allCommunities.filter(comm => comm.isNearby)
    : allCommunities

  const handleJoinCommunity = (communityId: string) => {
    console.log(`Joining community: ${communityId}`)
    router.push("/explore-journey")
  }

  return (
    <div className="min-h-screen bg-[#F5F4ED] p-2 sm:p-4 font-sans flex justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-4">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-4">
       
        </header>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-[#100F06] text-center mb-6">
          Join a Community!!!
        </h1>

        {/* Tab Navigation */}
        <nav className="flex bg-gray-100 rounded-full p-1 mb-8 shadow-inner">
          <button
            onClick={() => setActiveTab("nearby")}
            className={`flex-1 py-3 px-4 text-center font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "nearby"
                ? "bg-blue-500 text-white shadow"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {/* Map Pin Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Nearby
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-3 px-4 text-center font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "all"
                ? "bg-blue-500 text-white shadow"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {/* Globe Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2H12a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.5l.053.053a.5.5 0 010 .707l-.053.053L6.5 6.5l1.207-1.207a.5.5 0 01.707 0zM16.293 4.5l-.053.053a.5.5 0 010 .707l.053.053L17.5 6.5l-1.207-1.207a.5.5 0 01-.707 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
            </svg>
            All Locations
          </button>
        </nav>

        {/* Community Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredCommunities.map((community) => (
            <div
              key={community.id}
              className={`${community.color} rounded-2xl shadow-md p-4 flex flex-col justify-between items-center h-48 relative transition-transform duration-200 hover:scale-105 active:scale-95`}
            >
              {/* Sparkles */}
              <div className="absolute top-2 left-2 text-white text-opacity-70 text-xs">✨</div>
              <div className="absolute top-3 right-3 text-white text-opacity-70 text-lg">✦</div>
              <div className="absolute bottom-3 left-3 text-white text-opacity-70 text-lg">✦</div>

              <div className="bg-white/90 rounded-full px-3 py-1 shadow border border-black/10">
                <h3 className="font-bold text-gray-800 text-center text-sm">{community.name}</h3>
              </div>
              
              <div className="text-6xl my-2">{community.character}</div>
              
              <button
                onClick={() => handleJoinCommunity()}
                className="bg-white rounded-full w-full py-2 px-3 flex items-center justify-center shadow hover:shadow-md transition-shadow"
              >
                <span className="font-bold text-sm text-gray-800">Join</span>

              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}