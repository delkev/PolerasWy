/* ================================
   URBANWEAR — script.js
   ================================ */

/* ----- LOADER ----- */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    const main   = document.getElementById('mainContent');
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      loader.style.display = 'none';
      main.style.opacity = '1';
    }, 500);
  }, 2500);
});

/* ----- NAVBAR SCROLL ----- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ----- MOBILE MENU ----- */
function toggleMobileMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

/* ----- CARRITO ----- */
let cartItems = [];

function addToCart(nombre, precio) {
  cartItems.push({ nombre, precio });
  renderCart();
  toggleCart(true);
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  renderCart();
}

function renderCart() {
  const lista    = document.getElementById('cartItems');
  const contador = document.getElementById('contador');
  const total    = document.getElementById('cartTotal');
  const empty    = document.getElementById('cartEmpty');
  const footer   = document.getElementById('cartFooter');

  lista.innerHTML = '';

  if (cartItems.length === 0) {
    empty.style.display = 'flex';
    footer.style.display = 'none';
    contador.textContent = '0';
    contador.style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  footer.style.display = 'block';
  contador.style.display = 'flex';
  contador.textContent = cartItems.length;

  let suma = 0;
  cartItems.forEach((item, i) => {
    suma += item.precio;
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <div class="cart-item-name">${item.nombre}</div>
        <div class="cart-item-price">S/ ${item.precio.toFixed(2)}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})" aria-label="Eliminar ${item.nombre}">×</button>
    `;
    lista.appendChild(li);
  });

  total.textContent = `S/ ${suma.toFixed(2)}`;
}

function toggleCart(forceOpen) {
  const cart    = document.getElementById('cart');
  const overlay = document.getElementById('cartOverlay');
  const isOpen  = cart.classList.contains('active');

  if (forceOpen === true && isOpen) return;

  cart.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.style.overflow = cart.classList.contains('active') ? 'hidden' : '';
}

/* Inicializar carrito */
renderCart();

/* ----- ANIMACIÓN DE CARDS ----- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
  observer.observe(card);
});

/* ----- WISHLIST (corazón) ----- */
document.querySelectorAll('.card-wishlist').forEach(btn => {
  btn.addEventListener('click', () => {
    const svg = btn.querySelector('svg');
    const active = btn.dataset.active === 'true';
    btn.dataset.active = !active;
    svg.style.fill = active ? 'none' : '#111';
  });
});