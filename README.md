# Empezando con Next.js (React evolucionado)

## 1. Extensión de archivos JSX

Los archivos JSX (JavaScript XML) utilizados para páginas y componentes de React, nos permiten mezclar entre HTML y JS (incluso CSS si quisiesemos). Básicamente se comportan como cualquier archivo de JavaScript, salvo que, dentro del `return` de dicho componente o página devolverá HTML. Si queremos cambiar a devolver JavaScript, debemos utilizar llaves `{ }` para especificar que este fragmento será JS.

## 2. Estructura básica de archivos recomendada

Dando por hecho que queremos tres páginas: Inicio, Contacto y Servicios.

```
├── public/                                     # Se utiliza sobretodo para imágenes y otro tipo de archivos (pdf, etc...)
│
└── src/                                        # Carpeta principal del proyecto dónde se encuentran todos los archivos
    ├── app/                                    # Carpeta específica donde se van a encontrar las páginas, actúa como el router donde cada carpeta
    |   |                                         con un page.jsx dentro simboliza una ruta (endpoint)
    │   ├── layout.jsx                          # Equivalente al index.html: llamada a la hoja de estilos globales, etiquetas meta, el título
    |   |                                         de la página, importación de fuentes de texto externas, lo más importante: componentes que se
    |   |                                         verán en toda la web (Navbar, footer).
    │   ├── page.jsx                            # Equivalente al index.html también: la página de Inicio
    │   ├── globals.css                         # Hoja de estilos globales
    │   ├── favicon.ico                         # Bastante explicativo ya por el nombre
    │   ├── contacto/page.jsx                   # Página de contacto: Accediento a url.com/contacto; esta ruta devolvería lo que hay en page.jsx
    │   └── servicios/page.jsx                  # Página de servicios: Accediento a url.com/servicios; esta ruta devolvería lo que hay en page.jsx
    ├── components/                             # Carpeta específica donde se encontrarán los componentes utilizados en cualquiera de las páginas
    |   ├── Navbar.jsx
    |   ├── Footer.jsx
    │   └── etc...
    └── assets
        ├── styles/Navbar.module.css            # Módulos CSS para Navbar (y demás componentes y páginas)
        └── data/Navbar.json                    # Archivos json u otro tipo de archivos que representen datos que van a ser consumidos por los componentes
```

## 3. Hoja de estilos globales vs módulos CSS

Podemos elegir entre usar estilos globales (`globals.css`) y módulos, cada una se accede se maneras distintas e incluso podemos acceder a las dos en un mismo elemento de HTML.

### 3.1. Acceso a estilos globales

Dando por hecho que dentro de `globals.css` tenemos una clase llamada "contenedor":

```
    <div className="contenedor"></div>
```

### 3.2. Acceso a módulos CSS

Los módulos CSS son específicos de Next.js. En ellos, no se pueden hacer referencias a etiquetas HTML ni id, tienen que ser específicamente clases. Tampoco se pueden utilizar `-` ni `_` en los nombres de las clases. Recomendación: utilizar camelCase.

```
    import styles from "@/assets/styles/Navbar.module.css";

    export const Navbar = () => {
        return (
            <header>
                <nav className={styles.contenedor}>
                    <ul></ul>
                </nav>
            </header>
        );
    };
```

### 3.3. Acceso a los dos en una misma etiqueta HTML

Utilizando plantillas literales (template literals). Esto no daría problemas, una viene por estilos globales y otra por el módulo CSS importado.

```
    import styles from "@/assets/styles/Navbar.module.css";

    export const Navbar = () => {
        return (
            <header>
                <nav className=`contenedor ${styles.contenedor}`>
                    <ul></ul>
                </nav>
            </header>
        );
    };
```

## 4. Estructura básica de un componente

Podemos definirlo como una "Arrow Function":

```
    export const Navbar = () => {
        return (
            <header>
                <nav className={styles.contenedor}>
                    <ul></ul>
                </nav>
            </header>
        );
    };
```

O podemos definirlo como una función:

```
    export function Navbar() {
        return (
            <header>
                <nav className={styles.contenedor}>
                    <ul></ul>
                </nav>
            </header>
        );
    };
```

Ambos consiguen el mismo resultado. Al importar este componente en una página u otro componente, devolverá el contenido que hay dentro de `return`. Hay que tener en cuenta que se comportan como funciones, o sea que podríamos tener varios `return` con distintas condiciones.

### 4.1. Componentes sin children

En el caso de arriba, Navbar no acepta ningún children, al importarlo en nuestro `layout.jsx` lo llamaremos dentro de una etiqueta que se cierra sobre si misma:

```
    import { Navbar } from "@/components/navbar/Navbar";

    export default function RootLayout({ children }) {
        return (
            <html lang="en">
                <body className={inter.variable}>
                    <Navbar />                      <---- Se cierra sobre si mismo.
                    {children}
                </body>
            </html>
        );
    }
```

### 4.2. Componentes con children

Tenemos que pasarle por props (es decir, dentro del paréntesis) un objeto con el nombre children en específico:

```
    export const Card = ({ children }) => {
        return <div className={styles.contenedor}>{children}</div>;
    };
```

Al importar este componente, estamos obligados a referenciarlo como dos etiquetas, una de apertura y otra de cierre:

```
    import { Card } from "@/components/card/Card";

    export default function Home() {
        return (
            <main>
                <Card>                              <---- Etiqueta de apertura
                    <p>Algo que quiero mostrar</p>  <---- Children, podemos pasarle todos los que queramos
                </Card>                             <---- Etiqueta de cierre
            </main>
        );
    }
```

### 4.3. Componentes con props

Podemos tener todos los props que queremos. En este caso sería un único prop, además de `children`, con el nombre `title`:

```
    export const Card = ({ children, title }) => {
        return (
            <div>
                <h2>{title}</h2>
                {children}
            </div>
        );
    };
```

Al importar este componente, debemos pasarle en su etiqueta de apertura la prop con el nombre `title` en específico:

```
    import { Card } from "@/components/card/Card";

    export default function Home() {
        const cardTitle = "Hola!";

        return (
            <main>
                <Card title={cardTitle}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Omnis quibusdam expedita ipsam consequuntur minus esse
                        minima ab. Doloribus nemo quasi ducimus distinctio animi
                        provident, numquam eveniet! Cum corporis veritatis aperiam.
                    </p>
                </Card>
            </main>
        );
    }
```

## 5. React Hooks

Son funciones que vienen por defecto en React y se utilizan a menudo para sacar el máximo partido a esta librería. La regla de oro es siempre utilizarlos arriba del todo en tu componente, completamente prohíbido utilizarlos en:

- Condiciones
- Bucles
- Funciones anidadas

A continuación nombraré los tres hooks más utilizados, para qué se utilizan y un breve ejemplo de aplicando cada uno de ellos.

### 5.1 useState

Se utiliza para manejar estados, gracias a esto tu componente puede "recordar" cosas, le da memoria.

```
    const [estado, setEstado] = useState(false);
```

En este sencillo ejemplo, `estado` es una variable que se encuentra en `false` y `setEstado` es la función para alterar el estado de ella. Si quisiesemos alterar pasarla a `true` simplemente diríamos, obviamente si estaba en `true` pasaría a `false`:

```
 setEstado(!estado);
```
