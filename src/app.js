import express from 'express'
import patientsRouter from './routes/patients.router.js'
import connection from './connection.js'

const app = express()
const port = 8080





connection.connect()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/patients',patientsRouter)

app.listen(port,() => {
    console.log("Server listening in port: " + port)
})