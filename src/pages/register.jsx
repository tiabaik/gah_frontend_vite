import axios from 'axios';
import { Component } from 'react';
import { Form,  Button, Card } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';


class Register extends Component {
    state = {
        validated: false,
        nama:'',
        noInd:'',
        noTelp:'',
        email:'',
        alamat:'',
        pass:'',
        confirmPass:'',
        isRegister:false

    }

    render(){
        
        
        const handleSubmit = (event) => {
            const form = event.currentTarget;
            event.preventDefault();
            if (form.checkValidity() === false) {
                event.stopPropagation();
            }
            this.setState({validated:true});
            const data = {
                nama: this.state.nama,
                no_identitas: this.state.noInd,
                no_telp:this.state.noTelp,
                email:this.state.email,
                alamat:this.state.alamat,
                password:this.state.pass,
                password_confirmation:this.state.confirmPass,
            }
            
            const id = toast.loading('please wait...')
            axios.post('/register/custumer/personal', data)
                .then(response => {
                    console.log(response)
                    toast.update(id, {render: "Successfully add data custumer", type: "success", isLoading:false, autoClose: 3000,})
                    this.setState({isRegister: true})
                })
                .catch(error => {
                    console.log(error)
                });
        };
      
        if(this.state.isRegister){
            return <Navigate to="/login"/>
        }

        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ backgroundColor: '#b0e57c', padding: '20px', width: '50rem' }}>
          <Card.Title className='text-center fs-2' >Daftar</Card.Title>
            <Card.Body>
              <Form noValidate validated={this.state.validated} onSubmit={handleSubmit}>
                <Form.Group controlId="validationCustom01">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control required type="text" placeholder="Nama" onChange={(e) => {this.setState({nama:e.target.value})}} />
                  <Form.Control.Feedback type="invalid">
                    Please Input your name.
                  </Form.Control.Feedback>
                </Form.Group>
      
                <Form.Group controlId="validationCustom02">
                  <Form.Label>No Identitas</Form.Label>
                  <Form.Control required type="text" placeholder="No Identitas" onChange={(e) => {this.setState({noInd:e.target.value})}} />
                  <Form.Control.Feedback type="invalid">
                    Please Input your No identitas.
                  </Form.Control.Feedback>
                </Form.Group>
      
                <Form.Group controlId="validationCustom03">
                  <Form.Label>No Telpon</Form.Label>
                  <Form.Control required type="text" placeholder="No Telpon" onChange={(e) => {this.setState({noTelp:e.target.value})}} />
                  <Form.Control.Feedback type="invalid">
                    Please Input your no telepon.
                  </Form.Control.Feedback>
                </Form.Group>
      
                <Form.Group controlId="validationCustomUsername">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    onChange={(e) => {this.setState({email:e.target.value})}}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Input a valid email address using @.
                  </Form.Control.Feedback>
                  
                </Form.Group>
      
                <Form.Group controlId="validationCustom04">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control required type="text" placeholder="Alamat" onChange={(e) => {this.setState({alamat:e.target.value})}} />
                  <Form.Control.Feedback type="invalid">
                    Please Input your address.
                  </Form.Control.Feedback>
                </Form.Group>
      
                <Form.Group controlId="validationCustom05">
                  <Form.Label>Password</Form.Label>
                  <Form.Control required type="password" placeholder="Password" onChange={(e) => {this.setState({pass:e.target.value})}}/>
                  <Form.Control.Feedback type="invalid">
                    Please Input your password.
                  </Form.Control.Feedback>
                </Form.Group>
      
                <Form.Group controlId="validationCustom06">
                  <Form.Label>Konfirmasi Password</Form.Label>
                  <Form.Control required type="password" placeholder="Konfirmasi Password" onChange={(e) => {this.setState({confirmPass:e.target.value})}}/>
                  <Form.Control.Feedback type="invalid">
                    Please Input your password confirm.
                    
                  </Form.Control.Feedback>
                  {
                    this.state.pass !== this.state.confirmPass && (
                        <p className='text-danger' style={{fontSize:'.900em'}}>Password and Confirm Password must be same</p>
                    )
                  }
                </Form.Group>
      
               
                <Button type="submit" className="mt-3" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}>
                  Daftar
                </Button>
      
              </Form>
            </Card.Body>
          </Card>
        </div>
      );
    }
  

}

export default Register;
