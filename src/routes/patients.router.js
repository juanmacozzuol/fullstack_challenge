import {Router} from 'express'
import { getAllPatients,addPatient } from '../controllers/patients.controller.js'
import { uploader } from '../utils/multer.js'
const router = Router()

router.get('/', getAllPatients)

router.post('/',uploader.single('file'),addPatient)


export default router