import { Card, Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';



function DetailFasilitasModal(props) {
  const [idFasilitas, setidFasilitas]= useState('')
  const [nama_Fasilitas, setNamaFasilitas] = useState('')
  const [harga_Fasilitas, setHargaF] = useState('')
  const [edit, setEdit] = useState(true)
  const [validated] = useState(false)
  
  
  const refresh = () =>{
    window.location.reload(true)
  }

const detailFasilitas= () => {
  console.log(props)
  axios.get('/fasilitas/'+props.id,{
    headers:{ 
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    console.log(response)
    setidFasilitas(response.data.data.id)
    setNamaFasilitas(response.data.data.nama_fasilitas)
    setHargaF(response.data.data.harga_fasilitas)

  })
  .catch(error => {
    console.log(error)
  })
}

useEffect(()=>{
  console.log()
  detailFasilitas()
},[props.id])

const handleSubmit = () => {

          
  const data = {
   id:idFasilitas,
   nama_fasilitas:nama_Fasilitas,
   harga_fasilitas:harga_Fasilitas,



  }
  console.log(data)
  console.log(props)
  const id = toast.loading('please wait...')
  axios.put('/fasilitas/'+props.id, data,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(response => {
          console.log(response)
          
          setEdit(true)
          toast.update(id, {render: "Successfully Update data fasilitas", type: "success", isLoading:false, autoClose: 3000,})
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
          <Form.Label htmlFor="inputNomorK">ID Fasilitas</Form.Label>
                <Form.Control className='text-center'
                  type="text"
                  id="inputNomorK"
                  aria-describedby="inputNomorK"
                  value={idFasilitas} disabled onChange={(e)=>setidFasilitas(e.target.value)}
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
                <Form.Label htmlFor="inputNomorK">Nama Fasilitas</Form.Label>
                <Form.Control className='text-center'
                  type="text"
                  id="inputNomorK"
                  aria-describedby="inputNomorK"
                  value={nama_Fasilitas} disabled = {edit} onChange={(e)=>setNamaFasilitas(e.target.value)}
                />
          </Card>
            <Card className='p-3 m-2' >
                <Form.Label htmlFor="inputNomorK">Harga Fasilitas</Form.Label>
                        <Form.Control className='text-center'
                        type="text"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={harga_Fasilitas} disabled={edit} onChange={(e)=>setHargaF(e.target.value)}
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
export default DetailFasilitasModal