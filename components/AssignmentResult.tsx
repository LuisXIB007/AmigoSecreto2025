import React, { useState, useEffect } from 'react';
import { Assignment, ParticipantName } from '../types';
import { COLORS } from '../constants';
import { Gift, Eye, EyeOff, CheckCircle, RefreshCcw, Lock, Share2, Copy, Check } from 'lucide-react';

interface AssignmentResultProps {
  assignments: Assignment[];
  participants: ParticipantName[];
  onReset: () => void;
}

export const AssignmentResult: React.FC<AssignmentResultProps> = ({ assignments, participants, onReset }) => {
  const [selectedUser, setSelectedUser] = useState<ParticipantName | ''>('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentAssignment = assignments.find(a => a.giver === selectedUser);

  useEffect(() => {
    setIsRevealed(false);
  }, [selectedUser]);

  const handleReveal = () => {
    if (!selectedUser) return;
    setIsRevealed(true);
  };

  const handleClose = () => {
    setIsRevealed(false);
    setSelectedUser('');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Share Section - Ticket Style */}
      <div className="relative bg-white text-slate-800 rounded-lg shadow-xl overflow-hidden border-2 border-dashed border-red-500 p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
        <div className="absolute top-0 left-0 w-full h-2 bg-repeating-linear-gradient(45deg, #ef4444, #ef4444 10px, #ffffff 10px, #ffffff 20px)"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-repeating-linear-gradient(45deg, #ef4444, #ef4444 10px, #ffffff 10px, #ffffff 20px)"></div>
        
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full text-green-600">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-red-600 font-sans tracking-tight">¡Sorteo Listo!</h3>
          <p className="text-slate-600 text-sm font-medium">
            Envía este ticket digital a tus amigos para que descubran su regalo.
          </p>
          <button 
            onClick={handleCopyLink}
            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? '¡Enlace Copiado!' : 'Copiar Enlace'}
          </button>
        </div>
      </div>

      <div className="bg-emerald-800/80 border border-green-400/30 rounded-full py-2 px-4 flex items-center gap-2 text-green-100 justify-center text-sm shadow-lg backdrop-blur-md">
        <CheckCircle className="w-4 h-4 text-green-300" />
        <span className="font-semibold">Lista revisada por Santa (Dos veces)</span>
      </div>

      {/* Main Interaction Card */}
      <div className="glass-panel p-1 rounded-3xl shadow-2xl relative">
        {/* Decorative bow */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-red-600 rounded-full z-20 flex items-center justify-center shadow-lg border-4 border-red-700">
           <Gift className="text-white w-8 h-8" />
        </div>

        <div className="bg-white/10 p-6 md:p-8 rounded-[20px] pt-12 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6 text-center festive-font drop-shadow-md">
            ¿Para quién es tu regalo?
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-yellow-200 font-bold ml-1 uppercase tracking-wide">Busca tu nombre:</label>
              <div className="relative">
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value as ParticipantName)}
                  className="w-full bg-red-900/60 border-2 border-red-400 text-white text-lg rounded-xl p-4 appearance-none focus:ring-4 focus:ring-yellow-400 focus:border-transparent outline-none transition-all cursor-pointer font-medium"
                >
                  <option value="" disabled>Selecciona tu nombre</option>
                  {participants.map(p => (
                    <option key={p} value={p} className="text-black">{p}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-red-200">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </div>

            {!isRevealed ? (
              <button
                onClick={handleReveal}
                disabled={!selectedUser}
                className={`w-full py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-3 transition-all duration-300 border-b-4
                  ${selectedUser 
                    ? 'bg-yellow-400 hover:bg-yellow-300 text-red-800 border-yellow-600 shadow-lg transform hover:-translate-y-1' 
                    : 'bg-slate-700/50 text-slate-400 border-slate-800 cursor-not-allowed'}`}
              >
                <Gift className={`w-6 h-6 ${selectedUser ? 'animate-bounce' : ''}`} />
                Abrir mi Asignación
              </button>
            ) : (
              <div className="animate-fade-in text-center space-y-6 py-6 bg-white/10 rounded-xl border border-white/20">
                 <div className="relative inline-block">
                   <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-30 rounded-full animate-pulse"></div>
                   <div className="relative transform scale-110">
                      <p className="text-yellow-200 text-sm font-bold uppercase tracking-widest mb-1">Debes regalarle a:</p>
                      <div className="text-5xl md:text-6xl font-bold text-white festive-font drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] pb-4">
                        {currentAssignment?.receiver}
                      </div>
                      
                      {currentAssignment && (
                        <div className={`mt-2 w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-2xl border-4 border-white/30 ${COLORS[currentAssignment.receiver]}`}>
                          <span className="festive-font">{currentAssignment.receiver.charAt(0)}</span>
                        </div>
                      )}
                   </div>
                 </div>

                 <div className="pt-6 px-4">
                   <button
                    onClick={handleClose}
                    className="w-full px-6 py-3 bg-red-800 hover:bg-red-700 text-red-100 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 border border-red-600"
                   >
                     <EyeOff className="w-5 h-5" />
                     Guardar Secreto (Cerrar)
                   </button>
                   <p className="mt-3 text-xs text-red-200 font-medium italic">
                     "Shhh... ¡Que no se entere nadie hasta Navidad!" 🤫
                   </p>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        {!showConfirmReset ? (
           <button 
             onClick={() => setShowConfirmReset(true)}
             className="text-sm text-red-300 hover:text-white flex items-center gap-2 transition-colors font-medium bg-red-950/30 px-4 py-2 rounded-full"
           >
             <Lock className="w-3 h-3" />
             Reiniciar sorteo (Nuevo Link)
           </button>
        ) : (
          <div className="bg-red-900 border border-red-500 p-4 rounded-xl text-center space-y-3 shadow-xl max-w-xs mx-auto">
            <p className="text-white font-bold festive-font text-xl">¿Romper los regalos?</p>
            <p className="text-red-200 text-xs">Se perderán las asignaciones actuales.</p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-lg hover:bg-slate-700 font-bold"
              >
                Cancelar
              </button>
              <button 
                onClick={onReset}
                className="px-4 py-2 bg-red-600 text-white text-xs rounded-lg hover:bg-red-500 flex items-center gap-1 font-bold shadow-md"
              >
                <RefreshCcw className="w-3 h-3" />
                Sí, reiniciar
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};