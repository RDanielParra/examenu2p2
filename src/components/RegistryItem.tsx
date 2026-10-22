import { type RegistryEntry } from '../context/RegistryContext.tsx'
import { useRegistry } from '../context/RegistryContext.tsx'

export default function RegistryItem({ entry }: { entry: RegistryEntry }) {
  const { dispatch } = useRegistry()

  return (
    <article className='ticket'>
      <div className='ticket-top'>
        <span className='ticket-id'>Registro {entry.entryId.slice(0, 8)}</span>
        <div className='badges'>
          <span className={`badge type-${entry.type}`}>{entry.type}</span>
          <span className={`badge role-${entry.role}`}>{entry.role}</span>
        </div>
      </div>
      <div className='preview'>
        <img src={entry.image} alt='' width={72} height={72} />
        <div>
          <h3>{entry.nickname}</h3>
          <p className='requester'>
            #{entry.pokemonId} {entry.pokemonName}
          </p>
        </div>
      </div>
      <div className='ticket-actions'>
        <button
          className='button danger'
          type='button'
          onClick={() =>
            dispatch({ type: 'REMOVE_ENTRY', payload: entry.entryId })
          }
        >
          Eliminar
        </button>
      </div>
    </article>
  )
}
