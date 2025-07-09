import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
        await login(email, password);
        navigate('/dashboard');
        } catch (err: any) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="auth-container">
        <div className="auth-card fade-in">
            <div className="text-center mb-4">
            <i className="bi bi-box-arrow-in-right" style={{ fontSize: '3rem', color: '#667eea' }}></i>
            <h2 className="mt-3 mb-2">Bienvenido de nuevo</h2>
            <p className="text-muted">Sign in to your account</p>
            </div>

            {error && (
            <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
            </div>
            )}

            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>

            <button
                type="submit"
                className="btn btn-gradient w-100 mb-3"
                disabled={loading}
            >
                {loading ? (
                <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Iniciando sesión...
                </>
                ) : (
                <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Iniciar sesión
                </>
                )}
            </button>
            </form>

            <div className="text-center mb-3">
            <span className="text-muted">o continuar con</span>
            </div>

            <div className="d-grid gap-2">
            <a href="http://localhost:5000/api/auth/github" className="social-btn github-btn">
                <i className="bi bi-github"></i>
                Continuar con GitHub
            </a>
            <a href="http://localhost:5000/api/auth/google" className="social-btn google-btn">
                <i className="bi bi-google"></i>
                Continuar con Google
            </a>
            </div>

            <div className="text-center mt-4">
            <p className="text-muted">
                ¿No tienes una cuenta?{' '}
                <Link to="/register" className="text-primary text-decoration-none">
                Regístrate aquí
                </Link>
            </p>
            </div>
        </div>
        </div>
    );
};

export default Login;