'use client'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generatePaymentXML, PaymentRequest } from "./actions/generarxml";

export const GenerarXML = () => {
    const paymentData: PaymentRequest = {
        id_company: "SNBX",
        id_branch: "01SNBXBRNCH",
        user: "SNBXUSR0123",
        pwd: "SECRETO",
        reference: "FACTURA999",
        amount: 1.0,
        moneda: "MXN",
        canal: "W",
        omitir_notif_default: true,
        nb_fpago: "COD",
        version: "IntegraWPP",
        ml: "ML123",
        cl: "CL456",
    };

    return (

        <Card className="w-full bg-white ">
            <Button className="bg-green-500 text-white" onClick={() => {
                generatePaymentXML(paymentData)
                    .then((paymentLink) => {
                        console.log("Liga de cobro generada:", paymentLink);
                    })
                    .catch((error) => {
                        console.error("Error al generar la liga de cobro:", error);
                    });
            }}>Generar xml</Button>
        </Card>
    )
}