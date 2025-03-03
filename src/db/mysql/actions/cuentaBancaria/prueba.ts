import prisma from '@/db/mysql/prisma'

export const cuentasBancarias = async () => {

  try {
    const cuentas = await prisma.tbl_cuenta_bancaria_solicitud.findMany({
      where: {
        estatus: 'EN PROCESO'
      }
    })
    return cuentas
  } catch (error) {
    console.log(error);
    throw new Error("Error");
  }


}
export const cuentaBancariaActivada = async (id_cuenta:number) =>{
  const idCuenta = id_cuenta
  console.log(idCuenta);
  try {
    const cuentas = await prisma.tbl_cuenta_bancaria_solicitud.update({
      where: {
        id: idCuenta,
      },
      data: {
        estatus: 'ACTIVA',
      },
    })
    return cuentas
  } catch (error) {
    console.log(error);
    throw new Error("Error");
  }
}

export const cuentaBancaria = async (id_cuenta:string) => {
  const idCuenta = parseInt(id_cuenta)

  try {
    const cuentas = await prisma.tbl_cuenta_bancaria_solicitud.findUnique({
      where: {
        id: idCuenta,
      },
    })
    return cuentas
  } catch (error) {
    console.log(error);
    throw new Error("Error");
  }


}