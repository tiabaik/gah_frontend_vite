import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {FiUser} from 'react-icons/fi';
import {FiLogOut} from 'react-icons/fi';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect} from 'react';
import { Card, Table, Form} from 'react-bootstrap';
import axios from 'axios';
import DetailKamarModal from '../../component/detailKamarModal';
import TambahKamarModal from '../../component/tambahKamarModal';
import { FaTrash} from 'react-icons/fa';
import {MdPlaylistAdd} from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function DashboardPegawai() {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [idKamar, setId] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch]=useState('')

  const navbarStyle = {
    backgroundColor: '#b0e57c', 
  };
  const [modalShow, setModalShow] = useState(false);
  const [modalTambahKShow, setModalTambahKShow] = useState(false);
  const tableStyle = {
    textAlign:'center'};


  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  const passId = (idKamarP) => {
    setId(idKamarP)
    setModalShow(true)
  }


  const refresh = () =>{
    window.location.reload(true)
  }

  const [readKamar, setReadKamar] = useState([])

  const readData = () => {
    const id = toast.loading('please wait...')
    
    axios.get('/kamar',{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
        .then(response => {
            console.log(response.data.data)
          setReadKamar(response.data.data)
          
          toast.update(id, {render: "Successfully get data kamar", type: "success", isLoading:false, autoClose: 3000,})
        })
        .catch(error => {
          console.log(error)
          toast.update(id, {render: "Something went wrong", type: "error", isLoading:false})
        });
  };

  const deleteData = (idKamarP) => {
    const id = toast.loading('please wait...')
    axios.delete('/kamar/'+idKamarP,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      console.log(response.data.data)
    
    
    toast.update(id, {render: "Successfully delete data kamar", type: "success", isLoading:false, autoClose: 3000,})
    setTimeout(()=>refresh(), 3000)
  })
  .catch(error => {
    console.log(error)
    toast.update(id, {render: "Something went wrong", type: "error", isLoading:false})
  });
        
  };

  const deleteModal = (idKamarP) => {
    setId(idKamarP)
    handleShowDelete()
  }
  

  useEffect(() => {
    readData();
    console.log("test")
   }, []);
  
  useEffect(() => {
    const filteredData = readKamar?.filter((row) => {
      return row.id?.toString().toLowerCase().includes(search.trim().toLowerCase()) ||
        row.nama_tipe?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.status_ketersedian_kamar?.toLowerCase().includes(search.trim().toLowerCase());
    });
    setFilteredData(filteredData);
  }, [readKamar, search]);


  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="" style={navbarStyle}>
        <Container>
          <Navbar.Brand href="#home">ADMIN</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
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
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="/profileP">
                <FiUser/>
              </Nav.Link>
              <Nav.Link onClick={handleShow}>
                <FiLogOut/>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Card className='mt-4 mx-4' >
      <Card.Header style={{ backgroundColor: 'green', color: 'white' }}>TAMPIL KAMAR</Card.Header>
      <Card.Body className=''>
     <Form className="d-flex align-items-end justify-content-between pb-2">
        <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => setModalTambahKShow(true)} > <MdPlaylistAdd/> Kamar</Button>
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
          <th>Nomor Kamar</th>
          <th>Tipe Kamar</th>
          <th>Harga Kamar</th>
          <th>Status Kamar</th>
          <th>Detail</th>
          <th> </th> 
        </tr>
      </thead>
      <tbody>
        {
          filteredData.map((data, index) =>{
            return (
              <tr key={index}>
                <td>{data.nomor_kamar}</td>
                <td>{data.nama_tipe}</td>
                <td>{data.harga_akhir}</td>
                <td>{data.status_ketersedian_kamar}</td>
                <td>
                <Button className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} onClick={() => passId(data.id)}>
                    Detail Kamar
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
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>LOG OUT</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, are you Sure to log out ?? </Modal.Body>
        <Modal.Footer>
          <Button className="mt-3"  variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button  className="mt-3" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} variant="primary" onClick={(e)=>logout(e)}>
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Data Kamar</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you Sure to delete room?? </Modal.Body>
        <Modal.Footer>
          <Button className="mt-3"  variant="secondary" onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button  className="mt-3" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} variant="primary" onClick={()=>deleteData(idKamar)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <DetailKamarModal
        id={idKamar}
        show={modalShow}
        onHide={() => setModalShow(false)}
        
      />

      <TambahKamarModal
        show={modalTambahKShow}
        onHide={() => setModalTambahKShow(false)}
        
      />

        <ToastContainer />

      
    </>
  );
}

export default DashboardPegawai;
