'use client'

import { Card } from "@/components/ui/card";
import { tbl_registro_solicitud } from '@prisma/client';
import { useEffect, useState } from "react";

import notificacionSMS from "@/components/ui/notificacionSMS";
import { db_aceptar, db_observacion } from "@/db/mysql/actions/registro/registros";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import Swal from "sweetalert2";
import ImageViewer from "../../../ui/ImageViewer";

type Props = {
    registro_ind: tbl_registro_solicitud
}

export const VerDocumento = ({ registro_ind }: Props) => {

    const [observacion, setObservacion] = useState<string>("");
    const [interno, setInterno] = useState<string>("");
    const effect = async () => {
        // console.log(registro_ind.fotografia_url.split(".").reverse()[0].toUpperCase())
        if (observacion.length != 0) {
            await db_observacion(registro_ind.id, observacion)
            notificacionSMS({ cuerpo: `SU SOLICITUD ISSSSPENET FUE RECHAZADA POR LA SIGUIENTE RAZON: \n ${observacion}`, numero: "+524495224273" })
            Swal.close();
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

        } else if (interno) {
            Swal.close();
            await db_aceptar(registro_ind.id, interno)
            notificacionSMS({ cuerpo: "LOS DOCUMENTOS ISSSSPENET FUERON VALIDADOS, PORFAVOR REVISAR CORREO ELECTRONICO", numero: "+524495224273" })
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

    };
    useEffect(() => {
        effect()
    }, [observacion, interno]);
    return (
        <>
            {/* BOTON CONFIRMAR */}
            {registro_ind.fotografia_url && registro_ind.identificacion_1_url && registro_ind.identificacion_2_url ?
                <FaCircleCheck className="fixed top-3/4 mt-36 left-1/4 -ml-48 cursor-pointer hover:fill-green-800" size={50} color="green"
                    onClick={() => {
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
                                });
                                setInterno(result.value)

                            } else if (result.dismiss == Swal.DismissReason.cancel) {
                                Swal.close()
                            }
                        })
                    }}></FaCircleCheck>
                : <></>}

            {/* BOTON RECHAZAR */}
            <FaCircleXmark className="fixed right-1/4 -mr-80 top-3/4 mt-32 cursor-pointer hover:fill-red-800" size={50} color="red"
                onClick={() => {
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
                                    window.location.replace('/inicio/registro');
                                },
                            });
                            setObservacion(result.value)

                        } else if (result.dismiss == Swal.DismissReason.cancel) {
                            Swal.close()
                        }
                    })
                }}></FaCircleXmark>
            {registro_ind.identificacion_1_url ? <Card className="bg-gray-300">
                <h1><b>IDENTIFICACION FRONTAL</b></h1>
                <ImageViewer src={`https://app.isssspenet.gob.mx${registro_ind.identificacion_1_url}`} width="auto" height="500px"></ImageViewer>
            </Card> : <><Card className="bg-gray-300" ><div className="w-full h-1/3 text-center"><h1 className="text-red-500 text-2xl"><b>FALTA IDENTIFICACION TRASERA</b></h1></div> </Card> </>

            }
            {registro_ind.identificacion_2_url ?
                <Card className="bg-gray-300">
                    <h1><b>IDENTIFICACION TRASERA</b></h1>
                    <ImageViewer src={`https://app.isssspenet.gob.mx${registro_ind.identificacion_2_url}`} width="auto" height="500px" ></ImageViewer>
                </Card> : <><Card className="bg-gray-300"><div className="w-full h-1/3 text-center"><h1 className="text-red-500 text-2xl"><b>FALTA IDENTIFICACION TRASERA</b></h1></div> </Card> </>

            }
            {registro_ind.fotografia_url ?
                <Card className="bg-gray-300">
                    <h1><b>FOTOGRAFÍA</b></h1>
                    <ImageViewer src={`https://app.isssspenet.gob.mx${registro_ind.fotografia_url}`} width="auto" height="500px" ></ImageViewer>
                </Card> : <><Card className="bg-gray-300"><div className="w-full h-1/3 text-center"><h1 className="text-red-500 text-2xl"><b>FALTA FOTOGRAFIA</b></h1></div> </Card> </>

            }

        </>
    )
}
