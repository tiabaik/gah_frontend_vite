import ProfilePicture from "../assets/profile.webp"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';

function ProfileP() {
  
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [noIdentitas, setNoIdentitas] = useState('')
    const [noTelp, setNoTelp] = useState('')
    const [alamat, setAlamat] = useState('')
    const navigate = useNavigate();


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
  })

  return (
    <>
    <Card className="mx-auto mt-5" style={{ backgroundColor: '#b0e57c', padding: '20px', width: '30rem' }}>
      <Card.Img variant="holder.js/171x180" src={ProfilePicture} />
      <Card.Body className="mx-auto">
        <Card.Title>Profile</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Nama : {nama}</ListGroup.Item>
        <ListGroup.Item>Email : {email}</ListGroup.Item>
        <ListGroup.Item>No Identitas : {noIdentitas}</ListGroup.Item>
        <ListGroup.Item>No Telepon :{noTelp}</ListGroup.Item>
        <ListGroup.Item>Alamat :{alamat}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="/editProfileP">Edit Profile</Card.Link>
        <Card.Link href="/ubahPassword">Ubah Password</Card.Link>
      </Card.Body>
    </Card>
    <ToastContainer />
    </>
    
  );
}

export default ProfileP; 