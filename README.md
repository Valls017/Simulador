# Simulador QPACK (HTTP/3)

Este es un simulador web sencillo para entender mejor cómo funciona la compresión de encabezados en **QPACK**, el sistema usado en **HTTP/3**.

La idea del proyecto es mostrar de forma práctica cómo un header HTTP puede enviarse completo como texto o comprimirse usando un índice para ahorrar datos.

## ¿Qué hace?

El simulador muestra paso a paso cómo se procesa un header HTTP usando una lógica básica inspirada en QPACK.

Permite ver si un header:

- Se encuentra en la tabla estática.
- Ya existe en la tabla dinámica.
- Debe enviarse completo como texto.
- Se agrega a la tabla dinámica para reutilizarse después.

## Tablas usadas

### Tabla estática

Contiene headers comunes que ya están definidos, como por ejemplo:

- `:method`
- `:path`
- `:scheme`
- `content-type`

### Tabla dinámica

Empieza vacía y se va llenando con nuevos headers mientras se usa el simulador.

Esto permite ver cómo algunos valores pueden reutilizarse después mediante un índice.

## Tecnologías utilizadas

Este proyecto fue desarrollado usando tecnologías básicas de la web:

### HTML

Se usó para crear la estructura de la página, los formularios, botones, tablas y secciones del simulador.

### CSS

Se usó para dar estilo visual al simulador, organizar los elementos y hacer que la interfaz sea más clara y fácil de usar.

### JavaScript

Se usó para programar la lógica del simulador, manejar las tablas, comparar los headers ingresados y mostrar el resultado paso a paso.
