import { Button, Card} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';




function DetailBayarFO(props) {
  const [diskon, setdiskon] = useState('')
  const [validated] = useState(false)
  

const refresh = () =>{
  window.location.reload(true)
}

const tambahtransaksi =(e) =>{
  e.preventDefault()
  const datatransaksi = {
    id_reservasi:props.id,
    total_pembayaran:props.totalPembayaran,
    tax:props.tax,
    total_akhir_pembayaran:props.totalAkhir,
    diskon:diskon,
    jumlah_pembayaran:props.sisaPembayaran,
  }
  const id = toast.loading('please wait...')
axios.post('/transaksi', datatransaksi,{
  headers:{
    Authorization:`Bearer ${localStorage.getItem('token')}`
  }
})
    .then(response => {
      console.log(response)
      toast.update(id, {render: "Successfully add data transaksi", type: "success", isLoading:false, autoClose: 3000,})
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
        <div className=''> TAMBAH transaksi </div>
      </Modal.Title>
    </Modal.Header>

      <Form noValidate validated={validated} onSubmit={tambahtransaksi}>
    <Modal.Body  >
      <Card style={{ backgroundColor: '#4caf50'}}>
          <Card className='p-3 m-2' >
              <Form.Label htmlFor="inputNomorK">Total Pembayaran</Form.Label>
                      <Form.Control className='text-center'
                      type="type"
                      id="inputNomorK"
                      aria-describedby="inputNomorK"
                      value={props.totalPembayaran.toLocaleString()}  
                      />
          </Card>
          <Card className='p-3 m-2'>
              <Form.Label htmlFor="inputNomorK">Tax</Form.Label>
                      <Form.Control className='text-center'
                      type="type"
                      id="inputNomorK"
                      aria-describedby="inputNomorK"
                      value={props.tax.toLocaleString()} 
                      />
          </Card>
          <Card className='p-3 m-2'>
              <Form.Label htmlFor="inputNomorK">Total Akhir Pembayaran</Form.Label>
                      <Form.Control className='text-center'
                      type="type"
                      id="inputNomorK"
                      aria-describedby="inputNomorK"
                      value={props.totalAkhir.toLocaleString()}  
                      />
          </Card>
          <Card className='p-3 m-2'>
              <Form.Label htmlFor="inputNomorK">Diskon</Form.Label>
                      <Form.Control className='text-center'
                      type="type"
                      id="inputNomorK"
                      aria-describedby="inputNomorK"
                      value={diskon}  onChange={(e)=>setdiskon(e.target.value)}
                      />
          </Card>
          <Card className='p-3 m-2'>
              <Form.Label htmlFor="inputNomorK">Sisa Pembayaran</Form.Label>
                      <Form.Control className='text-center'
                      type="type"
                      id="inputNomorK"
                      aria-describedby="inputNomorK"
                      value={props.sisaPembayaran}  
                      />
          </Card>
      </Card>

    </Modal.Body>
    <Modal.Footer>
      <Button type='submit' className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}>Save</Button>
    </Modal.Footer>
        </Form>
    <ToastContainer></ToastContainer>
 
  </Modal>

  


  
    

    
  );
}
export default DetailBayarFO