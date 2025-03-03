'use client'
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BiWorld } from "react-icons/bi";
import { FaPowerOff } from "react-icons/fa6";
import { RiSettings4Fill, } from "react-icons/ri";

export const MenuBar = () => {
    const [expandido, setExpandido] = useState(false);

    return (<>
        <div>
            <div className="flex mb-4"><RiSettings4Fill size={20} className="mr-1"></RiSettings4Fill><div>CAMBIAR CONTRASEÑA</div></div>
            <Link href={`/`} prefetch={true}>
                <div className="flex cursor-pointer  w-40">
                    <FaPowerOff size={20} className="mr-2"></FaPowerOff><div className="">CERRAR SESIÓN</div>
                </div>
            </Link>

            <div className="text-black opacity-65 mt-4 mb-4"> ACCIONES</div>
            <button className="w-full " onClick={() => setExpandido(!expandido)}>
                <div className="flex mb-3 " ><BiWorld size={30} className=" flex w-auto " ></BiWorld><div className=" w-full flex justify-start ml-4">ISSSSPEA </div><div className="flex  justify-end ">{expandido ? <ChevronUp size={30} /> : <ChevronDown size={30} />}</div></div>
            </button>
            {!expandido ? <></> :
                <div className="flex justify-center ">
                    {/* <div>ACTIVAR CONTRATO
                </div>
                <div>LISTA DE CONTRATOS</div>
                <div>ESTATUS USUARIOS</div> */}
                    <ul>
                        <li>
                            <div className="mb-3">
                                <Link href={`/inicio/registro`} prefetch={true}>NUEVAS SOLICITUDES</Link>
                            </div>
                        </li>
                        <li>
                            <div className="mb-3">
                                <Link href={`/inicio/generarXML`} prefetch={true}>GENERAR XML</Link>
                            </div>
                        </li>

                    </ul>
                    {/* <div>NUEVAS CLABES</div>
                <div>DOCUMENTACIÓN</div>
                <div>MODIFICAR CONTRATOS</div>
                <div>CAMBIAR CONTRASEÑA</div> */}
                </div>}
        </div>

    </>)



}