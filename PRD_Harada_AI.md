# PRD -- Sistema de Tableros de Metas Basado en el Método Harada con Agentes de IA (Gemini)

## 1. Resumen Ejecutivo

El objetivo es construir, durante un hackathon de tiempo limitado, un
producto funcional que genere dinámicamente tableros de metas estilo
Harada usando modelos de lenguaje (LLMs) mediante la API de Gemini.\
El sistema permitirá crear un tablero de 64 celdas basado en una meta
principal, generar automáticamente pilares y subactividades, y usar
agentes de IA para sugerir acciones, registrar avances y dar
retroalimentación inteligente.

## 2. Objetivo del Producto

Crear una aplicación web ligera que: 1. Reciba la meta del usuario. 2.
Genere automáticamente: - Los 8 pilares principales. - 8 sub‑metas por
pilar (64 celdas total). 3. Permita registrar actividades tipo "commit".
4. Use agentes de IA para: - Clasificar la actividad dentro del
tablero. - Medir progreso en cada pilar. - Recomendar próximas acciones.
5. Genere un tablero visualizable y compartible vía URL.

## 3. Usuarios Meta

### Primarios

-   Personas que quieren estructurar objetivos personales o
    profesionales.
-   Participantes del hackathon. \### Secundarios
-   Coaches, mentores o streamers que guíen sesiones como la que aparece
    en el transcript.

## 4. Funcionalidades Principales

### 4.1 Generación Automática de Tablero (Core)

-   Input: meta del usuario.
-   Output: tablero Harada de 64 celdas con texto generado por LLM.
-   Parámetros generados por IA:
    -   Descripción de la meta.
    -   8 pilares principales.
    -   8 sub‑metas por pilar.

### 4.2 Registro de Actividades ("Commits")

-   Campo para capturar actividad.
-   Agente evalúa:
    -   En qué pilares impacta.
    -   Nivel de impacto (bajo/medio/alto).
    -   Representación visual del progreso.

### 4.3 Visualización del Tablero

-   Muestra cada pilar con su nivel de avance.
-   Resumen general del progreso.
-   Dashboard con colores:
    -   verde: bien trabajado
    -   amarillo: medio
    -   rojo: poco trabajado

### 4.4 Recomendaciones Inteligentes

-   El LLM sugiere:
    -   Actividades de impacto alto.
    -   Cómo equilibrar el tablero.
    -   Próximos pasos basados en avance acumulado.

### 4.5 URLs Compartibles

-   Tablero accesible mediante un ID único.

------------------------------------------------------------------------

## 5. Arquitectura de Alto Nivel

### Frontend

-   React (ideal para hackathon).
-   Componentes:
    -   Formulario de meta.
    -   Visualizador de tablero.
    -   Panel de actividades.
    -   Dashboard de progreso.

### Backend

-   Node.js + Express o Python FastAPI.
-   Endpoints esenciales:
    -   POST /generate-board
    -   POST /commit
    -   GET /board/:id

### Base de datos

-   Supabase o Firebase por velocidad.

### Integración LLM (Gemini API)

-   Uso de prompts modulares:
    1.  Generación de pilares.
    2.  Generación de sub‑metas.
    3.  Clasificación de actividades.
    4.  Recomendación de acciones inteligentes.

------------------------------------------------------------------------

## 6. User Stories

1.  *Como usuario quiero ingresar mi meta para generar automáticamente
    un tablero de 64 celdas.*
2.  *Como usuario quiero registrar mis avances para ver cómo progresa
    cada pilar.*
3.  *Como usuario quiero recibir recomendaciones personalizadas.*
4.  *Como usuario quiero compartir mi tablero.*

------------------------------------------------------------------------

## 7. Requerimientos Funcionales

### RF1 -- Generación de Tablero

-   RF1.1 El usuario ingresa la meta.
-   RF1.2 El sistema llama a un LLM para generar:
    -   8 pilares.
    -   8 sub‑metas por pilar.
-   RF1.3 El tablero se guarda en BD.

### RF2 -- Registro de Actividades

-   RF2.1 El usuario ingresa texto libre.
-   RF2.2 Un agente clasifica el impacto.
-   RF2.3 El tablero se actualiza.

### RF3 -- Recomendaciones

-   RF3.1 El LLM analiza historial.
-   RF3.2 El LLM genera actividades sugeridas.

### RF4 -- Visualización

-   RF4.1 Dashboard de 8×8 celdas.
-   RF4.2 Colores según nivel de progreso.

------------------------------------------------------------------------

## 8. Tareas y Subtareas Técnicas

### **8.1 Backend**

#### 8.1.1 Endpoints

-   [ ] Crear endpoint `/generate-board`
-   [ ] Crear endpoint `/commit`
-   [ ] Crear endpoint `/recommend`
-   [ ] Crear endpoint `/board/:id`

#### 8.1.2 Integración con Gemini

-   [ ] Crear cliente API.
-   [ ] Prompt 1: generación de pilares.
-   [ ] Prompt 2: sub‑metas.
-   [ ] Prompt 3: clasificación de actividad.
-   [ ] Prompt 4: recomendaciones.

#### 8.1.3 Modelos DB

-   [ ] Board
-   [ ] Pillar
-   [ ] Subgoal
-   [ ] ActivityLog

------------------------------------------------------------------------

### **8.2 Frontend**

#### 8.2.1 Formulario inicial

-   [ ] Input de meta.
-   [ ] Botón "Generar".

#### 8.2.2 Tablero

-   [ ] Grid 8×8.
-   [ ] Sección de pilares.
-   [ ] Modal para ver sub‑metas.

#### 8.2.3 Actividades

-   [ ] Formulario de commit.
-   [ ] Lista de actividades recientes.

#### 8.2.4 Dashboard

-   [ ] Visualización de impacto.
-   [ ] Colores dinámicos.

------------------------------------------------------------------------

### **8.3 IA y Lógica**

#### 8.3.1 Agente generador de tablero

-   [ ] Prompt engineering.
-   [ ] Validación de longitud.
-   [ ] Mapeo a estructura del backend.

#### 8.3.2 Agente clasificador

-   [ ] Determinar relevancia.
-   [ ] Mapear múltiples pilares.

#### 8.3.3 Agente recomendador

-   [ ] Sugerencias de mayor impacto.
-   [ ] Identificación de áreas débiles.

------------------------------------------------------------------------

## 9. Métricas de Éxito

-   Tablero se genera \< 4 segundos.
-   Commit clasificado en \< 3 segundos.
-   Flujo completado por usuario en \< 2 minutos.
-   Tasa de errores de API \< 5%.

------------------------------------------------------------------------

## 10. Cronograma para Hackathon (4--6 horas)

### Hora 1 --- Base técnica

-   Infraestructura backend + Gemini API.
-   Esquemas DB.

### Hora 2 --- Generación del tablero

-   Conectar frontend con `/generate-board`.

### Hora 3 --- Commits y clasificación

-   Registro y análisis de actividad.

### Hora 4 --- Dashboard visual

-   Colores + vista de avance.

### Hora 5 (opcional) --- Recomendaciones

-   Agente sugeridor.

### Hora 6 (opcional) --- URLs compartibles

-   Deploy final.

------------------------------------------------------------------------

## 11. Riesgos y Mitigación

-   **Tiempo limitado** → enfoque MVP.
-   **Respuestas largas de LLM** → prompts breves y con formato fijo.
-   **Inestabilidad del modelo** → fallback de textos simples.

------------------------------------------------------------------------

## 12. MVP Final (Entrega del Hackathon)

-   Generador de tableros funcional.
-   Registro de actividades con clasificación por IA.
-   Visualización de progreso.
