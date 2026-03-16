document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────────────
       CANVAS — SECUENCIA DE IMÁGENES COMO FONDO

       Cómo funciona:
       1. El canvas tiene position:absolute dentro del sticky
          → ya cubre el 100% del viewport
       2. Las imágenes se precargan en orden
       3. drawCover() escala la imagen para cubrir TODO
          el canvas (como background-size: cover)
       4. Al scrollear se calcula qué frame mostrar
    ───────────────────────────────────────────────── */
    const canvas  = document.getElementById('product-canvas');
    const ctx     = canvas.getContext('2d');

    // Tamaño del canvas = viewport (se actualiza al resize)
    function setSize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setSize();
    window.addEventListener('resize', () => {
        setSize();
        // Redibujar frame actual tras resize
        const img = images[lastFrame];
        if (img && img.complete && img.naturalWidth > 0) drawCover(img);
    });

    // ── Configuración ──────────────────────────────
    const frameCount = 742;
    const path = i => `./Secuencia/${String(i + 1).padStart(4, '0')}.png`;

    // Precargar todas las imágenes
    const images = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.onload = () => {
            loadedCount++;
            // Dibujar en cuanto llegue el primer frame
            if (loadedCount === 1) drawCover(img);
        };
        img.src = path(i);
        images.push(img);
    }

    // ── drawCover: escala la imagen tipo "cover" ───
    function drawCover(img) {
        if (!img || !img.naturalWidth) return;
        const sx = canvas.width  / img.naturalWidth;
        const sy = canvas.height / img.naturalHeight;
        const s  = Math.max(sx, sy);          // cover: el lado mayor manda
        const w  = img.naturalWidth  * s;
        const h  = img.naturalHeight * s;
        const x  = (canvas.width  - w) / 2;  // centrar horizontalmente
        const y  = (canvas.height - h) / 2;  // centrar verticalmente
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, w, h);
    }

    // ── Scroll → frame ────────────────────────────
    let lastFrame = 0;

    window.addEventListener('scroll', () => {
        const scrollTop  = window.scrollY;
        const maxScroll  = document.documentElement.scrollHeight - window.innerHeight;
        const fraction   = Math.min(1, scrollTop / maxScroll);
        const frameIndex = Math.min(frameCount - 1, Math.floor(fraction * frameCount));

        if (frameIndex === lastFrame) return;
        lastFrame = frameIndex;

        requestAnimationFrame(() => {
            const img = images[frameIndex];
            if (img && img.complete && img.naturalWidth > 0) {
                drawCover(img);
            }
            // Si el frame aún no cargó, simplemente se queda el frame anterior
        });
    });

    /* ─────────────────────────────────────────────────
       CARDS DEL HERO — IntersectionObserver
       Aparecen al 30% de visibilidad y desaparecen al salir
    ───────────────────────────────────────────────── */
    const cardObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('visible', entry.isIntersecting);
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.card').forEach(c => cardObserver.observe(c));

    /* ─────────────────────────────────────────────────
       SECCIONES INFERIORES — [data-scroll]
       Aparecen una sola vez al entrar al viewport
       data-delay="ms" para retraso escalonado
    ───────────────────────────────────────────────── */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const delay = parseInt(entry.target.dataset.delay || '0', 10);
            setTimeout(() => entry.target.classList.add('in-view'), delay);
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-scroll]').forEach(el => revealObserver.observe(el));

});