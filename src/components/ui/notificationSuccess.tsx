'use client'
import { FaCircleCheck } from "react-icons/fa6";
import Swal from "sweetalert2";


type Props = {
  titulo?: string
  cuerpo?: string
  token: string
  id: number
}
export default function NotificationSuccess({ token, titulo, cuerpo, id }: Props) {

  const sendNotification = async () => {
    const mensajeNotificacion = {
      titulo,
      cuerpo,
      datos: { key1: "valor1", key2: "valor2" },
    };
    const tokenDispositivo = String(token);

    try {
      const res = await fetch("/api/SendNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenDispositivo,
          mensajeNotificacion,
        }),
      });

      const data = await res.json();
      console.log("Respuesta del servidor:", data);

      if (data.success) {
        Swal.fire({
          title: "Notificación enviada!",
          text: "La notificación fue enviada al Afiliado",
          icon: "success",
        }).then(async () => {
          const activateAccountResponse = await fetch("/api/CuentaBancariaActivada", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_cuenta: id }),
          });

          const activateData = await activateAccountResponse.json();
          console.log("Respuesta de activación de cuenta:", activateData);

          if (activateData.success) {
            window.location.replace('/inicio/cuentas');
          } else {
            console.error("Error al activar la cuenta:", activateData.error);
          }
        });
      }
    } catch (error) {
      console.error("Error al enviar la notificación:", error);
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