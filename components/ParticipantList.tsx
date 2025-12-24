import React from 'react';
import { ParticipantName } from '../types';
import { COLORS } from '../constants';

interface ParticipantListProps {
  participants: ParticipantName[];
}

export const ParticipantList: React.FC<ParticipantListProps> = ({ participants }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="h-px bg-white/30 flex-1"></div>
        <h3 className="text-yellow-200 text-xl md:text-2xl font-bold festive-font tracking-wider">Lista de Elfos</h3>
        <div className="h-px bg-white/30 flex-1"></div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {participants.map((name, index) => (
          <div 
            key={name}
            className="group relative flex flex-col items-center"
          >
            {/* Hanging string */}
            <div className="absolute -top-4 w-0.5 h-4 bg-yellow-400/70 group-hover:h-6 transition-all duration-300"></div>
            
            {/* Ornament body */}
            <div className={`
              w-20 h-20 rounded-full shadow-lg flex items-center justify-center 
              transform transition-transform hover:rotate-12 hover:scale-110
              ${COLORS[name]} shadow-lg shadow-black/30 relative overflow-hidden
            `}>
              {/* Shine effect on ornament */}
              <div className="absolute top-2 left-3 w-6 h-4 bg-white/40 rounded-full blur-[2px] transform -rotate-45"></div>
              
              <span className="text-2xl font-bold text-white drop-shadow-md festive-font">
                {name.charAt(0)}
              </span>
            </div>
            
            <div className="mt-3 bg-white/90 text-red-700 px-3 py-1 rounded-full text-sm font-bold shadow-sm transform -rotate-2">
              {name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};