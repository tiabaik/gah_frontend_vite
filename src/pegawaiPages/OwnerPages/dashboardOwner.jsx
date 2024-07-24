import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {FiUser} from 'react-icons/fi';
import {FiLogOut} from 'react-icons/fi';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState} from 'react';

import 'react-toastify/dist/ReactToastify.css';

function DashboardOwner() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  

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
          <Navbar.Brand href="/dashboardOwner">OWNER</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/dashboardLaporanCusBaru">Laporan Custumer Baru</Nav.Link>
          <Nav.Link href="/dashboardLaporanPendapatanBulanan">Laporan Pendapatn Baru</Nav.Link>
          <Nav.Link href="/dashboardLaporanTamu">Laporan Jumlah Tamu</Nav.Link>
          <Nav.Link href="/dashboardLaporanTop5">Laporan TOP 5 Customer</Nav.Link>
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

      
    </>
  );
}

export default DashboardOwner;
