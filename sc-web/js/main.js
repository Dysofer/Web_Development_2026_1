/* ============================================
   SHOPPING CANADA — JavaScript principal
   ============================================ */

// ---- Logo en base64 ----
const LOGO_SRC = "assets/logo.png";

// ---- Carrito (estado global) ----
let cart = JSON.parse(localStorage.getItem('sc_cart') || '[]');

function saveCart() {
  localStorage.setItem('sc_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  showToast(`${product.name} agregado al carrito`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = Math.max(1, item.qty + delta);
    saveCart();
  }
}

function getCartTotal() {
  return cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
}

function updateCartBadge() {
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

// ---- Navbar ----
function initNavbar() {
  // Logo
  document.querySelectorAll('[data-logo]').forEach(el => {
    el.src = LOGO_SRC;
  });

  // Hamburger
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // Active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a, .navbar__mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  updateCartBadge();
}

// ---- Toast notification ----
function showToast(msg) {
  const existing = document.querySelector('.sc-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'sc-toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
    background: var(--brown-dark); color: var(--beige); padding: 12px 24px;
    border-radius: 8px; font-size: 13px; z-index: 9999;
    animation: fadeInUp 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ---- Qty controls ----
function initQtyControls() {
  document.querySelectorAll('.qty-control').forEach(ctrl => {
    const valEl = ctrl.querySelector('.qty-control__val');
    ctrl.querySelector('.qty-minus')?.addEventListener('click', () => {
      const v = parseInt(valEl.textContent);
      if (v > 1) valEl.textContent = v - 1;
    });
    ctrl.querySelector('.qty-plus')?.addEventListener('click', () => {
      valEl.textContent = parseInt(valEl.textContent) + 1;
    });
  });
}

// ---- Size & color selectors ----
function initSelectors() {
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.size-options')?.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      dot.closest('.color-options')?.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });
}

// ---- Payment method selector ----
function initPaymentMethods() {
  document.querySelectorAll('.pay-method').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.payment-methods')?.querySelectorAll('.pay-method').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// ---- Catalog tabs ----
function initCatalogTabs() {
  document.querySelectorAll('.catalog-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.catalog-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

// ---- Auth tabs ----
function initAuthTabs() {
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

// ---- Form validation (básico) ----
function initForms() {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#e24b4a';
          valid = false;
        } else {
          input.style.borderColor = '';
        }
      });
      if (valid) {
        const action = form.dataset.action;
        if (action) window.location.href = action;
      }
    });
  });
}

// ---- Wishlist toggle ----
function initWishlist() {
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
      const isActive = btn.classList.toggle('active');
      btn.textContent = isActive ? '♥' : '♡';
      btn.style.color = isActive ? '#e24b4a' : '';
    });
  });
}

// ---- CSS animation keyframe ----
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;
document.head.appendChild(style);

// ---- Init on DOMContentLoaded ----
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initQtyControls();
  initSelectors();
  initPaymentMethods();
  initCatalogTabs();
  initAuthTabs();
  initForms();
  initWishlist();
});
