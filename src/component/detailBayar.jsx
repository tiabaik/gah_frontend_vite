import { Button, Card, CardImg, CardTitle} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Cardy from "../assets/atm.jpg"
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';




function DetailBayar(props) {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const handleKirimBukti = () => {
    if (file) {
      handleShow();
      bayar();
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const bayar = () => {

          
    const data = {
      uang_jaminan:props.total
  
  
    }
    console.log(data)
    console.log(props)
    const id = toast.loading('please wait...')
    axios.put('/update-uangJaminan/'+props.id,data,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
            console.log(response)
            toast.update(id, {render: "Pembayaran Berhasil", type: "success", isLoading:false, autoClose: 3000,})
            
        })
        .catch(error => {
            console.log(error)
            
        });
        
            
        
  
  };

  return (
    <>
    <Modal style={{
        backgroundColor: 'white',
      }}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: 'green', color: 'white' }}>
        
      </Modal.Header>

      <Modal.Body  >
        
        <Card className='p-2 m-3' > 
        <CardTitle style={{ backgroundColor: "", color: "#333" }}>BANK DIAMOND</CardTitle>
            <hr className='mt-10' style={{ border: "1px solid #000" }} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <CardImg variant="top" src={Cardy} style={{ width: '200px', height: '120px', marginRight: '10px' }}/>
              <div>
              <p style={{ marginBottom: '5px', color: 'green', fontFamily: 'Times New Roman' }}>PT ATMA JAYA</p>
                <p> No Rek. 770011770022</p>
              </div>
            </div>

        </Card>
       

        <Card className='p-2 m-3' >
            <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Bukti Pembayaran</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
            <p> Harap masukan file terlebih dahulu </p>
          </Form.Group>
        </Card>
        <Button className="ms-3 float-end" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50', textAlign: 'left' }} onClick={handleKirimBukti}
            disabled={!file}>
                    KIRIM BUKTI
        </Button>
      </Modal.Body>
    </Modal>

      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{ backgroundColor: 'green', color: 'white' }}>
        <Modal.Title>TERIMA KASIH</Modal.Title>
      </Modal.Header>
      <Modal.Body>Terima kasih atas kerjasama dan kepercayaan Anda dalam melilih kami untuk menjadi kan kami sebagai destinasi menginap anda
         Kontribusi Anda sangat berarti bagi kami. Semoga kunjungan Anda selalu membawa kebahagiaan, dan kami berharap dapat menyambut Anda kembali di masa depan.
         Transaksi anda akan kami proses  
      </Modal.Body>
      <Modal.Footer>
        <Link  className="mt-3" to={'/dashboardCustumer'} style={{ color: 'green' }}>
          SELESAI
        </Link >
      </Modal.Footer>
      </Modal>
    </>

    

    
  );
}
export default DetailBayar