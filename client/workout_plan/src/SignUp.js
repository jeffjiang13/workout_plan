import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from './config';
import 'bootstrap/dist/css/bootstrap.min.css'
const SignUp = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // Send a POST request to the server to create a new user
            await axios.post(`${serverUrl}/signup`, { username, email, password });
            // Redirect the user to the login page
            navigate('/');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1 className="text-center">Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder="Name" value={username} onChange={e => setUserName(e.target.value)} />
                            <label htmlFor="username">Username</label>

                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="email">Email</label>

                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="password">Password</label>

                        </div>
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                        {error && <p className="text-danger">{error}</p>}
                    </form>
                </div>
            </div>
        </div>

    );
};

export default SignUp;
