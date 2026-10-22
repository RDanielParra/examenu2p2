import { useState } from 'react';
import { useRegistry } from '../context/RegistryContext.tsx';
import { usePokemon } from '../hooks/usePokemon.tsx';

export default function PokemonSearch() {
  const { dispatch } = useRegistry();
  const { fetchPokemon } = usePokemon();
  const [message, setMessage] = useState("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = (formData.get('query') as string || "").trim();

    if (query.length < 3) {
      setMessage("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    setMessage("");

    try {
      const pokemon = await fetchPokemon(query);
      if (pokemon) {
        dispatch({ type: 'SET_POKEMON', payload: pokemon });
      }
    } catch (err) {
      setMessage((err as Error).message);
    }
  };

  return (
    <section className="panel" aria-labelledby="search-title">
      <div className="section-heading">
        <span className="step">01</span>
        <div>
          <h2 id="search-title">Buscar pokémon</h2>
          <p>Escribe el nombre exacto para cargarlo en el formulario.</p>
        </div>
      </div>
      <form className="ticket-form" noValidate onSubmit={handleSearch}>
        <div className="field">
          <label htmlFor="query">Nombre</label>
          <input id="query" name="query" placeholder="Ej. pikachu" autoComplete="off" />
          <small>Mínimo 3 caracteres.</small>
        </div>
        <div className="feedback" aria-live="polite">
          {message && <p>{message}</p>}
        </div>
        <button className="button primary" type="submit">Buscar</button>
      </form>
    </section>
  );
}