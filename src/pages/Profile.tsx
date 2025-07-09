import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
        const response = await axios.put('/users/profile', { name, email });
        updateUser(response.data.user);
        setMessage('Profile updated successfully!');
        } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
        setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
        });
    };

    return (
        <div style={{ paddingTop: '80px' }}>
        <div className="dashboard-header">
            <div className="container">
            <div className="row align-items-center">
                <div className="col-md-8">
                <h1 className="mb-2">
                    <i className="bi bi-person me-3"></i>
                    Mi perfil
                </h1>
                <p className="mb-0 opacity-75">
                    Gestiona la configuración y preferencias de tu cuenta
                </p>
                </div>
                <div className="col-md-4 text-md-end">
                <div className="d-flex align-items-center justify-content-md-end">
                    {user?.avatar ? (
                    <img 
                        src={user.avatar} 
                        alt="Avatar" 
                        className="rounded-circle me-3" 
                        width="80" 
                        height="80"
                    />
                    ) : (
                    <i className="bi bi-person-circle me-3" style={{ fontSize: '4rem' }}></i>
                    )}
                </div>
                </div>
            </div>
            </div>
        </div>

        <div className="container">
            <div className="row">
            <div className="col-md-8">
                <div className="card card-hover">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                    <i className="bi bi-pencil me-2"></i>
                    Edit Profile
                    </h5>
                </div>
                <div className="card-body">
                    {message && (
                    <div className="alert alert-success" role="alert">
                        <i className="bi bi-check-circle me-2"></i>
                        {message}
                    </div>
                    )}

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

                    <div className="mb-4">
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

                    <button
                        type="submit"
                        className="btn btn-gradient"
                        disabled={loading}
                    >
                        {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Actualizando...
                        </>
                        ) : (
                        <>
                            <i className="bi bi-check me-2"></i>
                            Actualizar perfil
                        </>
                        )}
                    </button>
                    </form>
                </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card card-hover">
                <div className="card-header bg-info text-white">
                    <h5 className="mb-0">
                    <i className="bi bi-info-circle me-2"></i>
                    Información de la cuenta
                    </h5>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                    <strong>Proveedor:</strong>
                    <span className={`badge ms-2 ${
                        user?.provider === 'github' ? 'bg-dark' : 
                        user?.provider === 'google' ? 'bg-danger' : 'bg-primary'
                    }`}>
                        <i className={`bi bi-${user?.provider === 'github' ? 'github' : 
                        user?.provider === 'google' ? 'google' : 'person'} me-1`}></i>
                        {user?.provider}
                    </span>
                    </div>

                    <div className="mb-3">
                    <strong>Estado:</strong>
                    <span className={`badge ms-2 ${user?.isVerified ? 'bg-success' : 'bg-warning'}`}>
                        <i className={`bi bi-${user?.isVerified ? 'check-circle' : 'exclamation-circle'} me-1`}></i>
                        {user?.isVerified ? 'Verified' : 'Unverified'}
                    </span>
                    </div>

                    {user?.lastLogin && (
                    <div className="mb-3">
                        <strong>Último inicio de sesión:</strong>
                        <br />
                        <small className="text-muted">
                        {formatDate(user.lastLogin)}
                        </small>
                    </div>
                    )}

                    <div className="mb-3">
                    <strong>Miembro desde:</strong>
                    <br />
                    <small className="text-muted">
                        {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
                    </small>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;