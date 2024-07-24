import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import DashboardCustumer from './custumerPages/dashboardCustumer';
import Profile from './custumerPages/profile';
import ProfileP from './pegawaiPages/profileP';
import EditProfile from './custumerPages/editProfile';
import EditProfileP from './pegawaiPages/editProfileP';
import UbahPassword from './custumerPages/ubahPassword';
import DashboardPegawai from './pegawaiPages/adminPages/dashboardPegawai';
import DashboardSM from './pegawaiPages/smPages/dashoboarsm';
import DashboardSeason from './pegawaiPages/smPages/dasboardSeason';
import DashboardFasilitas from './pegawaiPages/smPages/dasboardFasilitas';
import DashboardHarga from './pegawaiPages/smPages/dashboardHarga';
import DasboardReservasiSM from './pegawaiPages/smPages/dasboardReservasiSM';
import DasboardCustumerSM from './pegawaiPages/smPages/dasbaordCustumerSM';
import DashboardFO from './pegawaiPages/FOPages/dashboardFO';
import DashboardOwner from './pegawaiPages/OwnerPages/dashboardOwner';
import DashboardGM from './pegawaiPages/GMpages/dashboardGM';
import DashboardReservasiCus from './custumerPages/dashboardReservasiCus';
import DashboardKamarCus from './custumerPages/dashboardKamarCus';
import DashboardFasilitasCus from './custumerPages/dashboardFasilitasCus';
import DasboardReservasiFO from './pegawaiPages/FOPages/dasboardReservasiFO';
import DasboardKamarFO from './pegawaiPages/FOPages/dashboardKamarFO';
import DasboardLaporanCustumer from './pegawaiPages/OwnerPages/dashboardLaporanCustumer';
import DasboardLaporanPendapatanBulanan from './pegawaiPages/OwnerPages/dashboardLaporanPendapatanBulanan';
import DasboardLaporanTamu from './pegawaiPages/OwnerPages/dashboardLaporanTamu';
import DasboardLaporanTop5 from './pegawaiPages/OwnerPages/dashboardLaporanTop5';
import DasboardLaporanCustumer1 from './pegawaiPages/GMpages/dashboardLaporanCustumer1';
import DasboardLaporanPendapatanBulanan2 from './pegawaiPages/GMpages/dashboardLaporanPendapatanBulanan2';
import DasboardLaporanTamu3 from './pegawaiPages/GMpages/dashboardLaporanTamu3';
import DasboardLaporanTop54 from './pegawaiPages/GMpages/dashboardLaporanTop54';



function App() {
  return (
      <div>
          <Router>
            <Routes>
                <Route index element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                
                <Route path="/profile" element={<Profile />}/>
                <Route path="/editProfile" element={<EditProfile />}/>
                <Route path="/ubahPassword" element={<UbahPassword />}/>

                <Route path="/profileP" element={<ProfileP />}/>
                <Route path="/editProfileP" element={<EditProfileP />}/>

                <Route path="/dashboardPegawai" element={<DashboardPegawai />}/>

                <Route path="/dashboardsm" element={<DashboardSM />}/>
                <Route path="/dashboardSeason" element={<DashboardSeason />}/>
                <Route path="/dashboardFasilitas" element={<DashboardFasilitas/>}/>
                <Route path="/dashboardHarga" element={<DashboardHarga />}/>
                <Route path="/dashboardReservasiSM" element={<DasboardReservasiSM />}/>
                <Route path="/dashboardCustumerSM" element={<DasboardCustumerSM />}/>

                <Route path="/dashboardFO" element={<DashboardFO />} />
                <Route path="/dashboardReservasiFO" element={<DasboardReservasiFO />}/>
                <Route path="/dashboardKamarFO" element={<DasboardKamarFO />}/>

                <Route path="/dashboardOwner" element={<DashboardOwner />} />
                <Route path="/dashboardLaporanCusBaru" element={<DasboardLaporanCustumer />} />
                <Route path="/dashboardLaporanPendapatanBulanan" element={<DasboardLaporanPendapatanBulanan />} />
                <Route path="/dashboardLaporanTamu" element={<DasboardLaporanTamu />} />
                <Route path="/dashboardLaporanTop5" element={<DasboardLaporanTop5 />} />

                <Route path="/dashboardGM" element={<DashboardGM/>} />
                <Route path="/dashboardLaporanCusBaru1" element={<DasboardLaporanCustumer1 />} />
                <Route path="/dashboardLaporanPendapatanBulanan2" element={<DasboardLaporanPendapatanBulanan2 />} />
                <Route path="/dashboardLaporanTamu3" element={<DasboardLaporanTamu3 />} />
                <Route path="/dashboardLaporanTop54" element={<DasboardLaporanTop54 />} />

                <Route path="/dashboardCustumer" element={<DashboardCustumer />}/>
                <Route path="/dashboardReservasiCus" element={<DashboardReservasiCus />}/>
                <Route path="/dashboardKamarCus" element={<DashboardKamarCus />}/>
                <Route path="/dashboardFasilitasCus" element={<DashboardFasilitasCus />}/>


                

                

            </Routes>

          </Router>
      </div>
  );
}

export default App;