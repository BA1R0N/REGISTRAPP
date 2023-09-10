# RegistrAPP

## Descripción
Aplicación para el registro de asistencia de lo estudiantes mediante el uso de un código QR.

## Como iniciar y compilar el proyecto

### 1. Clonar el repositorio
```shell
git clone https://github.com/sbgallardo/registrapp.git && cd registrapp/

```

### 2. Instalar las dependencias
```shell
npm i
```

### 3. Iniciar el servidor de desarrollo
```shell
ionic serve
```

## Compilar a android

### 1. Instalar las dependencias
```shell
npm install -g @ionic/cli @capacitor/cli
```

### 2. Generar el build de angular
```shell
ng build
```

### 3. Agregar la plataforma android
```shell
npx cap add android
```

### 4. Sincronizar el proyecto
```shell
npx cap sync
```

### 5. Compilar el proyecto
```shell
npx cap open android
```

