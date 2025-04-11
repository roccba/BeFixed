# 🚀 BeFixed – Plataforma de contratación de servicios

BeFixed es una plataforma para conectar **personas que necesitan resolver un problema** con **profesionales independientes (Fixers)** que saben cómo hacerlo.

> Desde una mudanza hasta arreglar un enchufe, BeFixed encuentra al Fixer ideal para cada situación.

## 🧠 ¿En qué se diferencia?

- 🧑‍🔧 No solo técnicos: Fixers pueden ser mozos, fletes, electricistas, diseñadores y más.
- 🤖 Chat inteligente que asiste al cliente y ayuda al Fixer a cotizar.
- 📍 Ubicación y disponibilidad en tiempo real.
- 🔐 Seguridad basada en cookies HttpOnly, validaciones robustas y perfiles verificados.

## 📦 Tecnologías usadas

- **Frontend:** Next.js + Tailwind + React
- **Backend:** Node.js + Express (API REST)
- **DB:** Esquema relacional (ver carpeta `/db`)
- **AI & Tools:** OpenAI GPT, Vision API (plan futuro)

## 📂 Estructura general del repo

```
/app                 → Frontend principal (Next.js App Router)
/backend             → API REST y lógica de negocio
/components          → Componentes reutilizables de frontend
/shared              → Modelos y utilidades compartidas (client ↔ server)
/db                  → Modelo relacional y migraciones de base de datos
/public              → Archivos estáticos y assets (logos, íconos, etc.)
/utils               → Funciones auxiliares (helpers, API wrappers)
```

## 🛠 Instrucciones para levantar el proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/roccba/BeFixed.git
cd BeFixed
```

### 2. Instalar las dependencias
```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env.local` en la raíz y definir las claves necesarias:
```env
DATABASE_URL=...
JWT_SECRET=...
```

(Opcional: consultar la documentación interna para valores por entorno)

### 4. Levantar frontend y backend (modo desarrollo)
```bash
npm run dev
```

## 👥 Comunidad BeFixed

- “Fixers” son los profesionales registrados
- “Clientes” son quienes contratan servicios
- Un mismo usuario puede tener ambos roles activos

## 📬 Contacto / roadmap / feedback

En construcción 🚧
