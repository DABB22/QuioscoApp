
// import { useEffect, useCallback } from 'react';
import Layout from '../layout/layout'
import useQuiosco from '../hooks/useQuiosco';
import { formatearDinero } from '../helpers';

export default function Total({}) {

    
    const {pedido, inputNombre, setInputNombre, colocarOrden, total} = useQuiosco()

    // useCalback se uso por un error que marcaba en el useEffect y esta forma se solucionaba
    const comprobarPedido = () => {
        return pedido.length === 0 || inputNombre === '' || inputNombre < 3
    }

    // const comprobarPedido = useCallback( () => {
    //     return pedido.length === 0
    // }, [pedido])

    // useEffect(()=>{
    //     comprobarPedido()
    // }, [pedido, comprobarPedido])

    //* ----------------------------------------------RETURN---------------------------------------------------------- //
    return (
        <Layout pagina={'Total'}>
            <h1 className='text-4xl font-black'>Total y Confirmar Pedido</h1>
            <p className='text-2xl my-10'>Confirma tu pedido a Continuación</p>

            <form
                onSubmit={colocarOrden}
            >
                <div>
                    <label htmlFor='nombre' className='block uppercase text-slate-800 font-bolt text-xl'>Nombre</label>

                    <input
                        type='text'
                        id='nombre'
                        className='bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md'
                        value={inputNombre}
                        onChange={ e => setInputNombre(e.target.value)}
                    />
                </div>

                <div className='mt-10'>
                    <p
                        className='text-2xl'
                    >Total a pagar {' '} <span className='font-bold'>{formatearDinero(total)}</span></p>
                </div>

                <div className='mt-5'>
                    <input
                        value={'Confirmar Pedido'}
                        className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'} w-full lg:w-auto py-2 px-5 rounded text-center uppercase font-bold text-white bg-indigo-600`}
                        type='submit'
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </Layout>   
      )
  }