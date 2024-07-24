import axios from 'axios';
import { Form,  Button, Card } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {  useState } from "react";



function UbahPassword () {
    const [pass_lama, setPassLama] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setconfirmpass] = useState('')
    const [validated, setValidated] = useState(false)
    const [error, setError] = useState({})
    const [iseubahPass] = useState(false)
    const navigate = useNavigate()
    
        
        
        const handleSubmit = (event) => {
            const form = event.currentTarget;
            event.preventDefault();
            if (form.checkValidity() === false) {
                event.stopPropagation();
            }
            setValidated(true);
            const data = {
                password_lama:pass_lama,
                password:pass,
                password_confirmation:confirmPass,
            }
            console.log(data)
            axios.put('/changepass', data,{
              headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
              }
            })
              .then(response => {
                if (response.data.type === 'pegawai') {
                  // Do something for employees
                  console.log(response.data.data)
                  if(response.data.data.role_pegawai ==='ADMIN'){
                    navigate('/profileP');
        
                  }else if(response.data.data.role ==='SALES MARKETING'){
                    navigate('/profileP');
        
                  }
                } else {
        
                  navigate('/profileP');
                }
                
                
              })
                .catch(error => {
                    console.log(error)
                    
                    setError(error.response.data)
                    
              });
        };
      
        if(iseubahPass){
            return <Navigate to="/ubahPassword"/>
        }

        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ backgroundColor: '#b0e57c', padding: '20px', width: '50rem' }}>
          <Card.Title className='text-center fs-2' >Ubah Password</Card.Title>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="validationCustom01">
                  <Form.Label>Password Lama</Form.Label>
                  <Form.Control required type="password" placeholder="Password" onChange={(e) => {setPassLama(e.target.value)}}/>
                  <Form.Control.Feedback type="invalid">
                    Please Input your old password.
                  </Form.Control.Feedback>
                  {
                    error && error.message  ?
                    <p className='text-danger fs-6'>{error.message}</p> :
                    ""
                  }
                </Form.Group>

                <Form.Group controlId="validationCustom01">
                  <Form.Label>Password</Form.Label>
                  <Form.Control required type="password" placeholder="Password" onChange={(e) => {setPass(e.target.value)}}/>
                  <Form.Control.Feedback type="invalid">
                    Please Input your New password.
                  </Form.Control.Feedback>
                  {
                  error && error.password ?
                  <p className='text-danger fs-6'>{error.password}</p> :
                  ""
                }
                </Form.Group>
      
                <Form.Group controlId="validationCustom06">
                  <Form.Label>Konfirmasi Password</Form.Label>
                  <Form.Control required type="password" placeholder="Konfirmasi Password" onChange={(e) => {setconfirmpass(e.target.value)}}/>
                  <Form.Control.Feedback type="invalid">
                    Please Input your password confirm.
                    
                  </Form.Control.Feedback>
                  {
                    pass !== confirmPass && (
                        <p className='text-danger' style={{fontSize:'.900em'}}>Password and Confirm Password must be same</p>
                    )
                  }

{
                  error && error.password_confirmation ?
                  <p className='text-danger fs-6'>{error.password_confirmation}</p> :
                  ""
                }
                </Form.Group>
      
               
                <Button type="submit" className="mt-3" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}>
                  Save
                </Button>
      
              </Form>
            </Card.Body>
          </Card>
        </div>
      );
    
  

}

export default UbahPassword;
