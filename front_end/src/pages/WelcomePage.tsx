import React, { useState, useEffect } from "react";
import { BookOpen, Users, Sparkles, ArrowRight, Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const navigate = useNavigate();

  const featuredBooks = [
    { title: "The Midnight Library", author: "Matt Haig", rating: 4.8 },
    { title: "Klara and the Sun", author: "Kazuo Ishiguro", rating: 4.6 },
    { title: "Project Hail Mary", author: "Andy Weir", rating: 4.9 },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentBookIndex((prev) => (prev + 1) % featuredBooks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSignIn = () => {
     navigate("/login");
    console.log("Navigate to login");
  };

  const handleSignUp = () => {
     navigate("/signup");
    console.log("Navigate to signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating book icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float text-white/10 ${
              i % 2 === 0 ? 'animate-bounce' : 'animate-pulse'
            }`}
            style={{
              top: `${20 + (i * 15)}%`,
              left: `${10 + (i * 15)}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <BookOpen size={24} />
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className={`w-full max-w-7xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Main content container */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              
              {/* Left side - Hero content */}
              <div className="lg:w-3/5 p-12 lg:p-16 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 text-purple-300">
                    <Sparkles size={24} className="animate-spin" />
                    <span className="text-sm font-medium tracking-wider uppercase">Premium Book Club Experience</span>
                  </div>
                  
                  <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                    Your Next
                    <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                      Great Read
                    </span>
                    Awaits
                  </h1>
                  
                  <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                    Join thousands of passionate readers in our exclusive community. Discover curated books, 
                    engage in meaningful discussions, and track your literary journey like never before.
                  </p>
                </div>

                {/* Stats */}
                <div className="flex space-x-8 py-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">12K+</div>
                    <div className="text-purple-300 text-sm">Active Readers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">850+</div>
                    <div className="text-purple-300 text-sm">Books Reviewed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">95%</div>
                    <div className="text-purple-300 text-sm">Satisfaction</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={handleSignUp}
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl text-lg font-semibold shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/25 flex items-center justify-center space-x-2"
                  >
                    <span>Start Your Journey</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button
                    onClick={handleSignIn}
                    className="px-8 py-4 border-2 border-white/20 text-white hover:bg-white/10 rounded-2xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                  >
                    Sign In
                  </button>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center space-x-6 pt-6 text-gray-400 text-sm">
                  <div className="flex items-center space-x-1">
                    <Heart size={16} className="text-red-400" />
                    <span>Loved by readers</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-yellow-400" />
                    <span>4.9/5 rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={16} className="text-blue-400" />
                    <span>Join 12k+ members</span>
                  </div>
                </div>
              </div>

              {/* Right side - Interactive showcase */}
              <div className="lg:w-2/5 relative p-8 lg:p-12 flex items-center justify-center">
                <div className="relative">
                  {/* Main showcase card */}
                  <div className="w-80 h-96 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 transform rotate-3 hover:rotate-0 transition-all duration-500 shadow-2xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-semibold">Featured This Week</h3>
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      
                      {/* Book showcase */}
                      <div className="space-y-4">
                        <div className="w-full h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <BookOpen size={48} className="text-white" />
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-white font-bold text-lg">
                            {featuredBooks[currentBookIndex].title}
                          </h4>
                          <p className="text-gray-300">
                            by {featuredBooks[currentBookIndex].author}
                          </p>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} className="text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="text-gray-300 text-sm">
                              {featuredBooks[currentBookIndex].rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center animate-bounce">
                    <Users size={24} className="text-purple-300" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-500/20 backdrop-blur-xl rounded-xl flex items-center justify-center animate-pulse">
                    <Heart size={20} className="text-pink-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;