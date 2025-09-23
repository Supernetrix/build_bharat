"use-client"
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useMobile } from '@/hooks/use-mobile'; // Using existing mobile detection hook

export function SimpleCharacterSelection() {
  const [showContent, setShowContent] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const router = useRouter();
  const isMobile = useMobile();

  useEffect(() => {
    // Add smooth animation when component mounts
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleProceed = () => {
    // Add subtle delay for animation before navigation
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 300);
    
    return () => clearTimeout(timer);
  };

  // Responsive sizes
  const getBackgroundCircleSize = () => {
    return isMobile ? 'w-20 h-20' : 'w-32 h-32';
  };

  const getEmojiSize = () => {
    return isMobile ? 'text-3xl' : 'text-4xl';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative background elements matching the yellow theme */}
      <div className="absolute top-10 left-5 w-8 h-8 bg-[#FFDA57] rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-20 right-8 w-6 h-6 bg-[#FFD000] rounded-full opacity-15 animate-bounce"></div>
      <div className="absolute bottom-20 left-10 w-10 h-10 bg-[#FFE162] rounded-full opacity-15 animate-pulse"></div>
      <div className="absolute bottom-10 right-6 w-4 h-4 bg-[#FFE77A] rounded-full opacity-20 animate-bounce"></div>

      {/* Sparkle effects from the theme */}
      <div className="absolute top-16 right-16 text-[#FFDA57] text-xl animate-pulse">✨</div>
      <div className="absolute bottom-20 left-8 text-[#FFD000] text-lg animate-bounce">⭐</div>
      <div className="absolute top-30 left-16 text-[#FFE162] text-base animate-pulse">✨</div>

      {/* Main content with animation */}
      <div 
        className={`transition-all duration-1000 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ maxWidth: isMobile ? '90vw' : '400px', width: '100%' }}
      >
        {/* Character selection card */}
        <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border transition-all duration-500 hover:shadow-xl">
          {/* Question text */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              What is your character?
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              Click proceed to continue to your personalized dashboard
            </p>
          </div>

          {/* Proceed button with enhanced interactions */}
          <Button
            onClick={handleProceed}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            onTouchStart={() => setButtonHovered(true)}
            onTouchEnd={() => setButtonHovered(false)}
            className={`w-full h-12 sm:h-14 bg-[#FFDA57] hover:bg-[#FFD000] text-[#100F06] font-medium text-base sm:text-lg rounded-lg transition-all duration-300 transform ${buttonHovered ? 'scale-[1.02] shadow-lg' : 'shadow-md'}`}
          >
            Proceed
          </Button>
        </div>

        {/* Subtle character icon with responsive sizing */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className={`${getBackgroundCircleSize()} bg-gradient-to-br from-[#FFDA57] to-[#FFD000] rounded-full flex items-center justify-center ${getEmojiSize()} animate-bounce`}>
            🤖
          </div>
        </div>
      </div>
    </div>
  );
}