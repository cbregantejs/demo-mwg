/* ========================================================
   AROMA & CODE — Specialty Coffee Roasters
   JavaScript con Dependencias Innecesarias de NPM para Demostración de MWG
   ======================================================== */

// 1. Dependencia innecesaria: @floating-ui/dom (Reemplazable con Popover + CSS Anchor Positioning)
import { computePosition, offset, flip, shift } from '@floating-ui/dom';

// 2. Dependencia innecesaria: aos (Reemplazable con CSS Scroll-Driven Animations)
import AOS from 'aos';
import 'aos/dist/aos.css';

// 3. Dependencia innecesaria: micromodal (Reemplazable con el elemento nativo <dialog> y ::backdrop)
import MicroModal from 'micromodal';

// 4. Dependencia innecesaria: just-validate (Reemplazable con :user-valid, :has() y Constraint Validation)
import JustValidate from 'just-validate';

// Datos del catálogo
const COFFEE_PRODUCTS = [
  {
    id: 'ethiopia-yirgacheffe',
    name: 'Etiopía Yirgacheffe G1',
    origin: 'Gedeo Zone, Etiopía',
    altitude: '2,100 msnm',
    process: 'Lavado',
    category: 'origen',
    notes: 'Jazmín, bergamota, té negro y miel de azahar.',
    roast: 'Tueste Claro',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    sensory: 'Acidez cítrica brillante, cuerpo sedoso y final dulce floral prolongado.'
  },
  {
    id: 'colombia-geisha',
    name: 'Colombia Huila Geisha',
    origin: 'Huila, Colombia',
    altitude: '1,950 msnm',
    process: 'Natural Anaeróbico 72h',
    category: 'origen',
    notes: 'Fruta de la pasión, mango maduro y flor de saúco.',
    roast: 'Tueste Medio-Claro',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80',
    sensory: 'Complejidad frutal explosiva con final jugoso aterciopelado.'
  },
  {
    id: 'blend-velvet-roast',
    name: 'Midnight Velvet Espresso Blend',
    origin: 'Guatemala & Brasil',
    altitude: '1,400 - 1,700 msnm',
    process: 'Honey & Lavado',
    category: 'blend',
    notes: 'Chocolate amargo 80%, avellana tostada y caramelo.',
    roast: 'Tueste Medio-Oscuro',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80',
    sensory: 'Crema densa color avellana, cuerpo pesado y acidez baja equilibrada.'
  },
  {
    id: 'coldbrew-nitrogen-reserve',
    name: 'Nitro Cold Brew Concentrate (500ml)',
    origin: 'Kenia Nyeri',
    altitude: '1,800 msnm',
    process: 'Maceración en frío 24h',
    category: 'coldbrew',
    notes: 'Grosella negra, ciruela roja y azúcar mascabado.',
    roast: 'Extracción Fría Filtrada',
    price: 14.50,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    sensory: 'Textura cremosa estilo cerveza stout con perfil refrescante.'
  },
  {
    id: 'costa-rica-tarrazu',
    name: 'Costa Rica Tarrazú Anaeróbico',
    origin: 'Tarrazú, Costa Rica',
    altitude: '1,750 msnm',
    process: 'Red Honey',
    category: 'origen',
    notes: 'Manzana roja, canela y sirope de arce.',
    roast: 'Tueste Medio',
    price: 19.00,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80',
    sensory: 'Dulzura profunda con cuerpo meloso y balance redondo.'
  },
  {
    id: 'blend-sunrise-filter',
    name: 'Sunrise Aeropress Blend',
    origin: 'Etiopía & Colombia',
    altitude: '1,800 msnm',
    process: 'Lavado',
    category: 'blend',
    notes: 'Mandarina, albaricoque y azúcar moreno.',
    roast: 'Tueste Claro',
    price: 17.50,
    image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=600&q=80',
    sensory: 'Limpio, ligero y vibrante; ideal para métodos de vertido manual.'
  },
  {
    id: 'guatemala-antigua',
    name: 'Guatemala Antigua Los Volcanes',
    origin: 'Valle de Antigua, Guatemala',
    altitude: '1,650 msnm',
    process: 'Lavado Tradicional',
    category: 'origen',
    notes: 'Cacao fino, nuez moscada y corteza de naranja.',
    roast: 'Tueste Medio',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&w=600&q=80',
    sensory: 'Notas especiadas elegantes cultivadas en suelo volcánico rico.'
  },
  {
    id: 'coldbrew-steep-packs',
    name: 'Steep-At-Home Cold Brew Bags (x6)',
    origin: 'Colombia & Etiopía Blend',
    altitude: '1,600 msnm',
    process: 'Molienda gruesa nitrogenada',
    category: 'coldbrew',
    notes: 'Melocotón dulce y cacao nibs.',
    roast: 'Fácil infusión 16h',
    price: 13.00,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    sensory: 'Práctico y balanceado para preparar en jarra en el refrigerador.'
  },
  {
    id: 'panama-boquete',
    name: 'Panamá Boquete Typica Clásico',
    origin: 'Chiriquí, Panamá',
    altitude: '1,700 msnm',
    process: 'Lavado',
    category: 'origen',
    notes: 'Vainilla natural, flores blancas y pera confitada.',
    roast: 'Tueste Claro',
    price: 22.50,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    sensory: 'Finura extraordinaria con una taza aromática y cristalina.'
  }
];

// Estado de la app
let cart = [];

// Elementos del DOM
const productsGrid = document.getElementById('productsGrid');
const categoryFilters = document.getElementById('categoryFilters');
const scrollProgressBar = document.getElementById('scrollProgressBar');
const floatingTooltip = document.getElementById('floatingTooltip');
const floatingTooltipText = document.getElementById('floatingTooltipText');
const modalProductBody = document.getElementById('modalProductBody');
const cartCountSpan = document.getElementById('cartCount');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalSum = document.getElementById('cartTotalSum');

// ========================================================
// 1. INICIALIZAR LIBRERÍAS DE TERCEROS
// ========================================================

// Inicialización de AOS (Animate on Scroll)
AOS.init({
  duration: 600,
  once: false,
});

// Inicialización de MicroModal
MicroModal.init({
  openClass: 'is-open',
  disableScroll: true,
  disableFocus: false,
  awaitOpenAnimation: false,
  awaitCloseAnimation: false
});

// ========================================================
// 2. RENDERIZADO DEL CATÁLOGO (Usa data-aos de la librería)
// ========================================================
function renderProducts(category = 'all') {
  const filtered = category === 'all'
    ? COFFEE_PRODUCTS
    : COFFEE_PRODUCTS.filter(p => p.category === category);

  // Renderizado de tarjetas con data-aos para que la librería las anime
  productsGrid.innerHTML = filtered.map((coffee, index) => `
    <article class="product-card" data-id="${coffee.id}" data-aos="fade-up" data-aos-delay="${(index % 3) * 100}">
      <div class="card-media-wrapper">
        <span class="card-tag">${coffee.process}</span>
        <img src="${coffee.image}" alt="${coffee.name}" class="card-image" loading="lazy">
      </div>
      <div class="card-content">
        <span class="card-origin">${coffee.origin} • ${coffee.altitude}</span>
        <h3 class="card-title">${coffee.name}</h3>
        <p class="card-notes">${coffee.notes}</p>
        
        <!-- Elemento disparador del tooltip posicionado con @floating-ui/dom -->
        <span class="taste-indicator" data-tooltip="${coffee.sensory}">
          ℹ️ Ver notas sensoriales
        </span>

        <div class="card-footer">
          <div class="card-price">$${coffee.price.toFixed(2)}</div>
          <div class="card-actions">
            <button class="btn-icon view-details-btn" data-id="${coffee.id}" title="Ver ficha técnica">
              🔍 Detalles
            </button>
            <button class="btn-icon add-cart-btn" data-id="${coffee.id}" title="Añadir al carrito">
              + Carrito
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  // Re-adjuntar listeners y refrescar AOS
  attachCardListeners();
  AOS.refresh();
}

// ========================================================
// ANTIPATRÓN 6: Filtros de categoría con reemplazo brusco del DOM
// (Mejorable con: document.startViewTransition)
// ========================================================
categoryFilters.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  categoryFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const category = btn.dataset.category;

  // Reemplazo brusco sin View Transitions
  renderProducts(category);
});

// ========================================================
// ANTIPATRÓN 5: Barra de lectura con listener de scroll en JS
// (Mejorable con: CSS Scroll-Driven Animations animation-timeline: scroll())
// ========================================================
window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
}, { passive: true });

// ========================================================
// DEPENDENCIA 1: Posicionamiento del tooltip con @floating-ui/dom
// (Mejorable con: Popover API + CSS Anchor Positioning)
// ========================================================
function attachCardListeners() {
  const indicators = document.querySelectorAll('.taste-indicator');

  indicators.forEach(indicator => {
    indicator.addEventListener('mouseenter', () => {
      const text = indicator.getAttribute('data-tooltip');
      floatingTooltipText.textContent = text;
      floatingTooltip.style.display = 'block';

      // Posicionamiento mediante la librería externa
      computePosition(indicator, floatingTooltip, {
        placement: 'top',
        middleware: [offset(10), flip(), shift({ padding: 10 })],
      }).then(({ x, y }) => {
        Object.assign(floatingTooltip.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    });

    indicator.addEventListener('mouseleave', () => {
      floatingTooltip.style.display = 'none';
    });
  });

  // Botón ver detalles (usa MicroModal)
  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      openProductModal(id);
    });
  });

  // Botón añadir al carrito
  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      addToCart(id);
    });
  });
}

// ========================================================
// DEPENDENCIA 3: MicroModal para abrir el modal
// (Mejorable con: <dialog id="..."> y dialog.showModal())
// ========================================================
function openProductModal(productId) {
  const coffee = COFFEE_PRODUCTS.find(p => p.id === productId);
  if (!coffee) return;

  modalProductBody.innerHTML = `
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <img src="${coffee.image}" alt="${coffee.name}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem;">
      <span class="card-origin">${coffee.origin} • ${coffee.altitude}</span>
      <h2 id="modalProductTitle" style="font-family: var(--font-serif); font-size: 1.8rem; margin: 0.4rem 0;">${coffee.name}</h2>
      <p style="color: var(--color-primary); font-weight: 600;">${coffee.process} | ${coffee.roast}</p>
    </div>
    <div style="background: var(--color-bg); padding: 1.2rem; border-radius: 8px; border: 1px solid var(--color-border); margin-bottom: 1.5rem;">
      <h4 style="margin-bottom: 0.5rem; color: var(--color-accent);">Perfil en Taza</h4>
      <p style="margin-bottom: 0.8rem;">${coffee.sensory}</p>
      <h4 style="margin-bottom: 0.5rem; color: var(--color-accent);">Notas Aromáticas</h4>
      <p>${coffee.notes}</p>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 1.6rem; font-weight: 800;">$${coffee.price.toFixed(2)}</span>
      <button class="btn btn-primary" id="modalAddToCartBtn">
        Agregar al Carrito
      </button>
    </div>
  `;

  document.getElementById('modalAddToCartBtn').addEventListener('click', () => {
    addToCart(coffee.id);
    MicroModal.close('productDetailModal');
  });

  // Abrir usando MicroModal
  MicroModal.show('productDetailModal');
}

// Lógica del Carrito
function addToCart(productId) {
  const coffee = COFFEE_PRODUCTS.find(p => p.id === productId);
  if (!coffee) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...coffee, qty: 1 });
  }

  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  cartCountSpan.textContent = totalItems;
}

function renderCart() {
  if (cart.length === 0) {
    cartItemsList.innerHTML = '<p class="empty-cart-msg">Tu carrito está vacío.</p>';
    cartTotalSum.textContent = '$0.00';
    return;
  }

  let total = 0;
  cartItemsList.innerHTML = cart.map(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    return `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small style="color: var(--color-text-muted);">$${item.price.toFixed(2)} x ${item.qty}</small>
        </div>
        <div>
          <span style="font-weight: 700; margin-right: 0.8rem;">$${subtotal.toFixed(2)}</span>
          <button style="background: none; border: none; color: var(--color-danger); cursor: pointer;" onclick="removeFromCart('${item.id}')">✕</button>
        </div>
      </div>
    `;
  }).join('');

  cartTotalSum.textContent = `$${total.toFixed(2)}`;
}

window.removeFromCart = function(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartBadge();
  renderCart();
};

document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }
  alert('¡Gracias por tu pedido de café de especialidad! (Demostración)');
  cart = [];
  updateCartBadge();
  MicroModal.close('cartModal');
});

// ========================================================
// DEPENDENCIA 4: just-validate para validar el formulario
// (Mejorable con: :user-valid, :user-invalid y :has() nativo)
// ========================================================
const validator = new JustValidate('#subscriptionForm', {
  errorFieldCssClass: 'just-validate-error-field',
  errorLabelCssClass: 'just-validate-error-label',
  errorLabelStyle: {
    color: '#e06c75',
    fontSize: '0.8rem',
    marginTop: '0.3rem',
  },
});

validator
  .addField('#subscriberName', [
    { rule: 'required', errorMessage: 'El nombre completo es obligatorio' },
    { rule: 'minLength', value: 3, errorMessage: 'Debe tener al menos 3 caracteres' },
  ])
  .addField('#subscriberEmail', [
    { rule: 'required', errorMessage: 'El correo electrónico es obligatorio' },
    { rule: 'email', errorMessage: 'Ingresa un formato de correo válido' },
  ])
  .addField('#frequencySelect', [
    { rule: 'required', errorMessage: 'Debes seleccionar una frecuencia de entrega' },
  ])
  .onSuccess((event) => {
    alert('🎉 ¡Te has suscrito exitosamente al Club de Café!');
    event.target.reset();
  });

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});
