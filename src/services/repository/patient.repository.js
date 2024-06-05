export default class PatientRepository{
    constructor(dao){
        this.dao = dao
    }

    getAllPatients= () =>{
        return this.dao.getAllPatients()
    }

    addPatient = (patient) =>{
        return this.dao.addPatient(patient)
    }
}