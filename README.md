# 🛒 Sistema de Gestión y Venta de Productos

## 📌 Datos del Estudiante

- **Nombre del estudiante:** Anddy Jhon Naranjo Valencia  
- **Carrera:** Ingeniería en Sistemas / Software  
- **Asignatura:** Aplicaciones Web  
- **Institución:** Universidad Politécnica Salesiana  

## 📝 Descripción

Este proyecto es una aplicación web desarrollada con Vue 3 que permite la gestión y venta de productos de manera eficiente e intuitiva. 

El sistema está dividido en varias secciones donde los usuarios pueden visualizar productos en formato de tarjetas, agregarlos a un carrito de compras y gestionar un inventario completo mediante operaciones CRUD (crear, leer, actualizar y eliminar).

Incluye funcionalidades como búsqueda dinámica de productos, validación de formularios tanto en frontend como backend, y una interfaz moderna utilizando Bootstrap. Además, permite la organización de productos por categorías para mejorar la experiencia del usuario y la administración del sistema.


## URL
https://github.com/AnddyNaranjo/MercApp.git

---

## 🚀 Características Principales

🌐 Rutas principales

- http://localhost:5173/home

- http://localhost:5173/productos

- http://localhost:5173/categorias

### 🏠 Página de Inicio (`/home`)
- Visualización de productos en formato **cards**
- Diseño amigable para el usuario
- Cada producto incluye:
  - Nombre
  - Precio
  - Imagen
  - Categoría
- Botón **"Agregar al carrito"**
- Carrito de compras accesible mediante **offcanvas**
- Permite agregar múltiples productos para compra

---

### 📦 Página de Productos (`/productos`)
- Tabla completa con todos los productos
- Información detallada:
  - Nombre
  - Precio
  - Stock
  - Descripción
  - Categoría
- Funcionalidades:
  - ✅ Crear producto
  - ✏️ Editar producto
  - ❌ Eliminar producto
- Formulario con validaciones:
  - Campos obligatorios
  - Validación de números (precio y stock)
  - Validación de longitud de texto
  - Validación de imagen obligatoria
- Uso de **modal (Bootstrap)** para crear/editar productos

---

### 🗂 Página de Categorías (`/categorias`)
- Listado de categorías existentes
- Formulario simple para crear nuevas categorías
- Actualización dinámica al agregar nuevas categorías

---

## 🔎 Búsqueda Global
- Funcionalidad de búsqueda integrada
- Disponible en:
  - Página de inicio (`/home`)
  - Página de productos (`/productos`)
- Permite buscar por:
  - Nombre
  - Descripción
  - Categoría

---

## 🧱 Componentes de UI

- Navbar global en todas las páginas
- Navegación con **nav-tabs**
- Modal para formularios
- Offcanvas para carrito
- Estilos con **Bootstrap 5**

---

## ✅ Validaciones

Se implementan validaciones tanto en frontend como backend:

### Frontend (Vue)
- Validación manual reactiva
- Uso de clases Bootstrap:
  - `is-invalid`
  - `invalid-feedback`
- Validación en formularios:
  - Nombre mínimo de caracteres
  - Precio numérico y positivo
  - Stock entero positivo
  - Descripción obligatoria
  - Categoría obligatoria
  - Imagen obligatoria (al crear)

### Backend
- Protección de datos antes de guardarlos en base de datos

## 🛠 Tecnologías Utilizadas

- Vue 3 (Composition API)
- TypeScript
- Bootstrap 5
- Express.js
- MongoDB
- express-validator

---

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/AnddyNaranjo/MercApp.git

# Instalar dependencias
npm install

# Correr el proyecto
npm run dev

```
### Configurar la base de datos

Tener MongoDB en ejecución
Configurar la conexión en el server.js


### Estructura de mi base de datos
```bash
Servidor MongoDB: admin
│
└── Base de Datos: inventario
    │
    └── Colecciones: productos
        │            categoria
        │
        └── Documentos (JSON)
```

### Acceder al sistema

Se ingresa con las rutas ya mencionadas anterioemente

Se crea productos junto con sus categorias automaticamente (por primera vez)
