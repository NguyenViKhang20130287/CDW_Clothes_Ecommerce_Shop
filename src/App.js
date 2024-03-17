import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import LoginScreen from "./pages/LoginScreen/LoginScreen";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<HomeScreen/>}/>
            <Route path={'/login'} element={<LoginScreen/>}/>
        </Routes>
    );
}

export default App;
