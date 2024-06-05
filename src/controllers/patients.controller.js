import {patientService} from '../services/services.js'
import { sendMail } from "../utils/nodeMailer.js"
import {getImagePath} from '../utils/common_functions.js'
export const getAllPatients = async (req,res) =>{
    try{
       
        const patients = await patientService.getAllPatients()
        res.status(201).json( patients)

    
    }
    catch(err){
        res.status(500).json({error:err})
    }

}

export const addPatient = async (req,res) =>{

    try{
        if(!req.file){
            return res.status(400).send({status:"error", error:"No se pudo guardar la imagen"})
        }
        else{
            let patient = req.body
            patient.document_photo = req.file.path.replaceAll('\\','\\\\')
            if(patient.name != "" && patient.email != "" && Number(patient.phone_number) != NaN){
                console.log(typeof(patient.name),typeof(patient.email),typeof(patient.phone_number))
                if(typeof(patient.name) == 'string' && typeof(patient.email) == 'string' && typeof(Number(patient.phone_number)) == 'number'){
                    patient.phone_number = Number(patient.phone_number)
                    const newPatient = await patientService.addPatient(patient)
                    if(newPatient.affectedRows == 1){
                        await sendMail(patient )
                        return  res.status(201).json(newPatient)
                        
                    }
                    else{
                        return  res.status(500).json({err:"server problem"})
                    }
                    
                }
                else{
                    return   res.status(406).json({error:"Incorrect data type"})
                }
            }
            else{
                return res.status(400).json({error:"Missing data"})
            }
        }    
            
        
       
        
    }
    catch(err){
        res.status(500).json({error:err})
    }


}