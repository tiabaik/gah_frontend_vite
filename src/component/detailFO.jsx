import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiUser} from 'react-icons/fi';
import { BiSolidBed} from 'react-icons/bi';
import {IoIosArrowDown} from 'react-icons/io';
import {FaHandHoldingUsd} from 'react-icons/fa';
import { useEffect, useState} from 'react';
import axios from 'axios';
import TotalPembayranFO from './totalPembayaranFO';


function DetailFO(props) {
  const [modalShow, setModalShow] = useState(false);
  const [detail, setDetail] = useState({})
  const [kamar, setKamar]= useState([])
  const [fasilitas, setFasilitas]=useState([])
  const [idDetail, setId] = useState('');
  const [totalP, setTotalP]= useState([])

  const passId = (id) => {
    setId(id)
    setModalShow(true)
  }


  const detailReservasi = () => {
      axios.get('/reservasi/detail/'+props.id,{
        headers:{ 
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        setDetail(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const detailKamar = () => {
      console.log(props)
      axios.get('/reservasi/detail/kamar/'+props.id,{
        headers:{ 
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log(response.data)
        setKamar(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const detailFasilitas = () => {
    console.log(props)
    axios.get('/reservasi/detail/fasilitas/'+props.id,{
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
    console.log()
    detailReservasi()
    detailKamar()
    detailFasilitas()
    
    
  },[props.id])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header  style={{
          backgroundColor: '#b0e57c',
        }}>
        <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
          <div className='text-center'> 
                Detail Reservasi  Grand Atma Hotel
          </div>
          <div className="container">
              <div className="row">
                <div className="col-sm fs-6">
                  Id Booking  : {detail.kode_booking}
                </div>
                <div className="col-sm text-end fs-6">
                  Tanggal Rervasi : {detail.tgl_reservasi}
                </div>
              </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body  >
        <Card className='p-2 m-3' >
                <div className='fs-4 font-weight-bold'> 
                      Detail Pemesanan  
                </div>
                <div className="container mt-2">
                    <div className="row">
                      <div className="col-sm text-right fs-6 p-0">
                        Check-in 
                        <p>{detail.tgl_cek_in}</p> 
                      </div>
                      <div className="col-sm text-end fs-6">
                        Check-out 
                        <p>{detail.tgl_cek_out}</p>
                      </div>
                    </div>
                </div>
            <hr className='my-0'></hr>
                  <div className='fs-4 font-weight-bold p-0 '> 
                        <p className='my-0'> <FiUser/> {detail.nama} </p>
                  </div>
                  <div className=" fs-6 ">
                       Dewasa :{detail.org_dewasa}
                  </div>
                <div className=" fs-6">
                      Anak Anak : {detail.org_anak}
                </div>
                <div className=" fs-6">
                      Tanggal Pembayarn : {detail.tgl_deposit}
                </div>
            <hr className='my-10' style={{ border: "none", borderTop: "2px dashed #000" }} ></hr>
            <hr className='my-10' style={{ border: "none", borderTop: "2px dashed #000" }} ></hr>
              {
                kamar.map((data, index) => {
                  return(
                    <div key={index}>
                      <div className='fs-4 font-weight-bold p-0 '> 
                          <p className='my-0'> <BiSolidBed/> {data.nama_tipe}</p>
                      </div>
                      <div className=" fs-6 ">
                              Jumlah Kamar :{data.jumlah_kamar}
                      </div>
                    </div>

                  )

                })
              }
            <hr className='my-10' style={{ border: "none", borderTop: "2px dashed #000" }} ></hr>
            <hr className='my-10' style={{ border: "none", borderTop: "2px dashed #000" }} ></hr>
            {
                fasilitas.map((data, index) => {
                  return(
                    <div key={index}>
                      <div className='fs-4 font-weight-bold p-0 '> 
                          <p className='my-0'> <FaHandHoldingUsd/> : {data.nama_fasilitas}</p>
                      </div>
                      <div className=" fs-6 ">
                              Jumlah Fasilitas : {data.jumlah_booking_fasilitas} 
                      </div>
                      <div className=" fs-6 ">
                              Tanggal Booking Fasilitas : {data.tgl_booking_fasilitas}
                      </div>
                    </div>

                  )

                })
            }
            <hr className='my-10' style={{ border: "none", borderTop: "2px dashed #000" }} ></hr>
            <hr className='my-10' style={{ border: "none", borderTop: "2px dashed #000" }} ></hr>
            <div className=" fs-6 mb-3">
                      Permintaan khusus : {detail.permintaan_khusus}
                </div>
        </Card>
        <Card className='p-2 m-3' >
              <Button className="w-25" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50', textAlign: 'left' }} onClick={() => passId(props.id)}>
                    Total Pembayaran <IoIosArrowDown/>
              </Button>
              
              <TotalPembayranFO
                id={idDetail}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}  onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

    
  );
}
export default DetailFO