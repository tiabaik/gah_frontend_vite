import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useState, useEffect} from 'react';
import { Card, Table, Form, Modal, CardTitle, CardBody} from 'react-bootstrap';
import axios from 'axios';
import laundryR from "../../assets/laundry.jpg";
// import {FcCancel} from 'react-icons/fc';
import { ToastContainer, toast} from 'react-toastify';
import DetailFO from '../../component/detailFO';
import TotalPembayranCheckOut from '../../component/totalPembayaranCheckOut';


function DasboardReservasiFO() {

  const [idReservasi, setId] = useState('');
  const [idReservasiCO, setIdCO] = useState('');
  const [filteredData, setFilteredData] = useState([]);
//   const [status_reservasi] = useState('')
  const [search, setSearch]=useState('')
  const [showKamar, setShowKamar] = useState(false);
  const [showKamarBook, setShowKamarBook] = useState(false);
  const [permintaanKhusus, setPK]=useState('')
  const [fasilitas, setFasilitas]=useState([])
  const [jumlahFasilitas, setJumlahFasilitas] = useState([]);
  const [ Reservasi, setResservasi]=useState([])

  const [selectedKamar, setSelectedKamar] = useState([]);

  const handleCheckboxChange = (id) => {
    // Check if the id is already in the array
    if (selectedKamar.includes(id)) {
      // If it is, remove it
      setSelectedKamar(selectedKamar.filter((selectedId) => selectedId !== id));
    } else {
      // If it's not, add it
      setSelectedKamar([...selectedKamar, id]);
    }
  };
  
  const navbarStyle = {
    backgroundColor: '#b0e57c', 
  };
  const [modalShow, setModalShow] = useState(false);
  const [modalShowCheckOut, setModalShowChekOUt] = useState(false);
  const tableStyle = {
    textAlign:'center'};

    const fasilitasData = () => {
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

    const refresh = () =>{
      window.location.reload(true)
    }

    const reservasi = () =>{
      const data = {
        permintaan_khusus:permintaanKhusus,
        fasilitas:jumlahFasilitas,
        id_reservasi:idReservasi
      }
      const id = toast.loading('please wait...')
      axios.post('/fasilitas', data, {
        headers:{ 
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log(response.data)
        setResservasi(response.data.data)
        toast.update(id, {render: "Berhasil Menambahkan fasilitas Kamar", type: "success", isLoading:false, autoClose: 3000,})
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
    
    }

    const reservasiKamar = () =>{
      const data = {
        kamar:selectedKamar
      }
      const id = toast.loading('please wait...')
      axios.post('/booking-Kamar/' + idReservasi, data, {
        headers:{ 
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log(response.data)
        setResservasi(response.data.data)
        toast.update(id, {render: "Berhasil Menambahkan Reservasi Kamar", type: "success", isLoading:false, autoClose: 3000,})
        setTimeout(()=>refresh(), 3000)
        
       
      })
      .catch(error => {
        const message = error.response.data.first
        if(error.response.status == 400){
          console.log({message})
        }
        toast.update(id, {render: message, type: "error", isLoading:false, autoClose: 3000})
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

    const chekin = (id_reservasi) => {  

          

        const id = toast.loading('please wait...')
        axios.get('/Chekin/'+id_reservasi,{
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`,
              Accept: 'application/json'
            }
          })
          .then(response => {
                console.log(response)
                setId(id_reservasi)
                toast.update(id, {render: "Pembayaran Berhasil", type: "success", isLoading:false, autoClose: 3000,})
                setShowKamarBook(true)
                
                
                
            })
            .catch(error => {
              const message = error.response.data.message
              if(error.response.status == 400){
                toast.update(id, {render: message, type: "error", isLoading:false, autoClose: 3000})
                console.log({message})
              }
                console.log(error)
            });
            
                
            
      
      };

      const checkout = (idChekout) => {
        const id = toast.loading('please wait...')
        axios.get('/Chekout/'+idChekout,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log(response.data.data)
          toast.update(id, {render: "Successfully CheckOut", type: "success", isLoading:false, autoClose: 3000,})
          setIdCO(idChekout)
          setModalShowChekOUt(true)
      })
      .catch(error => {
        const message = error.response.data.message
        if(error.response.status == 400){
          toast.update(id, {render: message, type: "error", isLoading:false, autoClose: 3000})
          console.log({message})
        }
          console.log(error)
      });
    }

  const passId = (id) => {
    setId(id)
    console.log(id)
    setModalShow(true)
  }

  const passIdCO = (id) => {
    setIdCO(id)
    console.log(id)
    setModalShow(true)
  }

  const passIdF = (id) => {
    setId(id)
    console.log(id)
    setShowKamar(true)
  }


    const [riwayatRess, setRiwayatRess] = useState([])

    const readData = () => {
    
      axios.get('/reservasi',{
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

    const [riwayatKamarReady, setRiwayatKamarReady] = useState([])

    const readDataReady = () => {
    
      axios.get('/kamar-available',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(response => {
            setRiwayatKamarReady(response.data.data)
  
          })
          .catch(error => {
              console.log(error)
          });
    };
  
    useEffect(()=>{
      readData()
      readDataReady()
    },[])

  
    useEffect(()=>{
      readData()
      fasilitasData()
    },[])

    useEffect(() => {
      const filteredData = riwayatRess?.filter((row) => {
        return row.id?.toString().toLowerCase().includes(search.trim().toLowerCase()) ||
        row.kode_booking?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.nama?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.tgl_cek_in?.toLowerCase().includes(search.trim().toLowerCase())||
        row.tgl_cek_out?.toLowerCase().includes(search.trim().toLowerCase())||
        row.status_reservasi?.toLowerCase().includes(search.trim().toLowerCase())
      });
      setFilteredData(filteredData);
    }, [riwayatRess, search]);

    const notaLunas = async(id) => {

      try{
          const response = await fetch('http://127.0.0.1:8000/api/nota-lunas/'+id, {
              method: 'POST',
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  Accept: 'application/pdf'
              },
              responseType: 'blob'
          })
          
          console.log(response)
          const blob = await response.blob()
          console.log(blob)
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = 'NotaLunas.pdf'
          document.body.appendChild(link)
          link.click()
          window.URL.revokeObjectURL(url)
      }
      catch(error){
        console.log(error)
      }

    }
  

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="" style={navbarStyle}>
        <Container>
        <Navbar.Brand href="/dashboardFO">RESEPSIONIS</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
              <Nav.Link href="/dashboardReservasiFO">Reservasi</Nav.Link>
              <Nav.Link href="/dashboardKamarFO">DAFTAR KAMAR </Nav.Link>
              {/* <Nav.Link href="/dashboardHarga">HARGA</Nav.Link>
              <Nav.Link href="/dashboardReservasiSM">RESERVASI CUSTUMER</Nav.Link>
              <Nav.Link href="/dashboardCustumerSM">CUSTUMER</Nav.Link> */}
              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Card className='mt-4 mx-4' >
      <Card.Header style={{ backgroundColor: 'green', color: 'white' }}>Riwayat Reservasi</Card.Header>
      <Card.Body className=''>
      <Form className="d-flex align-items-end justify-content-end pb-2">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{width:'200px'}}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-success">Search</Button>
      </Form>
      <Table striped bordered hover style={tableStyle}>
      <thead>
        <tr>
          <th>Id Booking</th>
          <th>Nama Custumer</th>
          <th>Tanggal Booking</th>
          <th>Cek In</th>
          <th>Cek Out</th>
          <th>Status</th>
          <th>Detail</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
           filteredData.map((data, index) =>{
            return (
              <tr key={index}>
                <td>{data.kode_booking}</td>
                <td>{data.nama}</td>
                <td>{data.tgl_reservasi}</td>
                <td>{data.tgl_cek_in}</td>
                <td>{data.tgl_cek_out}</td>
                <td>{data.status_reservasi}</td>
                <td>
                <Button className="2" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} onClick={() => passId(data.id)}>
                    Detail Reservasi
                </Button>
                </td>
                <td>
                    <div className="m-2">
                    <Button
                        className=""
                        style={{ backgroundColor: 'gold', borderColor: 'gold', color: 'black'}}
                        onClick={() => chekin(data.id)}
                        disabled={data.status_reservasi !== 'Sudah Membayar Uang Jaminan'}
                      >
                        Checkin
                      </Button>
                    </div>
                </td>
                <td> 
                    <div className="m-2">
                        <Button
                            className=""
                            style={{ flex: 1, backgroundColor: 'red', borderColor: 'red', color: 'white' }}
                            onClick={() => checkout(data.id)}
                            disabled={data.status_reservasi !== 'Sudah ChekIN'}
                        >
                            Checkout
                        </Button>
                    </div>

                </td>
                <td>

                <Button 
                 className="m-2"
                 style={{ backgroundColor: '#2196F3', borderColor: '#2196F3', color: 'white' }}
                 onClick={() => passIdF(data.id)}
                 disabled={data.status_reservasi !== 'Sudah ChekIN'}
               >
                    Fasilitas
                </Button>
                </td>
                <td>

                <Button className="m-2" style={{ backgroundColor: '#9C27B0', borderColor: '#9C27B0', color: 'white' }} 
                onClick={() => notaLunas(data.id)}
                disabled={data.status_reservasi !== 'Sudah CheckOut'}>
                  Cetak Bukti Reservasi
              </Button>
                </td>
              </tr>

            )
          })
        }
        
      </tbody>
    </Table>
  
    </Card.Body>
    </Card>
      
    <Modal show={showKamar} onHide={() => setShowKamar(false)}>
  <Modal.Header closeButton>
    <Modal.Title>PILIH Fasilitas</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <Card style={{ backgroundColor: '#4caf50'}}>
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
        
            
            
            
        </Card>
  </Modal.Body>
  <Modal.Footer>
    <Button className="mt-3" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} variant="primary" onClick={reservasi}>
      Pesan Fasilitas
    </Button>
  </Modal.Footer>
</Modal>

<Modal show={showKamarBook} onHide={() => setShowKamarBook(false)}>
  <Modal.Header closeButton>
    <Modal.Title>PILIH Kamar</Modal.Title>
  </Modal.Header>
  <Modal.Body>
          {riwayatKamarReady.map((data, index) => (
    <Card className='my-3 container' key={index} style={{ backgroundColor: '#4caf50'}}>
      <CardBody className='row align-items-center'>
          <Form.Check className='col-1'
            type={'checkbox'}
            onChange={() => handleCheckboxChange(data.id)}
            checked={selectedKamar.includes(data.id)}
            />
          <div className='col-11'>
            <p>Nomor Kamar : {data.id}</p>
            <p>Nama Tipe: {data.nama_tipe}</p>
            <p>Status Ketersediaan Kamar: {data.status_ketersedian_kamar}</p>

          </div>
      </CardBody>
    </Card>
          ))}
  </Modal.Body>
  <Modal.Footer>
    <Button className="mt-3" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} variant="primary" onClick={()=>reservasiKamar()}>
      Pesan Kamar
    </Button>
  </Modal.Footer>
</Modal>

      <DetailFO
        id={idReservasi}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

    <TotalPembayranCheckOut
        id={idReservasiCO}
        show={modalShowCheckOut}
        onHide={() => setModalShowChekOUt(false)}
      />

      <ToastContainer />
    </>
  );
}


export default DasboardReservasiFO;
