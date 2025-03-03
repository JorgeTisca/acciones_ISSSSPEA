'use client'
import { useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import Swal from "sweetalert2";
type Props = {
  titulo?: string
  token: any
  observacion?: string,
  id: number
}
export default function NotificationCancel({ token, observacion, titulo, id }: Props) {
  const sendNotification = async () => {
    Swal.fire({
      title: "Enviando mensaje",
      text: "Escribe cual fue la observación",
      icon: "warning",
      input: 'textarea'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: "Cargando...",
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const mensajeNotificacion = {
          titulo,
          mensaje: result.value,
          datos: { key1: 'valor1', key2: 'valor2' },
        };



        const tokenDispositivo = String(token);

        fetch('/api/SendNotification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenDispositivo,
            mensajeNotificacion,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            if (data.success) {
              Swal.fire({
                title: "Notificación enviada!",
                text: "La notifación fue enviada al Afiliado para checar sus observaciones",
                icon: "success",
              });
              const activateAccountResponse = await fetch("/api/CuentaBancariaCancelada", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_cuenta: id, observacion: result.value }),
              });
              const activateData = await activateAccountResponse.json();
              console.log("Respuesta de activación de cuenta:", activateData);
              if (activateData.success) {
                window.location.replace('/inicio/cuentas');
              } else {
                console.error("Error al activar la cuenta:", activateData.error);
              }
            }
          })
          .catch((error) => {
            console.error('Error al enviar la notificación:', error);
          });
      } else {
        Swal.close();
      }
    });
  };

  return (
    <div onClick={() => sendNotification()} className=" hover:cursor-pointer text-white font-bold py-2 px-4 rounded-3xl fixed bottom-4 right-6 text-xl">
      <p className="py-2"> <FaCircleXmark className=" hover:fill-red-800" size={50} color="red"></FaCircleXmark></p>
    </div>
  )

}