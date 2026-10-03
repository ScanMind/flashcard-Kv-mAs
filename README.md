# Flashcards de técnica radiográfica (kV y mAs)

App web instalable (PWA) para memorizar kV y mAs de 98 proyecciones, de cráneo a pies, a partir de la *Guía de Bolsillo: Proyecciones Radiológicas*. Incluye modo nombre, modo imagen, examen con respuesta escrita, repaso espaciado, estadísticas y rangos por zona. Funciona sin internet una vez instalada.

## Archivos (todos van juntos, sin carpetas)

| Archivo | Para qué sirve |
|---|---|
| `index.html`, `styles.css`, `app.js` | la página, el diseño y la lógica |
| `data.js` | valores de la guía (kV, mA, mAs, RD, DFP, notas) |
| `images.js` | las 98 imágenes de las proyecciones |
| `manifest.webmanifest`, `sw.js` | permiten instalarla y usarla sin internet |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon.png` | íconos |

Son 13 archivos. Los 13 deben quedar en la **raíz** del repositorio, no dentro de una carpeta.

## Subirlo a GitHub Pages

1. Descomprime el zip y crea un repositorio nuevo en GitHub (público).
2. En el repositorio: *Add file → Upload files*. Selecciona o arrastra los 13 archivos y pulsa *Commit changes*. Revisa que los 13 aparezcan en la lista del repositorio, uno por uno.
3. Ve a *Settings → Pages*. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
4. En uno o dos minutos la app queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Instalarla en el celular

- **Android (Chrome):** menú ⋮ → *Instalar aplicación*.
- **iPhone (Safari):** botón Compartir → *Añadir a pantalla de inicio*.

Abre la app una vez con internet para que se guarde completa.

## Si algo no se ve

- **Imágenes sin aparecer:** confirma que `images.js` está en la raíz del repositorio y pesa unos 2.8 MB. Si falta, la tarjeta dirá "Imagen no disponible".
- **Sigue la versión vieja:** la app guarda una copia en el teléfono. Ábrela con internet, ciérrala del todo y vuelve a abrirla. Si no cambia, desinstálala y vuelve a instalarla.
- **Cuando cambies un archivo:** sube el número de `CACHE_VERSION` en `sw.js` (de `"v2"` a `"v3"`) para que los teléfonos descarguen lo nuevo.

## Cosas a tener en cuenta

- El progreso se guarda en cada teléfono y navegador. No se sincroniza, y borrar los datos del navegador lo elimina.
- Si el repositorio es público, cualquiera puede ver las imágenes y los valores de la guía.
- Los valores salen de la guía tal como están en ella. Verifica con tu instructor antes de usarlos en práctica clínica.
