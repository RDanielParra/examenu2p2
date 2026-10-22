import type { Pokemon, RegistryEntry } from '../context/RegistryContext'

export type RegistryAction =
  | { type: 'ADD_ENTRY'; payload: RegistryEntry }
  | { type: 'REMOVE_ENTRY'; payload: string }
  | { type: 'SET_POKEMON'; payload: Pokemon }

export interface RegistryState {
  entries: RegistryEntry[]
  selectedPokemon: Pokemon | null
}

export const initialState: RegistryState = {
  entries: [],
  selectedPokemon: null
}

export function registryReducer(
  state: RegistryState,
  action: RegistryAction
): RegistryState {
  switch (action.type) {
    case 'ADD_ENTRY':
      return { ...state, entries: [...state.entries, action.payload] }
    case 'REMOVE_ENTRY':
      return {
        ...state,
        entries: state.entries.filter((e) => e.entryId !== action.payload)
      }
    case 'SET_POKEMON':
      return { ...state, selectedPokemon: action.payload }
    default:
      return state
  }
}
