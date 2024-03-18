import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import ProductDetailScreen from "./pages/ProductDetailScreen/ProductDetailScreen";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<HomeScreen/>}/>
            <Route path={'/login'} element={<LoginScreen/>}/>
            <Route path={'/detail'} element={<ProductDetailScreen/>}/>
        </Routes>
    );
}

export default App;
