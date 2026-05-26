// ================================================================
// CERIA BUSANA – Main App JS
// Firebase + Full E-Commerce Functionality
// ================================================================

// ---- CONFIG ----
const SHOP_CONFIG = {
  name: "Ceria Busana",
  whatsapp: "6281234567890", // GANTI NOMOR WA ADMIN
  currency: "Rp",
  shippingCost: 15000,
  freeShippingMin: 200000,
  flashSaleEnd: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 jam dari sekarang
};

const VOUCHERS = {
  "CERIA10": { type: "percent", value: 10 },
  "CERIA20": { type: "percent", value: 20 },
  "HEMAT50K": { type: "fixed", value: 50000 },
};

// ---- SAMPLE DATA (akan diganti Firebase) ----
const SAMPLE_PRODUCTS = [
  {
    id: "p001", name: "Daster Bunga Premium Rayon", category: "daster", price: 89000,
    originalPrice: 120000, discount: 26, stock: 45, sold: 234, rating: 4.8, reviewCount: 89,
    emoji: "👗", isFlashSale: true, isBestSeller: true, isNew: false,
    colors: ["#f9a8d4","#c084fc","#818cf8","#fde68a"],
    sizes: ["S","M","L","XL","XXL"],
    fabrics: ["Rayon","Katun"],
    motifs: ["Bunga","Abstrak"],
    description: "Daster rayon premium dengan motif bunga cantik. Bahan super lembut dan adem, cocok untuk santai di rumah maupun tidur. Jahitan rapi dan tahan lama."
  },
  {
    id: "p002", name: "Baju Anak Karakter Lucu", category: "baju-anak", price: 65000,
    originalPrice: 85000, discount: 24, stock: 30, sold: 178, rating: 4.9, reviewCount: 67,
    emoji: "👶", isFlashSale: true, isBestSeller: false, isNew: false,
    colors: ["#fde68a","#fb923c","#34d399","#0ea5e9"],
    sizes: ["1-2th","3-4th","5-6th","7-8th"],
    fabrics: ["Katun"],
    motifs: ["Karakter","Polos"],
    description: "Baju anak lucu dengan motif karakter kesukaan si kecil. Bahan katun 100% yang lembut di kulit anak, tidak panas, dan mudah dicuci."
  },
  {
    id: "p003", name: "Daster Batik Klasik Elegan", category: "daster", price: 110000,
    originalPrice: 150000, discount: 27, stock: 20, sold: 312, rating: 4.7, reviewCount: 102,
    emoji: "🎨", isFlashSale: false, isBestSeller: true, isNew: false,
    colors: ["#1e1b4b","#7c3aed","#dc2626"],
    sizes: ["S","M","L","XL","XXL","3XL"],
    fabrics: ["Katun Premium","Mori"],
    motifs: ["Batik","Custom"],
    description: "Daster batik klasik dengan desain elegan. Cocok untuk berbagai kesempatan, dari santai hingga arisan keluarga. Motif batik autentik dengan warna yang tahan lama."
  },
  {
    id: "p004", name: "Baju Anak Piyama Bintang", category: "baju-anak", price: 75000,
    originalPrice: 95000, discount: 21, stock: 55, sold: 145, rating: 4.8, reviewCount: 54,
    emoji: "⭐", isFlashSale: false, isBestSeller: false, isNew: true,
    colors: ["#0ea5e9","#8b5cf6","#f43f5e"],
    sizes: ["1-2th","3-4th","5-6th","7-8th","9-10th"],
    fabrics: ["Katun","Jersey"],
    motifs: ["Bintang","Polos"],
    description: "Piyama anak motif bintang yang super nyaman untuk tidur. Bahan lembut dan hangat, cocok untuk malam hari. Tersedia dalam berbagai warna ceria."
  },
  {
    id: "p005", name: "Daster Polos Premium Maxi", category: "daster", price: 95000,
    originalPrice: 130000, discount: 27, stock: 40, sold: 267, rating: 4.9, reviewCount: 93,
    emoji: "👗", isFlashSale: true, isBestSeller: true, isNew: false,
    colors: ["#ffffff","#f9a8d4","#c084fc","#34d399","#fb923c","#0ea5e9"],
    sizes: ["S","M","L","XL","XXL","3XL"],
    fabrics: ["Rayon","Katun Premium"],
    motifs: ["Polos"],
    description: "Daster maxi polos premium dengan bahan rayon berkualitas tinggi. Jatuhnya indah di tubuh, adem, dan sangat nyaman dipakai seharian. Tersedia dalam banyak pilihan warna."
  },
  {
    id: "p006", name: "Gamis Anak Cantik", category: "baju-anak", price: 85000,
    originalPrice: 110000, discount: 23, stock: 25, sold: 98, rating: 4.7, reviewCount: 42,
    emoji: "🧕", isFlashSale: false, isBestSeller: false, isNew: true,
    colors: ["#f9a8d4","#c084fc","#fde68a"],
    sizes: ["1-2th","3-4th","5-6th","7-8th"],
    fabrics: ["Katun","Rayon"],
    motifs: ["Bunga","Polos"],
    description: "Gamis anak cantik dan syari. Bahan adem, nyaman dipakai anak bermain. Tersedia berbagai motif cantik yang disukai anak perempuan."
  },
  {
    id: "p007", name: "Daster Polkadot Imut", category: "daster", price: 79000,
    originalPrice: 99000, discount: 20, stock: 35, sold: 189, rating: 4.6, reviewCount: 71,
    emoji: "⚫", isFlashSale: false, isBestSeller: false, isNew: true,
    colors: ["#ffffff","#f9a8d4","#0ea5e9"],
    sizes: ["S","M","L","XL"],
    fabrics: ["Katun","Rayon"],
    motifs: ["Polkadot"],
    description: "Daster polkadot imut dengan tampilan segar dan ceria. Bahan ringan dan adem, ideal untuk dipakai sehari-hari di rumah."
  },
  {
    id: "p008", name: "Baju Anak Setelan Casual", category: "baju-anak", price: 90000,
    originalPrice: 120000, discount: 25, stock: 20, sold: 134, rating: 4.8, reviewCount: 58,
    emoji: "👕", isFlashSale: true, isBestSeller: true, isNew: false,
    colors: ["#1e1b4b","#7c3aed","#dc2626","#0ea5e9"],
    sizes: ["2-3th","4-5th","6-7th","8-9th"],
    fabrics: ["Katun"],
    motifs: ["Polos","Bordir"],
    description: "Setelan baju anak casual yang stylish dan nyaman. Terdiri dari atasan dan celana, cocok untuk aktivitas sehari-hari si kecil. Jahitan rapi dan kuat."
  },
];

const TESTIMONIALS = [
  { name: "Ibu Sari", location: "Jakarta", stars: 5, text: "Dasternya bagus banget! Bahan lembut, jahitan rapi. Udah beli 3x dan selalu puas. Recommended banget!", product: "Daster Bunga Premium" },
  { name: "Bunda Rina", location: "Surabaya", stars: 5, text: "Baju anaknya lucu-lucu dan berkualitas. Anak saya suka banget. Pengiriman juga cepat!", product: "Baju Anak Karakter" },
  { name: "Mbak Dewi", location: "Bandung", stars: 5, text: "Custom ukurannya pas banget! Adminnya ramah dan responsif. Hasilnya melebihi ekspektasi.", product: "Custom Order" },
  { name: "Teh Nurul", location: "Yogyakarta", stars: 4, text: "Daster batiknya cantik banget. Motifnya unik dan bahannya enak dipakai. Harga juga terjangkau!", product: "Daster Batik Klasik" },
  { name: "Bu Fitri", location: "Medan", stars: 5, text: "Toko terpercaya! Gambar sama aslinya sesuai. Langsung pesan lagi untuk oleh-oleh keluarga.", product: "Daster Polos Maxi" },
  { name: "Mama Zahra", location: "Makassar", stars: 5, text: "Gamis anaknya manis sekali. Jahitannya halus, bahannya adem. Anak betah pakainya. Beli lagi pasti!", product: "Gamis Anak" },
];

// ---- STATE ----
let cart = JSON.parse(localStorage.getItem('cb_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('cb_wishlist') || '[]');
let currentFilter = 'all';
let currentSort = 'newest';
let displayedCount = 8;
let logoTapCount = 0;
let logoTapTimer = null;
let appliedVoucher = null;
let activeDrawer = null;

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initBannerSlider();
  initCountdown();
  renderSkeletons();
  setTimeout(() => {
    renderFlashSaleProducts();
    renderPopularProducts();
    renderAllProducts();
    renderTestimonials();
  }, 800);
  initSearch();
  initCart();
  initWishlist();
  initLogoTap();
  initCategoryNav();
  initFilterButtons();
  initCustomForm();
  initUploadArea();
  updateCartBadge();
  updateWishlistBadge();
  initScrollTop();
  initServiceWorker();
});

// ---- LOADER ----
function initLoader() {
  setTimeout(() => {
    document.getElementById('page-loader').classList.add('hidden');
  }, 1800);
}

// ---- THEME ----
function initTheme() {
  const saved = localStorage.getItem('cb_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('cb_theme', next);
  updateThemeIcon(next);
}
function updateThemeIcon(theme) {
  document.getElementById('theme-icon').className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ---- BANNER SLIDER ----
function initBannerSlider() {
  const slider = document.getElementById('banner-slider');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  const slides = slider.querySelectorAll('.banner-slide');

  function goTo(n) {
    currentSlide = (n + slides.length) % slides.length;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  document.getElementById('banner-next').addEventListener('click', () => goTo(currentSlide + 1));
  document.getElementById('banner-prev').addEventListener('click', () => goTo(currentSlide - 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  setInterval(() => goTo(currentSlide + 1), 4000);
}

// ---- COUNTDOWN ----
function initCountdown() {
  function update() {
    const diff = SHOP_CONFIG.flashSaleEnd - Date.now();
    if (diff <= 0) { document.getElementById('countdown').innerHTML = '<span>Berakhir</span>'; return; }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2,'0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2,'0');
  }
  update();
  setInterval(update, 1000);
}

// ---- SKELETON ----
function renderSkeletons() {
  const popularEl = document.getElementById('popular-products');
  const allEl = document.getElementById('all-products');
  const skeletonHTML = Array(4).fill(`
    <div class="skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text short"></div>
      <div class="skeleton skeleton-text price"></div>
    </div>
  `).join('');
  popularEl.innerHTML = skeletonHTML;
  allEl.innerHTML = skeletonHTML + skeletonHTML;
}

// ---- RENDER PRODUCTS ----
function formatPrice(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '';
  for (let i = 0; i < full; i++) s += '★';
  if (half) s += '½';
  for (let i = full + (half?1:0); i < 5; i++) s += '☆';
  return s;
}

function productCardHTML(p, compact = false) {
  const inWishlist = wishlist.includes(p.id);
  return `
    <div class="product-card ${compact ? 'compact' : ''}" onclick="openProductModal('${p.id}')">
      <div class="product-img-wrap">
        <div class="product-img-placeholder">${p.emoji}</div>
        <div class="product-badges">
          ${p.isFlashSale ? '<span class="badge-flash">⚡ Flash Sale</span>' : ''}
          ${p.isBestSeller ? '<span class="badge-best">🔥 Best Seller</span>' : ''}
          ${p.isNew ? '<span class="badge-new">🆕 Baru</span>' : ''}
        </div>
        <button class="product-wishlist ${inWishlist ? 'active' : ''}" onclick="toggleWishlist(event,'${p.id}')">
          <i class="fas fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span class="stars">${renderStars(p.rating)}</span>
          <span class="rating-count">(${p.reviewCount})</span>
        </div>
        <div class="product-prices">
          ${p.originalPrice ? `<span class="price-original">${formatPrice(p.originalPrice)}</span>` : ''}
          <span class="price-discount">${formatPrice(p.price)}</span>
          ${p.discount ? `<span class="price-tag">${p.discount}%</span>` : ''}
        </div>
        <div class="product-sold">${p.sold.toLocaleString('id-ID')} terjual</div>
        <button class="product-add-btn" onclick="quickAddToCart(event,'${p.id}')">
          <i class="fas fa-shopping-bag"></i> Beli
        </button>
      </div>
    </div>
  `;
}

function renderFlashSaleProducts() {
  const el = document.getElementById('flash-sale-products');
  const flash = SAMPLE_PRODUCTS.filter(p => p.isFlashSale);
  el.innerHTML = flash.map(p => `
    <div style="min-width:160px;max-width:180px">
      ${productCardHTML(p, true)}
    </div>
  `).join('');
}

function renderPopularProducts() {
  const el = document.getElementById('popular-products');
  const popular = SAMPLE_PRODUCTS.filter(p => p.isBestSeller);
  el.innerHTML = popular.map(p => productCardHTML(p)).join('');
}

function renderAllProducts() {
  const el = document.getElementById('all-products');
  let filtered = [...SAMPLE_PRODUCTS];
  if (currentFilter !== 'all') {
    if (currentFilter === 'flash-sale') filtered = filtered.filter(p => p.isFlashSale);
    else if (currentFilter === 'bestseller') filtered = filtered.filter(p => p.isBestSeller);
    else filtered = filtered.filter(p => p.category === currentFilter);
  }
  if (currentSort === 'price-low') filtered.sort((a,b) => a.price - b.price);
  else if (currentSort === 'price-high') filtered.sort((a,b) => b.price - a.price);
  else if (currentSort === 'rating') filtered.sort((a,b) => b.rating - a.rating);
  else if (currentSort === 'sold') filtered.sort((a,b) => b.sold - a.sold);
  const shown = filtered.slice(0, displayedCount);
  el.innerHTML = shown.map(p => productCardHTML(p)).join('');
  document.getElementById('load-more-btn').style.display = shown.length < filtered.length ? 'inline-flex' : 'none';
}

function renderTestimonials() {
  const el = document.getElementById('testimonials-slider');
  el.innerHTML = TESTIMONIALS.map(t => `
    <div class="testi-card">
      <div class="testi-header">
        <div class="testi-avatar">${t.name[0]}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-location">📍 ${t.location}</div>
        </div>
      </div>
      <div class="testi-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5-t.stars)}</div>
      <div class="testi-text">"${t.text}"</div>
      <div class="testi-product">📦 ${t.product}</div>
    </div>
  `).join('');
}

// ---- SEARCH ----
function initSearch() {
  const input = document.getElementById('search-input');
  const dropdown = document.getElementById('search-results');
  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      if (!q) { dropdown.classList.remove('show'); return; }
      const results = SAMPLE_PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 5);
      if (!results.length) { dropdown.innerHTML = '<div class="search-item"><span>Produk tidak ditemukan</span></div>'; dropdown.classList.add('show'); return; }
      dropdown.innerHTML = results.map(p => `
        <div class="search-item" onclick="openProductModal('${p.id}')">
          <div class="search-item-img">${p.emoji}</div>
          <div>
            <div style="font-size:0.85rem;font-weight:600">${p.name}</div>
            <div style="font-size:0.75rem;color:var(--text2)">${formatPrice(p.price)}</div>
          </div>
        </div>
      `).join('');
      dropdown.classList.add('show');
    }, 250);
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) dropdown.classList.remove('show');
  });
}

// ---- CATEGORY & FILTER ----
function initCategoryNav() {
  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCategory(btn.dataset.cat);
    });
  });
}

function filterCategory(cat) {
  currentFilter = cat;
  displayedCount = 8;
  renderAllProducts();
  document.getElementById('latest-section').scrollIntoView({ behavior: 'smooth' });
}

function initFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCategory(btn.dataset.filter);
    });
  });
  document.getElementById('sort-select').addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderAllProducts();
  });
  document.getElementById('load-more-btn').addEventListener('click', () => {
    displayedCount += 8;
    renderAllProducts();
  });
  document.getElementById('view-all-btn').addEventListener('click', () => {
    currentFilter = 'all'; displayedCount = 100;
    renderAllProducts();
  });
}

// ---- PRODUCT MODAL ----
function openProductModal(id) {
  const p = SAMPLE_PRODUCTS.find(x => x.id === id);
  if (!p) return;
  let selectedColor = p.colors[0];
  let selectedSize = p.sizes[0];
  let qty = 1;

  const html = `
    <div class="modal-product-layout">
      <div class="modal-img-section">
        <div class="modal-main-img">${p.emoji}</div>
      </div>
      <div class="modal-info">
        <div class="modal-name">${p.name}</div>
        <div class="modal-prices">
          <span class="modal-price-disc">${formatPrice(p.price)}</span>
          ${p.originalPrice ? `<span class="modal-price-orig">${formatPrice(p.originalPrice)}</span>` : ''}
          ${p.discount ? `<span class="modal-badge">${p.discount}% OFF</span>` : ''}
        </div>
        <div class="modal-rating">
          <span style="color:#f59e0b">${renderStars(p.rating)}</span>
          <span>${p.rating} (${p.reviewCount} ulasan)</span>
          <span>•</span>
          <span>${p.sold.toLocaleString('id-ID')} terjual</span>
        </div>
        <p class="modal-desc">${p.description}</p>

        <div class="modal-option-label">Warna</div>
        <div class="modal-colors" id="modal-colors">
          ${p.colors.map(c => `<div class="modal-color-dot ${c === selectedColor ? 'active' : ''}" style="background:${c}" data-color="${c}" onclick="selectColor('${id}','${c}')"></div>`).join('')}
        </div>

        <div class="modal-option-label">Ukuran</div>
        <div class="modal-sizes" id="modal-sizes">
          ${p.sizes.map(s => `<button class="modal-size-btn ${s === selectedSize ? 'active' : ''}" onclick="selectSize('${id}','${s}')">${s}</button>`).join('')}
        </div>

        <div class="modal-option-label">Bahan</div>
        <div class="modal-sizes" id="modal-fabrics">
          ${p.fabrics.map(f => `<button class="modal-size-btn" onclick="this.parentElement.querySelectorAll('.modal-size-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active')">${f}</button>`).join('')}
        </div>

        <div class="modal-qty-section">
          <span class="modal-qty-label">Jumlah:</span>
          <div class="modal-qty-ctrl">
            <button class="modal-qty-btn" id="modal-qty-minus">−</button>
            <span class="modal-qty-num" id="modal-qty-num">1</span>
            <button class="modal-qty-btn" id="modal-qty-plus">+</button>
          </div>
          <span style="font-size:0.8rem;color:var(--text3)">Stok: ${p.stock}</span>
        </div>

        <div class="modal-action-btns">
          <button class="modal-btn-cart" onclick="addToCartFromModal('${id}')">
            <i class="fas fa-shopping-bag"></i> Keranjang
          </button>
          <button class="btn-primary modal-btn-buy" onclick="buyNow('${id}')">
            <i class="fas fa-bolt"></i> Beli Sekarang
          </button>
        </div>
        <div style="margin-top:12px">
          <button style="font-size:0.8rem;color:var(--text3);display:flex;align-items:center;gap:6px" onclick="shareProduct('${id}')">
            <i class="fas fa-share-alt"></i> Bagikan Produk
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('product-modal-overlay').classList.add('show');
  document.body.style.overflow = 'hidden';

  // Qty controls
  let q = 1;
  document.getElementById('modal-qty-minus').onclick = () => { if(q>1){q--;document.getElementById('modal-qty-num').textContent=q;} };
  document.getElementById('modal-qty-plus').onclick = () => { if(q<p.stock){q++;document.getElementById('modal-qty-num').textContent=q;} };
  window._modalQty = () => q;
  window._modalProductId = id;
}

document.getElementById('modal-close').addEventListener('click', closeProductModal);
document.getElementById('product-modal-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('product-modal-overlay')) closeProductModal();
});
function closeProductModal() {
  document.getElementById('product-modal-overlay').classList.remove('show');
  document.body.style.overflow = '';
}

function selectColor(pid, color) {
  document.querySelectorAll('.modal-color-dot').forEach(d => d.classList.toggle('active', d.dataset.color === color));
  window._selectedColor = color;
}
function selectSize(pid, size) {
  document.querySelectorAll('.modal-size-btn').forEach(b => {
    if (b.textContent === size) b.classList.add('active');
    else b.classList.remove('active');
  });
  window._selectedSize = size;
}

// ---- CART ----
function initCart() {
  document.getElementById('cart-btn').addEventListener('click', openCart);
  document.getElementById('bot-cart-btn').addEventListener('click', openCart);
  document.getElementById('floating-cart').addEventListener('click', openCart);
  document.getElementById('cart-close').addEventListener('click', closeDrawer);
  document.getElementById('overlay').addEventListener('click', closeDrawer);
  document.getElementById('checkout-btn').addEventListener('click', openCheckoutModal);
}

function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
  activeDrawer = 'cart';
  renderCartItems();
}

function closeDrawer() {
  document.querySelectorAll('.drawer').forEach(d => d.classList.remove('open'));
  document.getElementById('overlay').classList.remove('show');
  document.body.style.overflow = '';
  activeDrawer = null;
}

function addToCart(productId, qty = 1, color = '', size = '', fabric = '', notes = '') {
  const p = SAMPLE_PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  const variantKey = `${productId}_${color}_${size}_${fabric}`;
  const existing = cart.find(item => item.variantKey === variantKey);
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, p.stock);
  } else {
    cart.push({ id: productId, variantKey, name: p.name, price: p.price, emoji: p.emoji, qty, color, size, fabric, notes });
  }
  saveCart();
  updateCartBadge();
  showToast(`${p.name} ditambahkan ke keranjang 🛍️`, 'success');
}

function quickAddToCart(e, id) {
  e.stopPropagation();
  const p = SAMPLE_PRODUCTS.find(x => x.id === id);
  addToCart(id, 1, p.colors[0], p.sizes[0], p.fabrics[0]);
}

function addToCartFromModal(id) {
  const p = SAMPLE_PRODUCTS.find(x => x.id === id);
  const qty = window._modalQty ? window._modalQty() : 1;
  const color = window._selectedColor || p.colors[0];
  const size = document.querySelector('#modal-sizes .active')?.textContent || p.sizes[0];
  const fabric = document.querySelector('#modal-fabrics .active')?.textContent || p.fabrics[0];
  addToCart(id, qty, color, size, fabric);
}

function buyNow(id) {
  addToCartFromModal(id);
  closeProductModal();
  setTimeout(openCart, 300);
}

function removeFromCart(variantKey) {
  cart = cart.filter(item => item.variantKey !== variantKey);
  saveCart();
  updateCartBadge();
  renderCartItems();
}

function updateQty(variantKey, delta) {
  const item = cart.find(i => i.variantKey === variantKey);
  if (!item) return;
  const p = SAMPLE_PRODUCTS.find(x => x.id === item.id);
  item.qty = Math.max(1, Math.min(item.qty + delta, p ? p.stock : 99));
  saveCart();
  updateCartBadge();
  renderCartItems();
}

function saveCart() { localStorage.setItem('cb_cart', JSON.stringify(cart)); }

function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  ['cart-count','bot-cart-count','floating-cart-count'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = total;
  });
  const floatBtn = document.getElementById('floating-cart');
  if (floatBtn && window.innerWidth >= 768) floatBtn.style.display = total > 0 ? 'flex' : 'none';
}

function renderCartItems() {
  const el = document.getElementById('cart-items');
  const footer = document.getElementById('cart-footer');
  if (!cart.length) {
    el.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛍️</div><p>Keranjang masih kosong</p><button class="btn-primary" onclick="closeDrawer()">Mulai Belanja</button></div>`;
    footer.style.display = 'none';
    return;
  }
  el.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-variant">
          ${item.size ? `Ukuran: ${item.size}` : ''}
          ${item.fabric ? ` | Bahan: ${item.fabric}` : ''}
        </div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="updateQty('${item.variantKey}', -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty('${item.variantKey}', 1)">+</button>
          <button class="cart-item-delete" onclick="removeFromCart('${item.variantKey}')"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>
  `).join('');
  footer.style.display = 'block';
  updateCartSummary();
}

function updateCartSummary() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= SHOP_CONFIG.freeShippingMin ? 0 : SHOP_CONFIG.shippingCost;
  let discount = 0;
  if (appliedVoucher) {
    const v = VOUCHERS[appliedVoucher];
    discount = v.type === 'percent' ? Math.floor(subtotal * v.value / 100) : v.value;
  }
  const total = subtotal + shipping - discount;
  document.getElementById('cart-subtotal').textContent = formatPrice(subtotal);
  document.getElementById('cart-shipping').textContent = shipping === 0 ? 'GRATIS' : formatPrice(shipping);
  document.getElementById('cart-total').textContent = formatPrice(total);
  if (discount > 0) {
    document.getElementById('discount-row').style.display = 'flex';
    document.getElementById('cart-discount').textContent = '-' + formatPrice(discount);
  }
}

function applyVoucher() {
  const code = document.getElementById('voucher-code').value.trim().toUpperCase();
  if (VOUCHERS[code]) {
    appliedVoucher = code;
    updateCartSummary();
    showToast(`Voucher ${code} berhasil dipakai! 🎉`, 'success');
  } else {
    showToast('Kode voucher tidak valid', 'error');
  }
}

// ---- WISHLIST ----
function initWishlist() {
  document.getElementById('wishlist-btn').addEventListener('click', openWishlist);
  document.getElementById('bot-wishlist-btn').addEventListener('click', openWishlist);
  document.getElementById('wishlist-close').addEventListener('click', closeDrawer);
}

function openWishlist() {
  document.getElementById('wishlist-drawer').classList.add('open');
  document.getElementById('overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
  activeDrawer = 'wishlist';
  renderWishlist();
}

function toggleWishlist(e, id) {
  e.stopPropagation();
  const idx = wishlist.indexOf(id);
  if (idx === -1) {
    wishlist.push(id);
    showToast('Ditambahkan ke wishlist ❤️', 'info');
  } else {
    wishlist.splice(idx, 1);
    showToast('Dihapus dari wishlist', 'info');
  }
  localStorage.setItem('cb_wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
  e.currentTarget.classList.toggle('active', wishlist.includes(id));
}

function updateWishlistBadge() {
  document.getElementById('wishlist-count').textContent = wishlist.length;
}

function renderWishlist() {
  const el = document.getElementById('wishlist-items');
  if (!wishlist.length) {
    el.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">💝</div><p>Wishlist masih kosong</p></div>`;
    return;
  }
  const items = SAMPLE_PRODUCTS.filter(p => wishlist.includes(p.id));
  el.innerHTML = items.map(p => `
    <div class="cart-item" onclick="openProductModal('${p.id}')">
      <div class="cart-item-img">${p.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-price">${formatPrice(p.price)}</div>
        <button class="product-add-btn" style="max-width:140px;margin-top:6px;padding:6px 12px;font-size:0.75rem" onclick="event.stopPropagation();addToCart('${p.id}')">
          <i class="fas fa-shopping-bag"></i> Tambah ke Keranjang
        </button>
      </div>
    </div>
  `).join('');
}

// ---- CHECKOUT ----
function openCheckoutModal() {
  if (!cart.length) return;
  document.getElementById('checkout-modal-overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
  renderCheckoutSummary();
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal-overlay').classList.remove('show');
  document.body.style.overflow = '';
}

document.getElementById('checkout-modal-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('checkout-modal-overlay')) closeCheckoutModal();
});

function renderCheckoutSummary() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= SHOP_CONFIG.freeShippingMin ? 0 : SHOP_CONFIG.shippingCost;
  let discount = 0;
  if (appliedVoucher) {
    const v = VOUCHERS[appliedVoucher];
    discount = v.type === 'percent' ? Math.floor(subtotal * v.value / 100) : v.value;
  }
  const total = subtotal + shipping - discount;
  const txnId = 'CB' + Date.now().toString(36).toUpperCase();

  const html = `
    <div class="transaction-number">
      <div class="txn-label">Nomor Transaksi</div>
      <div class="txn-number">#${txnId}</div>
    </div>
    <div class="checkout-items-summary">
      ${cart.map(i => `
        <div class="checkout-item-row">
          <span>${i.emoji} ${i.name} ${i.size ? `(${i.size})` : ''} x${i.qty}</span>
          <span>${formatPrice(i.price * i.qty)}</span>
        </div>
      `).join('')}
    </div>
    <div class="checkout-total-section">
      <div class="checkout-total-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
      <div class="checkout-total-row"><span>Ongkir</span><span>${shipping === 0 ? 'GRATIS' : formatPrice(shipping)}</span></div>
      ${discount ? `<div class="checkout-total-row"><span>Diskon Voucher</span><span style="color:#10b981">-${formatPrice(discount)}</span></div>` : ''}
      <div class="checkout-total-row checkout-grand-total"><span>TOTAL</span><span>${formatPrice(total)}</span></div>
    </div>
  `;

  document.getElementById('checkout-summary-area').innerHTML = html;
  window._checkoutTotal = total;
  window._checkoutTxnId = txnId;

  document.getElementById('confirm-checkout-btn').onclick = confirmCheckout;
}

function confirmCheckout() {
  const name = document.getElementById('buyer-name').value.trim();
  const wa = document.getElementById('buyer-wa').value.trim();
  const address = document.getElementById('buyer-address').value.trim();
  const notes = document.getElementById('buyer-notes').value.trim();

  if (!name || !wa || !address) {
    showToast('Lengkapi nama, nomor WA, dan alamat ya! 😊', 'error');
    return;
  }

  const orderLines = cart.map(i => `• ${i.emoji} ${i.name}${i.size ? ' ('+i.size+')' : ''}${i.fabric ? ' - '+i.fabric : ''} x${i.qty} = ${formatPrice(i.price * i.qty)}`).join('\n');
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= SHOP_CONFIG.freeShippingMin ? 0 : SHOP_CONFIG.shippingCost;
  let discount = 0;
  if (appliedVoucher) {
    const v = VOUCHERS[appliedVoucher];
    discount = v.type === 'percent' ? Math.floor(subtotal * v.value / 100) : v.value;
  }
  const total = subtotal + shipping - discount;

  const msg = `🌸 *PESANAN BARU – CERIA BUSANA* 🌸

📋 *No. Transaksi:* #${window._checkoutTxnId}
⏰ *Waktu:* ${new Date().toLocaleString('id-ID')}

👤 *Data Pembeli:*
Nama: ${name}
WhatsApp: ${wa}
Alamat: ${address}
${notes ? 'Catatan: ' + notes : ''}

🛍️ *Pesanan:*
${orderLines}

💰 *Rincian Pembayaran:*
Subtotal: ${formatPrice(subtotal)}
Ongkir: ${shipping === 0 ? 'GRATIS' : formatPrice(shipping)}
${discount ? 'Diskon: -' + formatPrice(discount) : ''}
*TOTAL: ${formatPrice(total)}*

_Terima kasih telah berbelanja di Ceria Busana! 🌸_`;

  const waUrl = `https://wa.me/${SHOP_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');

  // Clear cart
  cart = [];
  saveCart();
  updateCartBadge();
  closeCheckoutModal();
  closeDrawer();
  showToast('Pesanan berhasil dikirim ke WhatsApp! 🎉', 'success');
}

// ---- LOGO TAP (ADMIN) ----
function initLogoTap() {
  const logo = document.getElementById('logo-tap-area');
  logo.addEventListener('click', () => {
    logoTapCount++;
    clearTimeout(logoTapTimer);
    logoTapTimer = setTimeout(() => logoTapCount = 0, 2000);
    if (logoTapCount >= 5) {
      logoTapCount = 0;
      document.getElementById('admin-login-overlay').classList.add('show');
    }
  });
  document.getElementById('admin-login-btn').addEventListener('click', adminLogin);
  document.getElementById('admin-login-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('admin-login-overlay')) closeAdminLogin();
  });
}

function closeAdminLogin() {
  document.getElementById('admin-login-overlay').classList.remove('show');
}

function adminLogin() {
  const email = document.getElementById('admin-email').value;
  const pass = document.getElementById('admin-password').value;
  // In production: use Firebase Auth
  // For demo:
  if (email === 'admin@ceriabusana.com' && pass === 'admin123') {
    closeAdminLogin();
    window.location.href = 'admin.html';
  } else {
    showToast('Email atau password salah!', 'error');
  }
}

// ---- CUSTOM FORM ----
function initCustomForm() {
  // Step navigation
  document.querySelectorAll('.next-step').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextStep = btn.dataset.next;
      navigateCustomStep(nextStep);
    });
  });
  document.querySelectorAll('.prev-step').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateCustomStep(btn.dataset.prev);
    });
  });

  // Size mode toggle
  document.querySelectorAll('.size-mode').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-mode').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      document.getElementById('standar-sizes').classList.toggle('hidden', mode !== 'standar');
      document.getElementById('custom-sizes').classList.toggle('hidden', mode !== 'custom');
    });
  });

  // Submit custom
  document.getElementById('submit-custom-btn').addEventListener('click', submitCustomOrder);
}

function navigateCustomStep(step) {
  document.querySelectorAll('.custom-step-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.step').forEach(el => {
    el.classList.toggle('active', el.dataset.step <= step);
  });
  document.getElementById(`custom-step-${step}`).classList.add('active');

  if (step == 4) renderCustomSummary();
}

function renderCustomSummary() {
  const type = document.querySelector('input[name="custom-type"]:checked')?.value || '-';
  const size = document.querySelector('input[name="size"]:checked')?.value || 'Custom';
  const bahan = document.getElementById('c-bahan').value;
  const motif = document.getElementById('c-motif').value;
  const warna = document.getElementById('c-warna-text').value || document.getElementById('c-warna').value;
  const model = document.getElementById('c-model').value;

  document.getElementById('custom-summary').innerHTML = `
    <div class="summary-line"><span>Jenis Pakaian</span><span>${type}</span></div>
    <div class="summary-line"><span>Ukuran</span><span>${size}</span></div>
    <div class="summary-line"><span>Bahan</span><span>${bahan || '-'}</span></div>
    <div class="summary-line"><span>Motif</span><span>${motif || '-'}</span></div>
    <div class="summary-line"><span>Warna</span><span>${warna || '-'}</span></div>
    ${model ? `<div class="summary-line"><span>Model</span><span>${model.substring(0,30)}...</span></div>` : ''}
  `;
}

function submitCustomOrder() {
  const nama = document.getElementById('c-nama').value.trim();
  const wa = document.getElementById('c-wa').value.trim();
  const alamat = document.getElementById('c-alamat').value.trim();

  if (!nama || !wa || !alamat) {
    showToast('Lengkapi nama, nomor WA, dan alamat!', 'error');
    return;
  }

  const type = document.querySelector('input[name="custom-type"]:checked')?.value || '-';
  const size = document.querySelector('input[name="size"]:checked')?.value || 'Custom';
  const bahan = document.getElementById('c-bahan').value;
  const motif = document.getElementById('c-motif').value;
  const warna = document.getElementById('c-warna-text').value || 'Lihat picker';
  const model = document.getElementById('c-model').value;
  const notes = document.getElementById('c-notes').value;

  // Custom measurements
  const tinggi = document.getElementById('c-tinggi').value;
  const berat = document.getElementById('c-berat').value;
  const dada = document.getElementById('c-dada').value;
  const pinggang = document.getElementById('c-pinggang').value;

  const msg = `🎨 *CUSTOM ORDER – CERIA BUSANA* 🎨

👤 *Pemesan:*
Nama: ${nama}
WhatsApp: ${wa}
Alamat: ${alamat}

👗 *Detail Custom:*
Jenis: ${type}
Ukuran: ${size}
Bahan: ${bahan || '-'}
Motif: ${motif || '-'}
Warna: ${warna}
Model: ${model || '-'}

📏 *Ukuran Tubuh:*
${tinggi ? 'Tinggi: ' + tinggi + ' cm' : ''}
${berat ? 'Berat: ' + berat + ' kg' : ''}
${dada ? 'Lingkar Dada: ' + dada + ' cm' : ''}
${pinggang ? 'Lingkar Pinggang: ' + pinggang + ' cm' : ''}

📝 Catatan: ${notes || '-'}

_Mohon konfirmasi pesanan custom ini, terima kasih! 🌸_`;

  window.open(`https://wa.me/${SHOP_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  showToast('Pesanan custom dikirim ke WhatsApp! 🎨', 'success');
}

// ---- UPLOAD AREA ----
function initUploadArea() {
  const area = document.getElementById('ref-upload-area');
  const input = document.getElementById('ref-image');
  const preview = document.getElementById('ref-preview-list');

  area.addEventListener('click', () => input.click());
  area.addEventListener('dragover', (e) => { e.preventDefault(); area.style.background = 'var(--purple-soft)'; });
  area.addEventListener('dragleave', () => area.style.background = '');
  area.addEventListener('drop', (e) => {
    e.preventDefault(); area.style.background = '';
    handleFiles(e.dataTransfer.files);
  });
  input.addEventListener('change', (e) => handleFiles(e.target.files));

  function handleFiles(files) {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'ref-preview-img';
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }
}

// ---- SHARE ----
function shareProduct(id) {
  const p = SAMPLE_PRODUCTS.find(x => x.id === id);
  if (!p) return;
  if (navigator.share) {
    navigator.share({ title: p.name, text: `Lihat produk ini di Ceria Busana: ${p.name} - ${formatPrice(p.price)}`, url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link produk berhasil disalin!', 'success');
  }
}

// ---- SCROLL TOP ----
function initScrollTop() {
  const btn = document.createElement('button');
  btn.id = 'scroll-top';
  btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  btn.title = 'Kembali ke atas';
  btn.addEventListener('click', scrollToTop);
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ---- TOAST ----
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ---- PWA ----
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

// ---- GLOBAL ----
window.filterCategory = filterCategory;
window.openProductModal = openProductModal;
window.toggleWishlist = toggleWishlist;
window.quickAddToCart = quickAddToCart;
window.addToCartFromModal = addToCartFromModal;
window.buyNow = buyNow;
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;
window.applyVoucher = applyVoucher;
window.closeDrawer = closeDrawer;
window.closeCheckoutModal = closeCheckoutModal;
window.closeAdminLogin = closeAdminLogin;
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
window.shareProduct = shareProduct;
window.selectColor = selectColor;
window.selectSize = selectSize;
