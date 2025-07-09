import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="hero-section">
        <div className="container">
            <div className="row align-items-center">
            <div className="col-lg-6">
                <div className="fade-in">
                <h1 className="hero-title">Bienvenido a FullStack App</h1>
                <p className="hero-subtitle">
                    Una aplicación web moderna construida con React, Bootstrap, Node.js y MySQL.
                    Experimenta una autenticación fluida con integración de JWT y OAuth.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                    {user ? (
                    <Link to="/dashboard" className="btn btn-gradient btn-lg">
                        <i className="bi bi-speedometer2 me-2"></i>
                        Ir al panel de control
                    </Link>
                    ) : (
                    <>
                        <Link to="/register" className="btn btn-gradient btn-lg">
                        <i className="bi bi-person-plus me-2"></i>
                        Comenzar
                        </Link>
                        <Link to="/login" className="btn btn-outline-light btn-lg">
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Iniciar sesión
                        </Link>
                    </>
                    )}
                </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="slide-up">
                <div className="text-center">
                    <i className="bi bi-laptop" style={{ fontSize: '15rem', opacity: 0.8 }}></i>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Home;