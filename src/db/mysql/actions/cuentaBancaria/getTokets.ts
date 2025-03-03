import prisma from '@/db/mysql/prisma'

export const getTokenAfiliado = async (noAfiliado:any) => {

  try {
    const tokenAfiliado = await prisma.tbl_firebase_messaging_tokens.findUnique({
      where: {
        no_afiliacion: noAfiliado,
      },
    })
    console.log(tokenAfiliado)
    return tokenAfiliado
  } catch (error) {
    console.log(error);
    throw new Error("Error");
  }


}
