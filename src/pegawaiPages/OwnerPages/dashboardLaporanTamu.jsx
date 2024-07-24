import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ProfilePicture from "../../assets/GAH Logo.jpg"

import { useState, useEffect} from 'react';
import { Button, Card, CardImg, Form, Table} from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer} from 'react-toastify';
import { Chart } from 'chart.js/auto';


function DasboardLaporanTamu() {


  const [filteredData, setFilteredData] = useState([]);
  const [search]=useState('')
  const [tahun, settahun] = useState('2023')
  const [bulan, setbulan] = useState('November')
  let nomor = 1
  const subtotalF = filteredData.reduce((acc, data) => acc + parseInt(data.total_kamar_all), 0);
 
 

  
  const navbarStyle = {
    backgroundColor: '#b0e57c', 
  };
 
  const tableStyle = {
    textAlign:'center'};

 
    const [laporanCus, setLaporanCus] = useState([])

    const readData = () => {
      const dataTahun = {
     
        tahun:tahun,
        bulan:bulan,
      
         }
    
      axios.post('/laporan-tamu',dataTahun,{
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
          const response = await fetch('http://127.0.0.1:8000/api/laporan-pdftamu/', {
              method: 'POST',
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  Accept: 'application/pdf'
              },
              responseType: 'blob',
              body: new URLSearchParams({ tahun: tahun, bulan: bulan }),
          })
          
          console.log(response)
          const blob = await response.blob()
          console.log(blob)
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = 'Laporan-Tamu.pdf'
          document.body.appendChild(link)
          link.click()
          window.URL.revokeObjectURL(url)
      }
      catch(error){
        console.log(error)
      }

    }
    const createChartTamu = () => {
      const existingChart = Chart.getChart('chart-tamu');
      if (existingChart) {
        existingChart.destroy();
      }
      const ctx = document.getElementById('chart-tamu');
  
      // Extracting data from the response
      const nama_tipe = laporanCus.map(item => item.nama_tipe);
      const total_kamar_all = laporanCus.map(item => item.total_kamar_all);
      const total_kamar_grup= laporanCus.map(item => item.total_kamar_grup);
      const total_kamar_personal = laporanCus.map(item=> item.total_kamar_personal);
  
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: nama_tipe,
          datasets: [
            {
              label: 'Total',
              data: total_kamar_all,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Grup',
              data: total_kamar_grup,
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
              borderColor: 'rgb(255, 159, 64)',
              borderWidth: 1,
            },
            {
              label: 'Personal',
              data: total_kamar_personal,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
            },
            {
              label: 'Nama Tipe',
              data: nama_tipe,
              backgroundColor: 'rgba(0, 128, 255, 0.2)', 
              borderColor: 'rgb(0, 128, 255)', 
              borderWidth: 1,
          }
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1, // You can adjust the step size as needed
              },
            },
          },
        },
      });
    };

    useEffect(() => {
      createChartTamu();
  }, [laporanCus, tahun, bulan]);
   
  
    useEffect(()=>{
      readData()
    },[])

    useEffect(() => {
      const filteredData = laporanCus?.filter((row) => {
        return row.id?.toString().toLowerCase().includes(search.trim().toLowerCase()) ||
        row.nama_tipe?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.total_kamar_personal?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.total_kamar_all?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.total_kamar_grup?.toLowerCase().includes(search.trim().toLowerCase()) 
       
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
            LAPORAN JUMLAH TAMU
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
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{width:'200px'}}
              value={bulan} onChange={(e)=>setbulan(e.target.value)}
              
            />
            <Button variant="outline-success" onClick={()=>readData()}>Search</Button>
      </Form>
      <Table striped bordered hover style={tableStyle}>
      <thead>
        <tr>
          <th>No</th>
          <th>Jenis Kamar</th>
          <th>Grup</th>
          <th>Personal</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {
           filteredData.map((data, index) =>{
            return (
              <tr key={index}>
                <td>{nomor++}</td>
                <td>{data.nama_tipe}</td>
                <td>{data.total_kamar_grup}</td>
                <td>{data.total_kamar_personal}</td>
                <td>{data.total_kamar_all}</td>
              </tr>

            )
            
          })
          
        }
        
        
      </tbody>
        <tfoot>
              <tr>
                <td colSpan="4"></td>
                <td>{subtotalF}</td>
              </tr>
            </tfoot>

    </Table>
    <Button className="m-2" style={{ backgroundColor: '#2196F3', borderColor: '#2196F3', color: 'white' }}onClick={() => LaporanCus()}>
                    Cetak Laporan
    </Button>
    <canvas id="chart-tamu"></canvas>
  
    </Card.Body>
    </Card>
      
      <ToastContainer />
    </>
  );
}


export default DasboardLaporanTamu;
