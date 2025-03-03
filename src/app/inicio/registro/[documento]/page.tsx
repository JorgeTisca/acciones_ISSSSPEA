import { VerDocumento } from "@/components/inicio/registro/documento/verdocumento"
import { db_registro_ind } from "@/db/mysql/actions/registro/registros"

type Props = {
    params: { documento: string }
}

export default async function DocumentosPage({ params: { documento } }: Props) {
    console.log(documento)

    const registro_ind = await db_registro_ind(documento)
    console.log(`resultado ${registro_ind[0].identificacion_1_url}`)
    return (
        <div>
            <h1 className="text-2xl text-[--primary] font-bold">ISSSSPENET -  DOCUMENTACIÓN PARA ACTIVACIÓN</h1>
            <VerDocumento registro_ind={registro_ind[0]} ></VerDocumento>
        </div>
    );
}