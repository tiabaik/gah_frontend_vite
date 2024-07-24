import { Card, Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


function TambahCustumerModal(props) {
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [noInd, setNoIdentitas] = useState('')
  const [noTelp, setNoTelp] = useState('')
  const [alamat, setAlamat] = useState('')
  const [nama_institusi, setAnamaIns] = useState('')
    const [validated] = useState(false)
    
 
  const refresh = () =>{
    window.location.reload(true)
  }

  const tambahCustumer =(e) =>{
    e.preventDefault()
    const datacustumer = {
      nama:nama,
      no_identitas:noInd,
      no_telp:noTelp,
      email:email,
      alamat:alamat,
      nama_institusi:nama_institusi,
    }
    const id = toast.loading('please wait...')
  axios.post('/register/custumer/grup', datacustumer,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
      .then(response => {
        console.log(response)
        toast.update(id, {render: "Successfully add data custumer", type: "success", isLoading:false, autoClose: 3000,})
        setTimeout(()=>refresh(), 3000)


      })
      .catch(error => {
        const message = error.response.data.message
        console.log(error)
        if(error.response.status == 422){
          toast.update(id, {render: message, type: "error", isLoading:false, autoClose: 3000})
          console.log({message})
        }
          console.log(error)
      });
  };

useEffect(()=>{
  console.log()
},[])




  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{
           backgroundColor: '#4caf50', borderColor: '#4caf50' 
        }}>
        <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
          <div className=''> TAMBAH custumer </div>
        </Modal.Title>
      </Modal.Header>

        <Form noValidate validated={validated} onSubmit={tambahCustumer}>
      <Modal.Body  >
        <Card style={{ backgroundColor: '#4caf50'}}>
        <Card className='p-2 m-3' >
          <Form.Label htmlFor="inputNomorK">Nama </Form.Label>
                <Form.Control className=''
                  type="text"
                  id="inputNomorK"
                  aria-describedby="inputNomorK"
                  value={nama} onChange={(e)=>setNama(e.target.value)}
                />
          </Card>
            <Card className='p-2 m-3' >
                <Form.Label htmlFor="inputNomorK">NO Identitas </Form.Label>
                <Form.Control className=''
                  type="text"
                  id="inputNomorK"
                  aria-describedby="inputNomorK"
                  value={noInd} onChange={(e)=>setNoIdentitas(e.target.value)}
                />
            </Card>
            <Card className='p-2 m-3'>
            <Form.Label htmlFor="inputNomorK">NO Telpon </Form.Label>
                <Form.Control className=''
                  type="text"
                  id="inputNomorK"
                  aria-describedby="inputNomorK"
                  value={noTelp} onChange={(e)=>setNoTelp(e.target.value)}
                />
            </Card>
            <Card className='p-2 m-3'>
            <Form.Label htmlFor="inputNomorK">Email</Form.Label>
                    <Form.Control className=''
                      type="text"
                      id="inputNomorK"
                      aria-describedby="inputNomorK"
                      value={email} onChange={(e)=>setEmail(e.target.value)}
                    />
            </Card>
            <Card className='p-2 m-3'>
            <Form.Label htmlFor="inputNomorK">Alamat </Form.Label>
                <Form.Control className=''
                  type="text"
                  id="inputNomorK"
                  aria-describedby="inputNomorK"
                  value={alamat} onChange={(e)=>setAlamat(e.target.value)}
                />
            </Card>
            <Card className='p-2 m-3'>
            <Form.Label htmlFor="inputNomorK">Nama Institusi</Form.Label>
                <Form.Control className=''
                  type="text"
                  id="inputNomorK"
                  aria-describedby="inputNomorK"
                  value={nama_institusi} onChange={(e)=>setAnamaIns(e.target.value)}
                />
            </Card>
        </Card>

      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}>Save</Button>
      </Modal.Footer>
          </Form>

          
    </Modal>

    
  );
}
export default TambahCustumerModal