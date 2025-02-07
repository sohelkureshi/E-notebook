import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import { useState } from 'react';

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  return token ? children : <Navigate to="/signup" />;
};

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alertMsg={alert} />
          <div className="container">
            <Routes>
              {/* Public Routes */}
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Signup showAlert={showAlert} />} />

              {/* Protected Route for the Notes page */}
              <Route path="/home" element={
                <PrivateRoute>
                  <Home showAlert={showAlert} />
                </PrivateRoute>
              } />
            </Routes>
          </div>
          <Footer />
        </Router>
      </NoteState>
    </>
  );
}

export default App;



// const [backendStatus, setBackendStatus] = useState('Checking...');

// const checkBackendStatus = async () => {
//   const url = 'http://localhost:5000'; // Update this to your backend URL
//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//     const json = await response.json();
//     // console.log(json);
//     if (json.status) {
//       setBackendStatus('Backend is live: ' + json.message);
//     } else {
//       setBackendStatus('Backend is not running');
//     }
//   } catch (error) {
//     setBackendStatus('Backend is not running');
//   }
// };

// useEffect(() => {
//   checkBackendStatus();
// }, []);



{/* <div className="container text-muted my-5"><div className="container">{backendStatus}</div></div> */}