import Header from './components/Header.tsx';
import RegistrySummary from './components/RegistrySummary.tsx';
import PokemonSearch from './components/PokemonSearch.tsx';
import PokemonForm from './components/PokemonForm.tsx';
import RegistryList from './components/RegistryList.tsx';
import { RegistryProvider } from './context/RegistryContext.tsx';

export default function App() {
  return (
    <RegistryProvider>
      <div className="app-shell">
        <Header />
        <main>
          <RegistrySummary />
          <div className="workspace">
            <div className="stack">
              <PokemonSearch />
              <PokemonForm />
            </div>
            <RegistryList />
          </div>
        </main>
        <footer>ISC ALL RIGHT RESERVED © 2026</footer>
      </div>
    </RegistryProvider>
  );
}