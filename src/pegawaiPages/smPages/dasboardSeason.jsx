import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect} from 'react';
import { Card, Table, Form} from 'react-bootstrap';
import axios from 'axios';
import DetailSeasonModal from '../../component/detailSeasonModal';
import { FaTrash} from 'react-icons/fa';
import {MdPlaylistAdd} from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import TambahSeasonModal from '../../component/tambahSeasonModal';

function DashboardSeason() {
  
  const [showDelete, setShowDelete] = useState(false);
  const [idSeason, setId] = useState('');

  
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch]=useState('')

  const navbarStyle = {
    backgroundColor: '#b0e57c', 
  };
  const [modalShow, setModalShow] = useState(false);
  const [modalTambahSShow, setModalTambahSShow] = useState(false);
  const tableStyle = {
    textAlign:'center'};


  const passId = (idSeasonP) => {
    setId(idSeasonP)
    setModalShow(true)
  }


  const refresh = () =>{
    window.location.reload(true)
  }

  const [readSeason, setReadSeason] = useState([])

  const readData = () => {
    const id = toast.loading('please wait...')
    
    axios.get('/season',{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
        .then(response => {
            console.log(response.data.data)
          setReadSeason(response.data.data)
          
          toast.update(id, {render: "Successfully get data Season", type: "success", isLoading:false, autoClose: 3000,})
        })
        .catch(error => {
          console.log(error)
          toast.update(id, {render: "Something went wrong", type: "error", isLoading:false})
        });
  };

  const deleteData = (idSeasonP) => {
    const id = toast.loading('please wait...')
    axios.delete('/season/'+idSeasonP,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      console.log(response.data.data)
    
    
    toast.update(id, {render: "Successfully delete data Season", type: "success", isLoading:false, autoClose: 3000,})
    setTimeout(()=>refresh(), 3000)
  })
  .catch(error => {
    console.log(error)
    if(error.response.status == 400){
      toast.update(id, {render: error.response.data.message, type: "error", isLoading:false, autoClose: 3000})

    }else{
      toast.update(id, {render: "Something went wrong", type: "error", isLoading:false, autoClose: 3000})

    }
  });
        
  };

  const deleteModal = (idSeasonP) => {
    setId(idSeasonP)
    handleShowDelete()
  }
  

  useEffect(() => {
    readData();
    console.log("test")
   }, []);
  
  useEffect(() => {
    const filteredData = readSeason?.filter((row) => {
      return row.id?.toString().toLowerCase().includes(search.trim().toLowerCase()) ||
        row.nama_season?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.tanggal_mulai?.toLowerCase().includes(search.trim().toLowerCase())||
        row.tanggal_selesai?.toLowerCase().includes(search.trim().toLowerCase())
    });
    setFilteredData(filteredData);
  }, [readSeason, search]);


  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="" style={navbarStyle}>
        <Container>
          <Navbar.Brand href="/dashboardsm">SALES MARKETING</Navbar.Brand>
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
      <Card.Header style={{ backgroundColor: 'green', color: 'white' }}>TAMPIL SEASON</Card.Header>
      <Card.Body className=''>
     <Form className="d-flex align-items-end justify-content-between pb-2">
        <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => setModalTambahSShow(true)} > <MdPlaylistAdd/> SEASON</Button>
      <div className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          style={{ width: '200px' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      <Button variant="outline-success">Search</Button>
      </div>
    </Form>
      <Table striped bordered hover style={tableStyle}>
      <thead>
        <tr>
          <th>ID Tipe Season</th>
          <th>Nama  Season</th>
          <th>Tanggal Mulai Season</th>
          <th>Tanggal Selesai Season</th>
          <th>Detail</th>
          <th> </th> 
        </tr>
      </thead>
      <tbody>
        {
          filteredData.map((data, index) =>{
            return (
              <tr key={index}>
                <td>{data.id}</td>
                <td>{data.nama_season}</td>
                <td>{data.tanggal_mulai}</td>
                <td>{data.tanggal_selesai}</td>
                <td>
                <Button className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} onClick={() => passId(data.id)}>
                    Detail Season
                </Button>
                </td>
                <td> <FaTrash onClick={() => deleteModal(data.id)} /> </td>
              </tr>

            )
          })
        }
        
      </tbody>
    </Table>
  
    </Card.Body>
    </Card>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Data Season</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you Sure to delete season?? </Modal.Body>
        <Modal.Footer>
          <Button className="mt-3"  variant="secondary" onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button  className="mt-3" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} variant="primary" onClick={()=>deleteData(idSeason)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <DetailSeasonModal
        id={idSeason}
        show={modalShow}
        onHide={() => setModalShow(false)}
        
      />

      <TambahSeasonModal
        show={modalTambahSShow}
        onHide={() => setModalTambahSShow(false)}
        
      />

        <ToastContainer />

      
    </>
  );
}

export default DashboardSeason;
