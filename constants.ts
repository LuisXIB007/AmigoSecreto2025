import { ParticipantName } from './types';

export const PARTICIPANTS: ParticipantName[] = [
  'Maria',
  'Leonardo',
  'Carolina',
  'Tatiana',
  'Luis',
  'Joshua',
  'Xande',
  'Dina'
];

// Christmas Palette: Reds, Greens, Golds, Icy Blues
export const COLORS: Record<ParticipantName, string> = {
  Maria: 'bg-red-600 border-2 border-white',
  Leonardo: 'bg-green-600 border-2 border-yellow-400',
  Carolina: 'bg-yellow-500 border-2 border-red-600',
  Tatiana: 'bg-blue-400 border-2 border-white',
  Luis: 'bg-emerald-700 border-2 border-red-400',
  Joshua: 'bg-red-800 border-2 border-green-400',
  Xande: 'bg-indigo-600 border-2 border-yellow-300',
  Dina: 'bg-rose-500 border-2 border-white',
};