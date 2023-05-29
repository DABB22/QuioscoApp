

import {PrismaClient} from '@prisma/client'

export default async function handler(req, res) {

  const prisma = new PrismaClient()

    if(req.method === 'POST'){
        //este id lo capturamos con req.query.id ... es id porque asi se llama el archivo del routing dinámico y asi tambien lo llamamos desde axios en el otro archivo
        const {id} = req.query

        const ordenActualizada = await prisma.orden.update({
            where: {
                id: parseInt(id)//se convierte a entero porque este id viene como string y prisma en el modelo lo espera como número(int)
            },
            data: {
                estado: true
            }
        })

        res.status(200).json(ordenActualizada)
    }  
}


