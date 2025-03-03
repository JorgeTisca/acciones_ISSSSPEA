'use client'

import { Card } from "@/components/ui/card";
import { InputMaterial } from "@/components/ui/inputMaterial";
import notificacionSMS from "@/components/ui/notificacionSMS";
import { db_aceptar, db_observacion } from "@/db/mysql/actions/registro/registros";
import { tbl_registro_solicitud } from '@prisma/client';
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import Swal from "sweetalert2";

type Props = {
    registros: tbl_registro_solicitud[]
}

export const NuevasSolicitudes = ({ registros }: Props) => {
    const { register, formState: { errors }, } = useForm<FieldValues>();
    const { refresh } = useRouter();
    const [filtro, setFiltro] = useState("");
    const [datosFiltrados, setDatosFiltrados] = useState<tbl_registro_solicitud[]>(registros)

    return (
        <Card className="w-full bg-white ">
            <div>
                <div className="flex"><div className="p-4">BUSCAR EN TABLA:</div>
                    <InputMaterial
                        value={filtro}
                        type={"text"}
                        label="ESCRIBIR CORREO"

                        className={"w-72 text-black mb-4 mr-4 h-14 text-base"}
                        useFormRegister={{
                            register, errors, options: {
                                required: true, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const valor = e.target.value
                                    setFiltro(valor)
                                    const datosFiltro = registros.filter((dato) => { return dato.correo.toString().includes(valor.toString()) })
                                    console.log(datosFiltro)
                                    setDatosFiltrados(datosFiltro)
                                },
                            },
                        }}
                    /> </div>
                <ul>
                    <>
                        <div className="bg-[--primary] text-white flex justify-around  mb-1 pl-1">
                            <div className="w-20 tracking-wider">
                                <b>{`ACEPTAR`}</b>
                            </div>

                            <div className=" w-24  tracking-wider">
                                <b>{`No`}</b>
                            </div>
                            <div className=" w-2/5 tracking-wider ">
                                <b>{`CORREO`}</b>
                            </div>

                            <div className="w-32 tracking-wider">
                                <b>{`ESTATUS`}</b>
                            </div>

                            {/* <div className="w-56  ">
                                <b>{`IDENTIFICACION FRONTAL`}</b>
                            </div>
                            <div className="w-56">
                                <b>{`IDENTIFICIACION TRASERA`}</b>
                            </div>
                            <div className="w-32 ">
                                <b>{`FOTOGRAFIA`}</b>
                            </div> */}
                            <div className="w-32 tracking-wider">
                                <b>{`DOCUMENTOS`}</b>
                            </div>
                            <div className="w-20 tracking-wider">
                                <b>{`RECHAZAR`}</b>
                            </div>
                        </div>
                        {datosFiltrados.map((registro: tbl_registro_solicitud, index) => {
                            return (
                                <>
                                    <li className={`pl-1 border-b-4 select-none hover:bg-gray-100  ${registro.fotografia_url && registro.identificacion_1_url && registro.identificacion_2_url ? `h-16 ` : `h-auto pb-2`}`}
                                        key={index}         >
                                        <div className=" flex justify-around pt-2 ">
                                            <div className="w-20 place-content-center ">
                                                {registro.fotografia_url && registro.identificacion_1_url && registro.identificacion_2_url ? <Check size={40} color="green" cursor="pointer" onClick={() => {
                                                    Swal.fire({
                                                        title: "CONFIRMACIÓN",
                                                        animation: true,
                                                        icon: "success",
                                                        showCancelButton: true,
                                                        allowOutsideClick: false,
                                                        showConfirmButton: true,
                                                        confirmButtonColor: "green",
                                                        input: "number",
                                                        text: "COLOCAR INTERNO",
                                                        confirmButtonText: "CONFIRMAR CONTRATO",
                                                        reverseButtons: true,
                                                        customClass: {
                                                            confirmButton: 'swal-confirm-button',
                                                            cancelButton: `swal-cancel-button`,
                                                        }
                                                    }).then(async (result) => {
                                                        if (result.value) {
                                                            Swal.fire({
                                                                title: "Cargando...",
                                                                animation: true,
                                                                showConfirmButton: false,
                                                                showCancelButton: false,
                                                                allowOutsideClick: false,
                                                                color: "green",
                                                                didOpen: () => {
                                                                    Swal.showLoading();
                                                                },
                                                                didClose: () => {
                                                                    Swal.fire({
                                                                        title: "REGISTRO EXITOSO",
                                                                        animation: true,
                                                                        showConfirmButton: true,
                                                                        showCancelButton: false,
                                                                        allowOutsideClick: false,
                                                                        confirmButtonColor: "green",
                                                                        color: "green",
                                                                        didClose: () => {
                                                                            window.location.replace('/inicio/registro');
                                                                        },
                                                                    });
                                                                }
                                                            });
                                                            await db_aceptar(registro.id, result.value)
                                                            notificacionSMS({ cuerpo: "LOS DOCUMENTOS ISSSSPENET FUERON VALIDADOS, PORFAVOR REVISAR CORREO ELECTRONICO", numero: "+524495224273" })
                                                            Swal.close()
                                                            refresh()
                                                        } else if (result.dismiss == Swal.DismissReason.cancel) {
                                                            Swal.close()
                                                        }
                                                    })
                                                }} />
                                                    // : <div className="text-2xl font-extrabold text-red-500">S/D</div>}
                                                    : <>
                                                        <div className="text-sm text-red-500 font-bold">FALTA:</div>
                                                        {registro.fotografia_url ? <></> : <div className="text-xs text-red-500 font-bold">FOTOGRAFÍA</div>}
                                                        {registro.identificacion_1_url ? <></> : <div className="text-xs text-red-500 font-bold">ID.TRASERA</div>}
                                                        {registro.identificacion_2_url ? <></> : <div className="text-xs text-red-500 font-bold">ID.FRONTAL</div>}



                                                    </>

                                                }

                                            </div>
                                            <div className="w-24 text-start select-text  place-content-center">
                                                <b className="">{registro.id}</b>
                                            </div>
                                            <div className="w-2/5 text-start select-text place-content-center">
                                                {registro.correo}
                                            </div>
                                            <div className="w-32 text-center -ml-5 select-text place-content-center">
                                                {registro.estatus}
                                            </div>
                                            {/* <div className="w-56 text-center ">
                                                {registro.identificacion_1_url ? <> <div className="w-full flex justify-center "><div className="flex  w-auto border-red-500 border-2 h-10 text-center pt-1 justify-center"><FaImage className="mr-3 ml-3" color="red" size={30}></FaImage><div className="mr-3">IMAGEN</div></div></div></> : <><div>S/D</div></>}
                                            </div>
                                            <div className="w-56 text-center  ">
                                                {registro.identificacion_2_url ? <> <div className="w-full flex justify-center "><div className="flex  w-auto border-red-500 border-2 h-10 text-center pt-1 justify-center"><FaImage className="mr-3 ml-3" color="red" size={30}></FaImage><div className="mr-3">IMAGEN</div></div></div></> : <><div>S/D</div></>}
                                            </div>
                                            <div className="w-32 text-center ">
                                                {registro.fotografia_url ? <> <div className="w-full flex justify-center "><div className="flex  w-auto border-red-500 border-2 h-10 text-center pt-1 justify-center"><FaImage className="mr-3 ml-3" color="red" size={30}></FaImage><div className="mr-3">IMAGEN</div></div></div></> : <><div>S/D</div></>}
                                            </div> */}
                                            <Link key={index} href={`registro/${registro.id}`} >
                                                <div className="h-full place-content-center flex items-center">
                                                    <div className="w-44  ">
                                                        <div className="flex  w-auto border-blue-500 border-2 h-10 text-center pt-1 justify-center hover:bg-blue-500 hover:text-white"><FaEye className="mr-1 ml-1" color="blue" size={20}></FaEye><div className="mr-1 ">VER DOCUMENTOS</div></div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="w-20 flex  place-content-center  items-center ">
                                                <X size={40} color="red" cursor="pointer" onClick={() => {
                                                    Swal.fire({
                                                        didClose: () => {

                                                        },
                                                        title: "RECHAZAR",
                                                        animation: true,
                                                        icon: "error",
                                                        showCancelButton: true,
                                                        allowOutsideClick: false,
                                                        showConfirmButton: true,
                                                        input: "textarea",
                                                        text: "COLOCAR OBSERVACION",
                                                        reverseButtons: true,
                                                        confirmButtonText: "CONFIRMAR RECHAZO",
                                                        customClass: {
                                                            confirmButton: 'swal-rechazar-button',
                                                            cancelButton: `swal-cancel-button`,
                                                        }
                                                    }).then(async (result) => {
                                                        if (result.value) {
                                                            Swal.fire({
                                                                title: "Cargando...",
                                                                animation: true,
                                                                showConfirmButton: false,
                                                                showCancelButton: false,
                                                                allowOutsideClick: false,
                                                                color: "green",
                                                                didOpen: () => {
                                                                    Swal.showLoading();
                                                                },
                                                                didClose: () => {
                                                                    Swal.fire({
                                                                        title: "SE RECHAZO REGISTRO",
                                                                        animation: true,
                                                                        showConfirmButton: true,
                                                                        showCancelButton: false,
                                                                        allowOutsideClick: false,
                                                                        confirmButtonColor: "red",
                                                                        color: "red",
                                                                        didClose: () => {
                                                                            window.location.replace('/inicio/registro');
                                                                        },
                                                                    });
                                                                }
                                                            });
                                                            console.log(result.value)
                                                            await db_observacion(registro.id, result.value)
                                                            notificacionSMS({ cuerpo: `SU SOLICITUD ISSSSPENET FUE RECHAZADA POR LA SIGUIENTE RAZON: \n ${result.value}`, numero: "+524495224273" })
                                                            setDatosFiltrados(registros)
                                                            Swal.close()
                                                            refresh()
                                                        } else if (result.dismiss == Swal.DismissReason.cancel) {
                                                            console.log("cancelar")
                                                            Swal.close()
                                                        }
                                                    })
                                                }} />
                                            </div>
                                        </div>
                                    </li></>
                            )
                        })}
                    </>
                </ul>
            </div>
        </Card>
    )
}
