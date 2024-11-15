import './App.css';
import {
  BrowserRouter as Router,
  Routes, // Switch,
  Route,
  // Link,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useEffect, useState } from 'react';


function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

 /* const [backendStatus, setBackendStatus] = useState('Checking...');

  const checkBackendStatus = async () => {
    const url = process.env.REACT_APP_BACKEND_HOSTING_DOMAIN;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json = await response.json();
      // console.log(json);
      if (json.status) {
        setBackendStatus('Backend is live: ' + json.message);
      } else {
        setBackendStatus('Backend is not running');
      }
    } catch (error) {
      setBackendStatus('Backend is not running');
    }
  };

  useEffect(() => {
    checkBackendStatus();
  }, []);
*/




// const [backendStatus, setBackendStatus] = useState('Checking...');

// const checkBackendStatus = async () => {
//   const url = 'https://e-notebook-fu9z.onrender.com'; // Update this to your backend URL
//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//     const json = await response.json();
//     console.log('Backend response:', json); // Log the full response to debug
//     if (json.status === true) { // Ensure 'true' is strictly checked
//       setBackendStatus('Backend is live: ' + json.message);
//     } else {
//       setBackendStatus('Backend is not running');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     setBackendStatus('Backend is not running');
//   }
// };

// useEffect(() => {
//   checkBackendStatus();
// }, []);




























/////////////
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alertMsg={alert} />
          <div className='container'>
            <Routes>{/* <Switch> */}
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>{/* </Switch> */}
          </div>
          {/* <div className="container text-muted my-5"><div className="container">{backendStatus}</div></div> */}
        </Router>
      </NoteState>
    </>
  );
}

export default App;
