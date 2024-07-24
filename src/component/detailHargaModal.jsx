import { Card, Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState} from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';


function DetailHargaModal(props) {
  const [idHarga, setidHarga]= useState('')
  const [nama_tipe, setNamaTip] = useState('')
  const [nama_season, setNamaSea] = useState('')
  const [harga, setHargaAkhir] = useState('')
  const [harga_kamar, setHargaK] = useState('')
  const [edit, setEdit] = useState(true)
  const [validated] = useState(false)
 
  
  
  const refresh = () =>{
    window.location.reload(true)
  }

const detailHarga= () => {
  console.log(props)
  axios.get('/harga/detail/'+props.id,{
    headers:{ 
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    console.log(response)
    setidHarga(response.data.data.id)
    setNamaTip(response.data.data.id_tipe)
    setNamaSea(response.data.data.id_season)
    setHargaAkhir(response.data.data.harga_akhir)
    setHargaK(response.data.data.Harga_Kamar)
  })
  .catch(error => {
    console.log(error)
  })
}

useEffect(()=>{
  console.log()
  detailHarga()
},[props.id])

const handleSubmit = () => {

          
  const data = {
    id:idHarga,
    id_tipe:nama_tipe,
    id_season:nama_season,
    harga:harga,
    


  }
  console.log(data)
  console.log(props)
  const id = toast.loading('please wait...')
  axios.put('/harga/'+props.id, data,{
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
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Card className='p-3 m-2' style={{ backgroundColor: '#4caf50'}}>
          <Form.Label htmlFor="inputNomorK">No. Id</Form.Label>
                <Form.Control className='text-center'
                  type="text"
                  id="inputNomorK"
                  aria-describedby="inputNomorK"
                  value={idHarga} disabled onChange={(e)=>setidHarga(e.target.value)}
                />
          </Card>

          </Form>

          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body  >
        <Card style={{ backgroundColor: '#4caf50'}}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                <div className='mb-2'>Nama Season</div>
                <Form.Select value={nama_season} disabled={edit} onChange={(e)=>setNamaSea(e.target.value)}>
                    <option value="1">Promo</option>
                    <option value="2">Normal</option>
                    <option value="3">High Season</option>
                    
                </Form.Select>
            </Card>
            <Card className='p-3 m-2' >
                <Form.Label htmlFor="inputNomorK">Harga Kamar</Form.Label>
                        <Form.Control className='' 
                        type="text"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={harga_kamar}disabled={edit} onChange={(e)=>setHargaK(e.target.value)}
                        />
          </Card>
          <Card className='p-3 m-2' >
                <Form.Label htmlFor="inputNomorK">Harga kamar Akhir</Form.Label>
                        <Form.Control className=''
                        type="text"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={harga}disabled={edit} onChange={(e)=>setHargaAkhir(e.target.value)}
                        />
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
export default DetailHargaModal