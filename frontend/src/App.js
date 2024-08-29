import './App.css';
import {Routes, Route} from 'react-router-dom'
import Router from "./router/Router";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBOx1xerp9tlEy91W4fdbOFqsy5zF5HPxE",
    authDomain: "teelab-client-v1.firebaseapp.com",
    projectId: "teelab-client-v1",
    storageBucket: "teelab-client-v1.appspot.com",
    messagingSenderId: "590999568759",
    appId: "1:590999568759:web:c4ce036ac9c60c2c3b6172",
    measurementId: "G-ZXJKJ5JG1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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
