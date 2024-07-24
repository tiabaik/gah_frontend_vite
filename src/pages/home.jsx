
import {  Button, Card, Carousel, Container, Nav, Navbar } from 'react-bootstrap';
import Hotel2 from "../assets/ballR.jpg"
import Hotel3 from "../assets/ruangH.jpg"
import Hotel4 from "../assets/spaRoom.jpg"
import Hotel5 from "../assets/cafH.jpg"
import Hotel6 from "../assets/kolamR.jpg"
import KamarSR from "../assets/kamarSR.jpg"
import KamarD from "../assets/kamarD.jpg"
import KamarE from "../assets/kamarE.jpg"
import KamarJS from "../assets/kamarJS.jpg"
import { useState } from 'react';
import DetailHomeKmSH from '../component/componentKamar/detailHomeKmSH';
import DetailHomeKmDLH from '../component/componentKamar/detailHotelkmDLH';
import DetailHomeKmEH from '../component/componentKamar/detailHotelkmEH';
import DetailHomeKmJSH from '../component/componentKamar/detailHotelkmJSH';

function Home() {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDL, setModalShowDL] = useState(false);
  const [modalShowE, setModalShowE] = useState(false);
  const [modalShowJS, setModalShowJS] = useState(false);
  const [idKMs, setId] = useState('');
  const [idKMDL, setIdDL] = useState('');
  const [idKME, setIdE] = useState('');
  const [idKMJS, setIdJS] = useState('');

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
  
  return (
    <>
       <Navbar style={{ background: '#b0e57c', fontFamily: 'YourCustomFont', zIndex: 1 }} variant="dark" >
        <Container>
          <Navbar.Brand href="/">Grand Atma Hotel</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/login" style={{ color: 'grey' }}>
              Login
            </Nav.Link>
            <Nav.Link href="/register" style={{ color: 'grey' }}>
              Register
            </Nav.Link>
          </Nav> 
        </Container>
    </Navbar>
    <Carousel className='mt-4 h-10'>
    <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height: '500px', background: 'cover'}}
          src={Hotel2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Resepsionis Hotel</h3>
          <p>Deskripsi slide kedua</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height: '500px', background: 'cover'}}
          src={Hotel3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Lorong Hotel</h3>
          <p>Deskripsi slide ketiga</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Hotel4}
          style={{height: '500px', background: 'cover'}}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>SPA Room</h3>
          <p>Deskripsi slide ketiga</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Hotel5}
          style={{height: '500px'}}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Roof Top</h3>
          <p>Deskripsi slide ketiga</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Hotel6}
          style={{height: '500px', background: 'cover'}}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Kolam Renang </h3>
          <p>Deskripsi slide ketiga</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

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

    
    </>
  
   
  );
}

export default Home;
