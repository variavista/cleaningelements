import React from 'react';
import { Droplets, Wind, Flame, Mountain, Star } from 'lucide-react';

const AnimatedLogo = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative w-20 h-20 mb-4">
        {/* Outer rotating elements */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Droplets className="w-5 h-5 text-blue-400" />
          </div>
          <div className="absolute top-1/2 right-0 translate-y-1/2 translate-x-1/2">
            <Wind className="w-5 h-5 text-gray-400" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <Flame className="w-5 h-5 text-red-400" />
          </div>
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
            <Mountain className="w-5 h-5 text-green-400" />
          </div>
        </div>
        {/* Center star */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse">
            <Star className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 animate-gradient">
        CleaningElements
      </h1>
    </div>
  );
};

export default AnimatedLogo;