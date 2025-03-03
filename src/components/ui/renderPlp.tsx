import Link from "next/link"
import { FaEye } from "react-icons/fa"

export default function RenderPlp({ estatus, id }) {
  switch (estatus) {
    case 'EN PROCESO RECIBOS':
      return (
        <Link
          key={String(estatus)}
          href={`/inicio/plpSolicitudes/recibo/${id}`}
        >
          <button className="flex justify-center w-auto border-blue-500 border-2 hover:bg-blue-500 text-black font-semibold py-1 px-2 ml-2 rounded hover:text-white">
            <FaEye className="mr-1 ml-1" color="blue" size={20} />
            VER DOCUMENTOS
          </button>
        </Link>
      )
    case 'RECHAZADA RECIBOS':
      return (
        <p className="flex justify-center w-auto bg-red-500  font-semibold py-1 px-2 ml-2 rounded text-white">
          RECHAZADA
        </p>
      )
    case 'ACEPTADA RECIBOS':
      return (
        <p className="flex justify-center w-auto bg-green-600 font-semibold py-1 px-2 ml-2 rounded text-white">
          ACEPTADA
        </p>
      )
    case 'EN PROCESO AVALUO':
      return (
        <Link
          key={String(estatus)}
          href={`/inicio/plpSolicitudes/avaluo/${id}`}
        >
          <button className="flex justify-center w-auto border-blue-500 border-2 hover:bg-blue-500 text-black font-semibold py-1 px-2 ml-2 rounded hover:text-white">
            <FaEye className="mr-1 ml-1" color="blue" size={20} />
            VER DOCUMENTOS
          </button>
        </Link>
      )
    case 'RECHAZADA AVALUO':
      return (
        <p className="flex justify-center w-auto bg-red-500  font-semibold py-1 px-2 ml-2 rounded text-white">
          RECHAZADA
        </p>
      )
    case 'ACEPTADA AVALUO':
      return (
        <p className="flex justify-center w-auto bg-green-600 font-semibold py-1 px-2 ml-2 rounded text-white">
          ACEPTADA
        </p>
      )
    case 'CANCELADO':
      return (
        <p className="flex justify-center w-auto bg-red-500  font-semibold py-1 px-2 ml-2 rounded text-white">
          CANCELADO
        </p>
      )

  }
}