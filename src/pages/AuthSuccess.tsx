import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthSuccess: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
        localStorage.setItem('token', token);
        // Reload to update auth context
        window.location.href = '/dashboard';
        } else {
        navigate('/login');
        }
    }, [searchParams, navigate]);

    return (
        <div className="auth-container">
        <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Cargando...</span>
            </div>
            <h3 className="mt-3">Autenticando...</h3>
            <p className="text-muted">Por favor, espere mientras completamos su inicio de sesión.</p>
        </div>
        </div>
    );
};

export default AuthSuccess;