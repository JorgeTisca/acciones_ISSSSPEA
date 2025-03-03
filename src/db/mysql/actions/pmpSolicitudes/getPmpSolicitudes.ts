import prisma from '@/db/mysql/prisma'

export const GetPmpSolicitudes = async () => {
  try {
    const solicitudes = await prisma.tbl_pmp_solicitud.findMany({
      where: {
        estatus: 'EN PROCESO'
      }
    })
    return solicitudes
    
  } catch (error) {
    console.log(error);
    throw new Error("Error");
    
  }
}

export const GetpmpSolicitud = async (id: number) => {
  console.log(id)
  try {
    const solicitud = await prisma.tbl_pmp_solicitud.findUnique({
      where: {
        id: id
      }
    })
    console.log(solicitud)
    return solicitud

  } catch (error) {
    console.log(error);

  }
} 