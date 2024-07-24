import { Card, Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState} from 'react';
import axios from 'axios';
import KamarPicture from "../assets/KamarHotel.webp"
import { toast } from 'react-toastify';


function DetailKamarModal(props) {
  const [nomorKamar, setNoKamar]= useState('')
  const [nama_tipe, setNamaTip] = useState('')
  const [kapasitas, setKapasitas] = useState('')
  const [statusKet, setStatusKet] = useState('')
  const [pilihanBad, setPilihanBad] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [edit, setEdit] = useState(true)
  const [validated] = useState(false)
  
  
  const refresh = () =>{
    window.location.reload(true)
  }

const detailKamar= () => {
  console.log(props)
  axios.get('/kamar/detail/'+props.id,{
    headers:{ 
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    console.log(response)
    setNoKamar(response.data.data.id)
    setNamaTip(response.data.data.id_tipe)
    setKapasitas(response.data.data.kapasitas)
    setStatusKet(response.data.data.status_ketersedian_kamar)
    setPilihanBad(response.data.data.pilihan_bad)
    setDeskripsi(response.data.data.deskripsi)
  })
  .catch(error => {
    console.log(error)
  })
}

useEffect(()=>{
  console.log()
  detailKamar()
},[props.id])

const handleSubmit = () => {

          
  const data = {
    id:nomorKamar,
    id_tipe:nama_tipe,
    kapasitas:kapasitas,
    status_ketersedian_kamar:statusKet,
    pilihan_bad:pilihanBad,
    deskripsi:deskripsi,


  }
  console.log(data)
  console.log(props)
  const id = toast.loading('please wait...')
  axios.put('/kamar/'+props.id, data,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(response => {
          console.log(response)
          
          setEdit(true)
          toast.update(id, {render: "Successfully Update data kamar", type: "success", isLoading:false, autoClose: 3000,})
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


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header  style={{
          backgroundColor: '',
        }}>
        <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
          <div className='text-center'> 

          <Card.Img  src={KamarPicture} />
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Card className='p-3 m-2' style={{ backgroundColor: '#4caf50'}}>
          <Form.Label htmlFor="inputNomorK">No. Kamar</Form.Label>
                <Form.Control className='text-center'
                  type="text"
                  id="inputNomorK"
                  aria-describedby="inputNomorK"
                  value={nomorKamar} disabled={edit} onChange={(e)=>setNoKamar(e.target.value)}
                />
          </Card>

          </Form>

          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body  >
        <Card style={{ backgroundColor: '#4caf50'}}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Card className='p-2 m-3' >
                <div className='mb-2'>Status Kamar</div>
                <Form.Select value={statusKet} disabled={edit} onChange={(e)=>setStatusKet(e.target.value)}>
                    <option value="Available">Available</option>
                    <option value="Not-Available">Not-Available</option>
                </Form.Select>
            </Card>
            <Card className='p-2 m-3'>
                <div className='mb-2'>Nama Tipe Kamar</div>
                <Form.Select value={nama_tipe} disabled={edit} onChange={(e)=>setNamaTip(e.target.value)}>
                    <option value="1">Superior</option>
                    <option value="2">Double Deluxe</option>
                    <option value="3">Exclusive Deluxe</option>
                    <option value="4">Junior Suite</option>
                </Form.Select>
            </Card>
            <Card className='p-2 m-3'>
            <Form.Label htmlFor="inputNomorK">Kapasitas Tamu</Form.Label>
                    <Form.Control className='' disabled={edit} onChange={(e)=>setKapasitas(e.target.value)}
                      type="text"
                      id="inputNomorK"
                      aria-describedby="inputNomorK"
                      value={kapasitas} 
                    />
            </Card>
            <Card className='p-2 m-3'>
                <div className='mb-2'>Pilihan Bed</div>
                <Form.Select value={pilihanBad} ddisabled={edit} onChange={(e)=>setPilihanBad(e.target.value)}>
                    <option value="1 Twin">1 Twin</option>
                    <option value="1 double">1 double</option>
                    <option value="2 Twin">2 Twin</option>
                    <option value="2 double">2 double</option>
                    <option value="King Size">King size</option>
                </Form.Select>
            </Card>
            <Card className='p-2 m-3'>
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control as="textarea" rows={3}  value={deskripsi}  disabled={edit} onChange={(e)=>setDeskripsi(e.target.value)} />
            </Card>
          </Form>
        </Card>

      </Modal.Body>
      <Modal.Footer>
        <Button className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}  onClick={()=>{setEdit(true); props.onHide()}}>Close</Button>
        {
          edit ?
          <Button className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}  onClick={ ()=>setEdit(false)}>Edit</Button>
          :
          <Button className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}  onClick={ ()=>{setEdit(true);handleSubmit()}}>Save</Button>

        }
      </Modal.Footer>
    </Modal>

    
  );
}
export default DetailKamarModal