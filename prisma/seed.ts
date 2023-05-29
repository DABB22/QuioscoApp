
import {categorias} from './data/categorias'
import {productos} from './data/productos'
import {PrismaClient} from '@prisma/client'

// creamos una instancia del PrismaClient
const prisma = new PrismaClient()

// Vamos a tener una función 
const main = async () : Promise<void> => {
    // usamos un tryCatch ya que vamos a interactuar con la BD
    try {
        // vamos a insertar los datos asi que usamos await para bloquear la siguiente linea
        // usamos la instancia creada de prismaCliente y la información insertada en el archivo schema.prisma automaticamente prisma la mapea y la hace disponible en la instancia creada y podemos acceder a los modelos
        // una de la ventajas de los ORM es que tienen funciones o métodos para trabajar directamente con la BD (CRUD)
        await prisma.categoria.createMany({
            data: categorias
        })
        await prisma.producto.createMany({
            data: productos
        })
    } catch (error) {
        console.log(error)
    }
}

// y la mandamos a llamar (se puede nombrar como uno quiera siempre y cuando se mande a llamar)
main()

