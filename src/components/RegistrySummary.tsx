import { useRegistry } from '../context/RegistryContext.tsx'

export default function RegistrySummary() {
  const { state } = useRegistry()
  const total = state.entries.length
  const titulares = state.entries.filter((e) => e.role === 'titular').length
  const reservas = state.entries.filter((e) => e.role === 'reserva').length

  return (
    <section className='summary' aria-label='Resumen de registros'>
      <article className='stat'>
        <span>Total</span>
        <strong>{total}</strong>
      </article>
      <article className='stat'>
        <span>Titulares</span>
        <strong className='text-amber'>{titulares}</strong>
      </article>
      <article className='stat'>
        <span>Reservas</span>
        <strong className='text-green'>{reservas}</strong>
      </article>
    </section>
  )
}
