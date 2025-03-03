'use client'
import { useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import Swal from "sweetalert2";
type Props = {
  id: number,
  tituloForm: string,
  tituloResult: string,
  api: string,
  status: string
}
export default function PlpCancel({ id, tituloForm, tituloResult, api, status }: Props) {
  const sendNotification = async () => {
    const result = await Swal.fire({
      title: tituloForm,
      text: "Escribe cuál fue la observación",
      icon: "warning",
      input: "textarea",
    });

    if (result.value) {
      Swal.fire({
        title: "Cargando...",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const activateAccountResponse = await fetch(
          `/api/${api}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_cuenta: id, observacion: result.value, estatus: status }),
          }
        );

        if (!activateAccountResponse.ok) {
          throw new Error("Error al comunicarse con la API");
        }

        const activateData = await activateAccountResponse.json();

        if (activateData.success) {
          Swal.fire({
            title: tituloResult,
            text: "Las observación fue guardada en la base de datos",
            icon: "success",
            didClose: () => {
              window.location.replace("/inicio/plpSolicitudes");
            },
          });
        } else {
          throw new Error(activateData.error || "Error desconocido");
        }
      } catch (error) {
        console.error("Error al activar la cuenta:", error);
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al enviar la notificación. Por favor, intenta nuevamente.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div onClick={() => sendNotification()} className=" hover:cursor-pointer text-white font-bold py-2 px-4 rounded-3xl fixed bottom-4 right-6 text-xl">
      <p className="py-2"> <FaCircleXmark className=" hover:fill-red-800" size={50} color="red"></FaCircleXmark></p>
    </div>
  )

}