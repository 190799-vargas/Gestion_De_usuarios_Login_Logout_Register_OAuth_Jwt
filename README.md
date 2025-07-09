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
- React 18 con TypeScript
- Bootstrap 5 & Bootstrap Icons
- React Router para navegación
- Axios para peticiones API
- Context API para gestión de estado

### Backend
- Node.js & Express
- JWT para autenticación
- Passport.js para OAuth
- Sequelize ORM
- Base de datos MySQL
- Validación y sanitización de entrada
- Limitación de velocidad y headers de seguridad

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