import nodemailer from 'nodemailer'
import 'dotenv/config'

const transport = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth:{
        user:process.env.MAIL,
        pass:process.env.MAIL_PASSWORD
    }
})

export const sendMail = async (patient) =>{
    console.log(patient)

    let result = await transport.sendMail({
        from: '<no-replay>',
        to: patient.email,
        subject: "Paciente registrado con éxito",
        html: `<div> 
            <p>Nombre:${patient.name}</p>
            <p>Télefono:${patient.phone_number}</p>
        </div>`



    })
}