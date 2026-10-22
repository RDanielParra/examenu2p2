import EmptyState from './EmptyState.tsx'
import { useRegistry } from '../context/RegistryContext.tsx'
import RegistryItem from './RegistryItem.tsx'

export default function RegistryList() {
  const { state } = useRegistry()

  return (
    <section className='panel list-panel' aria-labelledby='list-title'>
      <div className='section-heading'>
        <span className='step'>03</span>
        <div>
          <h2 id='list-title'>Registros</h2>
          <p>Cada envío simulado agrega una tarjeta al final.</p>
        </div>
      </div>
      <div className='ticket-list'>
        {state.entries.length === 0 ? (
          <EmptyState />
        ) : (
          state.entries.map((entry) => (
            <RegistryItem key={entry.entryId} entry={entry} />
          ))
        )}
      </div>
    </section>
  )
}
