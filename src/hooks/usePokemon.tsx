import { useState } from 'react';
import type { Pokemon } from '../context/RegistryContext.tsx';

export const usePokemon = () => {
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async (name: string): Promise<Pokemon | null> => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Sin resultados");
        }
        throw new Error("No se pudo consultar PokeApi");
      }

      const data = await response.json();

      return {
        id: data.id,
        name: data.name,
        image: data.sprites?.front_default || "",
        type: data.types[0]?.type?.name || ""
      };
    } finally {
      setLoading(false);
    }
  };

  return { fetchPokemon, loading };
};