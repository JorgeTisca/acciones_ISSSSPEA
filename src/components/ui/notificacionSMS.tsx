type Proops = {
    cuerpo: string, numero: string
}
export default async function notificacionSMS({ cuerpo, numero }: Proops) {

    const sms = {
        phone: numero,
        message: cuerpo
    }
    const res = await fetch('/api/sms', {
        method: 'POST', body: JSON.stringify(sms),
        headers: {
            "Content-Type": "aplication/json"
        }
    })

    const data = await res.json()
    console.log(data)
    // alert("SE A ENVIADO SMS A INTERNO PARA NOTIFICAR")
}
