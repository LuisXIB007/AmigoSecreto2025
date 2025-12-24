import { Assignment } from '../types';
import { PARTICIPANTS } from '../constants';

/**
 * Encodes the assignments into a base64 string based on participant indices.
 * This creates a short URL parameter.
 */
export const serializeAssignments = (assignments: Assignment[]): string => {
  // Sort assignments by the order of givers in PARTICIPANTS to ensure consistent indexing
  const sorted = [...assignments].sort((a, b) => 
    PARTICIPANTS.indexOf(a.giver) - PARTICIPANTS.indexOf(b.giver)
  );
  
  // Create an array of indices representing who each person (in order) received
  const receiverIndices = sorted.map(a => PARTICIPANTS.indexOf(a.receiver));
  
  // Convert to JSON and then Base64
  return btoa(JSON.stringify(receiverIndices));
};

/**
 * Decodes the base64 string back into Assignment objects.
 */
export const deserializeAssignments = (code: string): Assignment[] | null => {
  try {
    const indices: number[] = JSON.parse(atob(code));
    
    // Validate the data matches our expected participant count
    if (!Array.isArray(indices) || indices.length !== PARTICIPANTS.length) {
      return null;
    }

    return PARTICIPANTS.map((giver, i) => {
      const receiverIndex = indices[i];
      // Safety check for invalid indices
      if (receiverIndex < 0 || receiverIndex >= PARTICIPANTS.length) throw new Error("Invalid index");
      
      return {
        giver,
        receiver: PARTICIPANTS[receiverIndex]
      };
    });
  } catch (e) {
    console.error("Failed to deserialize game from URL", e);
    return null;
  }
};