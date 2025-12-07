# 🎯 Estructura Monorepo - TODO EN UNO

Esta es la **MEJOR SOLUCIÓN** para tener todo tu portafolio y proyectos en un solo lugar.

## 📦 Estructura Recomendada

```
aplicaciones-web-portafolio/
│
├── README.md                          # Documentación principal
├── .gitignore                         # Ignorar node_modules, .env, etc.
│
├── portafolio/                        # ← Tu portafolio principal
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── images/
│
├── unidad1-vct/                       # ← VCT Page Work
│   ├── index.html
│   ├── style.css
│   ├── theme.css
│   ├── equipos.html
│   ├── eventos.html
│   └── images/
│
├── unidad2-javux/                     # ← JavaUX Anime
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── src/
│
└── unidad3-azumanga/                  # ← AzumangaNet (Laravel)
    ├── app/
    ├── config/
    ├── database/
    ├── public/
    ├── resources/
    ├── routes/
    ├── .env.example
    ├── composer.json
    └── artisan
```

---

## 🚀 Opción A: Railway (RECOMENDADA para Laravel)

Railway puede manejar todo desde un solo repositorio.

### 1. Preparar el Monorepo

```bash
cd /home/sora/Documents/aplicaciones-web

# Crear estructura
mkdir aplicaciones-web-portafolio
cd aplicaciones-web-portafolio

# Copiar proyectos
cp -r ../portafolio ./portafolio
cp -r ../VCTpageWork/22092025 ./unidad1-vct
cp -r ../javUXanime/javUXanime/windowDesignTest ./unidad2-javux
cp -r ../azumangaNet ./unidad3-azumanga

# Inicializar Git
git init
```

### 2. Crear .gitignore

```bash
cat > .gitignore << 'EOL'
# Laravel
unidad3-azumanga/.env
unidad3-azumanga/vendor/
unidad3-azumanga/node_modules/
unidad3-azumanga/storage/*.key
unidad3-azumanga/storage/framework/
unidad3-azumanga/storage/logs/

# Node
unidad2-javux/node_modules/
node_modules/

# Sistema
.DS_Store
Thumbs.db
EOL
```

### 3. Crear railway.json (configuración multi-servicio)

```bash
cat > railway.json << 'EOL'
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "php unidad3-azumanga/artisan serve --host=0.0.0.0 --port=$PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
EOL
```

### 4. Crear Nginx config para servir múltiples proyectos

```bash
mkdir -p config

cat > config/nginx.conf << 'EOL'
server {
    listen $PORT;
    root /app;
    index index.html index.php;

    # Portafolio principal
    location / {
        try_files /portafolio$uri /portafolio$uri/ /portafolio/index.html;
    }

    # Unidad 1 - VCT
    location /vct {
        alias /app/unidad1-vct;
        try_files $uri $uri/ /unidad1-vct/index.html;
    }

    # Unidad 2 - JavaUX
    location /javux {
        alias /app/unidad2-javux;
        try_files $uri $uri/ /unidad2-javux/index.html;
    }

    # Unidad 3 - Laravel
    location /azumanga {
        alias /app/unidad3-azumanga/public;
        try_files $uri $uri/ /unidad3-azumanga/public/index.php?$query_string;
        
        location ~ \.php$ {
            fastcgi_pass unix:/var/run/php/php-fpm.sock;
            fastcgi_index index.php;
            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME $request_filename;
        }
    }
}
EOL
```

### 5. Actualizar enlaces en el portafolio

Edita `portafolio/index.html`:

```html
<!-- Unidad 1 - VCT -->
<a href="/vct/" class="icon-btn" title="Ver proyecto">
    <!-- SVG -->
</a>

<!-- Unidad 2 - JavaUX -->
<a href="/javux/" class="icon-btn" title="Ver proyecto">
    <!-- SVG -->
</a>

<!-- Unidad 3 - AzumangaNet -->
<a href="/azumanga/" class="icon-btn" title="Ver proyecto">
    <!-- SVG -->
</a>
```

### 6. Desplegar en Railway

```bash
# Instalar Railway CLI
curl -fsSL https://railway.app/install.sh | sh

# Login
railway login

# Crear proyecto
railway init

# Vincular servicio
railway link

# Agregar MySQL
railway add --database mysql

# Desplegar
railway up
```

### 7. Configurar Variables de Entorno en Railway

En Railway Dashboard > Variables:

```env
# Laravel (Unidad 3)
APP_KEY=base64:tu-app-key-aqui
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tu-proyecto.up.railway.app/azumanga

DB_CONNECTION=mysql
# Railway auto-configura: DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD

# Root del proyecto
ROOT_PATH=/app
```

### 8. Ejecutar migraciones

En Railway > Settings > Deploy Hooks:

```bash
cd unidad3-azumanga && php artisan migrate --force && php artisan db:seed --force
```

---

## 🌐 Opción B: Vercel (MÁS FÁCIL pero sin MySQL nativo)

Vercel es excelente para proyectos estáticos y puede servir Laravel como Serverless Functions.

### 1. Estructura igual al anterior

### 2. Crear vercel.json

```bash
cat > vercel.json << 'EOL'
{
  "version": 2,
  "builds": [
    {
      "src": "portafolio/**",
      "use": "@vercel/static"
    },
    {
      "src": "unidad1-vct/**",
      "use": "@vercel/static"
    },
    {
      "src": "unidad2-javux/**",
      "use": "@vercel/static"
    },
    {
      "src": "unidad3-azumanga/api/index.php",
      "use": "vercel-php@0.6.0"
    }
  ],
  "routes": [
    {
      "src": "/",
      "dest": "/portafolio/index.html"
    },
    {
      "src": "/vct/(.*)",
      "dest": "/unidad1-vct/$1"
    },
    {
      "src": "/javux/(.*)",
      "dest": "/unidad2-javux/$1"
    },
    {
      "src": "/azumanga/(.*)",
      "dest": "/unidad3-azumanga/api/index.php"
    }
  ]
}
EOL
```

### 3. Desplegar

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel --prod
```

**Nota**: Para MySQL en Vercel, necesitas usar PlanetScale (gratuito):
- https://planetscale.com/
- Crear database
- Copiar connection string a Vercel Environment Variables

---

## 📱 Opción C: GitHub Pages con Subfolders (GRATIS y SIMPLE)

**PROS**: Totalmente gratis, fácil
**CONS**: Solo proyectos estáticos (Laravel NO funcionará)

### 1. Estructura

```bash
cd /home/sora/Documents/aplicaciones-web
mkdir portafolio-completo
cd portafolio-completo

# Copiar proyectos estáticos
cp -r ../portafolio/* .
cp -r ../VCTpageWork/22092025 ./vct
cp -r ../javUXanime/javUXanime/windowDesignTest ./javux
```

### 2. Actualizar enlaces en index.html

```html
<a href="./vct/" class="icon-btn">Ver VCT</a>
<a href="./javux/" class="icon-btn">Ver JavaUX</a>
<a href="https://azumanga.railway.app/" class="icon-btn">Ver AzumangaNet</a>
```

### 3. Desplegar

```bash
git init
git add .
git commit -m "Portafolio completo"
git remote add origin https://github.com/tuusuario/portafolio.git
git push -u origin main

# En GitHub: Settings > Pages > Source: main branch
```

**URLs**:
- Portafolio: `https://tuusuario.github.io/portafolio/`
- VCT: `https://tuusuario.github.io/portafolio/vct/`
- JavaUX: `https://tuusuario.github.io/portafolio/javux/`
- AzumangaNet: Desplegar aparte en Railway

---

## 🎯 COMPARACIÓN

| Opción | Costo | Facilidad | Soporta Laravel | Todo en uno |
|--------|-------|-----------|-----------------|-------------|
| **Railway Monorepo** | Gratis ($5/mes crédito) | ⭐⭐⭐⭐ | ✅ Sí | ✅ 100% |
| **Vercel + PlanetScale** | Gratis | ⭐⭐⭐ | ✅ Sí (serverless) | ✅ 95% |
| **GitHub Pages + Railway** | Gratis | ⭐⭐⭐⭐⭐ | ⚠️ Laravel aparte | 🔶 90% |
| **Netlify Monorepo** | Gratis | ⭐⭐⭐ | ⚠️ Limitado | 🔶 85% |

---

## 🏆 MI RECOMENDACIÓN

### Para tu caso específico:

**GitHub Pages + Railway separado**

**¿Por qué?**
1. ✅ **Más sencillo** de configurar
2. ✅ **Gratis** totalmente
3. ✅ **GitHub Pages** perfecto para HTML/CSS/JS
4. ✅ **Railway** perfecto para Laravel + MySQL
5. ✅ Todo accesible desde el portafolio principal

### Estructura final:

```
GitHub Pages (portafolio-completo)
├── index.html                    → https://tuusuario.github.io/portafolio/
├── vct/                         → https://tuusuario.github.io/portafolio/vct/
├── javux/                       → https://tuusuario.github.io/portafolio/javux/
└── images/

Railway (azumanganet)            → https://azumanga.up.railway.app/
└── (Laravel app completo)
```

---

## 📝 Script Automatizado

Crea todo automáticamente:

```bash
#!/bin/bash

echo "🚀 Creando estructura de portafolio completo..."

# Crear directorio principal
cd /home/sora/Documents/aplicaciones-web
mkdir -p portafolio-completo
cd portafolio-completo

# Copiar portafolio
echo "📦 Copiando portafolio..."
cp -r ../portafolio/* .

# Copiar Unidad 1 - VCT
echo "📦 Copiando VCT..."
cp -r ../VCTpageWork/22092025 ./vct

# Copiar Unidad 2 - JavaUX
echo "📦 Copiando JavaUX..."
cp -r ../javUXanime/javUXanime/windowDesignTest ./javux

# Actualizar enlaces en index.html
echo "🔗 Actualizando enlaces..."
sed -i 's|href="#"|href="./vct/"|g' index.html
sed -i 's|href="https://github.com/tuusuario/vctpagework"|href="./vct/"|g' index.html
sed -i 's|href="https://github.com/tuusuario/javuxanime"|href="./javux/"|g' index.html

# Crear README
cat > README.md << 'EOL'
# Portafolio de Aplicaciones Web

Portafolio completo con todos los proyectos del curso.

## 🌐 URLs
- Portafolio: /
- Unidad 1 (VCT): /vct/
- Unidad 2 (JavaUX): /javux/
- Unidad 3 (AzumangaNet): [En Railway](https://azumanga.up.railway.app/)

## 🚀 Despliegue
Este proyecto está desplegado en GitHub Pages.
EOL

# Inicializar Git
echo "🎯 Inicializando Git..."
git init
git add .
git commit -m "Initial commit - Portafolio completo"

echo "✅ ¡Listo! Ahora:"
echo "1. Crea un repositorio en GitHub"
echo "2. git remote add origin https://github.com/tuusuario/portafolio.git"
echo "3. git push -u origin main"
echo "4. Activa GitHub Pages en Settings"

echo ""
echo "📂 Proyectos copiados:"
ls -la
```

Guarda este script como `crear-monorepo.sh` y ejecútalo:

```bash
chmod +x crear-monorepo.sh
./crear-monorepo.sh
```

---

## 🎨 Actualizar Enlaces Automáticamente

Script para actualizar los enlaces en el portafolio:

```bash
#!/bin/bash

FILE="portafolio-completo/index.html"

# Buscar y reemplazar enlaces de la Unidad 1
sed -i 's|<a href="#" class="icon-btn" title="Ver proyecto">|<a href="./vct/" class="icon-btn" title="Ver proyecto">|g' "$FILE"

# Buscar la segunda ocurrencia (Unidad 2)
# Usar un identificador único para cada unidad

echo "✅ Enlaces actualizados"
```

---

## 💡 MEJOR FLUJO DE TRABAJO

```bash
# 1. Crear monorepo local
cd /home/sora/Documents/aplicaciones-web
mkdir mi-portafolio-completo
cd mi-portafolio-completo

# 2. Copiar todo
cp -r ../portafolio/* .
mkdir vct javux
cp -r ../VCTpageWork/22092025/* ./vct/
cp -r ../javUXanime/javUXanime/windowDesignTest/* ./javux/

# 3. Git
git init
git add .
git commit -m "Portafolio completo integrado"

# 4. GitHub
# Crear repo en github.com
git remote add origin https://github.com/TU_USUARIO/portafolio.git
git push -u origin main

# 5. Activar GitHub Pages
# Settings > Pages > main branch

# 6. Railway para Laravel (separado)
cd ../azumangaNet
git init
git add .
git commit -m "AzumangaNet"
git remote add origin https://github.com/TU_USUARIO/azumanga.git
git push -u origin main
# Conectar a Railway desde el dashboard
```

---

¿Quieres que te ayude a crear esta estructura ahora mismo? 🚀
