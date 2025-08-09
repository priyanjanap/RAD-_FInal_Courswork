import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Heart, Star } from 'lucide-react';

const LoadingAnimation: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing your library...');

  const loadingMessages = [
    'Initializing your library...',
    'Curating personalized recommendations...',
    'Connecting with fellow readers...',
    'Loading your next adventure...',
    'Almost ready to explore...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 15, 100);
        const messageIndex = Math.floor((newProgress / 100) * loadingMessages.length);
        setLoadingText(loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)]);
        return newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 flex items-center justify-center relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`absolute ${i % 3 === 0 ? 'w-3 h-3' : i % 3 === 1 ? 'w-2 h-2' : 'w-4 h-4'} 
                       ${i % 4 === 0 ? 'bg-purple-400/30' : i % 4 === 1 ? 'bg-cyan-400/30' : i % 4 === 2 ? 'bg-pink-400/30' : 'bg-blue-400/30'} 
                       ${i % 2 === 0 ? 'rounded-full' : 'rounded-sm rotate-45'} 
                       animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="text-center z-10 max-w-2xl mx-auto px-6">
        
        {/* Logo with morphing animation */}
        <div className="mb-16 relative">
          <div className="relative w-40 h-40 mx-auto">
            {/* Outer rotating rings */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 border-4 border-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 rounded-full animate-spin opacity-80"
                   style={{ animationDuration: '8s' }}>
                <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 rounded-full scale-75 origin-center"></div>
              </div>
              
              <div className="absolute inset-2 border-2 border-transparent bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 rounded-full animate-spin opacity-60"
                   style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
                <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 rounded-full scale-90 origin-center"></div>
              </div>
            </div>

            {/* Center content */}
            <div className="absolute inset-6 bg-gradient-to-br from-purple-600/90 to-cyan-600/90 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center animate-pulse">
              <BookOpen size={32} className="text-white animate-bounce" />
            </div>

            {/* Orbiting icons */}
            {[Sparkles, Heart, Star].map((Icon, index) => (
              <div
                key={index}
                className="absolute w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                style={{
                  animation: `orbit 4s infinite linear`,
                  animationDelay: `${index * 1.3}s`,
                  transformOrigin: '80px 80px'
                }}
              >
                <Icon size={14} className="text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Animated brand name */}
        <div className="mb-12">
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="inline-block bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              BookClub
            </span>
          </h1>
          <div className="flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Interactive book animation */}
        <div className="mb-16 flex justify-center">
          <div className="relative">
            {/* Book stack */}
            <div className="relative w-32 h-24">
              {[0, 1, 2].map((book) => (
                <div
                  key={book}
                  className={`absolute w-28 h-4 rounded-sm shadow-lg transform transition-all duration-1000
                             ${book === 0 ? 'bg-gradient-to-r from-purple-500 to-purple-600 top-0 rotate-2' :
                               book === 1 ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 top-3 -rotate-1' :
                               'bg-gradient-to-r from-pink-500 to-pink-600 top-6 rotate-1'}`}
                  style={{
                    animation: `bookStack 3s infinite ease-in-out`,
                    animationDelay: `${book * 0.3}s`
                  }}
                />
              ))}
              
              {/* Floating page */}
              <div className="absolute -top-4 left-8 w-16 h-20 bg-white/90 rounded-sm shadow-xl animate-float">
                <div className="p-2 space-y-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`h-0.5 bg-gray-400 rounded ${i % 2 === 0 ? 'w-full' : 'w-3/4'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern progress bar */}
        <div className="mb-12">
          <div className="w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-cyan-300">{Math.round(progress)}%</span>
              <span className="text-sm text-gray-400">Complete</span>
            </div>
            <div className="h-3 bg-slate-800/50 backdrop-blur-sm rounded-full overflow-hidden border border-slate-700/50">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        </div>

        {/* Status card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl max-w-md mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="flex space-x-2">
              {[0, 1, 2].map((dot) => (
                <div
                  key={dot}
                  className="w-3 h-3 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                  style={{
                    animation: `dotWave 1.8s infinite ease-in-out`,
                    animationDelay: `${dot * 0.3}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          <p className="text-white text-xl font-semibold mb-2">
            {loadingText}
          </p>
          <p className="text-gray-400 text-sm">
            Crafting your perfect reading experience
          </p>
        </div>

        {/* Floating genre tags */}
        <div className="absolute inset-0 pointer-events-none">
          {['Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Thriller'].map((genre, index) => (
            <div
              key={genre}
              className="absolute px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/70"
              style={{
                left: `${15 + (index % 3) * 25}%`,
                top: `${20 + Math.floor(index / 3) * 60}%`,
                animation: `floatGenre 6s infinite ease-in-out`,
                animationDelay: `${index * 0.8}s`
              }}
            >
              {genre}
            </div>
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        
        @keyframes bookStack {
          0%, 100% { transform: translateY(0px) rotate(var(--rotation)); }
          50% { transform: translateY(-8px) rotate(calc(var(--rotation) + 5deg)); }
        }
        
        @keyframes dotWave {
          0%, 60%, 100% { transform: scale(1) translateY(0); opacity: 0.7; }
          30% { transform: scale(1.3) translateY(-10px); opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes floatGenre {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          25% { transform: translateY(-15px) translateX(10px); opacity: 0.8; }
          50% { transform: translateY(-25px) translateX(-5px); opacity: 1; }
          75% { transform: translateY(-10px) translateX(15px); opacity: 0.6; }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;