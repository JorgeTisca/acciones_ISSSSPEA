'use server'

import prisma from '@/db/mysql/prisma';

export const db_registros = async () => {

    try {
        const registros = await prisma.tbl_registro_solicitud.findMany({
            where: {
                estatus: "EN PROCESO",


            }
        })
        console.log(registros)
        return registros
    } catch (error) {
        console.log(error);
        throw new Error("Error");
    }
}
export const db_registro_ind = async (id: string) => {
    console.log(`id---${id}`)
    try {
        const registros = await prisma.tbl_registro_solicitud.findMany({
            where: {
                id: parseInt(id)

            }
        })
        // console.log(registros)
        return registros
    } catch (error) {
        console.log(error);
        throw new Error("Error");
    }

}
export const db_observacion = async (id: number, observaciones_data: string) => {
    console.log(`id---${id} observa----${observaciones_data}`)
    try {
        const observacion = await prisma.tbl_registro_solicitud.updateMany({
            where: {
                id: id
            },
            data: {
                observaciones: `${observaciones_data}`,
                estatus: "RECHAZADO"
            }
        })
        console.log(`result--${observacion}`)
        return observacion
    } catch (error) {
        console.log(error);
        throw new Error("Error");
    }

}
export const db_aceptar = async (id: number, interno: string) => {
    console.log(`id---${id}`)
    try {
        const observacion = await prisma.tbl_registro_solicitud.updateMany({
            where: {
                id: id
            },
            data: {
                interno: `${interno}`,
                estatus: "ACEPTADO"
            }
        })

        return observacion
    } catch (error) {
        console.log(error);
        throw new Error("Error");
    }

}