import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
            <Link className="navbar-brand" to="/">
            <i className="bi bi-rocket-takeoff me-2"></i>
            FullStack App
            </Link>
            
            <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav"
                aria-label="Toggle navigation"
                title="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
                </li>
                
                {user ? (
                <>
                    <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        {user.avatar ? (
                        <img src={user.avatar} alt="Avatar" className="rounded-circle me-2" width="30" height="30" />
                        ) : (
                        <i className="bi bi-person-circle me-2"></i>
                        )}
                        {user.name}
                    </a>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/profile">
                        <i className="bi bi-person me-2"></i>Profile
                        </Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                        </button></li>
                    </ul>
                    </li>
                </>
                ) : (
                <>
                    <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link btn btn-gradient ms-2" to="/register">Register</Link>
                    </li>
                </>
                )}
            </ul>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;