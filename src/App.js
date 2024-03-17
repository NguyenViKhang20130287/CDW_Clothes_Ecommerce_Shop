import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import RegisterScreen from './pages/RegisterScreen/RegisterScreen'
import RegisterConfirmScreen from './pages/RegisterConfirmScreen/RegisterConfirmScreen'
import ForgotPasswordScreen from "./pages/ForgotPassword/ForgotPasswordScreen";
import ForgotPasswordConfirm from "./pages/ForgotPasswordConfirm/ForgotPasswordConfirm";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<HomeScreen/>}/>
            <Route path={'/login'} element={<LoginScreen/>}/>
            <Route path={'/register'} element={<RegisterScreen/>}/>
            <Route path={'/register-confirm'} element={<RegisterConfirmScreen/>}/>
            <Route path={'/forgot-password'} element={<ForgotPasswordScreen/>}/>
            <Route path={'/forgot-password-confirm'} element={<ForgotPasswordConfirm/>}/>
        </Routes>
    );
}

export default App;
