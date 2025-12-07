# 🚀 Guía de Despliegue del Portafolio

Esta guía te ayudará a desplegar tu portafolio y los proyectos con base de datos de manera **completamente gratuita**.

## 📋 Índice
1. [Despliegue del Portafolio (Frontend)](#frontend)
2. [Despliegue de AzumangaNet (Laravel + MySQL)](#backend)
3. [Opciones de Hosting Gratuito](#opciones)
4. [Guía Paso a Paso Recomendada](#tutorial)

---

## 🎨 Frontend - Portafolio Principal

### Opción 1: GitHub Pages (Recomendado para este proyecto)
✅ **Ventajas**: Gratis, fácil, perfecto para sitios estáticos
❌ **Limitaciones**: Solo HTML/CSS/JS (no backend)

#### Pasos:
```bash
# 1. Inicializar repositorio git
cd /ruta/a/portafolio
git init
git add .
git commit -m "Initial commit"

# 2. Crear repositorio en GitHub
# Ve a github.com y crea un nuevo repositorio llamado "mi-portafolio"

# 3. Subir código
git remote add origin https://github.com/TU_USUARIO/mi-portafolio.git
git branch -M main
git push -u origin main

# 4. Activar GitHub Pages
# En GitHub: Settings > Pages > Source: main branch > Save
```

🌐 **URL resultante**: `https://TU_USUARIO.github.io/mi-portafolio/`

### Opción 2: Netlify
✅ Gratis, despliegue automático, HTTPS incluido
```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Desplegar
cd /ruta/a/portafolio
netlify deploy --prod
```

### Opción 3: Vercel
✅ Gratis, muy rápido, optimizado para frontend
```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Desplegar
cd /ruta/a/portafolio
vercel --prod
```

---

## 🗄️ Backend - AzumangaNet (Laravel + Base de Datos)

### Opción RECOMENDADA: Railway.app
✅ **Ventajas**: 
- Gratis ($5 crédito mensual)
- Soporte completo para Laravel
- Base de datos MySQL incluida
- Despliegue automático desde GitHub

#### Tutorial Completo Railway:

**1. Preparar el proyecto Laravel**
```bash
cd azumangaNet

# Asegurarse de que .env.example esté actualizado
cp .env .env.example

# Crear .gitignore si no existe
cat > .gitignore << EOL
/vendor
/node_modules
.env
.env.backup
EOL

# Subir a GitHub
git init
git add .
git commit -m "Preparar para Railway"
git remote add origin https://github.com/TU_USUARIO/azumanga-net.git
git push -u origin main
```

**2. Desplegar en Railway**
1. Ve a [railway.app](https://railway.app) y crea una cuenta
2. Click en "New Project" > "Deploy from GitHub repo"
3. Selecciona tu repositorio `azumanga-net`
4. Railway detectará automáticamente Laravel

**3. Agregar Base de Datos MySQL**
1. En tu proyecto de Railway, click "New" > "Database" > "MySQL"
2. Espera a que se cree
3. Railway automáticamente conectará las variables de entorno

**4. Configurar Variables de Entorno**
En Railway > Variables, agrega:
```env
APP_KEY=base64:TU_APP_KEY_AQUI
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tu-app.up.railway.app

DB_CONNECTION=mysql
# Railway llenará automáticamente estos:
# DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD

SESSION_DRIVER=database
QUEUE_CONNECTION=database
```

**5. Generar APP_KEY**
```bash
php artisan key:generate --show
# Copia el resultado y pégalo en Railway
```

**6. Ejecutar migraciones** (en Railway > Settings > Deploy):
```bash
php artisan migrate --force
php artisan db:seed --force
```

🌐 **URL resultante**: `https://tu-proyecto.up.railway.app`

---

### Opción 2: Render.com
✅ **Ventajas**: Gratis, soporte PostgreSQL/MySQL, fácil de usar

#### Tutorial Render:

**1. Crear archivo de configuración**
```bash
cd azumangaNet

# Crear render.yaml
cat > render.yaml << 'EOL'
services:
  - type: web
    name: azumanga-net
    env: php
    buildCommand: |
      composer install --no-dev --optimize-autoloader
      php artisan config:cache
      php artisan route:cache
      php artisan view:cache
      php artisan migrate --force
    startCommand: |
      php artisan serve --host=0.0.0.0 --port=$PORT
    envVars:
      - key: APP_KEY
        generateValue: true
      - key: APP_ENV
        value: production
      - key: APP_DEBUG
        value: false

databases:
  - name: azumanga-db
    databaseName: azumanga
    user: azumanga_user
EOL
```

**2. Desplegar**
1. Ve a [render.com](https://render.com) y crea una cuenta
2. Click "New +" > "Blueprint"
3. Conecta tu repositorio de GitHub
4. Render detectará `render.yaml` y creará todo automáticamente

🌐 **URL resultante**: `https://azumanga-net.onrender.com`

---

### Opción 3: Fly.io
✅ Gratis para proyectos pequeños, rápido

```bash
# 1. Instalar Fly CLI
curl -L https://fly.io/install.sh | sh

# 2. Login
fly auth login

# 3. Lanzar aplicación
cd azumangaNet
fly launch

# 4. Agregar MySQL
fly mysql create

# 5. Conectar MySQL
fly mysql attach azumanga-db
```

---

## 🎯 Configuración Completa Recomendada

### Para tu caso específico:

```
📦 Portafolio (HTML/CSS/JS)
└── GitHub Pages (GRATIS, FÁCIL)
    URL: https://TU_USUARIO.github.io/mi-portafolio/

📦 VCT Page Work (Unidad 1)
└── GitHub Pages o Netlify
    URL: https://TU_USUARIO.github.io/vct-page/

📦 JavaUX Anime (Unidad 2)
└── GitHub Pages o Netlify
    URL: https://TU_USUARIO.github.io/javux-anime/

📦 AzumangaNet (Unidad 3 - Laravel + MySQL)
└── Railway.app (GRATIS con $5/mes crédito)
    URL: https://azumanga-net.up.railway.app/
```

---

## 🔗 Actualizar Enlaces en el Portafolio

Una vez desplegados los proyectos, actualiza el `index.html` del portafolio:

```html
<!-- Unidad 1 - VCT -->
<a href="https://TU_USUARIO.github.io/vct-page/" class="icon-btn" title="Ver proyecto">

<!-- Unidad 2 - JavaUX -->
<a href="https://TU_USUARIO.github.io/javux-anime/" class="icon-btn" title="Ver proyecto">

<!-- Unidad 3 - AzumangaNet -->
<a href="https://azumanga-net.up.railway.app/" class="icon-btn" title="Ver proyecto">
```

---

## 📸 Capturar Screenshots Reales

Para reemplazar las imágenes SVG placeholder:

### Opción 1: Manualmente
1. Abre cada proyecto en el navegador
2. Presiona F12 > Toggle device toolbar
3. Ajusta a 1200x630
4. Captura con herramientas de navegador

### Opción 2: Automatizado (recomendado)
```bash
# Instalar puppeteer
npm install -g capture-website-cli

# Capturar screenshots
capture-website http://localhost:8000 --output=vct-preview.jpg --width=1200 --height=630
capture-website http://localhost:3000 --output=javux-preview.jpg --width=1200 --height=630
capture-website http://localhost:8000 --output=azumanga-preview.jpg --width=1200 --height=630

# Mover a carpeta images
mv *.jpg portafolio/images/
```

---

## ⚡ Checklist de Despliegue

### Antes de desplegar:
- [ ] Todos los enlaces internos son relativos
- [ ] Las imágenes están optimizadas
- [ ] El código está en un repositorio Git
- [ ] `.env` está en `.gitignore`
- [ ] Las credenciales no están hardcodeadas

### Después de desplegar:
- [ ] Probar todos los enlaces
- [ ] Verificar responsive en móvil
- [ ] Confirmar que la base de datos funciona
- [ ] Actualizar URLs en el portafolio
- [ ] Probar en diferentes navegadores

---

## 🆘 Solución de Problemas Comunes

### Railway: Error "APP_KEY not set"
```bash
php artisan key:generate --show
# Copia la salida y agrégala en Railway > Variables > APP_KEY
```

### Railway: Migraciones no se ejecutan
```bash
# En Railway > Settings > Deploy
# Agregar en "Custom Start Command":
php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT
```

### GitHub Pages: 404 en rutas
Asegúrate de que todos los enlaces son relativos:
```html
<!-- ❌ Mal -->
<link rel="stylesheet" href="/style.css">

<!-- ✅ Bien -->
<link rel="stylesheet" href="style.css">
```

---

## 💰 Costos (Totalmente GRATIS)

| Servicio | Costo | Límites |
|----------|-------|---------|
| GitHub Pages | $0 | 100GB bandwidth/mes |
| Railway | $0 | $5 crédito/mes |
| Netlify | $0 | 100GB bandwidth/mes |
| Render | $0 | 750 horas/mes |

✅ **Perfectamente suficiente para un portafolio estudiantil**

---

## 🎓 Recursos Adicionales

- [Documentación Laravel en Railway](https://docs.railway.app/guides/laravel)
- [GitHub Pages Tutorial](https://pages.github.com/)
- [Railway Templates](https://railway.app/templates)
- [Render Guides](https://render.com/docs)

---

## 📝 Notas Finales

1. **Railway** es la mejor opción para Laravel porque:
   - Configuración automática de Laravel
   - Base de datos MySQL incluida
   - Variables de entorno fáciles de manejar
   - Despliegue automático desde Git

2. Para los proyectos estáticos (Unidad 1 y 2), **GitHub Pages** es ideal:
   - Totalmente gratis
   - Dominio propio opcional
   - HTTPS automático
   - Integración con Git

3. **Actualiza las imágenes** con screenshots reales después del despliegue para que el portafolio se vea profesional.

¡Éxito con tu portafolio! 🚀
