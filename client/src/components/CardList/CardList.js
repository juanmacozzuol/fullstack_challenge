import FoldingCard from "../Card/FoldingCard.js"
const CardList =({patients})=>{

    return(
        <>
        {patients == null || patients.length === 0?<p>No hay pacientes para mostrar</p>:patients.map(patient =>{

            return <FoldingCard key={patient.id} name={patient.name} email={patient.email} image={patient.document_photo} phone_number={patient.phone_number}  />
        })}
        
        </>
    )

}


export default CardList