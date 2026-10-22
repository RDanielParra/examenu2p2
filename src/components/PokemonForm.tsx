import { useActionState } from 'react'
import { useRegistry } from '../context/RegistryContext.tsx'

interface FormState {
  success?: string
  errors?: {
    pokemon?: string
    nickname?: string
    role?: string
  }
}

export default function PokemonForm() {
  const {
    state: { selectedPokemon },
    dispatch
  } = useRegistry()

  const registerPokemon = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const nickname = ((formData.get('nickname') as string) || '').trim()
    const role = formData.get('role') as string
    const errors: FormState['errors'] = {}

    if (!selectedPokemon) {
      errors.pokemon = 'No hay ningún pokémon cargado.'
    }
    if (nickname.length < 3) {
      errors.nickname = 'El apodo debe tener al menos 3 caracteres.'
    }
    if (role !== 'titular' && role !== 'reserva') {
      errors.role = 'Rol inválido.'
    }

    if (Object.keys(errors).length > 0) {
      return { errors }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    dispatch({
      type: 'ADD_ENTRY',
      payload: {
        entryId: crypto.randomUUID(),
        pokemonId: selectedPokemon!.id,
        pokemonName: selectedPokemon!.name,
        image: selectedPokemon!.image,
        type: selectedPokemon!.type,
        nickname,
        role: role as 'titular' | 'reserva'
      }
    })

    return { success: 'Pokemon registrado correctamente' }
  }

  const [formState, formAction, isPending] = useActionState(registerPokemon, {})

  return (
    <section className='panel' aria-labelledby='form-title'>
      <div className='section-heading'>
        <span className='step'>02</span>
        <div>
          <h2 id='form-title'>Datos del pokémon</h2>
          <p>La búsqueda llena estos campos. Después simula el registro.</p>
        </div>
      </div>
      <form className='ticket-form' noValidate action={formAction}>
        <div className='preview'>
          {selectedPokemon ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {selectedPokemon.image && (
                <img
                  src={selectedPokemon.image}
                  alt={selectedPokemon.name}
                  width={72}
                  height={72}
                />
              )}
              <div>
                <p className='ticket-id'>
                  #{selectedPokemon.id} {selectedPokemon.name}
                </p>
                <strong>Pokémon cargado</strong>
              </div>
            </div>
          ) : (
            <div>
              <p className='ticket-id'>Sin selección</p>
              <strong>Ningún pokémon cargado</strong>
            </div>
          )}
        </div>
        <div className='field'>
          <label htmlFor='pokemonId'>Número</label>
          <input
            id='pokemonId'
            name='pokemonId'
            value={selectedPokemon?.id || ''}
            readOnly
          />
        </div>
        <div className='field'>
          <label htmlFor='pokemonName'>Nombre</label>
          <input
            id='pokemonName'
            name='pokemonName'
            value={selectedPokemon?.name || ''}
            readOnly
          />
        </div>
        <div className='field'>
          <label htmlFor='type'>Tipo</label>
          <input
            id='type'
            name='type'
            value={selectedPokemon?.type || ''}
            readOnly
          />
        </div>
        <div className='field'>
          <label htmlFor='nickname'>Apodo</label>
          <input id='nickname' name='nickname' placeholder='Ej. Chispa' />
          <small>Mínimo 3 caracteres.</small>
        </div>
        <div className='field'>
          <label htmlFor='role'>Rol</label>
          <select id='role' name='role'>
            <option value=''>Selecciona un rol</option>
            <option value='titular'>Titular</option>
            <option value='reserva'>Reserva</option>
          </select>
        </div>
        <div className='feedback' aria-live='polite'>
          {formState.errors?.pokemon && <p>{formState.errors.pokemon}</p>}
          {formState.errors?.nickname && <p>{formState.errors.nickname}</p>}
          {formState.errors?.role && <p>{formState.errors.role}</p>}
          {formState.success && (
            <p className='text-green'>{formState.success}</p>
          )}
        </div>
        <button className='button primary' type='submit' disabled={isPending}>
          {isPending ? 'Registrando...' : 'Registrar pokémon'}
        </button>
      </form>
    </section>
  )
}
