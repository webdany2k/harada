# Harada Method AI Board

Un sistema interactivo de tableros de metas basado en el Método Harada, potenciado por IA (Gemini) para generar automáticamente pilares, sub-metas y proporcionar coaching personalizado.

## 🎯 Descripción

Esta aplicación web permite a los usuarios crear y gestionar tableros de metas estructurados según el Método Harada (64 celdas: 8 pilares con 8 sub-metas cada uno). Utiliza modelos de lenguaje de Gemini para:

- **Generar automáticamente** pilares y sub-metas basados en una meta principal
- **Clasificar actividades** y medir su impacto en cada pilar del tablero
- **Proporcionar coaching personalizado** mediante un agente de IA que analiza el progreso
- **Mantener un diario** de reflexiones y avances
- **Visualizar el progreso** con un dashboard dinámico y colorido

## ✨ Características Principales

- 🤖 **Generación automática de tableros** mediante IA
- 📊 **Dashboard visual interactivo** con indicadores de progreso
- 📝 **Sistema de commits** para registrar actividades diarias
- 💬 **AI Coach** que proporciona recomendaciones personalizadas
- 📔 **Journal integrado** para notas, imágenes y reflexiones
- 🎨 **Visualización de impacto** con código de colores (verde/amarillo/rojo)
- 🔗 **URLs compartibles** para cada tablero

## 🛠️ Tech Stack

### Frontend
- **React** 18.2
- **Vite** - Build tool
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconos
- **TailwindCSS** - Estilos

### Backend
- **Node.js** + **Express**
- **Gemini API** - Generación de contenido con IA
- **JSON File Storage** - Persistencia simple de datos

## 📋 Prerequisitos

- Node.js (versión 16 o superior)
- NPM o Yarn
- API Key de Google Gemini

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/webdany2k/harada.git
cd harada
```

### 2. Configurar el servidor

```bash
cd server
npm install
```

Crear un archivo `.env` en la carpeta `server`:

```env
GEMINI_API_KEY=tu_api_key_aqui
PORT=3000
```

### 3. Configurar el cliente

```bash
cd ../client
npm install
```

## 🚀 Ejecución

### Iniciar el servidor backend

```bash
cd server
node index.js
```

El servidor estará disponible en `http://localhost:3000`

### Iniciar el cliente frontend

```bash
cd client
npm run dev
```

El cliente estará disponible en `http://localhost:5173`

## 📖 Uso

1. **Crear un tablero**: Ingresa tu meta principal y deja que la IA genere los 8 pilares y 64 sub-metas
2. **Registrar actividades**: Usa el sistema de "commits" para registrar tus acciones diarias
3. **Ver progreso**: Observa el dashboard visual con indicadores de color en cada pilar
4. **Recibir coaching**: Consulta al AI Coach para obtener recomendaciones personalizadas
5. **Llevar un diario**: Agrega entradas de journal con texto, imágenes y etiquetas

## 📁 Estructura del Proyecto

```
harada/
├── client/              # Frontend React
│   ├── src/
│   │   ├── App.jsx     # Componente principal
│   │   └── ...
│   └── package.json
│
├── server/              # Backend Node.js
│   ├── index.js        # Servidor Express
│   ├── gemini.js       # Integración con Gemini API
│   ├── db.js           # Gestión de datos
│   ├── database.json   # Almacenamiento de tableros
│   └── .env           # Variables de entorno (no incluido)
│
└── README.md
```

## 🔌 API Endpoints

- `POST /api/generate` - Genera un nuevo tablero basado en una meta
- `GET /api/board/:id` - Obtiene un tablero específico
- `GET /api/boards` - Lista todos los tableros
- `POST /api/commit` - Registra una actividad en un tablero
- `POST /api/journal` - Añade una entrada de diario
- `POST /api/coach` - Obtiene consejos del AI Coach

## 🎨 Capturas de Pantalla

_Próximamente_

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto fue desarrollado como parte de un hackathon y está disponible bajo licencia MIT.

## 👤 Autor

**webdany2k**

## 🙏 Agradecimientos

- Basado en el Método Harada de establecimiento de metas
- Powered by Google Gemini AI
- Creado durante un hackathon de desarrollo rápido

---

⭐ Si este proyecto te resultó útil, ¡no olvides darle una estrella!
