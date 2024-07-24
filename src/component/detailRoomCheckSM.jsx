import { useState } from 'react';
import { Modal, Form, Row, Col, Card, Button, CardTitle } from 'react-bootstrap';
import KamarS from "../assets/kamarSR.jpg";
import KamarDL from "../assets/kamarD.jpg";
import KamarE from "../assets/kamarE.jpg";
import KamarJS from "../assets/kamarJS.jpg";
import laundryR from "../assets/laundry.jpg";
import axios from 'axios';
import { useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {HiChevronDoubleRight} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function DetailRoomCheckSM(props) {
  const [showKamar, setShowKamar] = useState(false);
  const [id_custumer, setidCustumer]=useState('')
  const [tgl_cek_in, setCekin]=useState('')
  const [tgl_cek_out, setCekOut]=useState('')
  const [jmlhdwasa, setDewasa]=useState('')
  const [jmlhAnak, setAnak]=useState('')
  const [permintaanKhusus, setPK]=useState('')
  const [superior, setKS]=useState('')
  const [doubleDeluxe, setDL]=useState('')
  const [exculesiveDeluxe, setE]=useState('')
  const [juniorSuite, setJS]=useState('')
  const [fasilitas, setFasilitas]=useState([])
  const [jumlahFasilitas, setJumlahFasilitas] = useState([]);

 
  const [showConfirm, setShowConfirm] = useState(false);
 
 

  const handleCloseConfrim = () => setShowConfirm(false);
  const handleShowConfirm = () => setShowConfirm(true);

  
//   const handleClose = () => setShow(false);
const [TipeKamarSuperior, setTipeKamarSuperior]=useState({})
const [TipeKamarDL, setTipeKamarDL]=useState({})
const [TipeKamarE, setTipeKamarE]=useState({})
const [TipeKamarJS, setTipeKamarJS]=useState({})
const [ RoomCheck, setRoomCheck]=useState([])
const [ Reservasi, setResservasi]=useState([])
const navigate = useNavigate();

const detailTipeKamarSuperior = () => {
  console.log(props)
  axios.get('/tipeKamar/1',{
    headers:{ 
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    console.log(response.data)
    setTipeKamarSuperior(response.data.data)
  })
  .catch(error => {
    console.log(error)
  })
}

const detailTipeKamarDL = () => {
  console.log(props)
  axios.get('/tipeKamar/2',{
    headers:{ 
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    console.log(response.data)
    setTipeKamarDL(response.data.data)
  })
  .catch(error => {
    console.log(error)
  })
}

const refresh = () =>{
  window.location.reload(true)
}

const detailTipeKamarE = () => {
  console.log(props)
  axios.get('/tipeKamar/3',{
    headers:{ 
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    console.log(response.data)
    setTipeKamarE(response.data.data)
  })
  .catch(error => {
    console.log(error)
  })
}

const detailTipeKamarJS = () => {
  console.log(props)
  axios.get('/tipeKamar/4',{
    headers:{ 
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    console.log(response.data)
    setTipeKamarJS(response.data.data)
  })
  .catch(error => {
    console.log(error)
  })
}

const fasilitasData = () => {
  console.log(props)
  axios.get('/fasilitas',{
    headers:{ 
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    console.log(response.data)
    setFasilitas(response.data.data)
  })
  .catch(error => {
    console.log(error)
  })
}

useEffect(() => {
  detailTipeKamarSuperior()
  detailTipeKamarDL()
  detailTipeKamarE()
  detailTipeKamarJS()
  fasilitasData()

  
},[props.id])

const roomCheck = () =>{
  const data = {
   tgl_cek_in:tgl_cek_in,
    tgl_cek_out:tgl_cek_out,
    org_dewasa:jmlhdwasa,
    org_anak:jmlhAnak,
    permintaan_khusus:permintaanKhusus

  }
  const id = toast.loading('please wait...')
  axios.post('/roomCheck', data, {
    headers:{ 
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    console.log(response.data)
    setRoomCheck(response.data.data)
    toast.update(id, {render: "Kamar Tersedia Di Tanggal tersebut", type: "success", isLoading:false, autoClose: 3000,})
    setShowKamar(true)
  })
  .catch(error => {
    const message = error.response.data.first
    if(error.response.status == 400){
      toast.update(id, {render: message, type: "error", isLoading:false, autoClose: 3000})
      console.log({message})
    }
      console.log(error)
  });

}

const reservasi = () =>{
    //NANTI TAMBAHAKAN KONTROLER BARU UNTUK POST JOINKAN CUSTUMER DAN ID CUSTUMER
  const data = {
    id_custumer:id_custumer,
   tgl_cek_in:tgl_cek_in,
    tgl_cek_out:tgl_cek_out,
    org_dewasa:jmlhdwasa,
    org_anak:jmlhAnak,
    permintaan_khusus:permintaanKhusus,
    superior:superior,
    double_deluxe:doubleDeluxe,
    exclusive_deluxe:exculesiveDeluxe,
    junior_suite:juniorSuite,
    fasilitas:jumlahFasilitas
  }
  const id = toast.loading('please wait...')
  axios.post('/reservasi-grup', data, {
    headers:{ 
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    console.log(response.data)
    setResservasi(response.data.data)
    toast.update(id, {render: "Berhasil Menambahkan Reservasi Kamar", type: "success", isLoading:false, autoClose: 3000,})
    setTimeout(()=>refresh(), 3000)
    navigate('/dashboardReservasiSM');
    
   
  })
  .catch(error => {
    const message = error.response.data.first
    if(error.response.status == 400){
      toast.update(id, {render: message, type: "error", isLoading:false, autoClose: 3000})
      console.log({message})
    }
      console.log(error)
  });

}

const handleFasilitas = (id, harga, jumlah_booking_fasilitas, nama) => {
  // Convert the input value to a number
  const numericValue = parseFloat(jumlah_booking_fasilitas);

  // Check if the value is 0 or empty
  if (jumlah_booking_fasilitas === '' || numericValue === 0) {
    // Remove the item from jumlahFasilitas if it exists
    const updatedJumlahFasilitas = jumlahFasilitas.filter(item => item.id !== id);
    setJumlahFasilitas(updatedJumlahFasilitas);
  } else {
    // Update the jumlahFasilitas array with the new value or add it if it doesn't exist
    const updatedJumlahFasilitas = [...jumlahFasilitas];
    const existingItemIndex = updatedJumlahFasilitas.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
      updatedJumlahFasilitas[existingItemIndex] = {
        id,
        harga,
        nama,
        jumlah_booking_fasilitas,
      };
    } else {
      updatedJumlahFasilitas.push({
        id,
        harga,
        nama,
        jumlah_booking_fasilitas,
      });
    }
    
    setJumlahFasilitas(updatedJumlahFasilitas);
  }

  // Your other logic here, e.g., calculating the total price
}

 
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal {...props}>
        <Modal.Header closeButton>
        <Modal.Title>Pilih Tanggal Check-in dan Check-out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Check-In</Form.Label>
                  <Form.Label htmlFor="inputNomorK">Tanggal Chek In</Form.Label>
                        <Form.Control className='text-center'
                        type="date"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={tgl_cek_in}  onChange={(e)=>setCekin(e.target.value)}
                        />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                <Form.Label>Check-Out</Form.Label>
                  <Form.Label htmlFor="inputNomorK">Tanggal Chek Out</Form.Label>
                        <Form.Control className='text-center'
                        type="date"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={tgl_cek_out}  onChange={(e)=>setCekOut(e.target.value)}
                        />
                </Form.Group>
              </Col>
            </Row>
            <Card className='p-3 m-2' >
                <Form.Label htmlFor="inputNomorK">ID Custumer</Form.Label>
                        <Form.Control className=''
                        type="text"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={id_custumer}  onChange={(e)=>setidCustumer(e.target.value)}
                        />
            </Card>
            <Card className='p-3 m-2' >
                <Form.Label htmlFor="inputNomorK">Jumlah Orang dewasa</Form.Label>
                        <Form.Control className=''
                        type="text"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={jmlhdwasa}  onChange={(e)=>setDewasa(e.target.value)}
                        />
            </Card>
            <Card className='p-3 m-2' >
                <Form.Label htmlFor="inputNomorK">Jumlah Anak Anak</Form.Label>
                        <Form.Control className=''
                        type="text"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={jmlhAnak}  onChange={(e)=>setAnak(e.target.value)}
                        />
            </Card>
            <Card className='p-3 m-2' >
                <Form.Label htmlFor="inputNomorK">Permintaan Khusus</Form.Label>
                        <Form.Control className=''
                        type="text"
                        id="inputNomorK"
                        aria-describedby="inputNomorK"
                        value={permintaanKhusus}  onChange={(e)=>setPK(e.target.value)}
                        />
            </Card>
          </Form>
          <Button className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} onClick={roomCheck}> 
          AYO CARI <HiChevronDoubleRight/>
          </Button>
        </Modal.Body>
        <Modal.Footer>
          {
            showKamar ? 
            <>
          <Card>
            <CardTitle className='p-3 m-2'>PILIHAN KAMAR</CardTitle>
            <Card className='p-3 m-2'>
                  <div className="row">
                      <div className="col-md">
                      <Card.Img src={KamarS} style={{ height: '100%',width: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="col-md-8">
                      <Card.Body>
                      <Card.Title>SUPERIOR</Card.Title>
                          <Form.Label htmlFor="inputNomorK">Jumlah Kamar</Form.Label>
                          <Form.Control className=''
                          type="text"
                          id="inputNomorK"
                          aria-describedby="inputNomorK"
                          value={superior}  onChange={(e)=>setKS(e.target.value)}
                          />
                        <div className="col-sm fs-6" style={{ color: 'red', fontFamily: 'Times New Roman' }}>
                                Harga  Total Kamar : Rp.{superior * TipeKamarSuperior.harga}
                                
                        </div>
                        <p className="col-sm fs-6" style={{ color: 'red', fontFamily: 'Times New Roman' }}>
                                Jumlah Kamar Tersedia {RoomCheck[0].JumlahKamarTersedia}</p>
                        
                      </Card.Body>
                          
                      
                      </div>
                  </div>
              </Card>

              <Card className='p-3 m-2'>
                  <div className="row">
                      <div className="col-md">
                      <Card.Img src={KamarDL} style={{ height: '100%',width: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="col-md-8">
                      <Card.Body>
                          <Card.Title>DOUBLE DELUXE</Card.Title>
                          <Form.Label htmlFor="inputNomorK">Jumlah Kamar</Form.Label>
                          <Form.Control className=''
                          type="text"
                          id="inputNomorK"
                          aria-describedby="inputNomorK"
                          value={doubleDeluxe}  onChange={(e)=>setDL(e.target.value)}
                          />
                          
                      <div className="col-sm fs-6" style={{ color: 'red', fontFamily: 'Times New Roman' }}>
                              Harga  Total Kamar : Rp.{doubleDeluxe * TipeKamarDL.harga}
                      </div>
                      <p className="col-sm fs-6" style={{ color: 'red', fontFamily: 'Times New Roman' }}>
                                Jumlah Kamar Tersedia {RoomCheck[1].JumlahKamarTersedia}</p>
                      </Card.Body>
                      </div>
                  </div>
              </Card>

              <Card className='p-3 m-2'>
                  <div className="row">
                      <div className="col-md">
                      <Card.Img src={KamarE} style={{ height: '100%',width: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="col-md-8">
                      <Card.Body>
                          <Card.Title>EXECLUSIVE DELUXE</Card.Title>
                          <Form.Label htmlFor="inputNomorK">Jumlah Kamar</Form.Label>
                          <Form.Control className=''
                          type="text"
                          id="inputNomorK"
                          aria-describedby="inputNomorK"
                          value={exculesiveDeluxe}  onChange={(e)=>setE(e.target.value)}
                          />
                      <div className="col-sm fs-6" style={{ color: 'red', fontFamily: 'Times New Roman' }}>
                              Harga  Total Kamar : Rp.{ exculesiveDeluxe * TipeKamarE.harga}
                      </div>
                      <p className="col-sm fs-6" style={{ color: 'red', fontFamily: 'Times New Roman' }}>
                                Jumlah Kamar Tersedia {RoomCheck[2].JumlahKamarTersedia}</p>
                      </Card.Body>
                      </div>
                  </div>
              </Card>

              <Card className='p-3 m-2'>
                  <div className="row">
                      <div className="col-md">
                      <Card.Img src={KamarJS} style={{ height: '100%',width: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="col-md-8">
                      <Card.Body>
                          <Card.Title>JUNIOR SUITE</Card.Title>
                          <Form.Label htmlFor="inputNomorK">Jumlah Kamar</Form.Label>
                          <Form.Control className=''
                          type="text"
                          id="inputNomorK"
                          aria-describedby="inputNomorK"
                          value={juniorSuite}  onChange={(e)=>setJS(e.target.value)}
                          />
                      <div className="col-sm fs-6" style={{ color: 'red', fontFamily: 'Times New Roman' }}>
                              Harga Total Kamar : Rp.{juniorSuite * TipeKamarJS.harga} 
                      </div>
                      <p className="col-sm fs-6" style={{ color: 'red', fontFamily: 'Times New Roman' }}>
                                Jumlah Kamar Tersedia {RoomCheck[3].JumlahKamarTersedia}</p>
                      </Card.Body>
                      </div>
                  </div>
              </Card>
          </Card>
            <Card>
              <CardTitle className='p-3 m-2'>PILIHAN FASILITAS</CardTitle>
              {
                fasilitas.map((data, index) => {
                  const matchingJumlahFasilitas = jumlahFasilitas.find(item => item.id === data.id);

                  return(
                      <Card key={index} className='p-3 m-2'>
                          <div className="row">
                              <div className="col-md">
                              <Card.Img src={laundryR} style={{ height: '100%',width: '100%', objectFit: 'cover' }} />
                              </div>
                              <div className="col-md-8">
                              <Card.Body>
                                  <Card.Title>{data.nama_fasilitas}</Card.Title>
                                  <Form.Label htmlFor="inputNomorK">Jumlah Booking Fasilitas</Form.Label>
                                  <Form.Control className=''
                                  type="numeric"
                                  id="inputNomorK"
                                  aria-describedby="inputNomorK"
                                  value={matchingJumlahFasilitas ? matchingJumlahFasilitas.jumlah_booking_fasilitas : ''}  onChange={(e)=>handleFasilitas(data.id, data.harga_fasilitas, e.target.value, data.nama_fasilitas)}
                                  />
                              <div className="col-sm fs-6" style={{ color: 'red', fontFamily: 'Times New Roman' }}>
                                      Harga Total Fasilitas : Rp.{(matchingJumlahFasilitas ? matchingJumlahFasilitas.jumlah_booking_fasilitas : 0) * data.harga_fasilitas} 
                              </div>
                              </Card.Body>
                              </div>
                          </div>
                      </Card>

                  )

                })
              }

              
            </Card>
          <Button className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}onClick={handleShowConfirm} >
                NEXT <HiChevronDoubleRight/>
          </Button>
          </>
          : ""
          }
          
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirm} onHide={handleCloseConfrim}>
        <Modal.Header closeButton>
          <Modal.Title>KONFIRMASI PEMESANAN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
        <p>Check In: {tgl_cek_in}</p>
        <p>Check Out: {tgl_cek_out}</p>
        <p>Jumlah anak: {jmlhdwasa}</p>
        <p>Jumlah Dewasa: {jmlhAnak}</p>
        <br></br>
        <table className="table table-borderless">
    <thead>
        <tr>
            <th>Tipe Kamar</th>
            <th>Jumlah Kamar</th>
            <th>Total Harga Kamar</th>
        </tr>
    </thead>
    <tbody>
      {
        superior > 0 ?
        <tr>
            <td>Superior</td>
            <td>{superior}</td>
            <td>{superior * TipeKamarSuperior.harga}</td>
            <td></td>
            
        </tr>: ""
      }
      {
        doubleDeluxe > 0 ?
        <tr>
            <td>Double Deluxe</td>
            <td>{doubleDeluxe}</td>
            <td>{doubleDeluxe * TipeKamarDL.harga}</td>

        </tr>: ""
      }
      {
        exculesiveDeluxe > 0 ?
        <tr>
            <td>Exclusive Deluxe</td>
            <td>{exculesiveDeluxe}</td>
            <td>{exculesiveDeluxe * TipeKamarDL.harga}</td>
        </tr>: ""
      }
      {
        juniorSuite > 0 ?
        <tr>
            <td>Junior Suite</td>
            <td>{juniorSuite}</td>
            <td>{juniorSuite * TipeKamarJS.harga}</td>
        </tr>: ""
      }
       
    </tbody>
</table>
<table className="table table-borderless">
    <thead>
        <tr>
            <th>Nama Fasilitas</th>
            <th>Jumlah Fasilitas</th>
            <th>Total Harga Fasilitas</th>
           
        </tr>
    </thead>
    <tbody>
       {
        jumlahFasilitas.map((data, index) => {
          return(
            <tr key={index}>
              <td>{data.nama}</td>
              <td>{data.jumlah_booking_fasilitas}</td>
              <td>{data.jumlah_booking_fasilitas * data.harga}</td>
            
          </tr>
          )
        })
       }
    </tbody>
</table>
        </div>
        
        
        </Modal.Body>
        <Modal.Footer>
          <Button className="mt-3"  variant="secondary" onClick={handleCloseConfrim}>
            CANCEL
          </Button>
          {
            superior != '' || doubleDeluxe != '' || exculesiveDeluxe != '' || juniorSuite != ''?
            <Button  className="mt-3" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} variant="primary" onClick={reservasi} >
              PESAN KAMAR
            </Button> :
            <Button disabled className="mt-3" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} variant="primary" onClick={reservasi} >
              PESAN KAMAR
            </Button>
            
          }
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    
    </div>
  );
}

export default DetailRoomCheckSM;
