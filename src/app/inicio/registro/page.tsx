import { NuevasSolicitudes } from "@/components/inicio/registro/page";
import { db_registros } from "@/db/mysql/actions/registro/registros";

export const metadata = {
  title: 'ISSSSPENET | SOLICITUDES',
  description: '',
};

export default async function RegistroPage() {
  const registros = await db_registros()

  return (
    <div>
      <h1 className="text-2xl text-[--primary] font-bold">ISSSSPENET - NUEVAS SOLICITUDES</h1>
      <NuevasSolicitudes registros={registros}></NuevasSolicitudes>
      {/* <pre>{JSON.stringify(registros, null, 4)}</pre> */}
    </div>
  );
}