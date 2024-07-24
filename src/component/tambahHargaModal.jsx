import { Card,  Form, } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


function TambahHargaModal(props) {
    const [nama_tipe, setNamaTip] = useState('')
    const [nama_season, setNamaSea] = useState('')
    const [harga, setHargaAkhir] = useState('')
    const [validated] = useState(false)
    
  
  const refresh = () =>{
    window.location.reload(true)
  }

  const tambahHarga =(e) =>{
    e.preventDefault()
    const dataHarga = {

        id_tipe:nama_tipe,
        id_season:nama_season,
        harga:harga,
    }
    const id = toast.loading('please wait...')
  axios.post('/harga', dataHarga,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
      .then(response => {
        console.log(response)
        toast.update(id, {render: "Successfully add data Harga", type: "success", isLoading:false, autoClose: 3000,})
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
          <div className=''> TAMBAH HARGA</div>
        </Modal.Title>
      </Modal.Header>

        <Form noValidate validated={validated} onSubmit={tambahHarga}>
      <Modal.Body  >
        <Card style={{ backgroundColor: '#4caf50'}}>
         <Card className='p-2 m-3'>
                <div className='mb-2'>Nama Tipe Kamar</div>
                <Form.Select value={nama_tipe} onChange={(e)=>setNamaTip(e.target.value)}>
                    <option selected></option>
                    <option value="1">Superior</option>
                    <option value="2">Double Deluxe</option>
                    <option value="3">Exclusive Deluxe</option>
                    <option value="4">Junior Suite</option>
                </Form.Select>
            </Card>
            <Card className='p-2 m-3' >
            <div className='mb-2'>Nama Season</div>
                <Form.Select value={nama_season} onChange={(e)=>setNamaSea(e.target.value)}>
                    <option selected></option>
                    <option value="1">Promo</option>
                    <option value="2">Normal</option>
                    <option value="3">Hight Season</option>
                </Form.Select>
            </Card>
            <Card className='p-3 m-2'>
                <Form.Label htmlFor="inputNomorK">Harga Kamar AKhir</Form.Label>
                        <Form.Control className=''
                        type="text"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={harga} onChange={(e)=>setHargaAkhir(e.target.value)}
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
export default TambahHargaModal