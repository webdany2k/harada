# PRD — Sistema de Tableros de Metas Basado en el Método Harada con Agentes de IA (Gemini)

## 1. Resumen Ejecutivo

**HaradaAI** es una aplicación web que genera dinámicamente tableros de metas estilo Harada usando modelos de lenguaje (LLMs) mediante la API de Gemini. El sistema permite crear un tablero de 64 celdas basado en una meta principal, generar automáticamente pilares y subactividades, y usar agentes de IA para clasificar avances, proporcionar recomendaciones personalizadas y facilitar la reflexión mediante un diario integrado.

**Estado actual:** MVP funcional con Dashboard, generación de tableros, registro de actividades con clasificación IA, visualización de progreso, Journal y AI Coach.

---

## 2. Objetivo del Producto

Crear una aplicación web que:
1. Reciba la meta del usuario.
2. Genere automáticamente:
   - Los 8 pilares principales.
   - 8 sub-metas por pilar (64 celdas total).
3. Permita registrar actividades tipo "commit".
4. Use agentes de IA para:
   - Clasificar la actividad dentro del tablero.
   - Medir progreso en cada pilar.
   - Recomendar próximas acciones.
   - Proveer motivación y coaching personalizado.
5. Facilite la reflexión mediante un diario con imágenes y etiquetas.
6. Genere un tablero visualizable con progreso en tiempo real.

---

## 3. Usuarios Meta

### Primarios
- Personas que quieren estructurar objetivos personales o profesionales.
- Emprendedores y profesionales buscando claridad estratégica.
- Estudiantes y atletas con metas de alto rendimiento.

### Secundarios
- Coaches, mentores o facilitadores de desarrollo personal.
- Equipos que deseen alinear objetivos colectivos.

---

## 4. Funcionalidades Principales

### 4.1 Dashboard ✅ **IMPLEMENTADO**
- **Vista de todos los tableros:** Lista de boards con fecha de creación y resumen de progreso.
- **Persistencia:** Guardado automático en `database.json`.
- **Navegación:** Crear nuevo tablero o abrir uno existente.

### 4.2 Generación Automática de Tablero ✅ **IMPLEMENTADO**
- **Input:** Meta del usuario en lenguaje natural.
- **Output:** Tablero Harada de 64 celdas generado por Gemini.
- **Parámetros generados:**
  - Descripción de la meta.
  - 8 pilares principales.
  - 8 sub-metas por pilar.
- **Estética:** Dark Glassmorphism con animaciones suaves.

### 4.3 Registro de Actividades ("Commits") ✅ **IMPLEMENTADO**
- **Input:** Texto libre (e.g., "Corrí 5km hoy").
- **Clasificación por IA:**
  - Identifica pilares impactados.
  - Asigna puntuación (1-5) por pilar.
  - Actualiza `pillarScores` en tiempo real.
- **Visualización:** Log de actividades con timestamp y explicación del impacto.

### 4.4 Visualización del Tablero ✅ **IMPLEMENTADO**
- **Grid 8x8:** Cada celda representa un pilar o sub-meta.
- **Progreso visual:**
  - Pilares se iluminan con gradiente cyan según puntuación acumulada.
  - Animaciones de hover y pulsación en la meta central.
- **Responsivo:** Adaptado para desktop y tablets.

### 4.5 Journal (Diario de Reflexión) ✅ **IMPLEMENTADO**
- **Funcionalidades:**
  - Entrada de texto multi-línea.
  - Adjuntar imágenes mediante URL.
  - Sistema de etiquetas (tags) para categorización.
- **Timeline:** Vista cronológica inversa de todas las entradas.
- **Persistencia:** Integrado con el board (`journalEntries` array).

### 4.6 AI Coach ✅ **IMPLEMENTADO**
- **Análisis contextual:**
  - Lee la meta, pilares, actividades recientes y entradas del diario.
  - Identifica pilares con bajo progreso.
- **Salida:**
  - 3 recomendaciones específicas y accionables.
  - Frase motivacional personalizada.
- **UI:** Botón flotante en la vista del tablero, modal elegante con animaciones.

### 4.7 URLs Compartibles 🔄 **PARCIALMENTE IMPLEMENTADO**
- Cada board tiene un `id` único.
- Frontend puede cargar board por ID.
- **Pendiente:** Sistema de compartir público/privado.

---

## 5. Arquitectura Técnica

### Frontend
- **Tecnología:** React + Vite
- **Estilo:** TailwindCSS + Framer Motion
- **Iconos:** lucide-react
- **Componentes principales:**
  - `Dashboard.jsx` - Lista de boards
  - `GoalInput.jsx` - Formulario de meta inicial
  - `BoardGrid.jsx` - Visualización del tablero 8x8
  - `ActivityLog.jsx` - Registro de commits
  - `Journal.jsx` - Diario con timeline
  - `Coach.jsx` - Modal del AI Coach

### Backend
- **Tecnología:** Node.js + Express
- **API Endpoints:**
  - `POST /api/generate` - Genera nuevo tablero
  - `GET /api/boards` - Lista todos los boards
  - `GET /api/board/:id` - Obtiene board por ID
  - `POST /api/commit` - Registra actividad
  - `POST /api/journal` - Añade entrada al diario
  - `POST /api/coach` - Solicita recomendaciones del coach

### Base de Datos
- **Actual:** Archivo JSON (`database.json`) con persistencia en disco.
- **Futuro:** Migrar a Supabase/PostgreSQL para escalabilidad.

### Integración LLM (Gemini API)
- **Modelos con fallback:**
  1. `gemini-2.5-flash-lite`
  2. `gemini-2.0-flash-lite-preview-02-05`
  3. `gemini-2.0-flash-exp`
  4. `gemini-1.5-flash`
- **Prompts modulares:**
  - Generación de pilares y sub-metas.
  - Clasificación de actividades.
  - Generación de coaching personalizado.

---

## 6. Estado de Implementación

### ✅ Completado
- [x] Infraestructura backend + Gemini API
- [x] Esquemas de datos (Board, Pillars, SubGoals, Commits, JournalEntries)
- [x] Endpoint `/api/generate`
- [x] Endpoint `/api/commit` con clasificación IA
- [x] Endpoint `/api/boards` para Dashboard
- [x] Endpoint `/api/journal`
- [x] Endpoint `/api/coach`
- [x] Frontend: Formulario de meta
- [x] Frontend: Grid 8×8 con visualización de progreso
- [x] Frontend: Panel de actividades
- [x] Frontend: Dashboard de tableros guardados
- [x] Frontend: Journal con tags e imágenes
- [x] Frontend: AI Coach modal
- [x] Persistencia basada en archivos
- [x] Visualización de impacto con colores dinámicos

### 🔄 En Progreso / Pendiente
- [ ] Optimización de prompts para mejores recomendaciones
- [ ] Testing end-to-end
- [ ] Manejo robusto de errores de red

---

## 7. Roadmap: Funcionalidades Futuras

### 7.1 Exportación y Compartir
- **PDF Export:** Generar documento imprimible del tablero con resumen de progreso.
- **Image Export:** Captura visual del tablero para compartir en redes sociales.
- **Public URLs:** Modo público/privado para tableros compartibles.
- **Embed Code:** Widget embebible para blogs o portfolios.

### 7.2 Analíticas y Reportes
- **Dashboard de Analytics:**
  - Gráficos de progreso por semana/mes.
  - Identificación de racha más larga de commits.
  - Heatmap de actividad.
- **Comparación temporal:** Ver cómo han evolucionado los pilares en el tiempo.

### 7.3 Mejoras en AI Coach
- **Coach conversacional:** Chat continuo con historial de conversaciones.
- **Check-ins programados:** Notificaciones inteligentes para revisar progreso.
- **Modo mentor:** Preguntas reflexivas tipo coaching profesional.
- **Detección de obstáculos:** IA identifica patrones de procrastinación.

### 7.4 Gamificación
- **Sistema de logros:** Badges por hitos alcanzados (e.g., "10 días consecutivos").
- **Niveles de pilares:** Desbloqueables visuales conforme un pilar alcanza cierto score.
- **Retos semanales:** Sugerencias de desafíos específicos.

### 7.5 Colaboración
- **Tableros compartidos:** Múltiples usuarios trabajando en una meta común.
- **Comentarios:** Feedback entre co-equipiers.
- **Modo equipo:** Visualización de contribuciones individuales.

### 7.6 Integraciones
- **Calendario (Google Calendar, Outlook):**
  - Sincronizar actividades planificadas.
  - Recordatorios automáticos.
- **To-Do Apps (Todoist, Notion):**
  - Importar/exportar sub-metas como tareas.
- **Wearables (Fitbit, Apple Health):**
  - Auto-tracking de actividades físicas.

### 7.7 Personalización
- **Temas:** Light mode, otros esquemas de color.
- **Templates de metas:** Plantillas pre-configuradas (e.g., "Ser mejor programador", "Correr maratón").
- **Custom icons:** Iconografía personalizada por pilar.

### 7.8 Móvil
- **Progressive Web App (PWA):**
  - Instalable en dispositivos móviles.
  - Funcionalidad offline.
- **App Nativa (React Native):**
  - Notificaciones push nativas.
  - Mejor rendimiento en móviles.

### 7.9 Seguridad y Privacidad
- **Autenticación:** Login con Google/GitHub.
- **Encriptación de datos sensibles.**
- **Control de privacidad granular.**

### 7.10 IA Avanzada
- **Refinamiento de metas:** IA sugiere ajustar pilares si detecta desbalance.
- **Predicción de éxito:** Modelo que estima probabilidad de alcanzar la meta.
- **Generación de sub-sub-metas:** Descomposición recursiva para metas muy complejas.

---

## 8. Métricas de Éxito

### Actuales
- ✅ Tablero se genera < 5 segundos.
- ✅ Commit clasificado en < 4 segundos.
- ✅ Flujo completado por usuario en < 2 minutos.
- ✅ Build pasa sin errores.

### Futuras
- Retención de usuarios (% que regresan después de 7 días).
- Número promedio de commits por tablero.
- Adopción del AI Coach (% de usuarios que lo usan).
- NPS (Net Promoter Score) > 8/10.

---

## 9. Riesgos y Mitigación

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Gemini API lenta/inestable | Alto | Fallback entre modelos, cache de respuestas |
| Crecimiento de `database.json` | Medio | Migrar a DB relacional cuando > 100 boards |
| UX compleja en móvil | Medio | Priorizar responsive design, considerar PWA |
| Costos de API altos | Medio | Monitoreo, rate limiting, tier gratuito |

---

## 10. Conclusión

**HaradaAI v0.3** es un MVP robusto que valida el concepto central: usar IA generativa para estructurar y trackear metas complejas. Las funcionalidades de Journal y AI Coach agregan una capa de reflexión y mentoría que diferencia el producto.

### Próximos pasos inmediatos:
1. **Testing de usuario:** Obtener feedback de 5-10 usuarios beta.
2. **Optimización de prompts:** Mejorar calidad de recomendaciones del Coach.
3. **Deploy a producción:** Vercel/Netlify para frontend, Railway/Render para backend.
4. **Documentación:** README completo con setup instructions.

### Visión a largo plazo:
Convertir HaradaAI en la plataforma de referencia para alcanzar metas ambiciosas mediante la combinación de metodología comprobada (Harada) y asistencia inteligente continua (Gemini).
