/* ── Scroll Reveal ── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.10 });

document.querySelectorAll('section:not(#header)').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

/* ── Tab switching ── */
function activateTab(btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

/* ── Email form ── */
function handleSubscribe(e) {
    e.preventDefault();
    const input = e.target.querySelector('.email-input');
    const btn   = e.target.querySelector('.btn-cta');
    btn.textContent = '¡Listo!';
    btn.style.background = '#00875a';
    setTimeout(() => {
        btn.textContent = 'Suscribirse';
        btn.style.background = '';
        input.value = '';
    }, 3000);
}