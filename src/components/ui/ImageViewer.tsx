'use client'
import { useEffect, useRef, useState } from 'react';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

type Props = {
  src: string;
  alt?: string;
  width: string;
  height: string;

};
export default function ImageViewer({ src, alt, width, height }: Props) {
  const imageRef = useRef(null);
  const [archivo, setArchivo] = useState<string>("");

  useEffect(() => {
    if (src) {
      console.log(src.split(".").reverse()[0].toUpperCase())
      setArchivo(src.split(".").reverse()[0].toUpperCase())
    }
    let viewer;
    if (imageRef.current) {
      viewer = new Viewer(imageRef.current, {
        inline: false,
        button: true,
        navbar: false,
        title: false,
        toolbar: true,
        tooltip: false,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
      });
    }
    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, []);

  return archivo === "PDF" ? <>
    <object
      data={src} // URL del PDF
      type="application/pdf"
      width="100%" // Ancho del contenedor
      height="800px" // Altura del contenedor

    >
      <p>Tu navegador no soporta la visualización de archivos PDF.
        <a href={src} target="_blank" rel="noopener noreferrer">Descargar PDF</a>.
      </p>
    </object></> : <img
    ref={imageRef}
    src={src}
    alt={alt}
    className="rounded-md my-3 mx-auto shadow-lg hover:cursor-pointer"
    style={{ width: width ? width : '600px', height: height ? height : '400px', objectFit: 'cover' }}
  />
}