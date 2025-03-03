'use client'
import { FaCircleCheck } from "react-icons/fa6";
import Swal from "sweetalert2";


type Props = {
  id: number
}
export default function PmpSuccess({ id }: Props) {

  const sendNotification = async () => {
    const result = await Swal.fire({
      title: "Aceptando solicitud",
      text: "Observación",
      icon: "success",
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
          "/api/pmpSolicitudActivada",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_cuenta: id, observacion: result.value }),
          }
        );

        if (!activateAccountResponse.ok) {
          throw new Error("Error al comunicarse con la API");
        }

        const activateData = await activateAccountResponse.json();

        if (activateData.success) {
          Swal.fire({
            title: "Solicitud Aceptada!",
            icon: "success",
            didClose: () => {
              window.location.replace("/inicio/pmpSolicitudes");
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
  }
  return (
    <div onClick={() =>
      sendNotification()
    } className="  hover:cursor-pointer text-white font-bold py-2 px-4 rounded-3xl fixed bottom-4  text-xl">
      <p className="py-2"> <FaCircleCheck className="hover:fill-green-800" size={50} color="green" ></FaCircleCheck></p>
    </div>
  )

}