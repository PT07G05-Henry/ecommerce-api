# BackEnd del Proyecto final para Henry (PT7-PF-Group5-API)

## Requisitos para su instalación y uso:

- Correr "npm i" o "pnpm i" (según que usen ustedes) para instalar dependencias por primera vez.
- Tener acceso a un servidor de Postgres SQL de manera local o remota (mas adelante se muestra como configurar el accesos) con una database llamada "ecommerce".
- Tener la carpeta del FrontEnd en la misma que esta para tener acceso al build del mismo haciendo un "git clone" de la misma o si solo se quieren trabajar con el backend creen una carpeta con un contenido html de prueba. Ejemplo: si esta carpeta esta dentro de otra que se llama PF quedando "c:\PF\ecommerce-api\" hagan una carpeta dentro de PF que se llame "ecommerce-client" y otra dentro que se llame "build" que contenga un archivo index.htm con algún texto de prueba como un H1 que diga "Hola mundo!" quedando "c:\PF\ecommerce-client\build\index.htm" .
- Crear un archivo .env en la raíz de esta carpeta con el siguiente contenido:

```bash
CORS=ENABLE #Habilita o deshabilita el acceso desde cualquier lado (déjenlo ENABLE para desarrollo, solo se desactiva en deploy por temas de seguridad)
DB_USER=USER #Reemplacen USER por el Usuario de Postgres
DB_PASSWORD=PASSWORD #Reemplacen PASSWORD por la Contraseña de Postgres
DB_HOST=DOMAIN #Reemplacen DOMAIN por "localhost" si lo corren de manera local o el IP o Dominio de donde se encuentre si es un servidor externo.
PORT=PUERTO #Puerto en el que Express se va a poner a escuchar, para deploy es 80
```

**Atención:** Se espera que el servidor corra bajo el puerto por defecto de Postgres, si esta en uno distinto no va a poder conectarse.
## La carpeta "src" contiene:

- app.js: define como se comporta Express.js, no debería de tocarse a menos que quieran implementar alguna otra funcionalidad a express como por ejemplo usar HTTPS, o algún otro Middleware
- db.js: crea la instancia de Sequelize, levanta los modelos dentro de la carpeta "models" y deja espacio para hacer las relaciones. Exporta los modelos para luego usarlos a gusto y asi controlar la base de datos.
- Carpeta "Models", contiene los modelos separados en archivos .js, es importante que los nombres de los archivos ya empiecen con mayuscula y sean en singular, ya que van a ser el mismo nombre del modelo luego. Ya deje creado un User.js con el formato de como debería hacer los archivos a manera de ejemplo.
- "routes/index.js": contiene las rutas de los Endpoints, es importante no borrar la implementación de "router.all("\*", ...", el deploy depende de eso.

## El template ya integra ...

- Nodemon, con solo hacer un "npm start" o "pnpm start"
- Mocha, por si quieren hacer test los dejan dentro de la carpeta "tests", creando dentro una carpeta de nombre de las funcionalidad a probar y dentro los archivos de test terminando en ".spec.js"
- y demas dependencias que pueden ver dentro del "package.json"

## Agregar al .env lo siguiente para traer la data de la mockAPI:

MOCKAPI=https://my.api.mockaroo.com
APIKEY=784e5460
