import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from './config';
import 'bootstrap/dist/css/bootstrap.min.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Send a POST request to the server to log the user in
      const response = await axios.post(`${serverUrl}/login`, { email, password });
      // Handle the response, for example, by storing the JWT in local storage
      localStorage.setItem('token', response.data.token);
      // Redirect the user to the dashboard or some other protected page
      navigate('/dashboard');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">

              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating mb-3">

              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button type="submit" className="btn btn-primary">Log in</button>
            {error && <p className="text-danger">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
