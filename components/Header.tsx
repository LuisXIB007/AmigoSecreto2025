import React from 'react';
import { Trees, Snowflake } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center justify-center py-8 px-4 text-center space-y-4">
      <div className="relative">
        <div className="absolute -top-2 -left-4 text-yellow-300 animate-pulse">
          <Snowflake className="w-6 h-6" />
        </div>
        <div className="absolute top-8 -right-6 text-white animate-pulse" style={{ animationDelay: '1s' }}>
          <Snowflake className="w-4 h-4" />
        </div>
        
        <div className="p-4 bg-green-700 rounded-full shadow-xl border-4 border-red-600 ring-4 ring-yellow-400">
          <Trees className="w-12 h-12 text-white" />
        </div>
      </div>
      
      <div>
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] tracking-wide">
          <span className="text-red-500 bg-white px-2 rounded-lg transform -rotate-2 inline-block mr-2 shadow-lg">Amigo</span>
          <span className="text-green-400">Secreto</span>
        </h1>
        <div className="mt-2 text-yellow-300 font-bold text-lg uppercase tracking-widest text-shadow">
          ¡Edición Navideña! 🎄
        </div>
      </div>
      
      <p className="text-red-100 text-base md:text-lg max-w-md font-medium bg-red-900/40 px-4 py-2 rounded-xl backdrop-blur-sm">
        Ho Ho Ho! Organiza el intercambio de regalos perfecto para estas fiestas.
      </p>
    </header>
  );
};