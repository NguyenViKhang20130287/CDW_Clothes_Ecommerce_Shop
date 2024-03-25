import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomeScreen from "./pages/User/HomeScreen/HomeScreen";
import LoginScreen from "./pages/User/LoginScreen/LoginScreen";
import RegisterScreen from './pages/User/RegisterScreen/RegisterScreen'
import RegisterConfirmScreen from './pages/User/RegisterConfirmScreen/RegisterConfirmScreen'
import ForgotPasswordScreen from "./pages/User/ForgotPassword/ForgotPasswordScreen";
import ForgotPasswordConfirm from "./pages/User/ForgotPasswordConfirm/ForgotPasswordConfirm";
import ProductDetailScreen from "./pages/User/ProductDetailScreen/ProductDetailScreen";
import ExchangeScreen from "./pages/User/ExchangeScreen/ExchangeScreen";
import CartScreen from "./pages/User/CartScreen/CartScreen";
import CollectionScreen from "./pages/User/CollectionsScreen/CollectionScreen";
import AccountDetail from "./pages/User/AccountDetailScreen/AccountDetail";
import OrderScreen from "./pages/User/OrderScreen/OrderScreen";
import SizeSelectorScreen from "./pages/User/SizeSelectorScreen/SizeSelectorScreen";
import OrderTrackingScreen from "./pages/User/OrderTrackingScreen/OrderTrackingScreen";
// admin
import AdminMainScreen from "./pages/Admin/MainScreen/AdminMainScreen";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<HomeScreen/>}/>
            <Route path={'/login'} element={<LoginScreen/>}/>
            <Route path={'/product-detail'} element={<ProductDetailScreen/>}/>
            <Route path={'/register'} element={<RegisterScreen/>}/>
            <Route path={'/register-confirm'} element={<RegisterConfirmScreen/>}/>
            <Route path={'/forgot-password'} element={<ForgotPasswordScreen/>}/>
            <Route path={'/forgot-password-confirm'} element={<ForgotPasswordConfirm/>}/>
            <Route path={'/exchange'} element={<ExchangeScreen/>}/>
            <Route path={'/cart'} element={<CartScreen/>}/>
            <Route path={'/order'} element={<OrderScreen/>}/>
            <Route path={'/categories'} element={<CollectionScreen/>}/>
            <Route path={'/account-detail'} element={<AccountDetail/>}/>
            <Route path={'/size-selector'} element={<SizeSelectorScreen/>}/>
            <Route path={'/order-tracking'} element={<OrderTrackingScreen/>}/>
            {/*  Admin  */}
            <Route path={'/admin'} element={<AdminMainScreen/>}/>
            <Route path={'/order-tracking'} element={<OrderTrackingScreen/>}/>
        </Routes>
    );
}

export default App;
