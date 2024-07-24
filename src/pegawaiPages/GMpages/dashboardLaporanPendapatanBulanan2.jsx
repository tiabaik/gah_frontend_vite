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




function DasboardLaporanPendapatanBulanan2() {


  const [filteredData, setFilteredData] = useState([]);
  const [search]=useState('')
  const [tahun, settahun] = useState('2023')
  let nomor = 1
  const subtotalF = filteredData.reduce((acc, data) => acc + parseInt(data.total_semua_pendapatan), 0);
 


  
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
    
      axios.post('/laporan-pendapatanBulanan',dataTahun,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(response => {
            setLaporanCus(response.data.data.reverse())
  
          })
          .catch(error => {
              console.log(error)
          });
    };

    const LaporanCus = async() => {

      try{
          const response = await fetch('http://127.0.0.1:8000/api/laporan-pdfpendapatanBulanan/', {
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
          link.download = 'Laporan-PendapatanBulanan.pdf'
          document.body.appendChild(link)
          link.click()
          window.URL.revokeObjectURL(url)
      }
      catch(error){
        console.log(error)
      }

    }
    
    const createChartPendapatan = () => {
  const existingChart = Chart.getChart('chart-pendapatan');
  if (existingChart) {
    existingChart.destroy();
  }
  
      const ctx = document.getElementById('chart-pendapatan');
  
      // Extracting data from the response (replace with your actual response structure)
      const months = laporanCus.map(item => item.Bulan);
      const pendapatanPersonal = laporanCus.map(
        item =>
          parseInt(item.total_uang_jaminan_personal) +
          parseInt(item.pendapatan_personal)
      );
      const pendapatanGrup = laporanCus.map(
        item =>
          parseInt(item.total_uang_jaminan_grup) +
          parseInt(item.pendapatan_grup)
      );
      const totalPendapatan = laporanCus.map(item => item.total_semua_pendapatan);
  

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Pendapatan Personal',
            data: pendapatanPersonal,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
          },
          {
            label: 'Pendapatan Grup',
            data: pendapatanGrup,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgb(255, 159, 64)',
            borderWidth: 1,
          },
          {
            label: 'Total Pendapatan',
            data: totalPendapatan,
            backgroundColor: 'rgba(255, 205, 86, 0.2)',
            borderColor: 'rgb(255, 205, 86)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1000000, // You can adjust the step size as needed
            },
          },
        },
      },
    });
  };

  
  useEffect(() => {
      createChartPendapatan();
  }, [laporanCus, tahun]);

    useEffect(()=>{
      readData()
    },[])

    useEffect(() => {
      const filteredData = laporanCus?.filter((row) => {
        return row.id?.toString().toLowerCase().includes(search.trim().toLowerCase()) ||
        row.Bulan?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.total_semua_pendapatan?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.total_uang_jaminan_personal?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.total_uang_jaminan_grup?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.pendapatan_personal?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.pendapatan_grup?.toLowerCase().includes(search.trim().toLowerCase()) ||
        row.jumlah_custumer_baru?.toLowerCase().includes(search.trim().toLowerCase()) 
       
      });
      setFilteredData(filteredData);
    }, [laporanCus, search]);

  

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="" style={navbarStyle}>
        <Container>
        <Navbar.Brand href="dashboardGM">General Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
              <Nav.Link href="/dashboardLaporanCusBaru1">Laporan Custumer Baru</Nav.Link>
              <Nav.Link href="/dashboardLaporanPendapatanBulanan2">Laporan Pendapatn Baru</Nav.Link>
              <Nav.Link href="/dashboardLaporanTamu3">Laporan Jumlah Tamu</Nav.Link>
              <Nav.Link href="/dashboardLaporanTop54">Laporan TOP 5 Customer</Nav.Link>
              
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
            LAPORAN PENDAPATAN BULANAN
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
        <tr >
          <th>No</th>
          <th>Bulan</th>
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
                <td>{data.Bulan}</td>
                <td>{new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                }).format(parseInt(data.total_uang_jaminan_grup) + parseInt(data.pendapatan_grup))}</td>
                
                <td>{new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                }).format(parseInt(data.total_uang_jaminan_personal) + parseInt(data.pendapatan_personal))}</td>

                <td>{new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                }).format(data.total_semua_pendapatan)}</td>
              </tr>

            )
            
          })
          
        }
        
        
      </tbody>
        <tfoot>
              <tr>
                <td colSpan="4"></td>
                <td>{new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                }).format(subtotalF)}</td>
              </tr>
            </tfoot>

    </Table>
    <Button className="m-2" style={{ backgroundColor: '#2196F3', borderColor: '#2196F3', color: 'white' }}onClick={() => LaporanCus()}>
                    Cetak Laporan
    </Button>
    <canvas id="chart-pendapatan"></canvas>
  
    </Card.Body>
    </Card>
      
      <ToastContainer />
    </>
  );
}


export default DasboardLaporanPendapatanBulanan2;
