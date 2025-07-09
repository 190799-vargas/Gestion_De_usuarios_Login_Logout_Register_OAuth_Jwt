# 🚀 Aplicación Web Full Stack

Una aplicación web moderna y completa construida con React, Bootstrap, Node.js, Express, Sequelize y MySQL. Incluye autenticación JWT con integración OAuth para GitHub y Google.

## ✨ Características

- **Frontend**: React 18 con TypeScript, Bootstrap 5, React Router
- **Backend**: Node.js con Express, autenticación JWT, integración OAuth
- **Base de Datos**: MySQL con Sequelize ORM
- **Autenticación**: Tokens JWT, OAuth de GitHub, OAuth de Google
- **Seguridad**: Helmet, CORS, limitación de velocidad, validación de entrada
- **Diseño**: UI moderna con Bootstrap 5, animaciones CSS personalizadas, diseño responsivo

## 🛠️ Stack Tecnológico

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)  
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Bootstrap Icons](https://img.shields.io/badge/Bootstrap_Icons-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)  
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)  
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)  
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

### Seguridad
![Helmet](https://img.shields.io/badge/Helmet-000000?style=for-the-badge&logo=helmet&logoColor=white)
![Rate Limiter](https://img.shields.io/badge/Rate_Limiter-000000?style=for-the-badge)  
![Validator](https://img.shields.io/badge/Validator-000000?style=for-the-badge&logo=validator&logoColor=white)

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd fullstack-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Copia `.env.example` a `.env` y configura tus valores:
```bash
cp .env.example .env
```

4. **Configurar base de datos MySQL**
```bash
mysql -u root -p
CREATE DATABASE fullstack_app;
```

5. **Ejecutar la aplicación**
```bash
npm run dev
```

## 🚀 Comandos Disponibles

- `npm run dev` - Ejecuta frontend y backend simultáneamente
- `npm run client` - Solo frontend (puerto 5173)
- `npm run server` - Solo backend (puerto 5000)
- `npm run build` - Build para producción
- `npm run lint` - Ejecutar linting

## 🔐 Configuración OAuth

### GitHub OAuth:
1. Ve a GitHub Settings > Developer settings > OAuth Apps
2. Crea una nueva OAuth App
3. URL de callback: `http://localhost:5000/api/auth/github/callback`

### Google OAuth:
1. Ve a Google Cloud Console
2. Crea credenciales OAuth 2.0
3. URI de redirección: `http://localhost:5000/api/auth/google/callback`

## 📁 Estructura del Proyecto

```
├── server/              # Backend (Node.js + Express)
│   ├── config/         # Configuración de DB y Passport
│   ├── middleware/     # Middlewares personalizados
│   ├── models/         # Modelos de Sequelize
│   ├── routes/         # Rutas de la API
│   └── index.js        # Punto de entrada del servidor
├── src/                # Frontend (React + TypeScript)
│   ├── components/     # Componentes reutilizables
│   ├── context/        # Context API
│   ├── pages/          # Páginas de la aplicación
│   ├── App.tsx         # Componente principal
│   └── main.tsx        # Punto de entrada
├── .env                # Variables de entorno
└── package.json        # Dependencias y scripts
```

## 🌟 Funcionalidades Implementadas

1. **Sistema de Autenticación**
   - Registro e inicio de sesión local
   - OAuth con GitHub y Google
   - Gestión de tokens JWT
   - Hash de contraseñas y validación

2. **Dashboard de Usuario**
   - Estadísticas y analíticas de usuario
   - Visualización de usuarios recientes
   - Gestión de perfil
   - Información de cuenta

3. **Diseño Responsivo**
   - Enfoque mobile-first
   - Componentes de Bootstrap 5
   - Animaciones CSS personalizadas
   - Diseños con gradientes modernos

4. **Implementación de Seguridad**
   - Rutas protegidas
   - Validación de entrada
   - Limitación de velocidad
   - Headers de seguridad
   - Configuración CORS

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama de feature
3. Commit tus cambios
4. Push a la rama
5. Crea un Pull Request

## Creador
Victor Alfonso Vargas Diaz.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT.

---

**¡Feliz codificación! 🚀**
