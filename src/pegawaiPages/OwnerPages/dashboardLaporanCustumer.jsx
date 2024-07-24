import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ProfilePicture from "../../assets/GAH Logo.jpg"

import { useState, useEffect} from 'react';
import { Button, Card, CardImg, Form, Table} from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer} from 'react-toastify';


function DasboardLaporanCustumer() {


  const [filteredData, setFilteredData] = useState([]);
  const [search]=useState('')
  const [tahun, settahun] = useState('2023')
  let nomor = 1
  const subtotalF = filteredData.reduce((acc, data) => acc + data.jumlah_custumer_baru, 0);
 
 

  
  const navbarStyle = {
    backgroundColor: '#b0e57c', 
  };
 
  const tableStyle = {
    textAlign:'center'};

 
    const [laporanCus, setLaporanCus] = useState([])

    const readData = () => {
      const dataTahun = {
     
        tahun:tahun,
      
         }
    
      axios.post('/laporan-cusbaru',dataTahun,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(response => {
            setLaporanCus(response.data.data)
  
          })
          .catch(error => {
              console.log(error)
          });
    };

    const LaporanCus = async() => {

      try{
          const response = await fetch('http://127.0.0.1:8000/api/laporan-pdfcusbaru/', {
              method: 'POST',
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  Accept: 'application/pdf'
              },
              responseType: 'blob',
              body: new URLSearchParams({ tahun: tahun }),
          })
          
          console.log(response)
          const blob = await response.blob()
          console.log(blob)
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = 'Laporan-CustumerBaru.pdf'
          document.body.appendChild(link)
          link.click()
          window.URL.revokeObjectURL(url)
      }
      catch(error){
        console.log(error)
      }

    }

   
  
    useEffect(()=>{
      readData()
    },[])

    useEffect(() => {
      const filteredData = laporanCus?.filter((row) => {
        return row.id?.toString().toLowerCase().includes(search.trim().toLowerCase()) ||
        row.nama_bulan?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.jumlah_custumer_baru?.toLowerCase().includes(search.trim().toLowerCase()) 
       
      });
      setFilteredData(filteredData);
    }, [laporanCus, search]);

  

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
              {/* <Nav.Link href="/dashboardFasilitas">FASILITAS</Nav.Link>
              <Nav.Link href="/dashboardHarga">HARGA</Nav.Link>
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
      <Card.Header style={{ backgroundColor: 'green', color: 'white' }}>Laporan Custumer Baru</Card.Header>
      <Card.Body className=''>
      <CardImg
            src={ProfilePicture} // Update the path to your image
            alt="logo"
            className="mx-auto d-block"
          />
          <h6>Jl. P. Mangkubumi No.18, Yogyakarta 55233</h6>
          <hr style={{ marginTop: '40px', marginBottom: '10px' }} />
          <h5 style={{ textAlign: 'center', fontWeight: '900' }}>
            LAPORAN CUSTOMER BARU
          </h5>
          
          
          <Form className="d-flex align-items-end justify-content-end pb-2">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{width:'200px'}}
              value={tahun} onChange={(e)=>settahun(e.target.value)}
            />
            <Button variant="outline-success" onClick={()=>readData()}>Search</Button>
      </Form>
      <Table striped bordered hover style={tableStyle}>
      <thead>
        <tr>
          <th>No</th>
          <th>Bulan</th>
          <th>Jumlah Custumer</th>
        </tr>
      </thead>
      <tbody>
        {
           filteredData.map((data, index) =>{
            return (
              <tr key={index}>
                <td>{nomor++}</td>
                <td>{data.nama_bulan}</td>
                <td>{data.jumlah_custumer_baru}</td>
              </tr>

            )
            
          })
          
        }
        
        
      </tbody>
        <tfoot>
              <tr>
                <td colSpan="2"></td>
                <td>{subtotalF}</td>
              </tr>
            </tfoot>

    </Table>
    <Button className="m-2" style={{ backgroundColor: '#2196F3', borderColor: '#2196F3', color: 'white' }}onClick={() => LaporanCus()}>
                    Cetak Laporan
    </Button>
  
    </Card.Body>
    </Card>
      
      <ToastContainer />
    </>
  );
}


export default DasboardLaporanCustumer;
