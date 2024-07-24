import { Card,  Form, } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


function TambahSeasonModal(props) {
    const [nama_season, setNamaSeason] = useState('')
    const [tanggal_mulai, settanggalM] = useState('')
    const [tanggal_selesai, settanggalS] = useState('')
    const [validated] = useState(false)
    
  
  const refresh = () =>{
    window.location.reload(true)
  }

  const tambahSeason =(e) =>{
    e.preventDefault()
    const dataSeason = {

        nama_season:nama_season,
        tanggal_mulai:tanggal_mulai,
        tanggal_selesai:tanggal_selesai,
    }
    const id = toast.loading('please wait...')
  axios.post('/season', dataSeason,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
      .then(response => {
        console.log(response)
        toast.update(id, {render: "Successfully add data Season", type: "success", isLoading:false, autoClose: 3000,})
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
          <div className=''> TAMBAH SEASON </div>
        </Modal.Title>
      </Modal.Header>

        <Form noValidate validated={validated} onSubmit={tambahSeason}>
      <Modal.Body  >
        <Card style={{ backgroundColor: '#4caf50'}}>
            <Card className='p-2 m-3' >
            <div className='mb-2'>Nama Season</div>
                <Form.Select value={nama_season}onChange={(e)=>setNamaSeason(e.target.value)}>
                    <option selected></option>
                    <option value="Promo">Promo</option>
                    <option value="Normal">Normal</option>
                    <option value="Hight Season">Hight Season</option>
                </Form.Select>
            </Card>
            <Card className='p-3 m-2' style={{ backgroundColor: '#4caf50'}}>
                <Form.Label htmlFor="inputNomorK">Tanggal Mulai</Form.Label>
                        <Form.Control className='text-center'
                        type="date"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={tanggal_mulai}  onChange={(e)=>settanggalM(e.target.value)}
                        />
            </Card>
            <Card className='p-3 m-2' style={{ backgroundColor: '#4caf50'}}>
                <Form.Label htmlFor="inputNomorK">Tanggal Selesai</Form.Label>
                        <Form.Control className='text-center'
                        type="date"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={tanggal_selesai}  onChange={(e)=>settanggalS(e.target.value)}
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
export default TambahSeasonModal

