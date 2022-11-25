import './App.css';
import AddNewAddress from './Components/AddNewAddress';
import SideBar from './Components/SideBar';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import WelComeUserName from './Components/WelComeUserName';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Support from './Components/Support';
import MyOrder from './Components/MyOrder';
import MyDetails from './Components/MyDetails';
import Shop from './Components/Shop';
import Inbox from './Components/Inbox';
import PatientManagment from './Components/PatientManagment';
import ResponsiveDrawer from './Components/Test';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isUserLoggedIn } from './Components/OrderStore/StoreAction';
import CheckoutSuccess from './Components/CheckoutSuccess';
function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state=>state.auth)

  useEffect(()=>{
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
    // if(auth.authenticate){
    //   navigate('/address')
    // }else{
    //   navigate('/')
    // }
    // if(!auth.authenticate){
    //   navigate('/')
    // }
  },[auth.authenticate])
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/address' element={<AddNewAddress />} />
        <Route path='/welcome' element={<WelComeUserName />} />
        <Route path='/my-order' element={<MyOrder />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/inbox' element={<Inbox />} />
        <Route path='/patient' element={<PatientManagment />} />
        <Route path='/support' element={<Support />} />
        <Route path='/my-details' element={<MyDetails />} />
        <Route path='/checkout-success' element={<CheckoutSuccess />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
