import connection from "../../connection.js";
export default class PatientDao{


    async getAllPatients(){

        try {
            const sql = 'SELECT * FROM `patients`';
          
            const [rows, fields] = await connection.query(sql);

            return rows
          } catch (err) {
            console.log(err);
          }
        
    }
    async addPatient(patient){
        try {
        const sql =  `INSERT INTO patients (name, email, phone_number, document_photo) VALUES ('${patient.name}','${patient.email}',${patient.phone_number},'${patient.document_photo}') `;
        const [result, fields] = await connection.query(sql);


        return result
      } catch (err) {
        console.log(err);
      }
    } 

}