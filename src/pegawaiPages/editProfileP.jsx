import axios from 'axios';
import { Form,  Button, Card } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EditProfile () {
    
      const [nama, setNama] = useState('')
      const [email, setEmail] = useState('')
      const [noIdentitas, setNoIdentitas] = useState('')
      const [noTelp, setNoTelp] = useState('')
      const [alamat, setAlamat] = useState('')
      const [validated, setValidated] = useState(false)
      const [error, setError] = useState({})
      const [iseditProfile] = useState(false)
      const navigate = useNavigate()
 

      const readData = () => {
    
      axios.get('/pegawai',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(response => {
            console.log(response)
              setNama(response.data.data.nama)
              setEmail(response.data.data.email)
              setNoIdentitas(response.data.data.no_identitas)
              setNoTelp(response.data.data.no_telp)
              setAlamat(response.data.data.alamat)
  
          })
          .catch(error => {
              console.log(error)
          });
      };
  
      useEffect(()=>{
        if(localStorage.getItem('role') === 'pegawai'){
            readData()
                
        }else{
            navigate('/dashboardCustumer');
        }
      },[])
        
        
      const handleSubmit = (event) => {
          event.preventDefault();

          
          
            event.stopPropagation();
          
          setValidated(true)          
          const data = {
              nama:nama,
              email:email,
              no_identitas:noIdentitas,
              no_telp:noTelp,
              alamat:alamat,

          }
          console.log(data)
          const id = toast.loading('please wait...')
          axios.put('/pegawai', data,{
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          })
            .then(response => {
                  console.log(response)
                  toast.update(id, {render: "Successfully Update data kamar", type: "success", isLoading:false, autoClose: 3000,})
                  navigate("/profileP")
                  
              })
              .catch(error => {
                const message = error.response.data.first
                if(error.response.status == 400){
                  toast.update(id, {render: message, type: "error", isLoading:false, autoClose: 3000})
                  console.log({message})
                }
                  
                setError(error.response.data.message)
                  
              });
      };
    
      if(iseditProfile){
          return <Navigate to="/profileP"/>
      }

      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Card style={{ backgroundColor: '#b0e57c', padding: '20px', width: '50rem' }}>
        <Card.Title className='text-center fs-2' >Edit Profile</Card.Title>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="validationCustom01">
                <Form.Label>Nama</Form.Label>
                <Form.Control required type="text" readOnly="true" placeholder="Nama" value={nama} onChange={(e) => {setNama(e.target.value)}} />
                <Form.Control.Feedback type="invalid">
                  Please Input your name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationCustomUsername">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  value={email} 
                  onChange={(e) => {setEmail(e.target.value)}}
                />
                <Form.Control.Feedback type="invalid">
                  Please Input a valid email address using @.
                </Form.Control.Feedback>
                {
                  error && error.email ?
                  <p className='text-danger fs-6'>{error.email}</p> :
                  ""
                }
                
              </Form.Group>
    
              <Form.Group controlId="validationCustom02">
                <Form.Label>No Identitas</Form.Label>
                <Form.Control required type="text" placeholder="No Identitas" value={noIdentitas} onChange={(e) => {setNoIdentitas(e.target.value)}} />
                <Form.Control.Feedback type="invalid">
                  Please Input your No identitas.
                </Form.Control.Feedback>
              </Form.Group>
    
              <Form.Group controlId="validationCustom03">
                <Form.Label>No Telpon</Form.Label>
                <Form.Control required type="text" placeholder="No Telpon" value={noTelp} onChange={(e) => {setNoTelp(e.target.value)}} />
                <Form.Control.Feedback type="invalid">
                  Please Input your no telepon.
                </Form.Control.Feedback>
                {
                  error && error.no_telp ?
                  <p className='text-danger fs-6'>{error.no_telp}</p> :
                  ""
                }
              </Form.Group>
    
    
              <Form.Group controlId="validationCustom04">
                <Form.Label>Alamat</Form.Label>
                <Form.Control required type="text" placeholder="Alamat" value={alamat} onChange={(e) => {setAlamat(e.target.value)}} />
                <Form.Control.Feedback type="invalid">
                  Please Input your address.
                </Form.Control.Feedback>
              </Form.Group>
    
              
              <Button type="submit" className="mt-3" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}>
                Save
              </Button>
    
            </Form>
          </Card.Body>
        </Card>
        <ToastContainer/>
        
      </div>
    );
  }

export default EditProfile;
