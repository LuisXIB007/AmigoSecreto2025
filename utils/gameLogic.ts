import { ParticipantName, Assignment } from '../types';

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Checks if a specific pairing is allowed based on the rules.
 */
const isPairAllowed = (giver: ParticipantName, receiver: ParticipantName): boolean => {
  // Regla 0: Nadie se puede regalar a sí mismo
  if (giver === receiver) return false;

  // Regla 1: Dina y Luis no pueden salir entre ellos
  if ((giver === 'Dina' && receiver === 'Luis') || (giver === 'Luis' && receiver === 'Dina')) {
    return false;
  }

  // Regla 2: Maria y Leonardo no pueden salir entre ellos
  if ((giver === 'Maria' && receiver === 'Leonardo') || (giver === 'Leonardo' && receiver === 'Maria')) {
    return false;
  }

  return true;
};

/**
 * Generates assignments ensuring a participant never gets themselves
 * and specific constraints are met.
 */
export const generateAssignments = (participants: ParticipantName[]): Assignment[] => {
  let isValid = false;
  let receivers: ParticipantName[] = [];

  // Try until we find a valid permutation (derangement with constraints)
  // For 8 items, probability of finding a valid set is high, so this loop finishes quickly.
  while (!isValid) {
    receivers = shuffleArray(participants);
    isValid = participants.every((giver, index) => isPairAllowed(giver, receivers[index]));
  }

  return participants.map((giver, index) => ({
    giver,
    receiver: receivers[index],
  }));
};