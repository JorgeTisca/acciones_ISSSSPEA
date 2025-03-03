'use client'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generatePaymentXML, PaymentRequest } from "./actions/generarxml";

export const GenerarXML = () => {
    const paymentData: PaymentRequest = {
        id_company: "COMP123",
        id_branch: "BRANCH456",
        user: "user123",
        pwd: "pass123",
        reference: "REF789",
        amount: 100.5,
        moneda: "MXN",
        canal: "WEB",
        omitir_notif_default: true,
        nb_fpago: "FPAGO123",
        version: "1.0",
        ml: "ML123",
        cl: "CL456",
    };

    return (

        <Card className="w-full bg-white ">
            <Button className="bg-green-500 text-white" onClick={() => {
                generatePaymentXML(paymentData)
            }}>Generar xml</Button>
        </Card>
    )
}