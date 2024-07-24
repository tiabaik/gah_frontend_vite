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
import DetailHargaModal from '../../component/detailHargaModal';
import TambahHargaModal from '../../component/tambahHargaModal';

function DashboardHarga() {
  
  const [showDelete, setShowDelete] = useState(false);
  const [idHarga, setId] = useState('');

  
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


  const passId = (idhargaP) => {
    setId(idhargaP)
    setModalShow(true)
  }


  const refresh = () =>{
    window.location.reload(true)
  }

  const [readHarga, setReadHarga] = useState([])

  const readData = () => {
    const id = toast.loading('please wait...')
    
    axios.get('/harga',{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
        .then(response => {
            console.log(response.data.data)
          setReadHarga(response.data.data)
          
          toast.update(id, {render: "Successfully get data Harga", type: "success", isLoading:false, autoClose: 1000,})
        })
        .catch(error => {
          console.log(error)
          toast.update(id, {render: "Something went wrong", type: "error", isLoading:false})
        });
  };

  const deleteData = (idHargaP) => {
    const id = toast.loading('please wait...')
    axios.delete('/harga/'+idHargaP,{
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
    toast.update(id, {render: "Something went wrong", type: "error", isLoading:false})
  });
        
  };

  const deleteModal = (idHargaP) => {
    setId(idHargaP)
    handleShowDelete()
  }
  

  useEffect(() => {
    readData();
    console.log("test")
   }, []);
  
  useEffect(() => {
    const filteredData = readHarga?.filter((row) => {
      return row.id?.toString().toLowerCase().includes(search.trim().toLowerCase()) ||
        row.nama_season?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.nama_tipe?.toLowerCase().includes(search.trim().toLowerCase())
    });
    setFilteredData(filteredData);
  }, [readHarga, search]);


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
      <Card.Header style={{ backgroundColor: 'green', color: 'white' }}>TAMPIL HARGA</Card.Header>
      <Card.Body className=''>
     <Form className="d-flex align-items-end justify-content-between pb-2">
        <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => setModalTambahSShow(true)} > <MdPlaylistAdd/> HARGA</Button>
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
          <th>ID Harga</th>
          <th>Nama Tipe Kamar</th>
          <th>Nama Season</th>
          <th>Harga</th>
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
                <td>{data.nama_tipe}</td>
                <td>{data.nama_season}</td>
                <td>{data.harga_akhir}</td>
                <td>
                <Button className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} onClick={() => passId(data.id)}>
                    Detail Harga
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
          <Button  className="mt-3" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} variant="primary" onClick={()=>deleteData(idHarga)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <DetailHargaModal
        id={idHarga}
        show={modalShow}
        onHide={() => setModalShow(false)}
        
      />

      <TambahHargaModal
        show={modalTambahSShow}
        onHide={() => setModalTambahSShow(false)}
        
      />

        <ToastContainer />

      
    </>
  );
}

export default DashboardHarga;
