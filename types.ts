export type ParticipantName = 'Maria' | 'Leonardo' | 'Carolina' | 'Tatiana' | 'Luis' | 'Joshua' | 'Xande' | 'Dina';

export interface Assignment {
  giver: ParticipantName;
  receiver: ParticipantName;
}

export enum GameState {
  SETUP = 'SETUP',
  READY = 'READY',
}