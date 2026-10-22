import React, { createContext, useReducer, useContext } from 'react'

export interface Pokemon {
  id: number
  name: string
  image: string
  type: string
}

export interface RegistryEntry {
  entryId: string
  pokemonId: number
  pokemonName: string
  image: string
  type: string
  nickname: string
  role: 'titular' | 'reserva'
}

interface RegistryState {
  entries: RegistryEntry[]
  selectedPokemon: Pokemon | null
}

type RegistryAction =
  | { type: 'ADD_ENTRY'; payload: RegistryEntry }
  | { type: 'REMOVE_ENTRY'; payload: string }
  | { type: 'SET_POKEMON'; payload: Pokemon }

const initialState: RegistryState = {
  entries: [],
  selectedPokemon: null
}

function registryReducer(
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

const RegistryContext = createContext<
  | {
      state: RegistryState
      dispatch: React.Dispatch<RegistryAction>
    }
  | undefined
>(undefined)

export function RegistryProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(registryReducer, initialState)
  return (
    <RegistryContext.Provider value={{ state, dispatch }}>
      {children}
    </RegistryContext.Provider>
  )
}

export function useRegistry() {
  const context = useContext(RegistryContext)
  if (!context) {
    throw new Error('Algo salio terriblemente mal!!!!!!!!')
  }
  return context
}
