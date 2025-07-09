import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
        }

        try {
        await register(name, email, password);
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
            <i className="bi bi-person-plus" style={{ fontSize: '3rem', color: '#667eea' }}></i>
            <h2 className="mt-3 mb-2">Crear cuenta</h2>
            <p className="text-muted">¡Únete a nosotros hoy!</p>
            </div>

            {error && (
            <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
            </div>
            )}

            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre completo</label>
                <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label"> correo electrónico</label>
                <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>

            <div className="mb-3">
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

            <div className="mb-4">
                <label htmlFor="confirmPassword" className="form-label">Confirm Contraseña</label>
                <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Creando cuenta...
                </>
                ) : (
                <>
                    <i className="bi bi-person-plus me-2"></i>
                    Crear cuenta
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
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="text-primary text-decoration-none">
                Inicia sesión aquí
                </Link>
            </p>
            </div>
        </div>
        </div>
    );
};

export default Register;