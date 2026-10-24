# ☕ Aroma & Code — Specialty Coffee Roasters
> **Base de Práctica para Modern Web Guidance (MWG): Eliminando Dependencias Innecesarias con la Plataforma Web Nativa**

Esta aplicación fue creada deliberadamente como punto de partida para una charla o taller. Representa un caso muy común en la industria: **una web que instala múltiples librerías de npm para resolver problemas que el navegador moderno ya soluciona de forma nativa con 0 dependencias**.

---

## 📊 Métricas Iniciales (Estado con Dependencias)

Ejecuta el build para ver el estado actual:
```bash
npm run build
```
* **Módulos transformados**: 15 módulos
* **Bundle JavaScript**: `~76 kB` (gracias a `@floating-ui/dom`, `aos`, `micromodal`, `just-validate`)
* **Bundle CSS**: `~35 kB` (incluyendo estilos de `aos`)

> 🎯 **El Objetivo con MWG:** Reemplazar cada librería por APIs nativas de la plataforma web, desinstalar las 4 dependencias y reducir el bundle JS a prácticamente **~2-3 kB**.

---

## 🚀 Cómo Iniciar el Servidor de Desarrollo

```bash
npm run dev
```
Abre la URL indicada (habitualmente `http://localhost:5173`) en tu navegador.

---

## 📦 Las 4 Dependencias Innecesarias y su Reemplazo con MWG

### 1. `@floating-ui/dom` (Tooltip de notas sensoriales)
* **¿Qué hace hoy?**: Mide posiciones con JavaScript (`computePosition`, `offset`, `flip`, `shift`) para ubicar el tooltip sobre el elemento.
* **Problema**: Carga código innecesario en el hilo principal para matemáticas de coordenadas.
* **Solución Nativa**: **Popover API** + **CSS Anchor Positioning** (`anchor-name`, `position-anchor`).
* **Búsqueda en MWG**:
  ```bash
  npx -y modern-web-guidance@latest search "anchor positioning popover tooltip"
  ```

---

### 2. `aos` *(Animate On Scroll)* (Animación de entrada de tarjetas)
* **¿Qué hace hoy?**: Observa el scroll con listeners pesados y aplica clases `fade-up`.
* **Problema**: Dependencia de librerías externas y CSS suplementario para efectos de entrada.
* **Solución Nativa**: **CSS Scroll-Driven Animations** (`animation-timeline: view()`, `animation-range`). Corre a 60/120 FPS en el hilo del compositor sin una sola línea de JS.
* **Búsqueda en MWG**:
  ```bash
  npx -y modern-web-guidance@latest search "scroll driven animation enter viewport timeline"
  ```

---

### 3. `micromodal` (Gestión de modales y backdrop)
* **¿Qué hace hoy?**: Gestiona clases `.is-open`, focus trapping y cierre en clicks fuera del modal de detalles y del carrito.
* **Problema**: Estructuras complejas en HTML (`modal__overlay`, `modal__container`) y lógica de accesibilidad reimplementada.
* **Solución Nativa**: Elemento estándar **`<dialog>`** con `.showModal()`, pseudoelemento **`::backdrop`** y focus trap nativo del navegador.
* **Búsqueda en MWG**:
  ```bash
  npx -y modern-web-guidance@latest search "modal dialog accessible showModal"
  ```

---

### 4. `just-validate` (Validación del formulario de suscripción)
* **¿Qué hace hoy?**: Intercepta el submit y añade clases `.just-validate-error-field` y mensajes dinámicos con reglas escritas en JS.
* **Problema**: Dependencia externa para validaciones sencillas de longitud, email y campos requeridos.
* **Solución Nativa**: **HTML5 Constraint Validation** combinado con los selectores CSS modernos **`:user-valid`**, **`:user-invalid`** y **`:has()`**.
* **Búsqueda en MWG**:
  ```bash
  npx -y modern-web-guidance@latest search "form validation user-valid has selector"
  ```

---

## ⚡ 3 Mejoras de Rendimiento y UX Adicionales

Además de eliminar las dependencias, la web incluye 3 oportunidades clásicas para auditar con MWG:

1. **Prioridad de carga LCP (Hero Image)**:
   - En `index.html`: Cambiar `loading="lazy"` por `fetchpriority="high"` y `decoding="async"`.
   - Consulta MWG: `npx -y modern-web-guidance@latest search "optimize image fetch priority LCP"`
2. **Diferir renderizado de catálogo fuera de pantalla**:
   - En `styles.css`: Aplicar `content-visibility: auto` y `contain-intrinsic-size` en `.product-card`.
   - Consulta MWG: `npx -y modern-web-guidance@latest search "defer rendering content-visibility"`
3. **Transición fluida al filtrar categorías**:
   - En `app.js`: Envolver el re-render en `document.startViewTransition(() => renderProducts(category))`.
   - Consulta MWG: `npx -y modern-web-guidance@latest search "view transitions DOM state filter"`

---

## 📁 Estructura del Proyecto

* [package.json](file:///Users/cbregante/Documents/charla-mwg/package.json): Configuración de Vite con las 4 librerías innecesarias instaladas.
* [index.html](file:///Users/cbregante/Documents/charla-mwg/index.html): Maquetación completa con atributos listos para las librerías y marcadores de modernización.
* [styles.css](file:///Users/cbregante/Documents/charla-mwg/styles.css): Estilos del diseño temático de cafetería y reglas de las librerías.
* [app.js](file:///Users/cbregante/Documents/charla-mwg/app.js): Lógica de la tienda importando `@floating-ui/dom`, `aos`, `micromodal` y `just-validate`.
