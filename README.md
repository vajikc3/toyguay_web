# Toyguay Web Application

## Overview
Se trata del código fuente del cliente web de ToyGuay, una web de venta y donación de juguetes usados.

Las principales tecnologías usadas para construir esta aplicación son:
- Bootstrap v3
- Angular >1.6

## Instalación

```bash
$> git clone https://github.com/vajikc3/toyguay_web.git
$> cd toyguay
$> npm install
```

## Ramas de desarrollo
La rama principal de desarrollo es la Develop. La rama Master contiene las versiones estables de la aplicación.

## Ficheros de configuración de entorno (src/config.js)
Se trata del fichero que contiene las direcciones del servidor web y del servidor de backend. 

Se proporcionas ejemplos de ficheros de configuración para diversos entornos:
- `_conf_local.js` --> Se trata del fichero de configuración preparado para desarrollo local contra el backend **node** corriendo en `localhost:3000` y el servidor web ligero de desarrollo **lite-server** corriendo en `localhost9001`.

- `_conf_sparrest.js` --> La configuración para que la apliación corra con lite-server y con sparrest (backend de pega para desarrollo rápido).

Para activar cualquiera de estos entornos se debe sobreescribir el fichero /src/conf.js. P.ej.: `cp /src/_conf_local.js /src/config.js`

## Arranque en local con backend node
(Como requisito previo tiene que estar corriendo el backend node y hay que indicar los valores correspondientes en `/src/conf.js`)

Para arrancar el servidor web de desarrollo (lite-server):

```bash
$> npm run-script lite
```

## Arranque en local con sparrest como backend

Para arrancar servidor http (lite-server) y backend de desarrollo (sparrest).

```bash
$> npm start
```


