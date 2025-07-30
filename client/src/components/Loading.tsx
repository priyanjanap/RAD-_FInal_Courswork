import React from 'react';

const LoadingAnimation: React.FC = () => {
  return (
    <div className="h-screen bg-gradient-to-tr from-indigo-950 via-slate-900 to-purple-950 flex items-center justify-center relative overflow-hidden">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full gap-4 p-8">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"
                style={{
                  animation: `fadeInOut 3s infinite`,
                  animationDelay: `${(i % 16) * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 max-w-lg mx-auto px-6">
        {/* Morphing Logo */}
        <div className="mb-12 relative">
          <div className="relative w-32 h-32 mx-auto">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full animate-spin" 
                 style={{ animationDuration: '10s' }}>
              <div className="w-full h-full bg-gradient-to-tr from-indigo-950 via-slate-900 to-purple-950 rounded-full scale-75 origin-center"></div>
            </div>
            
            {/* Inner Pulsing Circle */}
            <div className="absolute inset-4 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-pulse">
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Title */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-2">
            {['B', 'o', 'o', 'k', ' ', 'C', 'l', 'u', 'b'].map((letter, index) => (
              <span
                key={index}
                className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                style={{
                  animation: `letterBounce 2s infinite`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h1>
          <div className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mx-auto animate-pulse" 
               style={{ width: '200px' }}></div>
        </div>

        {/* Page Flip Animation */}
        <div className="mb-10 flex justify-center">
          <div className="relative w-24 h-32">
            {/* Base Book */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-800 rounded-r-lg shadow-xl"></div>
            
            {/* Animated Pages */}
            {[0, 1, 2, 3, 4].map((page) => (
              <div
                key={page}
                className="absolute top-1 left-1 w-20 h-30 bg-gradient-to-br from-white to-gray-100 rounded-r-md shadow-lg origin-left"
                style={{
                  animation: `pageFlip 2s infinite`,
                  animationDelay: `${page * 0.3}s`,
                  transformStyle: 'preserve-3d',
                  zIndex: 5 - page
                }}
              >
                <div className="absolute inset-2 opacity-20">
                  <div className="h-1 bg-gray-400 rounded mb-1"></div>
                  <div className="h-1 bg-gray-300 rounded mb-1"></div>
                  <div className="h-1 bg-gray-400 rounded mb-1"></div>
                  <div className="h-1 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading Progress Bar */}
        <div className="mb-8">
          <div className="w-80 h-2 bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full animate-pulse"></div>
              <div 
                className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full"
                style={{
                  animation: `progressShine 2s infinite`
                }}
              ></div>
            </div>
          </div>
          <p className="text-blue-300 text-sm mt-2 animate-pulse">
            Preparing your reading sanctuary...
          </p>
        </div>

        {/* Floating Text Elements */}
        <div className="mb-8 relative h-16">
          {['Novel', 'Poetry', 'Mystery', 'Romance', 'Fantasy'].map((genre, index) => (
            <span
              key={genre}
              className="absolute text-sm font-medium text-blue-300 opacity-70"
              style={{
                left: `${20 + (index * 15)}%`,
                animation: `floatText 4s infinite ease-in-out`,
                animationDelay: `${index * 0.8}s`
              }}
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Status Message */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-center mb-3">
            <div className="flex space-x-1">
              {[0, 1, 2].map((dot) => (
                <div
                  key={dot}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  style={{
                    animation: `dotPulse 1.5s infinite`,
                    animationDelay: `${dot * 0.2}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
          <p className="text-slate-300 text-lg font-medium mb-1">Loading Library</p>
          <p className="text-slate-400 text-sm">
            Discovering new worlds, one page at a time
          </p>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particleFloat 6s infinite linear`,
              animationDelay: `${Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes letterBounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes pageFlip {
          0%, 80%, 100% { transform: rotateY(0deg); opacity: 1; }
          10%, 70% { transform: rotateY(-180deg); opacity: 0.7; }
        }
        
        @keyframes progressShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        
        @keyframes floatText {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
          50% { transform: translateY(-10px) translateX(-5px); opacity: 1; }
          75% { transform: translateY(-25px) translateX(15px); opacity: 0.6; }
        }
        
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes particleFloat {
          0% { transform: translateY(100vh) rotate(0deg); }
          100% { transform: translateY(-100vh) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;