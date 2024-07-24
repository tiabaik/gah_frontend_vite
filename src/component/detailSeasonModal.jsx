import { Card, Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


function DetailSeasonModal(props) {
  const [idSeason, setidSeason]= useState('')
  const [nama_season, setNamaSeason] = useState('')
  const [tanggal_mulai, settanggalM] = useState('')
  const [tanggal_selesai, settanggalS] = useState('')
  const [edit, setEdit] = useState(true)
  const [validated] = useState(false)
 
  
  const refresh = () =>{
    window.location.reload(true)
  }

const detailSeason= () => {
  console.log(props)
  axios.get('/season/'+props.id,{
    headers:{ 
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    console.log(response)
    setidSeason(response.data.data.id)
    setNamaSeason(response.data.data.nama_season)
    settanggalM(response.data.data.tanggal_mulai)
    settanggalS(response.data.data.tanggal_selesai)

  })
  .catch(error => {
    console.log(error)
  })
}

useEffect(()=>{
  console.log()
  detailSeason()
},[props.id])

const handleSubmit = () => {

          
  const data = {
   id:idSeason,
   nama_season:nama_season,
   tanggal_mulai:tanggal_mulai,
   tanggal_selesai:tanggal_selesai,


  }
  console.log(data)
  console.log(props)
  const id = toast.loading('please wait...')
  axios.put('/season/'+props.id, data,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(response => {
          console.log(response)
          
          setEdit(true)
          toast.update(id, {render: "Successfully Update data season", type: "success", isLoading:false, autoClose: 3000,})
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
          <Form.Label htmlFor="inputNomorK">ID Season</Form.Label>
                <Form.Control className='text-center'
                  type="text"
                  id="inputNomorK"
                  aria-describedby="inputNomorK"
                  value={idSeason} disabled onChange={(e)=>setidSeason(e.target.value)}
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
                <div className='mb-2'>Nama Season</div>
                <Form.Select value={nama_season} disabled={edit} onChange={(e)=>setNamaSeason(e.target.value)}>
                    <option value="Promo">Promo</option>
                    <option value="Normal">Normal</option>
                    <option value="Hight Season">High Season</option>
                </Form.Select>
            </Card>
            <Card className='p-3 m-2' style={{ backgroundColor: '#4caf50'}}>
                <Form.Label htmlFor="inputNomorK">Tanggal Mulai</Form.Label>
                        <Form.Control className='text-center'
                        type="date"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={tanggal_mulai} disabled={edit} onChange={(e)=>settanggalM(e.target.value)}
                        />
            </Card>
            <Card className='p-3 m-2' style={{ backgroundColor: '#4caf50'}}>
                <Form.Label htmlFor="inputNomorK">Tanggal Selesai</Form.Label>
                        <Form.Control className='text-center'
                        type="date"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={tanggal_selesai} disabled={edit} onChange={(e)=>settanggalS(e.target.value)}
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
export default DetailSeasonModal