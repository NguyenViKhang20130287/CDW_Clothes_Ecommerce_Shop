import './App.css';
import {Routes, Route} from 'react-router-dom'
import Router from "./router/Router";

function App() {
    return (
        <div>
            <Routes>
                <Route path='/*' element={<Router/>}></Route>
            </Routes>
        </div>

    );
}

export default App;
