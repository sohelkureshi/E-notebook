import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../styles/signup.css';
import Footer from './Footer'; // Import the Footer component

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.cpassword) {
            props.showAlert("Passwords do not match", "Danger");
            return;
        }

        const url = "https://e-notebook-fu9z.onrender.com/api/auth/createuser";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
            });
            const json = await response.json();

            if (json.success) {
                localStorage.setItem('token', json.authToken);
                navigate("/");
                props.showAlert("Account created successfully", "Success");
            } else {
                if (json.error) {
                    props.showAlert(json.error, "Danger");
                } else if (json.errors) {
                    json.errors.forEach((error) => {
                        props.showAlert(error.msg, "Danger");
                    });
                } else {
                    props.showAlert("Account creation failed", "Danger");
                }
            }
        } catch (error) {
            console.error('Error:', error);
            props.showAlert("Account creation failed", "Danger");
        }
    }

    return (
        <div className="signup-container">
            <div className="container">
                <div className="my-2 mb-4">
                    <h2>Create an account to use iNotebook</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp" minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <Footer /> {/* Add Footer at the bottom */}
        </div>
    );
}

export default Signup;
