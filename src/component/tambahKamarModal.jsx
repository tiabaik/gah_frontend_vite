import { Card,  Form, } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


function TambahKamarModal(props) {
  const [idKamar, setId] = useState('')
    const [idTipe, setIdTipe] = useState('')
    const [statusKet, setstatusKet] = useState('')
    const [deskripsi, setdeskripsi] = useState('')
    const [kapasitas, setkapasitas] = useState('')
    const [pilihanBad, setpilihanBad] = useState('')
    const [validated] = useState(false)
    
  
  const refresh = () =>{
    window.location.reload(true)
  }

  const tambahKamar =(e) =>{
    e.preventDefault()
    const dataKamar = {

        id:idKamar,
        id_tipe:idTipe,
        status_ketersedian_kamar:statusKet,
        kapasitas:kapasitas,
        pilihan_bad:pilihanBad,
        deskripsi:deskripsi,
    }
    const id = toast.loading('please wait...')
  axios.post('/kamar', dataKamar,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
      .then(response => {
        console.log(response)
        toast.update(id, {render: "Successfully add data Kamar", type: "success", isLoading:false, autoClose: 3000,})
        setTimeout(()=>refresh(), 3000)


      })
      .catch(error => {
        const message = error.response.data.first
        if(error.response.status == 400){
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
          <div className=''> TAMBAH Kamar </div>
        </Modal.Title>
      </Modal.Header>

        <Form noValidate validated={validated} onSubmit={tambahKamar}>
      <Modal.Body  >
      <Card style={{ backgroundColor: '#4caf50'}}>
          <Card className='p-3 m-2' >
                <Form.Label htmlFor="inputNomorK">No Kamar</Form.Label>
                        <Form.Control className=''
                        type="text"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={idKamar}  onChange={(e)=>setId(e.target.value)}
                        />
            </Card>
            <Card className='p-2 m-3'>
                <div className='mb-2'>Nama Tipe Kamar</div>
                <Form.Select value={idTipe} onChange={(e)=>setIdTipe(e.target.value)}>
                    <option selected></option>
                    <option value="1">Superior</option>
                    <option value="2">Double Deluxe</option>
                    <option value="3">Exclusive Deluxe</option>
                    <option value="4">Junior Suite</option>
                </Form.Select>
            </Card>
            <Card className='p-2 m-3'>
                <div className='mb-2'>Status Ketersedian Kamar</div>
                <Form.Select value={statusKet} onChange={(e)=>setstatusKet(e.target.value)}>
                    <option selected></option>
                    <option value="Available">Available</option>
                    <option value="Not-Availbable">Not-Available</option>
                </Form.Select>
            </Card>
            <Card className='p-3 m-2' >
                <Form.Label htmlFor="inputNomorK">Kapasitas</Form.Label>
                        <Form.Control className=''
                        type="text"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={kapasitas}  onChange={(e)=>setkapasitas(e.target.value)}
                        />
            </Card>
            <Card className='p-2 m-3'>
                <div className='mb-2'>Pilihan Ranjang</div>
                <Form.Select value={pilihanBad} onChange={(e)=>setpilihanBad(e.target.value)}>
                    <option selected></option>
                    <option value="1 Twin">1 Twin</option>
                    <option value="1 double">1 double</option>
                    <option value="2 Twin">2 Twin</option>
                    <option value="2 double">2 double</option>
                    <option value="King Size">King size</option>
                </Form.Select>
            </Card>
            <Card className='p-3 m-2' >
                <Form.Label htmlFor="inputNomorK">Deskripsi</Form.Label>
                        <Form.Control className=''
                        type="textArea"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={deskripsi}  onChange={(e)=>setdeskripsi(e.target.value)}
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
export default TambahKamarModal