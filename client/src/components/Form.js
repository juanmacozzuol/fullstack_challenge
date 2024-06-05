import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './Form.css';

const Form = () => {
    const [formInfo, setFormInfo] = useState({
        name: "",
        email: "",
        countryCode: "",
        number: "",
        file: null
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        file: ""
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInfo({
            ...formInfo,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {
            name: "",
            email: "",
            file: ""
        };

        if (!/^[A-Za-z]+$/.test(formInfo.name)) {
            newErrors.name = "Name can only contain letters.";
        }

        if (!/^[\w.+-]+@gmail\.com$/.test(formInfo.email)) {
            newErrors.email = "Email must be a valid @gmail.com address.";
        }

        if (!formInfo.file || (formInfo.file.type !== "image/jpeg" && !formInfo.file.name.endsWith('.jpg'))) {
            newErrors.file = "Only .jpg files are accepted.";
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(err => err === "");
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && (file.type === "image/jpeg" || file.name.endsWith('.jpg'))) {
            setFormInfo({
                ...formInfo,
                file
            });
            setErrors(prevErrors => ({ ...prevErrors, file: "" }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, file: "Only .jpg files are accepted." }));
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/jpeg',
        multiple: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (validate()) {
            const formData = new FormData();
            formData.append('name', formInfo.name);
            formData.append('email', formInfo.email);
            formData.append('phone_number', formInfo.countryCode + formInfo.number);
            formData.append('file', formInfo.file);
    
            try {
                const response = await fetch('http://localhost:8080/api/patients', {
                    method: 'POST',
                    mode:'cors',
                    body: formData
                });
                console.log(response)
                if (response.status !== 201 ) {
                    throw new Error('Failed to submit form data');
                }
    
                console.log('Form data submitted successfully');
                // Clear form fields
                setFormInfo({
                    name: '',
                    email: '',
                    countryCode: '',
                    number: '',
                    file: null
                });
                setIsSubmitted(false);
            } catch (error) {
                console.error('Error submitting the form', error);
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Patient Form</h2>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" value={formInfo.name} onChange={handleChange} required />
                    {isSubmitted && errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={formInfo.email} onChange={handleChange} required />
                    {isSubmitted && errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div>
                    <label htmlFor="countryCode">Country Code</label>
                    <input id="countryCode" name="countryCode" type="tel" value={formInfo.countryCode} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="number">Number</label>
                    <input type="tel" id="number" name="number" value={formInfo.number} onChange={handleChange} required />
                </div>
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    {
                        formInfo.file ? <p>{formInfo.file.name}</p> : <p>Drag 'n' drop a .jpg file here, or click to select a file</p>
                    }
                    {isSubmitted && errors.file && <span className="error">{errors.file}</span>}
                </div>
                <input type="submit" />
            </form>
        </div>
    );
};

export default Form;
