import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/navbar.css';

const Navbar = (props) => {
    let location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        props.showAlert("Logged out successfully", "Success");
    }

    return (
        <nav className="navbar navbar-expand sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link`} to="https://github.com/sohelkureshi/eNotebook" target='_blank'>View Source Code</Link>
                        </li>
                    </ul>
                    {(!localStorage.getItem('token')) ?
                        <form className="d-flex">
                            <Link to={'/login'} className="btn btn-primary mx-1" role='button'>Login</Link>
                            <Link to={'/signup'} className="btn btn-primary mx-1" role='button'>Sign up</Link>
                        </form> :
                        <form className="d-flex">
                            <button className="btn btn-primary mx-1" onClick={handleLogout}>Logout</button>
                        </form>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
