import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useState, useEffect} from 'react';
import { Card, Table, Form, Modal} from 'react-bootstrap';
import axios from 'axios';
import {FcCancel} from 'react-icons/fc';
import DetailModalSM from '../../component/detailModalSM';
import { ToastContainer, toast } from 'react-toastify';


function DasboardReservasiSM() {

  const [idreservasi, setIdR] = useState('')
  const [idReservasi, setId] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [status_reservasi] = useState('')
  const [search, setSearch]=useState('')
  
  const navbarStyle = {
    backgroundColor: '#b0e57c', 
  };
  const [modalShow, setModalShow] = useState(false);
  const tableStyle = {
    textAlign:'center'};

    const refresh = () =>{
      window.location.reload(true)
    }
    const cancelReservasi = (idreservasiC) => {
      const data = {
       status_reservasi:status_reservasi,
    
    
      }
      const id = toast.loading('please wait...')
      axios.put('/cancel-reservasi/'+idreservasiC,data,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log(response.data.data)
      toast.update(id, {render: "Successfully cancel reservasi", type: "success", isLoading:false, autoClose: 3000,})
      setTimeout(()=>refresh(), 3000)
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

    const handleShowCancel = () => setShowCancel(true);
    const handleCloseCancel = () => setShowCancel(false);
    const [showCancel, setShowCancel] = useState(false);
    const cancelModal = (idreservasi) => {
      setIdR(idreservasi)
      handleShowCancel()
    }
  
    useEffect(()=>{
      readData()
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

    const TandaReservasi = async(id) => {

      try{
          const response = await fetch('http://127.0.0.1:8000/api/tanda-reservasi/'+id, {
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
          link.download = 'Tanda-Reservasi.pdf'
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
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
              <Nav.Link href="/dashboardSeason">SEASON</Nav.Link>
              <Nav.Link href="/dashboardFasilitas">FASILITAS</Nav.Link>
              <Nav.Link href="/dashboardHarga">HARGA</Nav.Link>
              <Nav.Link href="/dashboardReservasiSM">RESERVASI CUSTUMER</Nav.Link>
              <Nav.Link href="/dashboardCustumerSM">CUSTUMER</Nav.Link>
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
                <Button className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} onClick={() => passId(data.id_reservasi)}>
                    Detail Reservasi
                </Button>

                <Button className="m-2" style={{ backgroundColor: '#2196F3', borderColor: '#2196F3', color: 'white' }}onClick={() => TandaReservasi(data.id_reservasi)}>
                    Cetak Bukti Reservasi
                </Button>
              </td>
              <td>
                  {(data.status_reservasi === 'Sudah ChekIN' || data.status_reservasi === 'Sudah CheckOut' || data.status_reservasi === 'Cancel Booking But Not Refund' || data.status_reservasi === 'cancel booking') ? (
                    <span>Tidak Bisa Cancel</span>
                  ) : (
                    <FcCancel onClick={() => cancelModal(data.id)} />
                  )}
                </td>
              </tr>

            )
          })
        }
        
      </tbody>
    </Table>
  
    </Card.Body>
    </Card>
      
    <Modal show={showCancel} onHide={handleCloseCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Reservasi Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you Sure to cancel Reservation?? </Modal.Body>
        <Modal.Footer>
          <Button className="mt-3"  variant="secondary" onClick={handleCloseCancel}>
            Cancel
          </Button>
          <Button  className="mt-3" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} variant="primary" onClick={()=>cancelReservasi(idreservasi)}>
            Cancel Reservation
          </Button>
        </Modal.Footer>
      </Modal>

      <DetailModalSM
        id={idReservasi}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ToastContainer />
    </>
  );
}


export default DasboardReservasiSM;
