import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect} from 'react';
import { Card, Table, Form} from 'react-bootstrap';
import axios from 'axios';
import { FaTrash} from 'react-icons/fa';
import {MdPlaylistAdd} from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import DetailFasilitasModal from '../../component/detailFasilitasModal';
import TambahFasilitasModal from '../../component/tambahFasilitasModal';


function DashboardFasilitas() {
  
  const [showDelete, setShowDelete] = useState(false);
  const [idFasilitas, setId] = useState('');

  
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


  const passId = (idFasilitasP) => {
    setId(idFasilitasP)
    setModalShow(true)
  }


  const refresh = () =>{
    window.location.reload(true)
  }

  const [readFasilitas, setReadFasilitas] = useState([])

  const readData = () => {
    const id = toast.loading('please wait...')
    
    axios.get('/fasilitas',{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
        .then(response => {
            console.log(response.data.data)
          setReadFasilitas(response.data.data)
          
          toast.update(id, {render: "Successfully get data Fasilitas", type: "success", isLoading:false, autoClose: 3000,})
        })
        .catch(error => {
          console.log(error)
          toast.update(id, {render: "Something went wrong", type: "error", isLoading:false})
        });
  };

  const deleteData = (idFasilitasP) => {
    const id = toast.loading('please wait...')
    axios.delete('/fasilitas/'+idFasilitasP,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      console.log(response.data.data)
    
    
    toast.update(id, {render: "Successfully delete data Fasilitas", type: "success", isLoading:false, autoClose: 3000,})
    setTimeout(()=>refresh(), 3000)
  })
  .catch(error => {
    console.log(error)
    toast.update(id, {render: "Something went wrong", type: "error", isLoading:false})
  });
        
  };

  const deleteModal = (idFasilitasP) => {
    setId(idFasilitasP)
    handleShowDelete()
  }
  

  useEffect(() => {
    readData();
    console.log("test")
   }, []);
  
  useEffect(() => {
    const filteredData = readFasilitas?.filter((row) => {
      return row.id?.toString().toLowerCase().includes(search.trim().toLowerCase()) ||
        row.nama_fasilitas?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.harga_fasilitas?.toString().includes(search.trim())
    });

    setFilteredData(filteredData);
  }, [readFasilitas, search]);


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
      <Card.Header style={{ backgroundColor: 'green', color: 'white' }}>TAMPIL Fasilitas</Card.Header>
      <Card.Body className=''>
     <Form className="d-flex align-items-end justify-content-between pb-2">
        <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => setModalTambahSShow(true)} > <MdPlaylistAdd/> Fasilitas</Button>
      <div className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          style={{ width: '200px' }}
          value={search}s
          onChange={(e) => setSearch(e.target.value)}
        />
      <Button variant="outline-success">Search</Button>
      </div>
    </Form>
      <Table striped bordered hover style={tableStyle}>
      <thead>
        <tr>
          <th>ID Fasilitas</th>
          <th>Nama  Fasilitas</th>
          <th>Harga Fasilitas</th>
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
                <td>{data.nama_fasilitas}</td>
                <td>{data.harga_fasilitas}</td>
                <td>
                <Button className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} onClick={() => passId(data.id)}>
                    Detail Fasilitas
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
          <Modal.Title>Hapus Data Fasilitas</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you Sure to delete fasilitas?? </Modal.Body>
        <Modal.Footer>
          <Button className="mt-3"  variant="secondary" onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button  className="mt-3" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} variant="primary" onClick={()=>deleteData(idFasilitas)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <DetailFasilitasModal
        id={idFasilitas}
        show={modalShow}
        onHide={() => setModalShow(false)}
        
      />

      <TambahFasilitasModal
        show={modalTambahSShow}
        onHide={() => setModalTambahSShow(false)}
        
      />

        <ToastContainer />

      
    </>
  );
}

export default DashboardFasilitas;
