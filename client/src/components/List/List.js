import CardList from "../CardList/CardList.js"
import { useState, useEffect } from 'react';
import Button from '../Button/Button.js'
import Modal from "../Modal/Modal.js";
import Form from "../Form/Form.js";
const List = () =>{

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [patients, setPatients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleFormSubmit = () => {
      setFormSubmitted(prev => !prev);
    }
    useEffect(()=>{
        const  getPatients = async ()=>{
          try {
            const response = await fetch('http://localhost:8080/api/patients', {
                method: 'GET',
                mode:'cors',
        
            });
        
            if (response.status !== 201 ) {
                throw new Error('Failed');
            }
            const data = await response.json()
            setPatients(data)
            localStorage.setItem("patientList",JSON.stringify(data))
        } catch (error) {
            console.error('Error', error);
        }
        
        
        }
        
        getPatients()

      },[formSubmitted])


      const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    
    return(
        <>     
        <div className='card-container'> 
            <CardList patients={JSON.parse(localStorage.getItem('patientList'))} />
        </div>
            <Button onClick={openModal} text='Add Patient' route='/form'/>
            <Modal isOpen={isModalOpen} onClose={closeModal} internal={<Form onFormSubmit={handleFormSubmit} onClose={closeModal}/>} />
        </>
    )

}

export default List