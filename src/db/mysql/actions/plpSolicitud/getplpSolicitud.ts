'use server'
import prisma from '@/db/mysql/prisma'

export const GetPlpSolicitudes = async () => {
  try {
    const solicitudes = await prisma.$queryRaw`SELECT * FROM tbl_plp_solicitud WHERE estatus LIKE 'EN PROCESO%'`;
    return solicitudes
  } catch (error) {
    console.log('Errores',error);
    throw new Error('Error');
    
  }
}

export const GetplpSolicitud = async (id:number) =>{
  try{
    const solicitud = await prisma.tbl_plp_solicitud.findFirst({
      where:{
        id: id
      }
    })
    return solicitud
  }catch(error){
    console.log('Errores', error);
    throw new Error('Error');
  }
}

