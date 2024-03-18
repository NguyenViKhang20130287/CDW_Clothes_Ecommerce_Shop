import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import RegisterScreen from './pages/RegisterScreen/RegisterScreen'
import RegisterConfirmScreen from './pages/RegisterConfirmScreen/RegisterConfirmScreen'
import ForgotPasswordScreen from "./pages/ForgotPassword/ForgotPasswordScreen";
import ForgotPasswordConfirm from "./pages/ForgotPasswordConfirm/ForgotPasswordConfirm";
import ProductDetailScreen from "./pages/ProductDetailScreen/ProductDetailScreen";
import ExchangeScreen from "./pages/ExchangeScreen/ExchangeScreen";
import SizeSelectorScreen from "./pages/SizeSelectorScreen/SizeSelectorScreen";
import CartScreen from "./pages/CartScreen/CartScreen";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<HomeScreen/>}/>
            <Route path={'/login'} element={<LoginScreen/>}/>
            <Route path={'/detail'} element={<ProductDetailScreen/>}/>
            <Route path={'/register'} element={<RegisterScreen/>}/>
            <Route path={'/register-confirm'} element={<RegisterConfirmScreen/>}/>
            <Route path={'/forgot-password'} element={<ForgotPasswordScreen/>}/>
            <Route path={'/forgot-password-confirm'} element={<ForgotPasswordConfirm/>}/>
            <Route path={'/exchange'} element={<ExchangeScreen/>}/>
            <Route path={'/size-selector'} element={<SizeSelectorScreen/>}/>
            <Route path={'/cart'} element={<CartScreen/>}/>
        </Routes>
    );
}

export default App;
