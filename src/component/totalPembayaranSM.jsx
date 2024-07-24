import { Button, Card } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState} from 'react';
import axios from 'axios';
import DetailBayarSM from './detailBayarSM';



function TotalPembayranModalSM(props) {
   const [modalShowB, setModalShowB] = useState(false);
    const [fasilitas, setFasilitas]=useState([])
    const [kamar, setKamar]= useState([])
    const [totalP, setTotalP]= useState([])
    const [idB, setIdB] = useState('');
    let total = 0;
    let totalF = 0;

    const passIdB = (id) => {
      setIdB(id)
      setModalShowB(true)
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

    const detailTotalP = () => {
        console.log(props)
        axios.get('/reservasi/detail/totalP/'+props.id,{
          headers:{ 
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log(response.data)
          setTotalP(response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
      }
      
    const [riwayatRess, setRiwayatRess] = useState([])

    const readData = () => {
    
      axios.get('/reservasiSM',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(response => {
            setRiwayatRess(response.data.data)
  
          })
          .catch(error => {
              console.log(error)
          });
    };

      useEffect(() => {
        detailFasilitas()
        detailKamar()
        detailTotalP()
        readData()
        
      },[props.id])

  return (
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
                <div className='fs-4 font-weight-bold'> 
                      Detail Pemesanan  
                </div>
                <div className="container mt-3">
                    <div className="row">
                    {
                        kamar.map((data, index) => {
                          const subtotal = data.harga * data.jumlah_kamar;
                          total += subtotal;
                        return(
                          <div key={index}>
                          <div className="container p-0">
                              <div className="row mb-3">
                                  <div className="col-sm fs-6">
                                      Harga Kamar: Rp.{data.harga.toLocaleString()}
                                  </div>
                                  <div className="col-sm text-end fs-6">
                                      X {data.jumlah_kamar} kamar
                                  </div>
                                  <div className="col-sm text-end fs-6">
                                    Rp.{subtotal.toLocaleString()}
                                  </div>
                              </div>
                          </div>
                      </div>
                            
                          

                        )

                        })
                        
                        
                    }
                    
                     
            <hr className='mt-10' style={{ border: "none", borderTop: "2px dashed #000" }} ></hr>
            
                    {
                        fasilitas.map((data, index) => {
                          const subtotalF = data.harga_fasilitas * data.jumlah_booking_fasilitas;
                          totalF += subtotalF;
                        return(
                            <div key={index}>
                            <div className="container p-0">
                                    <div className="row mb-3">
                                          {
                                            data.harga_fasilitas != null ?
                                            <div className="col-sm fs-6">
                                              Harga Fasilitas :Rp.{data.harga_fasilitas.toLocaleString()}
                                            </div>
                                            : 
                                            <div className="col-sm fs-6">
                                              Harga Fasilitas :Rp.0
                                            </div>
                                            
                                          }
                                        <div className="col-sm text-end fs-6">
                                         X {data.jumlah_booking_fasilitas} Fasilitas
                                        </div>
                                        <div className="col-sm text-end fs-6">
                                        Rp.{subtotalF.toLocaleString()}
                                        </div> 
                                    </div>
                                </div>
                            </div>
        

                        )

                        })
                    }
                    </div>
                    <hr className='my-10' style={{ border: "none", borderTop: "2px dashed #000" }} ></hr>
                              </div >
                              <div className="row mb-3 p-2">
                              <div className="col-sm fs-6 text-end">
                                Total Kamar: Rp.{total.toLocaleString()}
                              </div>
                            </div>
          
                              <div className="row mb-3 p-2">
                              <div className="col-sm fs-6 text-end">
                                Total Fasilitas: Rp.{totalF.toLocaleString()}
                              </div>
                            </div>
                

        </Card>
        <Card className='p-2 m-3' >
                {
                        totalP.map((data, index) => {
                        return(
                            <div key={index}>
                            <div className=" fs-6 mb-3 p-2">
                                    Total Pembayaran : Rp.{(total+totalF). toLocaleString()}
                            </div>
                            <div className=" fs-6 mb-3 p-2">
                                    TAX : Rp.{((total+totalF) * 0.10 ).toLocaleString()}
                                    
                            </div>
                            <div className=" fs-6 mb-3 p-2">
                                    Diskon : Rp.{data.diskon}
                            </div>
                            </div>

                        )

                        })
                    }
          Total Jumlah Pembayaran : Rp.{((total+totalF)+((total+totalF) * 0.10)).toLocaleString()}
        </Card>
        <Card className='p-2 m-3' >
               <div className="row mb-3">
              <div className="col-sm fs-6">
              <p>Total Jumlah Pembayaran Yang Dibayarkan sebesar 50% dari Total jumlah Pembayaran : Rp.{(((total+totalF)+((total+totalF) * 0.10))/2).toLocaleString()} </p>
              {riwayatRess.status_reservasi !== 'Sudah Membayar Uang Jaminan' && (
                <Button
                  className="ms-3 float-end"
                  style={{ backgroundColor: '#4caf50', borderColor: '#4caf50', textAlign: 'left' }}
                  onClick={() => passIdB(props.id)}
                >
                  BAYAR
                </Button>
              )}
              </div>
      </div>     
        </Card>
      </Modal.Body>
      <DetailBayarSM
                id={idB}
                total={(((total+totalF)+((total+totalF) * 0.10))/2)}
                show={modalShowB}
                onHide={() => setModalShowB(false)}
              />
    </Modal>
    
  );
  
}
export default TotalPembayranModalSM