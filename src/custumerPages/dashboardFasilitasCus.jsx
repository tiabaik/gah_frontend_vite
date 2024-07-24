import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useState, useEffect} from 'react';
import { Card, Table, Form} from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';




function DashboardFasilitasCus() {
  


  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch]=useState('')

  const navbarStyle = {
    backgroundColor: '#b0e57c', 
  };
  const tableStyle = {
    textAlign:'center'};




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
        <Navbar.Brand href="/dashboardKamarCus">CUSTUMER</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
              <Nav.Link href="/dashboardReservasiCus">RESERVASI</Nav.Link>
              <Nav.Link href="/dashboardFasilitasCus">FASILITAS</Nav.Link>
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
          <th>Nama  Fasilitas</th>
          <th>Harga Fasilitas</th>
        </tr>
      </thead>
      <tbody>
        {
          filteredData.map((data, index) =>{
            return (
              <tr key={index}>
                <td>{data.nama_fasilitas}</td>
                <td>{data.harga_fasilitas}</td>
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

export default DashboardFasilitasCus;
