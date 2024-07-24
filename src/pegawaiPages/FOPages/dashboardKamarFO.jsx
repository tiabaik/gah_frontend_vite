import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useState, useEffect} from 'react';
import { Card, Table, Form} from 'react-bootstrap';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';

function DasboardKamarFO() {
  const navbarStyle = {
    backgroundColor: '#b0e57c', 
  };

  const tableStyle = {
    textAlign:'center'};

  




    const [riwayatKamar, setRiwayatKamar] = useState([])

    const readData = () => {
    
      axios.get('/kamar-available',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(response => {
            setRiwayatKamar(response.data.data)
  
          })
          .catch(error => {
              console.log(error)
          });
    };
  
    useEffect(()=>{
      readData()
    },[])

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
            <Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Card className='mt-4 mx-4' >
      <Card.Header style={{ backgroundColor: 'green', color: 'white' }}>DAFTAR KAMAR</Card.Header>
      <Card.Body className=''>
      <Form className="d-flex align-items-end justify-content-between pb-2">
      <div className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{width:'200px'}}
            />
            <Button variant="outline-success">Search</Button>
      </div>
      </Form>
      <Table striped bordered hover style={tableStyle}>
      <thead>
        <tr>
          <th>Nomor Kamar</th>
          <th>Jenis Kamar</th>
          <th>Status Kamar</th>
        </tr>
      </thead>
      <tbody>
        {
          riwayatKamar.map((data, index) =>{
            return (
              <tr key={index}>
                <td>{data.id}</td>
                <td>{data.nama_tipe}</td>
                <td>{data.status_ketersedian_kamar}</td>
              </tr>

            )
          })
        }
        
      </tbody>
    </Table>
  
    </Card.Body>
    </Card>
      

<ToastContainer />
      
    </>
  );
}

export default DasboardKamarFO;
