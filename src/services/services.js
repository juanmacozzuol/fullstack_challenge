import PatientDao from './DAOs/patients.dao.js'
import PatientRepository from './repository/patient.repository.js'

const patientDao = new PatientDao()
export const patientService = new PatientRepository(patientDao)