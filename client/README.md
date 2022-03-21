# Arquetipo [NextJS](https://nextjs.org/)

Este arquetipo está pensado para servir como base en la creación de store-ends que se conecten a la API de Magento para la gestión de e-commerce.

Arquetipo de NextJS usando una tienda electronica de videojuegos, consumiendo los servicios por RestApi.

## Requisitos

-   [Git](https://git-scm.com/)
-   [Browser](https://www.google.com/intl/es-419/chrome/)
-   [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
-   [Node](https://nodejs.org/es/) (recomendado versión mayor a 12, mínimo versión mayor a 10)

## Instalación

### CLI

Forma automática en donde un paquete da una estructura predeterminada.

```console
yarn create next-app
```

### Manual

Inicializar un proyecto de npm.

```console
npm init -y
```

Instalar paquetes a usar y framework.

```console
yarn add next react react-dom
```

Remplazar scrips en el package.json por:

```json
  "dev": "next",
  "build": "next build",
  "start": "next start"
```

Crear carpeta de pages y ya queda listo NextJS para su uso.

Iniciar aplicación NextJS

```console
yarn dev
```

```console
npm run dev
```

### Estilos

Se recomienda no hacer uso de los modulos para los estilos de la pagina, debido a que si se usa elementos de modulos externos no se podrá acceder a las clases de estos desde el modulo, se recomienda crear un archivo de estilos en donde se importen todos los archivos de estilos de los modulos de la aplicación para posteriormente ser importado en el \_app.ts.

# Routing

NextJS usa routing basado en el FileSystem, esto quiere decir que Next hace routing dependiendo con el contenido de la carpeta de pages, si se desea hacer una ruta anidada se debe crear una carpeta y dentro de esta el archivo de typescript.

## Rutas dinámicas

Para hacer uso de las rutas dinámicas se debe crear un archivo nombrado: `[ID].js`, siendo ID el identificador de la pagina a la cúal se va a llamar desde el navegador.

```
https:localhost:3000/skyrim
                       ^
                  identificador
```

Para añadir el código de react y para tomar el id en el código se debe:

```javascript
import { useRouter } from "next/router"; // importar el router de next
...
const router = useRouter(); // instancia el router
...
router.query.ID; // tomar el query de la ruta para mostrar el id del producto
...
```

# [Variables de entorno](https://nextjs.org/docs/basic-features/environment-variables)

Importante: desinstalar dotenv primero:

```console
npm r dotenv
```

Para manejar las variables de entorno NextJS permite:

1. Usar `.env.local` para cargar variables de entorno en el entorno de Node.js, Next remplaza los secretos en compilacion para mantenerlos exclusivos del servidor, para referenciar desde el codigo las variables de entorno se debe: `process.env....`.

    Next permite establecer variables de entorno para todos los entornos `.env`, desarrollo `.env.development` y produccion `.env.production` que deben ser agregados al repositorio ya que definen valores predeterminados, y un entorno en donde se almacenaran los secretos `.env.local`, el cual debe estar agregado en el `.gitignore`.

    Tambien permite agregar un entorno de prueba `.env.test`, que es util cuando se realizan pruebas con `jest` o `cypress` para establecer variables especificamente para las pruebas, las cuales se cargan si `NODE_ENV` se establece en `test`

2. Exponer variables de entorno al navegador, se debe prefijar con `NEXT_PUBLIC_` la variable que se desea exponer, para referenciar las variables de entorno se debe: `process.env.NEXT_PUBLIC...`

# Control de dependencias

Las dependencias se instalar con npm o yarn como normalmente se instala en una aplicación de node.

# Guardianes

# Constantes

Crear archivo de constantes y exportarlas:

```typescript
export const CONSTANT_NAME = "CONSTANT_VALUE";
```

Importar las variables en el momento de usarlas:

```typescript
import { CONSTANT_NAME } from "../PATH";
```

# Implementación con GraphQL
