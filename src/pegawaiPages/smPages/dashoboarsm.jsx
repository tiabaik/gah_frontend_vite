import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {FiUser} from 'react-icons/fi';
import {FiLogOut} from 'react-icons/fi';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState} from 'react';
import KamarSR from "../../assets/kamarSR.jpg"
import KamarD from "../../assets/kamarD.jpg"
import KamarE from "../../assets/kamarE.jpg"
import KamarJS from "../../assets/kamarJS.jpg"
import 'react-toastify/dist/ReactToastify.css';
import DetailHomeKmSH from '../../component/componentKamar/detailHomeKmSH';
import DetailHomeKmDLH from '../../component/componentKamar/detailHotelkmDLH';
import DetailHomeKmEH from '../../component/componentKamar/detailHotelkmEH';
import DetailHomeKmJSH from '../../component/componentKamar/detailHotelkmJSH';
import { Card } from 'react-bootstrap';
import DetailRoomCheckSM from '../../component/detailRoomCheckSM';

function DashboardSM() {
  const [show, setShow] = useState(false);
 
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDL, setModalShowDL] = useState(false);
  const [modalShowE, setModalShowE] = useState(false);
  const [modalShowJS, setModalShowJS] = useState(false);
  const [idKMs, setId] = useState('');
  const [idKMDL, setIdDL] = useState('');
  const [idKME, setIdE] = useState('');
  const [idKMJS, setIdJS] = useState('');
  const [modalShowB, setModalShowB] = useState(false);
  const [idRCS, setIdRCS] = useState('');

  
const passIdB = (idRCS) => {
    setIdRCS (idRCS)
    setModalShowB(true)
  }

  const passId = (idKMs) => {
    setId(idKMs)
    setModalShow(true)
  }

  const passIdDL= (idKMDL) => {
    setIdDL(idKMDL)
    setModalShowDL(true)
  }
  const passIdE = (idKME) => {
    setIdE(idKME)
    setModalShowE(true)
  }
  const passIdJS = (idKMJS) => {
    setIdJS(idKMJS)
    setModalShowJS(true)
  }

  const navbarStyle = {
    backgroundColor: '#b0e57c', 
  };
  


  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '/';
  }

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
      <Button className="" style={{ backgroundColor: '#4caf50',borderColor: '#4caf50',
                  color: 'white', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  padding: '10px 20px', 
                  margin: '10px',
                  borderRadius: '5px',
                  top: '0',
                  right: '0', }} 
                 onClick={() => passIdB(idRCS)}>
                    Booking Kamar
        </Button>
      <Container className="d-flex justify-content-center mt-4">

    <div style={{ display: 'flex' }} className='mt-4'>
        <Card style={{ width: '18rem', marginRight: '20px' }} className='m-6'>
          <Card.Img variant="top" src={KamarSR} />
          <Card.Body>
            <Card.Title>SUPERIOR ROOM</Card.Title>
            <Card.Text>
              Kamar Superior adalah pilihan akomodasi yang lebih nyaman dan mewah.
              kamar Superior menawarkan fasilitas tambahan yang menarik,
              Kamar Superior cenderung lebih sederhana dan lebih terjangkau daripada Kamar lainnya
              Para tamu dapat menikmati kenyamanan ekstra dan pengalaman menginap yang lebih istimewa. Dengan kenyamanan dan fasilitas unggul,
            </Card.Text>
            <Button className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} onClick={() => passId(idKMs)}>
              Detail Kamar
            </Button>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem', marginRight: '20px'  }} className='m-6'>
          <Card.Img variant="top" src={KamarD} />
          <Card.Body>
          <Card.Title>DOUBLE DELUXE ROOM </Card.Title>
            <Card.Text>
              Kamar Double Deluxe adalah pilihan akomodasi yang lebih nyaman dan mewah.
              Perbedaan utama antara Kamar Double Deluxe dan kamar Superior adalah ukuran, fasilitas tambahan, dan tingkat kenyamanan yang lebih tinggi yang ditawarkan oleh Kamar Double Deluxe
              Para tamu dapat menikmati kenyamanan ekstra dan pengalaman menginap yang lebih istimewa. Dengan kenyamanan dan fasilitas unggul,
            </Card.Text>
            <Button className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} onClick={() => passIdDL(idKMDL)}>
              Detail Kamar
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' , marginRight: '20px' }} className='m-6'>
          <Card.Img variant="top" src={KamarE} />
          <Card.Body>
          <Card.Title>KAMAR EXECUTIVE  </Card.Title>
            <Card.Text>
              Kamar Executive adalah pilihan akomodasi yang lebih nyaman dan mewah.
              Kamar Executive adalah salah satu tipe kamar hotel yang umumnya menawarkan fasilitas dan kenyamanan yang lebih tinggi daripada kamar Double Deluxe dan kamar Superior., fasilitas tambahan, dan tingkat kenyamanan yang lebih tinggi yang ditawarkan oleh Kamar Executive
              Para tamu dapat menikmati kenyamanan ekstra dan pengalaman menginap yang lebih istimewa. Dengan kenyamanan dan fasilitas unggul,
            </Card.Text>
            <Button className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} onClick={() => passIdE(idKME)}>
              Detail Kamar
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className='m-8'>
          <Card.Img variant="top" src={KamarJS} />
          <Card.Body>
          <Card.Title>KAMAR JUNIOR SUITE  </Card.Title>
            <Card.Text>
              Kamar Double Deluxe adalah pilihan akomodasi yang lebih nyaman dan mewah.
              Kamar Junior Suite adalah salah satu jenis kamar hotel yang menawarkan kenyamanan dan fasilitas yang lebih besar daripada Kamar Superior dan mungkin sebanding dengan Kamar Double Deluxe, fasilitas tambahan, dan tingkat kenyamanan yang lebih tinggi yang ditawarkan oleh Kamar Junior Suite
              Para tamu dapat menikmati kenyamanan ekstra dan pengalaman menginap yang lebih istimewa. Dengan kenyamanan dan fasilitas unggul,
            </Card.Text>
            <Button className="" style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }} onClick={() => passIdJS(idKMJS)}>
              Detail Kamar
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Container>

    <DetailHomeKmSH
          id='1'
          show={modalShow}
          onHide={() => setModalShow(false)} />

        <DetailHomeKmDLH
          id='2'
          show={modalShowDL}
          onHide={() => setModalShowDL(false)} />

        <DetailHomeKmEH
          id='3'
          show={modalShowE}
          onHide={() => setModalShowE(false)} />

        <DetailHomeKmJSH
          id='4'
          show={modalShowJS}
          onHide={() => setModalShowJS(false)} />

        <DetailRoomCheckSM
          id = {idRCS}
          show = {modalShowB}
          onHide={() => setModalShowB(false)} />
  
    </>
  );
}

export default DashboardSM;
