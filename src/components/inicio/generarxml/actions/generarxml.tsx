
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
export function generatePaymentXML({ id_company, id_branch, user, pwd, reference, amount, moneda, canal, omitir_notif_default, nb_fpago, version, ml, cl, }: PaymentRequest) {
  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
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
        <omitir_notif_default>${omitir_notif_default}</omitir_notif_default>
        <nb_fpago>${nb_fpago}</nb_fpago>
        <version>${version}</version>
      </url>
    </P>
  `;
  console.log(xml)
  return xml.trim(); // Eliminar espacios en blanco innecesarios

}