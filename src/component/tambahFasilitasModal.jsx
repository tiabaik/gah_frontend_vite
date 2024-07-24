import { Card,  Form, } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState} from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';


function TambahFasilitasModal(props) {
    const [nama_Fasilitas, setNamaFasilitas] = useState('')
    const [harga_Fasilitas, setHargaF] = useState('')
    const [validated] = useState(false)
    
  const refresh = () =>{
    window.location.reload(true)
  }

  const tambahFasilitas =(e) =>{
    e.preventDefault()
    const dataFasilitas = {
     
   nama_fasilitas:nama_Fasilitas,
   harga_fasilitas:harga_Fasilitas,
    }
    const id = toast.loading('please wait...')
  axios.post('/fasilitas', dataFasilitas,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
      .then(response => {
        console.log(response)
        toast.update(id, {render: "Successfully add data Fasilitas", type: "success", isLoading:false, autoClose: 3000,})
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
          <div className=''> TAMBAH FASILITAS </div>
        </Modal.Title>
      </Modal.Header>

        <Form noValidate validated={validated} onSubmit={tambahFasilitas}>
      <Modal.Body  >
        <Card style={{ backgroundColor: '#4caf50'}}>
        <Card className='p-2 m-3' >
                <Form.Label htmlFor="inputNomorK">Nama Fasilitas</Form.Label>
                <Form.Control className='text-center'
                  type="text"
                  id="inputNomorK"
                  aria-describedby="inputNomorK"
                  value={nama_Fasilitas} onChange={(e)=>setNamaFasilitas(e.target.value)}
                />
          </Card>
            <Card className='p-3 m-2' style={{ backgroundColor: '#4caf50'}}>
            <Form.Label htmlFor="inputNomorK">Harga Fasilitas</Form.Label>
                        <Form.Control className='text-center'
                        type="text"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={harga_Fasilitas} onChange={(e)=>setHargaF(e.target.value)}
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
export default TambahFasilitasModal