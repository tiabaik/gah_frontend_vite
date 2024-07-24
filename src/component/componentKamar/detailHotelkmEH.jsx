
import { Card } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import KamarE from "../../assets/kamarE.jpg";
import axios from 'axios';
import { useEffect, useState} from 'react';

function DetailHomeKmEH(props) {
  const [TipeKamar, setTipeKamar]=useState({})
  const detailTipeKamar = () => {
    console.log(props)
    axios.get('/tipeKamar/'+props.id,{
      headers:{ 
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      console.log(response.data)
      setTipeKamar(response.data.data)
    })
    .catch(error => {
      console.log(error)
    })
  }
  useEffect(() => {
    detailTipeKamar()
    
  },[props.id])
    
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>KAMAR EXCLUSIVE DELUXE</Modal.Title>
        </Modal.Header>
        <Card.Img variant="holder.js/17x18" src={KamarE} />
        <Modal.Body>
          <p>Kapasitas 2 Orang</p>
          <br></br>
            <p style={{ fontWeight: 'bold' }}>Pilihan tempat tidur </p>
            <p>1 double </p>
            <p>1 twin </p>
          <p>22 meter persegi </p>
          <br></br>
          <p>Internet - WiFi Gratis </p>
          <p>Hiburan - Televisi LCD dengan channel TV premium channels </p>
          <p>Makan Minum - Pembuat kopi/teh, minibar, layanan kamar 24-jam, air minum kemasan gratis, 
             termasuk sarapan</p>
        <p>Untuk tidur - Seprai kualitas premium dan gorden/tirai kedap cahaya</p>
        <p>Kamar Mandi - Kamar mandi pribadi dengan shower, jubah mandi, dan sandal </p>
        <p>Kemudahan - Brankas (muat laptop), Meja tulis, dan Telepon; tempat tidur lipat/tambahan tersedia 
           berdasarkan permintaan </p>
        <p>Kenyamanan - AC dan layanan pembenahan kamar harian 
          Merokok/Dilarang Merokok </p>
          <br></br>
        <p style={{ fontWeight: 'bold' }} >Rincian Kamar</p>
        <p>AC</p>
        <p>Air Minum Kemasan gratis</p>
        <p>Brankas dalam kamar (ukuran laptop) </p>
        <p>Fasilitas membuat kopi/teh </p>
        <p>Jubah Mandi</p>
        <p>Layanan Kamar (24 jam)</p>
        <p>Meja tulis </p>
        <p>Minibar </p>
        <p>Pembersihan kamar harian </p>
        <p> Pengering Rambut</p>
        <p>Peralatan Mandi Gratis</p>
        <p>Sendal</p>
        <p>Telepon</p>
        <p>Tempat tidur ekstra (biaya tambahan)</p>
        <p>Yempat tidur premium </p>
        <p>Tirai Kedap-cahaya</p>
        <p>Tv Kabel</p>
        <p>Tv LCD</p>
        <p>Wi-Fi Gratis</p>
        </Modal.Body>
            
        <Modal.Footer>
            <div className="col-sm fs-6" style={{ color: 'red', fontFamily: 'Times New Roman' }}>
              Harga Kamar : Rp.{TipeKamar.harga}
            </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DetailHomeKmEH;