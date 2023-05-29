
import { useState, useEffect } from "react"
import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from "../helpers"

const ModalProducto = () => {
    const {producto, handleSetModal, handleAgregarpedido, pedido} = useQuiosco()
    const [cantidad, setCantidad] = useState(1)
    const [edicionCantidad, setEdicionCantidad] = useState(false)

    useEffect(() => {
        if(pedido.some(pedidoState => pedidoState.id === producto.id)){
            setEdicionCantidad(true)
            pedido.forEach( pedidoState => {
                if(pedidoState.id === producto.id){
                    setCantidad(pedidoState.cantidad)
                }
            })
        }
    },[producto, pedido])

  return (

    <div className="md:flex gap-10">
        <div className="md:w-1/3">
            <Image
                src={`/assets/img/${producto.imagen}.jpg`}
                alt={`imagen producto ${producto.nombre}`}
                width={300}
                height={400}
            />
        </div>

        <div className="md:w-2/3">
            <div className="flex justify-end">
                <button
                    onClick={handleSetModal}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
            </div>
            <h1 className="text-4xl font-bold mt-5">{producto.nombre}</h1>
            <p className="mt-5 font-black text-5xl text-amber-500">{formatearDinero(producto.precio)}</p>

            <div className="flex gap-4 mt-5">
                <button
                    type="button"
                    onClick={()=>{
                        if(cantidad>1){
                            setCantidad(cantidad-1)
                        }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
                    </svg>
                </button>

                <p className="text-3xl">{cantidad}</p>

                <button
                    type="button"
                    onClick={()=>{
                        if(cantidad>0 && cantidad<10){
                            setCantidad(cantidad+1)
                        }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
                    </svg>
                </button>
                
            </div>

            <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded"
                onClick={() => handleAgregarpedido({...producto, cantidad})}
            >{edicionCantidad ? 'Guardar Cambios' : 'Agregar Al Pedido'}</button>

        </div>
    </div>

  )
}

export default ModalProducto