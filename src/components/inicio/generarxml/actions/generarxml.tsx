import CryptoJS from "crypto-js";

export interface PaymentRequest {
  id_company: string;
  id_branch: string;
  user: string;
  pwd: string;
  reference: string;
  amount: number;
  moneda: string;
  canal: string;
  omitir_notif_default: boolean;
  nb_fpago: string;
  version: string;
  ml: string;
  cl: string;
}

export async function generatePaymentXML({ id_company, id_branch, user, pwd, reference, amount, moneda, canal, omitir_notif_default, nb_fpago, version, ml, cl,
}: PaymentRequest) {
  // Paso 1: Cadena XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <P>
      <business>
        <id_company>${id_company}</id_company>
        <id_branch>${id_branch}</id_branch>
        <user>${user}</user>
        <pwd>${pwd}</pwd>
      </business>
      <url>
        <reference>${reference}</reference>
        <amount>${amount.toFixed(2)}</amount>
        <moneda>${moneda}</moneda>
        <canal>${canal}</canal>
        <omitir_notif_default>${omitir_notif_default ? "1" : "0"}</omitir_notif_default>
        <nb_fpago>${nb_fpago}</nb_fpago>
        <version>${version}</version>
      </url>
    </P>`.trim();

  console.log("XML generado:", xml);

  // Paso 2: Cifrando la cadena
  const key = "5DCC67393750523CD165F17E1EFADD21"; // Clave AES-128
  const cifradoxml = CryptoJS.AES.encrypt(xml, key).toString();
  console.log("XML cifrado:", cifradoxml);

  // Paso 3: Servicio de Generación
  const encryptedResponse = await sendPaymentRequest(cifradoxml, key);
  console.log("Respuesta del servicio:", encryptedResponse);

  // // Paso 4: Descifrando la respuesta del Servicio de Generación
  // const decryptedResponse = CryptoJS.AES.decrypt(encryptedResponse, key).toString(CryptoJS.enc.Utf8);
  // console.log("Respuesta descifrada:", decryptedResponse);

  // // Paso 5: Obtener la liga de cobro
  // const paymentLink = extractPaymentLink(decryptedResponse);
  // console.log("Liga de cobro generada:", paymentLink);

  return encryptedResponse;
}

async function sendPaymentRequest(encryptedXML: string, key: string) {
  var originalString = `xml=<P><pgs><data0>SNDBX123</data0><data>${encryptedXML}</data></pgs></P>`;
  var data = encodeURIComponent(originalString);
  console.log("data", data)
  var xhr = new XMLHttpRequest();

  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log("respuesta--" + this.responseText);
    }
  });
  try {
    xhr.open("POST", "https://sandboxpo.mit.com.mx/gen");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
    console.log(data)
  } catch (error) {
    console.log("error en open")
  }
  // Paso 4: Descifrando la respuesta del Servicio de Generación
  var CryptoJS = require("crypto-js");
  var ciphertext = CryptoJS.AES.decrypt(data, key).toString();
  console.log("ciphertext: " + ciphertext);
  return ciphertext

}

// function extractPaymentLink(decryptedResponse: string): string {
//   const parser = new DOMParser();
//   const xmlDoc = parser.parseFromString(decryptedResponse, "text/xml");
//   const nbUrl = xmlDoc.getElementsByTagName("nb_url")[0]?.textContent;

//   if (!nbUrl) {
//     throw new Error("No se encontró la liga de cobro en la respuesta.");
//   }

//   return nbUrl;
// }