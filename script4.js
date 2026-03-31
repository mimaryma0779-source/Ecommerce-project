/* ══════════════════════════════════════════
   API LAYER — Remplacer fetch() par vos vraies routes
   Exemple: await API.getProducts() → fetch('/api/products')
   Exemple: await API.createOrder(data) → fetch('/api/orders', {method:'POST',...})
══════════════════════════════════════════ */
const API = {
  // GET /api/products
  async getProducts() {
    // return await fetch('/api/products').then(r=>r.json());
    return Promise.resolve(PRODUCTS_DATA);
  },
  // POST /api/auth/login
  async login(email, password) {
    // return await fetch('/api/auth/login', {method:'POST', body:JSON.stringify({email,password})}).then(r=>r.json());
    return Promise.resolve({ success: true, user: { name: email.split('@')[0], email } });
  },
  // POST /api/auth/register
  async register(data) {
    // return await fetch('/api/auth/register', {method:'POST', body:JSON.stringify(data)}).then(r=>r.json());
    return Promise.resolve({ success: true, user: { name: data.name.split(' ')[0], email: data.email } });
  },
  // POST /api/orders
  async createOrder(orderData) {
    // return await fetch('/api/orders', {method:'POST', body:JSON.stringify(orderData)}).then(r=>r.json());
    return Promise.resolve({ success: true, orderId: 'DS-2026-' + Math.floor(1000+Math.random()*9000) });
  },
  // POST /api/reviews
  async submitReview(reviewData) {
    // return await fetch('/api/reviews', {method:'POST', body:JSON.stringify(reviewData)}).then(r=>r.json());
    return Promise.resolve({ success: true });
  },
  // GET /api/orders/:id/track
  async trackOrder(orderId) {
    // return await fetch(`/api/orders/${orderId}/track`).then(r=>r.json());
    return Promise.resolve({ status: 'transit', steps: [] });
  }
};

/* ══════════════════════════════════════════
   DATA — À remplacer par API.getProducts()
   Les images sont des URLs Unsplash (remplacer par vos vraies photos)
══════════════════════════════════════════ */
const PRODUCTS_DATA = [
  { id:0, name:"ASUS ProArt Display 4K", cat:"Écrans", price:749900, oldPrice:849900, rating:4.8, ratingCount:142, badge:"new", stock:true,
    img:"ASUS ProArt Display 4K.jpg",
    imgs:["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80","https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80","https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&q=80"],
    specs:"32\" IPS 4K UHD · 60Hz · HDR600 · USB-C 96W · Calibré usine",
    desc:"Moniteur de création professionnelle avec une précision colorimétrique Delta E < 2 et une large couverture DCI-P3 95%. Idéal pour le design graphique, la retouche photo et la vidéo.",
    specItems:{Résolution:"3840×2160",Dalle:"IPS Nano",Taux:"60 Hz",Temps:"5 ms",HDR:"DisplayHDR 600"},
    reviews:[
      {name:"Mehdi",stars:5,date:"15 mars 2026",text:"Magnifique écran, les couleurs sont absolument parfaites pour la retouche photo.",helpful:24},
      {name:"Rania",stars:5,date:"02 mars 2026",text:"Qualité d'image exceptionnelle. La calibration d'usine est vraiment au top.",helpful:18},
      {name:"Karim",stars:4,date:"20 fév. 2026",text:"Très bon écran, USB-C très pratique pour le MacBook.",helpful:9},
    ]},
  { id:1, name:"Samsung Odyssey G7", cat:"Écrans", price:489900, rating:4.6, ratingCount:89, badge:null, stock:true,
    img:"https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&q=80",
    imgs:["https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80","https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&q=80"],
    specs:"27\" VA Curved 1440p · 240Hz · 1ms · G-Sync compat. · HDR600",
    desc:"Écran gaming courbé 1000R taillé pour la compétition. Le taux de rafraîchissement de 240 Hz assure une fluidité absolue.",
    specItems:{Résolution:"2560×1440",Dalle:"VA Curved",Taux:"240 Hz",Temps:"1 ms",Courbure:"1000R"},
    reviews:[{name:"Youssef",stars:5,date:"10 mars 2026",text:"Parfait pour le gaming ! La courbure immersive, les 240Hz c'est bluffant.",helpful:31}]},
  { id:2, name:"Keychron Q3 Pro", cat:"Périphériques", price:184900, rating:4.9, ratingCount:204, badge:"new", stock:true,
    img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    imgs:["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80","https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=400&q=80"],
    specs:"TKL · Hot-swap · Gateron G Pro Brown · Aluminium · Bluetooth 5.1",
    desc:"Clavier mécanique premium 80% en aluminium anodisé avec hot-swap, compatible multi-appareils via Bluetooth ou câble USB-C.",
    specItems:{Format:"TKL (80%)",Switch:"G Pro Brown",Boîtier:"Aluminium",Connexion:"USB-C / BT",RGB:"Oui"},
    reviews:[
      {name:"Amira",stars:5,date:"18 mars 2026",text:"Le meilleur clavier que j'aie jamais eu. Le son des switches Brown est parfait.",helpful:42},
      {name:"Sofiane",stars:5,date:"05 mars 2026",text:"Build quality exceptionnelle. Le hot-swap c'est le luxe.",helpful:28},
    ]},
  { id:3, name:"Logitech MX Master 3S", cat:"Périphériques", price:84900, oldPrice:99900, rating:4.7, ratingCount:512, badge:"promo", stock:true,
    img:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    imgs:["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80","https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80"],
    specs:"8000 DPI · Molette MagSpeed · Ergonomique · Multi-appareil",
    desc:"La souris de productivité ultime avec la molette MagSpeed ultra-rapide. Compatible Logi Bolt et Bluetooth.",
    specItems:{DPI:"200–8000",Batterie:"70 jours",Connexion:"Bolt / BT",Boutons:"7",Poids:"141 g"},
    reviews:[{name:"Nadia",stars:5,date:"12 mars 2026",text:"La molette MagSpeed est tout simplement addictive.",helpful:67}]},
  { id:4, name:"GeForce RTX 4070 Super", cat:"GPU", price:629900, oldPrice:699900, rating:4.8, ratingCount:178, badge:"promo", stock:true,
    img:"https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&q=80",
    imgs:["https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80","https://images.unsplash.com/photo-1555617800-2b7da1e93d88?w=400&q=80"],
    specs:"12 GB GDDR6X · DLSS 3 · Ray Tracing · 2560 MHz Boost · PCIe 4.0",
    desc:"La carte graphique parfaite pour le 1440p ultra et le 4K performant. DLSS 3 avec Frame Generation.",
    specItems:{VRAM:"12 GB GDDR6X",Boost:"2560 MHz",TDP:"220W",Connecteurs:"3× DP · HDMI",DLSS:"3.5"},
    reviews:[
      {name:"Hocine",stars:5,date:"20 mars 2026",text:"Monstre de puissance ! Les jeux tournent à 4K avec ray tracing activé.",helpful:55},
      {name:"Farid",stars:4,date:"08 mars 2026",text:"Excellent rapport qualité/prix. Le DLSS 3 est une révolution.",helpful:33},
    ]},
  { id:5, name:"AMD Ryzen 9 7950X", cat:"Processeurs", price:549900, rating:4.9, ratingCount:93, badge:null, stock:true,
    img:"https://images.unsplash.com/photo-1555617800-2b7da1e93d88?w=600&q=80",
    imgs:["https://images.unsplash.com/photo-1555617800-2b7da1e93d88?w=400&q=80","https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80"],
    specs:"16 cœurs · 32 threads · 5.7 GHz Boost · AM5 · PCIe 5.0",
    desc:"Processeur de workstation ultime pour le rendu 3D, la compilation et le multitâche intensif. Architecture Zen 4.",
    specItems:{Cœurs:"16C / 32T",Boost:"5,7 GHz",Cache:"64 MB L3",Socket:"AM5",TDP:"170 W"},
    reviews:[{name:"Bilal",stars:5,date:"14 mars 2026",text:"Rendu Blender en temps record. Les 16 cœurs font une différence énorme.",helpful:39}]},
  { id:6, name:"Samsung 990 Pro 2 TB", cat:"Stockage", price:149900, rating:4.8, ratingCount:341, badge:"new", stock:true,
    img:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80",
    imgs:["https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80","https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80"],
    specs:"NVMe PCIe 4.0 · 7450 Mo/s lecture · 6900 Mo/s écriture · M.2 2280",
    desc:"SSD NVMe de nouvelle génération avec des vitesses séquentielles record. Idéal pour les postes créatifs.",
    specItems:{Capacité:"2 000 GB",Lecture:"7 450 MB/s",Écriture:"6 900 MB/s",Interface:"PCIe 4.0 x4",Format:"M.2 2280"},
    reviews:[{name:"Wassim",stars:5,date:"11 mars 2026",text:"Les temps de chargement des jeux sont quasi nuls. La vitesse d'écriture est folle.",helpful:28}]},
  { id:7, name:"G.Skill Trident Z5 Neo", cat:"RAM", price:134900, rating:4.7, ratingCount:167, badge:null, stock:true,
    img:"https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&q=80",
    imgs:["https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80","https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80"],
    specs:"32 GB (2×16) · DDR5-6000 · CL30 · RGB · AMD Expo · XMP 3.0",
    desc:"Kit mémoire DDR5 haute fréquence avec profil AMD Expo pour une compatibilité optimale sur les plateformes AM5.",
    specItems:{Capacité:"32 GB",Type:"DDR5-6000",Latence:"CL30-38-38-96",Tension:"1,35V",RGB:"Oui"},
    reviews:[{name:"Lydia",stars:5,date:"07 mars 2026",text:"Plug and play avec le Ryzen 7950X. Profil Expo activé automatiquement.",helpful:19}]},
];

/* ══ STATE ══ */
let products = [...PRODUCTS_DATA];
let cart = [], wishlist = [], compareList = [];
let currentProduct = null, currentQty = 1;
let currentCatFilter = 'Tout';
let currentRating = 0, promoApplied = false;
let loggedInUser = null;
let currentPayMethod = 'cib';

/* ══════════════════════════════════════════
   MOBILE NAV
══════════════════════════════════════════ */
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  const btn = document.getElementById('hamburger');
  nav.classList.toggle('open');
  btn.classList.toggle('open');
}
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

/* ══════════════════════════════════════════
   AUTH
══════════════════════════════════════════ */
function openAuthModal() {
  if (loggedInUser) { showToast('👋 Déjà connecté en tant que ' + loggedInUser); return; }
  switchAuthTab('login');
  document.getElementById('authModal').classList.add('open');
}
function closeAuthModal() { document.getElementById('authModal').classList.remove('open'); }
function switchAuthTab(tab) {
  document.getElementById('loginForm').classList.toggle('active', tab==='login');
  document.getElementById('registerForm').classList.toggle('active', tab==='register');
  document.getElementById('loginTab').classList.toggle('active', tab==='login');
  document.getElementById('registerTab').classList.toggle('active', tab==='register');
  document.getElementById('authTitle').textContent = tab==='login' ? 'Se Connecter' : 'Créer un compte';
}
async function loginUser() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPass').value;
  if (!email || !pass) { showToast('⚠️ Remplissez tous les champs !'); return; }
  // API call: await API.login(email, pass)
  loggedInUser = email.split('@')[0];
  updateConnectBtn();
  closeAuthModal();
  showToast('✓ Connexion réussie ! Bienvenue ' + loggedInUser + ' 👋');
}
async function registerUser() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPass').value;
  const phone = document.getElementById('regPhone').value.trim();
  const address = document.getElementById('regAddress').value.trim();
  if (!name || !email || !pass || !phone || !address) { showToast('⚠️ Remplissez tous les champs !'); return; }
  if (pass.length < 8) { showToast('⚠️ Mot de passe trop court (8 car. min)'); return; }
  // API call: await API.register({name, email, pass, phone, address})
  loggedInUser = name.split(' ')[0];
  updateConnectBtn();
  closeAuthModal();
  showToast('🎉 Compte créé ! Bienvenue ' + loggedInUser + ' !');
}
function updateConnectBtn() {
  const btn = document.getElementById('connectBtn');
  if (loggedInUser) {
    btn.classList.add('logged-in');
    document.getElementById('connectIcon').textContent = '✓';
    document.getElementById('connectText').textContent = loggedInUser;
    btn.onclick = () => { loggedInUser = null; updateConnectBtn(); showToast('👋 Déconnecté'); };
  } else {
    btn.classList.remove('logged-in');
    document.getElementById('connectIcon').textContent = '👤';
    document.getElementById('connectText').textContent = 'Connexion';
    btn.onclick = openAuthModal;
  }
}
document.getElementById('authModal').addEventListener('click', e => { if(e.target===document.getElementById('authModal')) closeAuthModal(); });

/* ══════════════════════════════════════════
   PAYMENT MODAL
══════════════════════════════════════════ */
function openPayModal() {
  if (!cart.length) { showToast('⚠️ Votre panier est vide'); return; }
  // Pre-fill delivery if logged in
  if (loggedInUser) {
    document.getElementById('del-firstname').value = loggedInUser;
  }
  // Build recap
  const sub = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const disc = promoApplied ? Math.round(sub*.1) : 0;
  const tva = Math.round((sub-disc)*.19);
  const total = sub - disc + tva;
  document.getElementById('payRecapItems').innerHTML = cart.map(i=>
    `<div class="pay-recap-item"><span>${i.name} × ${i.qty}</span><span style="font-weight:600">${(i.price*i.qty).toLocaleString('fr-DZ')} DA</span></div>`
  ).join('') + (promoApplied ? `<div class="pay-recap-item" style="color:var(--green)"><span>Réduction DIGITAL10</span><span>-${disc.toLocaleString('fr-DZ')} DA</span></div>` : '');
  document.getElementById('payTotalDisplay').textContent = total.toLocaleString('fr-DZ') + ' DA';
  document.getElementById('payBtnAmount').textContent = total.toLocaleString('fr-DZ') + ' DA';
  document.getElementById('payModal').classList.add('open');
}
function closePayModal() { document.getElementById('payModal').classList.remove('open'); }
document.getElementById('payModal').addEventListener('click', e => { if(e.target===document.getElementById('payModal')) closePayModal(); });

function switchPayMethod(method) {
  currentPayMethod = method;
  document.querySelectorAll('.pay-method-btn').forEach((b,i) => {
    b.classList.toggle('active', ['cib','dahabia','ccp','cod'][i] === method);
  });
  document.querySelectorAll('.pay-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + method).classList.add('active');
  const labels = { cib:'🔒 Payer par carte CIB', dahabia:'🟡 Payer par Dahabia', ccp:'📮 Confirmer commande (CCP)', cod:'✓ Confirmer — Paiement à la livraison' };
  document.getElementById('paySubmitBtn').innerHTML = labels[method] + ' — <span id="payBtnAmount">' + document.getElementById('payTotalDisplay').textContent + '</span>';
}

/* Card formatting */
function formatCard(el) {
  let v = el.value.replace(/\D/g,'').substring(0,16);
  el.value = v.replace(/(\d{4})(?=\d)/g,'$1 ');
  if (el.id === 'card-num') {
    document.getElementById('cardNumDisplay').textContent = el.value.padEnd(19,'•').replace(/[^•\d ]/g,'•') || '•••• •••• •••• ••••';
  }
}
function formatExp(el) {
  let v = el.value.replace(/\D/g,'');
  if (v.length >= 2) v = v.substring(0,2) + '/' + v.substring(2,4);
  el.value = v;
  if (el.id === 'card-exp') document.getElementById('cardExpDisplay').textContent = el.value || 'MM/AA';
}

function validatePayment() {
  const fn = document.getElementById('del-firstname').value.trim();
  const ln = document.getElementById('del-lastname').value.trim();
  const phone = document.getElementById('del-phone').value.trim();
  const addr = document.getElementById('del-address').value.trim();
  const wilaya = document.getElementById('del-wilaya').value;
  if (!fn || !ln || !phone || !addr || !wilaya) {
    showToast('⚠️ Remplissez l\'adresse de livraison complète');
    return false;
  }
  if (currentPayMethod === 'cib') {
    const num = document.getElementById('card-num').value.replace(/\s/g,'');
    const name = document.getElementById('card-name').value.trim();
    const exp = document.getElementById('card-exp').value;
    const cvv = document.getElementById('card-cvv').value;
    if (num.length < 16) { showToast('⚠️ Numéro de carte invalide'); return false; }
    if (!name) { showToast('⚠️ Nom du titulaire requis'); return false; }
    if (!exp.match(/^\d{2}\/\d{2}$/)) { showToast('⚠️ Date d\'expiration invalide'); return false; }
    if (cvv.length < 3) { showToast('⚠️ CVV invalide'); return false; }
  }
  if (currentPayMethod === 'dahabia') {
    const num = document.getElementById('dah-num').value.replace(/\s/g,'');
    if (num.length < 16) { showToast('⚠️ Numéro Dahabia invalide'); return false; }
  }
  return true;
}

async function processPayment() {
  if (!validatePayment()) return;
  const btn = document.getElementById('paySubmitBtn');
  btn.classList.add('loading');
  btn.textContent = '⏳ Traitement en cours…';
  // Simulate payment processing (replace with real API call)
  // const result = await API.createOrder({cart, payMethod: currentPayMethod, delivery: {...}});
  await new Promise(r => setTimeout(r, 2000));
  const orderId = 'DS-2026-' + Math.floor(1000+Math.random()*9000);
  btn.classList.remove('loading');
  closePayModal();
  document.getElementById('orderNum').textContent = orderId;
  document.getElementById('trackIn').value = orderId;
  cart = []; promoApplied = false;
  updateCartCount();
  renderCart();
  document.getElementById('successModal').classList.add('open');
}

/* ══════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════ */
function nav(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  closeMobileNav();
  if (page==='cart') renderCart();
  if (page==='catalog') renderProducts();
  if (page==='wishlist') renderWishlist();
  if (page==='compare') renderCompare();
}
function setActive(btn) {
  document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

/* ══════════════════════════════════════════
   CATALOG
══════════════════════════════════════════ */
function filterCat(cat) {
  currentCatFilter = cat;
  const map = {'Tout':'c-all','Écrans':'c-ecr','Processeurs':'c-cpu','Périphériques':'c-per','GPU':'c-gpu','Stockage':'c-sto','RAM':'c-ram'};
  const el = document.getElementById(map[cat]);
  if (el) el.checked = true;
  renderProducts();
}

function renderProducts() {
  const q = (document.getElementById('searchIn')?.value||'').toLowerCase();
  const sort = document.getElementById('sortSel')?.value||'default';
  const minP = parseFloat(document.getElementById('minP')?.value)||0;
  const maxP = parseFloat(document.getElementById('maxP')?.value)||Infinity;
  const onlyStock = document.getElementById('inStock')?.checked;
  const onlySale = document.getElementById('onSale')?.checked;
  const minR = parseFloat(document.getElementById('minRating')?.value)||0;
  let list = products.filter(p => {
    if (currentCatFilter!=='Tout' && p.cat!==currentCatFilter) return false;
    if (q && !p.name.toLowerCase().includes(q) && !p.cat.toLowerCase().includes(q) && !p.specs.toLowerCase().includes(q)) return false;
    if (p.price<minP || p.price>maxP) return false;
    if (onlyStock && !p.stock) return false;
    if (onlySale && !p.oldPrice) return false;
    if (p.rating<minR) return false;
    return true;
  });
  if (sort==='price-asc') list.sort((a,b)=>a.price-b.price);
  else if (sort==='price-desc') list.sort((a,b)=>b.price-a.price);
  else if (sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name));
  else if (sort==='rating') list.sort((a,b)=>b.rating-a.rating);
  document.getElementById('resCnt').textContent = `${list.length} produit${list.length>1?'s':''}`;
  const grid = document.getElementById('prodGrid');
  if (!list.length) {
    grid.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--muted)"><div style="font-size:48px;margin-bottom:12px">🔍</div><p style="font-size:16px;font-weight:500">Aucun produit trouvé</p></div>`;
    return;
  }
  grid.innerHTML = list.map(p => {
    const disc = p.oldPrice ? Math.round((1-p.price/p.oldPrice)*100) : 0;
    const isWished = wishlist.includes(p.id);
    const isCmp = compareList.find(c=>c.id===p.id);
    return `<div class="product-card" onclick="showDetail(${p.id})">
      <div class="prod-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="badges-wrap">
          ${p.badge==='new'?'<span class="badge b-new">NOUVEAU</span>':''}
          ${p.badge==='promo'?`<span class="badge b-promo">−${disc}%</span>`:''}
        </div>
        <div class="compare-chk ${isCmp?'selected':''}" onclick="event.stopPropagation();toggleCompare(${p.id})" title="Comparer">${isCmp?'✓':'⊕'}</div>
        <div class="wishlist-btn ${isWished?'active':''}" onclick="event.stopPropagation();toggleWish(${p.id})" title="Wishlist">${isWished?'♥':'♡'}</div>
      </div>
      <div class="prod-body">
        <div class="prod-cat">${p.cat}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-specs">${p.specs}</div>
        <div class="prod-rating">
          <span class="stars-sm">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))}</span>
          <span class="rating-num">${p.rating} (${p.ratingCount})</span>
        </div>
        <div class="prod-footer">
          <div class="prod-price">
            ${p.oldPrice?`<span class="old-price-sm">${p.oldPrice.toLocaleString('fr-DZ')} DA</span>`:''}
            ${p.price.toLocaleString('fr-DZ')} DA
          </div>
          <button class="add-btn" onclick="event.stopPropagation();addToCart(${p.id},this)">+</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ══════════════════════════════════════════
   DETAIL
══════════════════════════════════════════ */
function showDetail(id) {
  currentProduct = products.find(p=>p.id===id);
  currentQty = 1;
  if (!currentProduct) return;
  const p = currentProduct;
  document.getElementById('dImgMain').src = p.img;
  document.getElementById('dImgMain').alt = p.name;
  document.getElementById('dCat').textContent = p.cat;
  document.getElementById('dTitle').textContent = p.name;
  document.getElementById('dRatingText').textContent = `${p.rating}/5 — ${p.ratingCount} avis vérifiés`;
  document.getElementById('dPrice').textContent = p.price.toLocaleString('fr-DZ') + ' DA';
  document.getElementById('bc-cat').textContent = p.cat;
  document.getElementById('bc-name').textContent = p.name;
  document.getElementById('dQty').textContent = 1;
  document.getElementById('avgNum').textContent = p.rating;
  document.getElementById('avgCount').textContent = `${p.ratingCount} avis`;
  document.getElementById('modalProductName').textContent = p.name;
  const oldEl = document.getElementById('dOld');
  const discEl = document.getElementById('dDisc');
  if (p.oldPrice) {
    oldEl.textContent = p.oldPrice.toLocaleString('fr-DZ')+' DA';
    discEl.textContent = '-'+Math.round((1-p.price/p.oldPrice)*100)+'%';
    discEl.style.display='block';
  } else { oldEl.textContent=''; discEl.style.display='none'; }
  document.getElementById('dDesc').textContent = p.desc;
  document.getElementById('dSpecs').innerHTML = Object.entries(p.specItems).map(([k,v])=>
    `<div class="spec-item"><div class="spec-k">${k}</div><div class="spec-v">${v}</div></div>`).join('');
  const wishBtn = document.getElementById('dWishBtn');
  wishBtn.classList.toggle('active', wishlist.includes(p.id));
  wishBtn.textContent = wishlist.includes(p.id) ? '♥' : '♡';
  // Thumbnails with real images
  const thumbImgs = p.imgs || [p.img];
  document.getElementById('dThumbs').innerHTML = thumbImgs.map((src,i)=>
    `<div class="thumb ${i===0?'active':''}" onclick="document.getElementById('dImgMain').src='${src}';this.parentElement.querySelectorAll('.thumb').forEach(t=>t.classList.remove('active'));this.classList.add('active')"><img src="${src}" alt="Vue ${i+1}" loading="lazy"></div>`
  ).join('');
  document.getElementById('dAddBtn').onclick = () => { for(let i=0;i<currentQty;i++) addToCart(p.id,null); };
  renderReviews(p);
  renderRatingBars(p);
  nav('detail');
}
function changeQty(d) { currentQty = Math.max(1, Math.min(99, currentQty+d)); document.getElementById('dQty').textContent = currentQty; }
function scrollToReviews() { document.getElementById('reviewsSection').scrollIntoView({behavior:'smooth'}); }

/* ══════════════════════════════════════════
   REVIEWS
══════════════════════════════════════════ */
function renderReviews(p) {
  document.getElementById('reviewCards').innerHTML = p.reviews.map(r=>`
    <div class="review-card">
      <div class="review-top">
        <div><div class="reviewer-name">${r.name}</div><div class="review-date">${r.date}</div></div>
        <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
      </div>
      <div class="review-text">${r.text}</div>
      <div class="review-helpful">
        <span style="font-size:12px;color:var(--muted)">${r.helpful} personnes ont trouvé cet avis utile</span>
        <button class="helpful-btn" onclick="this.textContent='✓ Utile';this.disabled=true;this.style.color='var(--teal)'">👍 Utile</button>
      </div>
    </div>`).join('');
}
function renderRatingBars(p) {
  const d = [0,2,5,15,38,40];
  document.getElementById('ratingBars').innerHTML = [5,4,3,2,1].map(s=>
    `<div class="rbar-row"><span class="rbar-lbl">${s}★</span><div class="rbar-track"><div class="rbar-fill" style="width:${d[s]}%"></div></div><span class="rbar-cnt">${d[s]}%</span></div>`).join('');
}
function openReviewModal() {
  currentRating=0;
  document.getElementById('reviewName').value='';
  document.getElementById('reviewText').value='';
  document.querySelectorAll('.star-opt').forEach(s=>s.classList.remove('active'));
  document.getElementById('reviewModal').classList.add('open');
}
function setRating(val) {
  currentRating=val;
  document.querySelectorAll('.star-opt').forEach(s=>s.classList.toggle('active',parseInt(s.dataset.v)<=val));
}
async function submitReview() {
  const name = document.getElementById('reviewName').value.trim();
  const text = document.getElementById('reviewText').value.trim();
  if (!name || !text || !currentRating) { showToast('⚠️ Remplissez tous les champs'); return; }
  // API call: await API.submitReview({productId: currentProduct.id, name, text, stars: currentRating})
  currentProduct.reviews.unshift({name, stars:currentRating, date:"Aujourd'hui", text, helpful:0});
  currentProduct.ratingCount++;
  renderReviews(currentProduct);
  closeModal('reviewModal');
  showToast('✓ Avis publié, merci !');
}

/* ══════════════════════════════════════════
   CART
══════════════════════════════════════════ */
function addToCart(id, btn) {
  const p = products.find(pr=>pr.id===id);
  if (!p) return;
  const ex = cart.find(i=>i.id===id);
  if (ex) ex.qty++; else cart.push({...p, qty:1});
  updateCartCount();
  showToast('✓ ' + p.name + ' ajouté au panier');
  if (btn) {
    btn.textContent='✓'; btn.classList.add('added');
    setTimeout(()=>{btn.textContent='+'; btn.classList.remove('added');}, 1200);
  }
}
function updateCartCount() {
  const t = cart.reduce((s,i)=>s+i.qty, 0);
  document.getElementById('cartCount').textContent = t;
}
function renderCart() {
  const c = document.getElementById('cartItems');
  if (!cart.length) {
    c.innerHTML=`<div class="cart-empty"><span class="empty-icon">🛒</span><p style="font-size:17px;font-weight:500;margin-bottom:6px">Votre panier est vide</p><small style="color:var(--muted)">Explorez notre catalogue</small><br><br><button class="btn btn-dark" style="margin-top:16px" onclick="nav('catalog')">Voir le catalogue →</button></div>`;
    document.getElementById('sumSub').textContent='0 DA';
    document.getElementById('sumTVA').textContent='0 DA';
    document.getElementById('sumTotal').textContent='0 DA';
    return;
  }
  c.innerHTML = cart.map((item,i)=>`
    <div class="cart-item">
      <div class="ci-img"><img src="${item.img}" alt="${item.name}" loading="lazy"></div>
      <div class="ci-info"><div class="ci-name">${item.name}</div><div class="ci-cat">${item.cat}</div></div>
      <div class="ci-qty">
        <button class="cq-btn" onclick="updateQty(${i},-1)">−</button>
        <div class="cq-num">${item.qty}</div>
        <button class="cq-btn" onclick="updateQty(${i},1)">+</button>
      </div>
      <div class="ci-price">${(item.price*item.qty).toLocaleString('fr-DZ')} DA</div>
      <button class="rm-btn" onclick="removeItem(${i})">✕</button>
    </div>`).join('');
  updateSummary();
}
function updateSummary() {
  const sub = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const disc = promoApplied ? Math.round(sub*.1) : 0;
  const tva = Math.round((sub-disc)*.19);
  document.getElementById('sumSub').textContent = sub.toLocaleString('fr-DZ')+' DA';
  document.getElementById('sumTVA').textContent = tva.toLocaleString('fr-DZ')+' DA';
  document.getElementById('sumTotal').textContent = (sub-disc+tva).toLocaleString('fr-DZ')+' DA';
  const dr = document.getElementById('discRow');
  if (promoApplied) { dr.style.display='flex'; document.getElementById('discAmt').textContent='-'+disc.toLocaleString('fr-DZ')+' DA'; }
  else dr.style.display='none';
}
function updateQty(i,d) { cart[i].qty=Math.max(1,cart[i].qty+d); updateCartCount(); renderCart(); }
function removeItem(i) { cart.splice(i,1); updateCartCount(); renderCart(); }
function applyPromo() {
  const code = document.getElementById('promoIn').value.trim().toUpperCase();
  if (code==='DIGITAL10') { promoApplied=true; updateSummary(); showToast('🎁 Code DIGITAL10 appliqué — −10% !'); }
  else showToast('❌ Code promo invalide');
}

/* ══════════════════════════════════════════
   WISHLIST
══════════════════════════════════════════ */
function toggleWish(id) {
  const idx = wishlist.indexOf(id);
  if (idx>-1) { wishlist.splice(idx,1); showToast('♡ Retiré de la wishlist'); }
  else { wishlist.push(id); showToast('♥ Ajouté à la wishlist'); }
  updateWishCount(); renderProducts();
}
function toggleWishDetail() {
  if (!currentProduct) return;
  toggleWish(currentProduct.id);
  const btn = document.getElementById('dWishBtn');
  const active = wishlist.includes(currentProduct.id);
  btn.classList.toggle('active',active);
  btn.textContent = active?'♥':'♡';
}
function updateWishCount() {
  const el = document.getElementById('wishCount');
  el.textContent = wishlist.length;
  el.style.display = wishlist.length ? 'flex' : 'none';
}
function renderWishlist() {
  const sub = document.getElementById('wishSubtitle');
  const grid = document.getElementById('wishGrid');
  sub.textContent = wishlist.length+' produit'+(wishlist.length>1?'s':'');
  if (!wishlist.length) {
    grid.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--muted)"><div style="font-size:48px;margin-bottom:12px">♡</div><p style="font-size:16px;font-weight:500">Votre wishlist est vide</p><div style="margin-top:16px"><button class="btn btn-dark" onclick="nav('catalog')">Explorer le catalogue</button></div></div>`;
    return;
  }
  grid.innerHTML = products.filter(p=>wishlist.includes(p.id)).map(p=>`
    <div class="product-card" onclick="showDetail(${p.id})">
      <div class="prod-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="wishlist-btn active" onclick="event.stopPropagation();toggleWish(${p.id});renderWishlist()">♥</div>
      </div>
      <div class="prod-body">
        <div class="prod-cat">${p.cat}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-footer">
          <div class="prod-price">${p.price.toLocaleString('fr-DZ')} DA</div>
          <button class="add-btn" onclick="event.stopPropagation();addToCart(${p.id},this)">+</button>
        </div>
      </div>
    </div>`).join('');
}

/* ══════════════════════════════════════════
   COMPARATEUR
══════════════════════════════════════════ */
function toggleCompare(id) {
  const p = products.find(pr=>pr.id===id);
  if (!p) return;
  const idx = compareList.findIndex(c=>c.id===id);
  if (idx>-1) { compareList.splice(idx,1); showToast('⊖ Retiré du comparateur'); }
  else { if (compareList.length>=3) { showToast('⚠️ Maximum 3 produits'); return; } compareList.push(p); showToast('⊕ Ajouté au comparateur'); }
  updateCompareBar(); renderProducts();
}
function updateCompareBar() {
  const bar = document.getElementById('compareBar');
  const hint = document.getElementById('compareHint');
  document.getElementById('cmpCount').textContent = compareList.length;
  if (compareList.length>0) { bar.classList.add('visible'); hint.style.display='flex'; }
  else { bar.classList.remove('visible'); hint.style.display='none'; }
  document.getElementById('cbSlots').innerHTML = [0,1,2].map(i=>{
    const p = compareList[i];
    return p ? `<div class="cb-slot"><span class="cb-slot-icon"><img src="${p.img}" style="width:20px;height:20px;object-fit:cover;border-radius:4px"></span><span class="cb-slot-name">${p.name}</span><button class="cb-slot-rm" onclick="toggleCompare(${p.id})">✕</button></div>`
             : `<div class="cb-slot empty"><span style="font-size:18px;margin-right:6px">+</span> Ajouter</div>`;
  }).join('');
}
function clearCompare() { compareList=[]; updateCompareBar(); renderProducts(); showToast('Comparateur vidé'); }
function renderCompare() {
  const content = document.getElementById('compareContent');
  if (!compareList.length) {
    content.innerHTML=`<div class="compare-empty"><div style="font-size:48px;margin-bottom:12px">⚖️</div><div style="font-size:16px;font-weight:500;margin-bottom:8px">Aucun produit à comparer</div><div style="font-size:13.5px;margin-bottom:20px">Sélectionnez jusqu'à 3 produits</div><button class="btn btn-dark" onclick="nav('catalog');setActive(document.querySelectorAll('.nav-link')[1])">Aller au catalogue</button></div>`;
    return;
  }
  const allSpecKeys = [...new Set(compareList.flatMap(p=>Object.keys(p.specItems)))];
  const minPrice = Math.min(...compareList.map(p=>p.price));
  const maxRating = Math.max(...compareList.map(p=>p.rating));
  const headers = compareList.map(p=>`<th><div class="ct-product-header"><img src="${p.img}" alt="${p.name}" style="width:80px;height:60px;object-fit:cover;border-radius:8px;margin-bottom:8px;display:block;margin-left:auto;margin-right:auto">${p.name}<div class="ct-price">${p.price.toLocaleString('fr-DZ')} DA</div><div><button class="ct-remove" onclick="toggleCompare(${p.id});renderCompare()">Retirer</button></div><div style="margin-top:8px"><button class="btn btn-teal" style="font-size:12px;padding:7px 14px" onclick="addToCart(${p.id},null)">Ajouter au panier</button></div></div></th>`).join('');
  const rows = [
    `<tr><td>Prix</td>${compareList.map(p=>`<td class="${p.price===minPrice?'best-val':''}">${p.price.toLocaleString('fr-DZ')} DA</td>`).join('')}</tr>`,
    `<tr><td>Note</td>${compareList.map(p=>`<td class="${p.rating===maxRating?'best-val':''}">${p.rating}★ (${p.ratingCount})</td>`).join('')}</tr>`,
    `<tr><td>Catégorie</td>${compareList.map(p=>`<td>${p.cat}</td>`).join('')}</tr>`,
    ...allSpecKeys.map(k=>`<tr><td>${k}</td>${compareList.map(p=>`<td>${p.specItems[k]||'—'}</td>`).join('')}</tr>`)
  ];
  content.innerHTML = `<div class="compare-table-wrap"><table class="compare-table"><thead><tr><th>Caractéristique</th>${headers}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
}

/* ══════════════════════════════════════════
   ORDER TRACKING
══════════════════════════════════════════ */
function trackOrder() {
  const num = document.getElementById('trackIn').value.trim();
  if (!num) return;
  const result = document.getElementById('trackResult');
  result.style.display='block';
  result.innerHTML=`<div style="text-align:center;padding:40px;color:var(--muted)">🔍 Recherche en cours…</div>`;
  // API call: await API.trackOrder(num)
  setTimeout(() => {
    result.innerHTML=buildTrackHTML(num);
    setTimeout(initMap,200);
    animateStepFill();
  }, 900);
}
function buildTrackHTML(num) {
  const steps = [
    {lbl:'Commande confirmée',icon:'✓',time:'09:14',done:true,curr:false},
    {lbl:'Préparation',icon:'📦',time:'11:30',done:true,curr:false},
    {lbl:'En transit',icon:'🚚',time:"Aujourd'hui",done:false,curr:true},
    {lbl:'En livraison',icon:'🏍️',time:'Demain',done:false,curr:false},
    {lbl:'Livré',icon:'🏠',time:'Prévu 14h',done:false,curr:false}
  ];
  const stepsHtml = steps.map(s=>`<div class="step ${s.done?'done':''} ${s.curr?'current':''}"><div class="step-dot">${s.icon}</div><div class="step-lbl">${s.lbl}</div><div class="step-time">${s.time}</div></div>`).join('');
  const tlItems = [
    {icon:'✓',cls:'tl-done',title:'Commande passée',desc:'Paiement vérifié et commande enregistrée',time:'09:14'},
    {icon:'📦',cls:'tl-done',title:'Préparation terminée',desc:'Votre colis a été emballé et étiqueté',time:'11:30'},
    {icon:'🚚',cls:'tl-current',title:'En route — Centre de tri Alger',desc:'Votre colis a quitté notre entrepôt',time:'14:05'},
    {icon:'🏍️',cls:'tl-pending',title:'Livreur assigné',desc:'Un livreur sera assigné demain matin',time:'Demain'},
    {icon:'🏠',cls:'tl-pending',title:'Livraison à domicile',desc:'Livraison prévue entre 9h et 17h',time:'Demain'}
  ];
  return `
  <div class="track-order-card">
    <div class="order-head">
      <div><div class="order-num">#${num}</div><div class="order-name">RTX 4070 Super + Keychron Q3 Pro</div></div>
      <div class="order-status status-transit">🚚 En transit</div>
    </div>
    <div class="steps" id="stepsContainer">
      <div class="step-fill" id="stepFill" style="width:0%"></div>${stepsHtml}
    </div>
  </div>
  <div class="track-order-card">
    <div class="map-section"><h3>📍 Position en temps réel</h3>
    <div class="map-container"><div id="liveMap"></div>
    <div class="map-overlay">
      <div class="map-info-card"><div class="map-info-title">🚚 Colis en transit</div><div class="map-info-addr">Centre de tri — Route nationale 5, Alger</div></div>
      <div class="eta-pill"><div class="eta-lbl">ETA livraison</div><div class="eta-time">Demain 11h</div></div>
    </div></div></div>
  </div>
  <div class="track-order-card">
    <h3 style="font-family:'Syne',sans-serif;font-size:16px;font-weight:800;margin-bottom:20px">Historique détaillé</h3>
    <div class="timeline">${tlItems.map(t=>`<div class="tl-item"><div class="tl-icon ${t.cls}">${t.icon}</div><div class="tl-text"><div class="tl-title" style="${t.cls==='tl-pending'?'color:var(--muted)':''}">${t.title}</div><div class="tl-desc">${t.desc}</div></div><div class="tl-time">${t.time}</div></div>`).join('')}</div>
  </div>`;
}
function animateStepFill() { const f=document.getElementById('stepFill'); if(f) setTimeout(()=>f.style.width='40%',100); }
function initMap() {
  const mapEl = document.getElementById('liveMap');
  if (!mapEl) return;
  mapEl.innerHTML=`<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">
    <defs><linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e0faf2"/><stop offset="100%" stop-color="#b2f0e0"/></linearGradient><filter id="sh"><feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.2"/></filter></defs>
    <rect width="800" height="360" fill="url(#skyG)"/>
    <g stroke="#b2e0d0" stroke-width="0.5"><line x1="0" y1="60" x2="800" y2="60"/><line x1="0" y1="120" x2="800" y2="120"/><line x1="0" y1="180" x2="800" y2="180"/><line x1="0" y1="240" x2="800" y2="240"/><line x1="0" y1="300" x2="800" y2="300"/><line x1="100" y1="0" x2="100" y2="360"/><line x1="200" y1="0" x2="200" y2="360"/><line x1="300" y1="0" x2="300" y2="360"/><line x1="400" y1="0" x2="400" y2="360"/><line x1="500" y1="0" x2="500" y2="360"/><line x1="600" y1="0" x2="600" y2="360"/><line x1="700" y1="0" x2="700" y2="360"/></g>
    <path d="M 60 300 Q 200 220 350 200 Q 480 185 580 160 Q 680 140 740 100" stroke="#94a3b8" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M 60 300 Q 200 220 350 200 Q 480 185 580 160 Q 680 140 740 100" stroke="#cbd5e0" stroke-width="3" fill="none" stroke-dasharray="12 8"/>
    <path d="M 60 300 Q 160 255 270 225 Q 340 210 400 200" stroke="#497b89" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="60" cy="300" r="10" fill="#15803d" filter="url(#sh)"/><circle cx="60" cy="300" r="6" fill="#fff"/>
    <text x="60" y="325" text-anchor="middle" font-size="11" fill="#15803d" font-weight="700">Sétif</text>
    <text x="60" y="338" text-anchor="middle" font-size="9.5" fill="#64748b">Entrepôt DigitalStore</text>
    <circle cx="740" cy="100" r="10" fill="#497b89" filter="url(#sh)"/><circle cx="740" cy="100" r="6" fill="#fff"/>
    <text x="740" y="125" text-anchor="middle" font-size="11" fill="#497b89" font-weight="700">Alger</text>
    <text x="740" y="138" text-anchor="middle" font-size="9.5" fill="#64748b">Destination</text>
    <g id="truckM" transform="translate(395,196)">
      <circle r="20" fill="#497b89" filter="url(#sh)"/>
      <circle r="20" fill="#497b89" opacity="0.3"><animate attributeName="r" values="20;32;20" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/></circle>
      <text y="6" text-anchor="middle" font-size="16">🚚</text>
    </g>
    <circle cx="200" cy="235" r="6" fill="#f59e0b"/><text x="200" y="225" text-anchor="middle" font-size="9" fill="#92400e" font-weight="600">Constantine</text>
    <circle cx="580" cy="160" r="6" fill="#f59e0b"/><text x="580" y="150" text-anchor="middle" font-size="9" fill="#92400e" font-weight="600">Blida</text>
  </svg>`;
  const truck = mapEl.querySelector('#truckM');
  if (!truck) return;
  const path=[[395,196],[430,193],[465,185],[510,175],[555,164]];
  let step=0;
  setInterval(()=>{ step=(step+1)%path.length; truck.setAttribute('transform',`translate(${path[step][0]},${path[step][1]})`); },3000);
}

/* ══════════════════════════════════════════
   TIMER
══════════════════════════════════════════ */
function startTimer() {
  const end = new Date();
  end.setHours(end.getHours()+7, end.getMinutes()+24, end.getSeconds()+16);
  setInterval(()=>{
    let diff = Math.max(0,Math.floor((end-new Date())/1000));
    const h=Math.floor(diff/3600); diff%=3600;
    const m=Math.floor(diff/60); const s=diff%60;
    document.getElementById('th').textContent=String(h).padStart(2,'0');
    document.getElementById('tm').textContent=String(m).padStart(2,'0');
    document.getElementById('ts').textContent=String(s).padStart(2,'0');
  },1000);
}

/* ══════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════ */
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open');}));

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2800);
}

/* ══ INIT ══ */
renderProducts();
startTimer();