import axios from 'axios';
import { Form,  Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import Mukaku from "../assets/profile.webp"

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({})
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    axios
      .post('/login', data)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        console.log(response);
        localStorage.setItem('role', response.data.type);

        if (response.data.type === 'pegawai') {
          // Do something for employees
          console.log(response.data.data)
          if(response.data.data.role_pegawai ==='ADMIN'){
            navigate('/dashboardPegawai');

          }else if(response.data.data.role_pegawai ==='SALES MARKETING'){
            navigate('/dashboardsm');

          }else if(response.data.data.role_pegawai ==='RESEPSIONIS'){
          navigate('/dashboardFO');

          }else if(response.data.data.role_pegawai ==='GENERAL MANAGER'){
            navigate('/dashboardGM');

          }else if(response.data.data.role_pegawai ==='OWNER'){
            navigate('/dashboardOwner');

          }
        }else {
          navigate('/dashboardCustumer');
         }
        
        
      })

      .catch((error) => {
        console.log(error);
        setError(error.response.data)
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ backgroundColor: '#b0e57c', padding: '20px', width: '50rem' }}>
        <Card.Title className="text-center fs-2">Login</Card.Title>
        <Form onSubmit={login}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">Please Input your email.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">Please Input your password.</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="mt-3" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}>
            Login
          </Button>

          {
                    error && error.error ?
                    <p className='text-danger fs-6'>{error.error}</p> :
                    ""
                  }

          <p className="mt-3">
            If you dont have an account <Link to="/register">Register</Link>
          </p>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
