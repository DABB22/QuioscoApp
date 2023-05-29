

import {useState, useEffect, createContext} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext() 

const QuioscoProvider = ({children}) => {
    //*--------------------------------------------- STATES -------------------------------------------------------------
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [inputNombre, setInputNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()
    //*--------------------------------------------- FUNCIONES ----------------------------------------------------------
    const obtenerCategorias = async () => {
        const {data} = await axios('/api/categorias')
        setCategorias(data)
        setCategoriaActual(data[0])
    } 

    useEffect (()=>{
        obtenerCategorias()
    },[])

    useEffect (()=>{
        const nuevoTotal = pedido.reduce( (total, producto) => ( producto.precio * producto.cantidad ) + total, 0 )
        setTotal(nuevoTotal)
    },[pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleSetModal = () => {
        setModal(!modal)
    }

    const handleEditarCantidad = id =>{
        const productoEditarModal = pedido.filter( producto => producto.id === id)
        setProducto(productoEditarModal[0])
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }

    const colocarOrden = async e =>{
        e.preventDefault();

        try {
            await axios.post('/api/ordenes', {
                pedido,
                inputNombre,
                total,
                fecha: Date.now().toString()
            })


            setCategoriaActual(categorias[0])
            setPedido([])
            setInputNombre('')
            setTotal(0)

            toast.success('Pedido registrado correctamente!')
            setTimeout(() => {
                router.push('/')
            }, 1500);

        } catch (error) {
            console.log(error)
        }
    }

    // {categoriaId, imagen, ...producto} esta sintaxis elimina las llaves de categoriaId e imagen y nos genera una copia de producto sin estas dos propiedades
    const handleAgregarpedido = ({categoriaId, ...producto}) => { 
        if(pedido.some(productoState => productoState.id === producto.id)){
            //actualizar
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            
            toast.success('Producto actualizado!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
        }else{
            setPedido([...pedido, producto])

            toast.success('Agregado al pedido!',{
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
        }
        setModal(false)
    }

//*-------------------------------------------------- RETURN ----------------------------------------------------------
  return (
    <QuioscoContext.Provider
        value={{
            categorias,
            categoriaActual,
            handleClickCategoria,
            handleSetProducto,
            handleSetModal,
            modal,
            producto,
            handleAgregarpedido,
            pedido,
            handleEditarCantidad,
            handleEliminarProducto,
            inputNombre,
            setInputNombre,
            colocarOrden,
            total

        }}
    >
        {children}
    </QuioscoContext.Provider>
  )
}

export {
    QuioscoProvider
}

export default QuioscoContext



// * para hacer uso de React-Toastify importamos la función toast from react-toastify para hacer el llamado del toast en ciertas condiciones que se requieran 