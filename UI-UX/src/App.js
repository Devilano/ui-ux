import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
}from 'react-router-dom'
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Navbar from './component/Navbar';

import Login from './pages/Loginpage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from './protected/AdminRoute';
import UserRoute from './protected/UserRoute';
import ProfileCard from './pages/Profilecard';
import Footer1 from './component/Footer1';
import AdminPropertyDashboard from './pages/admin/AdminPropertyDashboard';
import Ranking from './pages/Ranking';
import ProgressPage from './pages/ProgressPage';
import VoteList from './pages/admin/VoteDashboard';
import AdminCreateProgress from './pages/admin/AdminCreateProgress';
import AnalysisBoard from './pages/AnalysisBoard';
import Forgetpassword from './pages/ForgetPassword';
import Typess from './pages/Types';
import City from './pages/city';
import Sell from './pages/Sell';
import RealEstate from './pages/RealState';
import Forsale from './pages/Forsale';
import Forrent from './pages/Forrent';
 
function App() {
  return (
    <Router>

      <Navbar/>
      <ToastContainer/>
      <Routes>

      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path ='/forgetPassword' element={<Forgetpassword/>}/>
      <Route path='/adminP' element={<AdminPropertyDashboard/>}/>

      

        {/* Admin Route */}
        <Route element ={<AdminRoute/>}>


        <Route path='/progressAD' element={<AdminCreateProgress/>}/>
        {/* <Route path ='/dashboard' element ={<Dashboard/>}/> */}
        </Route>

{/* User ROute */}
        <Route element ={<UserRoute/>}>
        <Route path ="/voteList" element={<VoteList/>}/>

        
        <Route path='/profile' element={<ProfileCard/>}></Route>
        <Route path ='/ranking' element={<Ranking/>}/>
        <Route path ='/progress' element={<ProgressPage/>}/>
        <Route path ="/profile" element ={<ProfileCard/>}></Route>
        <Route path ="/analysis" element ={<AnalysisBoard/>}></Route>
        <Route path='/home' element={<Homepage/>}/>
        <Route path ='/types' element={<Typess/>}/>
        <Route path ='/sell' element={<Sell/>}/>
        <Route path ='/city' element={<City/>}/>
        <Route path ='/forsale' element={<Forsale/>}/>
        <Route path ='/forrent' element={<Forrent/>}/>
        <Route path="/realstate" element={<RealEstate />} />

        </Route>




      </Routes>
      <Footer1/>
      


    </Router>

  
    
  );
}
export default App;
 