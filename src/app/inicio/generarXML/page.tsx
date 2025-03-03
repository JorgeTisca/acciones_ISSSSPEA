import { GenerarXML } from "@/components/inicio/generarxml/page";

export const metadata = {
    title: 'ISSSSPENET | SOLICITUDES',
    description: '',
};

export default async function GenerarXMLPage() {


    return (
        <div>
            <h1 className="text-2xl text-[--primary] font-bold">GENERAR XML</h1>
            <GenerarXML ></GenerarXML>
            {/* <pre>{JSON.stringify(registros, null, 4)}</pre> */}
        </div>
    );
}