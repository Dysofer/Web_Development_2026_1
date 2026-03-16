document.addEventListener('DOMContentLoaded', () => {

    /* ──────────────────────────────────────────────────
       1. CANVAS — SECUENCIA DE IMÁGENES COMO FONDO
    ────────────────────────────────────────────────── */
    const canvas = document.getElementById('product-canvas');
    const ctx    = canvas.getContext('2d');

    function setSize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setSize();
    window.addEventListener('resize', () => {
        setSize();
        const img = images[lastFrame];
        if (img && img.complete && img.naturalWidth > 0) drawCover(img);
    });

    const frameCount = 742;

    // Ruta relativa a Semana7/index.html → Semana7/Secuencia/
    const path = i => `./Secuencia/${String(i + 1).padStart(4, '0')}.png`;

    const images = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.onload = () => {
            loadedCount++;
            if (loadedCount === 1) drawCover(img);
        };
        img.src = path(i);
        images.push(img);
    }

    function drawCover(img) {
        if (!img || !img.naturalWidth) return;
        const s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        const w = img.naturalWidth  * s;
        const h = img.naturalHeight * s;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    }

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
            if (img && img.complete && img.naturalWidth > 0) drawCover(img);
        });
    }, { passive: true });

    /* ──────────────────────────────────────────────────
       2. CARDS HERO — aparecen/desaparecen al scrollear
    ────────────────────────────────────────────────── */
    const cardObserver = new IntersectionObserver(entries => {
        entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting));
    }, { threshold: 0.3 });

    document.querySelectorAll('.card').forEach(c => cardObserver.observe(c));

    /* ──────────────────────────────────────────────────
       3. SECCIONES INFERIORES — data-scroll + data-delay
    ────────────────────────────────────────────────── */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const delay = parseInt(e.target.dataset.delay || '0', 10);
            setTimeout(() => e.target.classList.add('in-view'), delay);
            revealObserver.unobserve(e.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-scroll]').forEach(el => revealObserver.observe(el));

    /* ──────────────────────────────────────────────────
       4. HAMBURGER MENU
    ────────────────────────────────────────────────── */
    const toggle = document.getElementById('menuToggle');
    const nav    = document.getElementById('mainNav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            nav.classList.toggle('open');
        });
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('open');
                nav.classList.remove('open');
            });
        });
    }

});