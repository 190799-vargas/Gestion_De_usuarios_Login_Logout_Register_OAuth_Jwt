import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface User {
    id: string;
    name: string;
    email: string;
    provider: string;
    createdAt: string;
}

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
        const response = await axios.get('/users/all');
        setUsers(response.data.users);
        } catch (error) {
        console.error('Error fetching users:', error);
        } finally {
        setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });
    };

    return (
        <div style={{ paddingTop: '80px' }}>
        <div className="dashboard-header">
            <div className="container">
            <div className="row align-items-center">
                <div className="col-md-8">
                <h1 className="mb-2">
                    <i className="bi bi-speedometer2 me-3"></i>
                    Bienvenido de nuevo, {user?.name}!
                </h1>
                <p className="mb-0 opacity-75">
                    <i className="bi bi-calendar-event me-2"></i>
                    {user?.lastLogin ? `Último inicio de sesión: ${formatDate(user.lastLogin)}` : 'First time login'}
                </p>
                </div>
                <div className="col-md-4 text-md-end">
                <div className="d-flex align-items-center justify-content-md-end">
                    {user?.avatar ? (
                    <img 
                        src={user.avatar} 
                        alt="Avatar" 
                        className="rounded-circle me-3" 
                        width="60" 
                        height="60"
                    />
                    ) : (
                    <i className="bi bi-person-circle me-3" style={{ fontSize: '3rem' }}></i>
                    )}
                    <div>
                    <div className="badge bg-light text-dark">
                        <i className="bi bi-shield-check me-1"></i>
                        {user?.provider}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        <div className="container">
            <div className="row mb-4">
            <div className="col-md-4 mb-4">
                <div className="stat-card">
                <div className="stat-number">{users.length}</div>
                <h5 className="text-muted">Total de usuarios</h5>
                <i className="bi bi-people text-primary" style={{ fontSize: '2rem' }}></i>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="stat-card">
                <div className="stat-number">
                    {users.filter(u => u.provider === 'github').length}
                </div>
                <h5 className="text-muted">Usuarios de GitHub</h5>
                <i className="bi bi-github text-dark" style={{ fontSize: '2rem' }}></i>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="stat-card">
                <div className="stat-number">
                    {users.filter(u => u.provider === 'google').length}
                </div>
                <h5 className="text-muted">Usuarios de Google</h5>
                <i className="bi bi-google text-danger" style={{ fontSize: '2rem' }}></i>
                </div>
            </div>
            </div>

            <div className="row">
            <div className="col-12">
                <div className="card card-hover">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                    <i className="bi bi-people me-2"></i>
                    Recent Users
                    </h5>
                </div>
                <div className="card-body">
                    {loading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                    ) : (
                    <div className="table-responsive">
                        <table className="table table-hover">
                        <thead>
                            <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Proveedor</th>
                            <th>Unido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-person-circle me-2 text-primary"></i>
                                    {user.name}
                                </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                <span className={`badge ${
                                    user.provider === 'github' ? 'bg-dark' : 
                                    user.provider === 'google' ? 'bg-danger' : 'bg-primary'
                                }`}>
                                    <i className={`bi bi-${user.provider === 'github' ? 'github' : 
                                    user.provider === 'google' ? 'google' : 'person'} me-1`}></i>
                                    {user.provider}
                                </span>
                                </td>
                                <td>{formatDate(user.createdAt)}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    )}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;