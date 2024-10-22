import React, { useState } from 'react';
import './App.css'
// Define validation function
const validateStep = (step, values) => {
    const errors = {};
    const nameRegex = /^[A-Za-z]+$/; // Only alphabets
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // 8 chars, letter, number, special char

    switch (step) {
        case 1:
            if (!values.firstName || !nameRegex.test(values.firstName)) {
                errors.firstName = 'First Name is required and should contain only alphabets';
            }
            if (!values.lastName || !nameRegex.test(values.lastName)) {
                errors.lastName = 'Last Name is required and should contain only alphabets';
            }
            break;
        case 2:
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = 'Email address is invalid';
            }
            break;
        case 3:
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (!passwordRegex.test(values.password)) {
                errors.password = 'Password must be at least 8 characters long and include a letter, a number, and a special character';
            }
            break;
        default:
            break;
    }
    return errors;
};

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [values, setValues] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleNext = () => {
        const validationErrors = validateStep(step, values);
        if (Object.keys(validationErrors).length === 0) {
            setStep((prevStep) => prevStep + 1);
        } else {
            setErrors(validationErrors);
        }
    };

    const handleBack = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalErrors = validateStep(step, values);
        if (Object.keys(finalErrors).length === 0) {
            alert("✅ Form successfully submitted!"); // Success alert with emoji
            // Alternatively, if using Font Awesome
            // alert("Form successfully submitted! 💪"); // Replace with icon if needed
            console.log('Form submitted:', values);
            // Handle form submission (e.g., send data to an API)
        } else {
            setErrors(finalErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="multi-step-form">
            {step === 1 && (
                <div>
                    <h2>Step 1: Personal Information</h2>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={values.firstName} onChange={handleChange} />
                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={values.lastName} onChange={handleChange} />
                        {errors.lastName && <p className="error">{errors.lastName}</p>}
                    </div>
                    <button type="button" onClick={handleNext}>Next</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2>Step 2: Contact Information</h2>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={values.email} onChange={handleChange} />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <button type="button" onClick={handleBack}>Back</button>
                    <button type="button" onClick={handleNext}>Next</button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2>Step 3: Create a Password</h2>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={values.password} onChange={handleChange} />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <button type="button" onClick={handleBack}>Back</button>
                    <button type="submit">Submit</button>
                </div>
            )}
        </form>
    );
};

export default MultiStepForm;
