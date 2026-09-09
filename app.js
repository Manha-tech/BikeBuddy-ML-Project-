/* ==========================================================================
   BikeBuddy Application JavaScript Engine
   Router, ML Valuation Predictor, Filter Engine, Modal & State Management
   ========================================================================== */

// --- DATASET: BIKE MODELS & PRE-OWNED INVENTORY ---
const BRAND_MODELS = {
  "Honda": [
    { name: "CB Shine", basePrice: 80000, engine: 125, mileage: 55, type: "Commuter" },
    { name: "Activa 6G", basePrice: 78000, engine: 110, mileage: 50, type: "Scooter" },
    { name: "Hornet 2.0", basePrice: 138000, engine: 184, mileage: 42, type: "Sports" },
    { name: "Unicorn", basePrice: 110000, engine: 160, mileage: 50, type: "Commuter" },
    { name: "CB350 Highness", basePrice: 210000, engine: 348, mileage: 35, type: "Cruiser" }
  ],
  "Royal Enfield": [
    { name: "Hunter 350", basePrice: 175000, engine: 349, mileage: 36, type: "Cruiser" },
    { name: "Classic 350", basePrice: 195000, engine: 349, mileage: 35, type: "Cruiser" },
    { name: "Bullet 350", basePrice: 173000, engine: 349, mileage: 37, type: "Cruiser" },
    { name: "Meteor 350", basePrice: 205000, engine: 349, mileage: 35, type: "Cruiser" },
    { name: "Himalayan 450", basePrice: 285000, engine: 452, mileage: 30, type: "Adventure" }
  ],
  "Yamaha": [
    { name: "MT-15 V2", basePrice: 168000, engine: 155, mileage: 45, type: "Sports" },
    { name: "R15 V4", basePrice: 182000, engine: 155, mileage: 45, type: "Sports" },
    { name: "FZ-S V4", basePrice: 129000, engine: 149, mileage: 48, type: "Sports" },
    { name: "RayZR 125", basePrice: 85000, engine: 125, mileage: 52, type: "Scooter" }
  ],
  "TVS": [
    { name: "Apache RTR 160", basePrice: 120000, engine: 160, mileage: 48, type: "Sports" },
    { name: "Raider 125", basePrice: 97000, engine: 124, mileage: 56, type: "Commuter" },
    { name: "Jupiter 125", basePrice: 86000, engine: 124, mileage: 50, type: "Scooter" },
    { name: "Apache RR 310", basePrice: 272000, engine: 312, mileage: 32, type: "Sports" }
  ],
  "Hero": [
    { name: "Splendor+", basePrice: 75000, engine: 97, mileage: 65, type: "Commuter" },
    { name: "HF Deluxe", basePrice: 62000, engine: 97, mileage: 65, type: "Commuter" },
    { name: "Xpulse 200 4V", basePrice: 147000, engine: 199, mileage: 40, type: "Adventure" },
    { name: "Passion Plus", basePrice: 78000, engine: 110, mileage: 60, type: "Commuter" }
  ],
  "Bajaj": [
    { name: "Pulsar NS200", basePrice: 149000, engine: 199, mileage: 36, type: "Sports" },
    { name: "Pulsar 150", basePrice: 112000, engine: 149, mileage: 46, type: "Sports" },
    { name: "Dominar 400", basePrice: 230000, engine: 373, mileage: 29, type: "Cruiser" },
    { name: "Chetak Electric", basePrice: 120000, engine: 0, mileage: 100, type: "Scooter", fuel: "Electric" }
  ],
  "KTM": [
    { name: "Duke 200", basePrice: 196000, engine: 199, mileage: 35, type: "Sports" },
    { name: "RC 390", basePrice: 318000, engine: 373, mileage: 28, type: "Sports" },
    { name: "Duke 390", basePrice: 310000, engine: 398, mileage: 28, type: "Sports" }
  ],
  "Suzuki": [
    { name: "Gixxer SF", basePrice: 145000, engine: 155, mileage: 45, type: "Sports" },
    { name: "Access 125", basePrice: 82000, engine: 124, mileage: 52, type: "Scooter" },
    { name: "V-Strom SX", basePrice: 211000, engine: 249, mileage: 36, type: "Adventure" }
  ]
};

// PRE-OWNED BIKES FOR CATALOG
const BIKES_INVENTORY = [
  {
    id: "b1",
    title: "Yamaha MT-15 V2",
    brand: "Yamaha",
    model: "MT-15 V2",
    year: 2022,
    km: "12,000 km",
    kmVal: 12000,
    fuel: "Petrol",
    price: 92000,
    badge: "Best Match",
    badgeType: "badge-green",
    tags: [
      { text: "Excellent", class: "tag-excellent" },
      { text: "High Demand", class: "tag-demand" }
    ],
    image: "assets/yamaha_mt15.png",
    mileage: 45,
    engine: 155,
    type: "Sports",
    owner: "First Owner",
    location: "Koramangala, Bangalore",
    seller: "Rahul Sharma (Verified Seller)",
    phone: "+91 98765 43210"
  },
  {
    id: "b2",
    title: "TVS Apache RTR 160",
    brand: "TVS",
    model: "Apache RTR 160",
    year: 2021,
    km: "15,000 km",
    kmVal: 15000,
    fuel: "Petrol",
    price: 76000,
    badge: "Popular",
    badgeType: "badge-purple",
    tags: [
      { text: "Good Condition", class: "tag-good" },
      { text: "Popular", class: "tag-popular" }
    ],
    image: "assets/tvs_apache.png",
    mileage: 48,
    engine: 160,
    type: "Sports",
    owner: "Second Owner",
    location: "Adyar, Chennai",
    seller: "Karthik V (Verified Dealer)",
    phone: "+91 98123 45678"
  },
  {
    id: "b3",
    title: "Honda Hornet 2.0",
    brand: "Honda",
    model: "Hornet 2.0",
    year: 2022,
    km: "9,800 km",
    kmVal: 9800,
    fuel: "Petrol",
    price: 88000,
    badge: "Great Value",
    badgeType: "badge-blue",
    tags: [
      { text: "Excellent", class: "tag-excellent" },
      { text: "Great Mileage", class: "tag-mileage" }
    ],
    image: "assets/honda_hornet.png",
    mileage: 42,
    engine: 184,
    type: "Sports",
    owner: "First Owner",
    location: "Gachibowli, Hyderabad",
    seller: "Suresh Kumar",
    phone: "+91 97654 32109"
  },
  {
    id: "b4",
    title: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    model: "Classic 350",
    year: 2021,
    km: "8,500 km",
    kmVal: 8500,
    fuel: "Petrol",
    price: 125000,
    badge: "Verified",
    badgeType: "badge-green",
    tags: [
      { text: "Excellent", class: "tag-excellent" },
      { text: "Low Maintenance", class: "tag-maintenance" }
    ],
    image: "assets/royal_enfield_classic.png",
    mileage: 35,
    engine: 349,
    type: "Cruiser",
    owner: "First Owner",
    location: "Viman Nagar, Pune",
    seller: "Amitabh Roy",
    phone: "+91 99887 76655"
  },
  {
    id: "b5",
    title: "Royal Enfield Hunter 350",
    brand: "Royal Enfield",
    model: "Hunter 350",
    year: 2023,
    km: "5,200 km",
    kmVal: 5200,
    fuel: "Petrol",
    price: 138000,
    badge: "Best Match",
    badgeType: "badge-green",
    tags: [
      { text: "Like New", class: "tag-excellent" },
      { text: "High Demand", class: "tag-demand" }
    ],
    image: "assets/bike_hero_hunter.png",
    mileage: 36,
    engine: 349,
    type: "Cruiser",
    owner: "First Owner",
    location: "Indiranagar, Bangalore",
    seller: "Deepak Patel",
    phone: "+91 91234 56789"
  },
  {
    id: "b6",
    title: "Hero Splendor+",
    brand: "Hero",
    model: "Splendor+",
    year: 2020,
    km: "22,000 km",
    kmVal: 22000,
    fuel: "Petrol",
    price: 48000,
    badge: "Budget Pick",
    badgeType: "badge-purple",
    tags: [
      { text: "Great Mileage", class: "tag-mileage" },
      { text: "Low Maintenance", class: "tag-maintenance" }
    ],
    image: "assets/tvs_apache.png",
    mileage: 65,
    engine: 97,
    type: "Commuter",
    owner: "First Owner",
    location: "Connaught Place, Delhi",
    seller: "Vikram Motors",
    phone: "+91 98711 22334"
  },
  {
    id: "b7",
    title: "KTM Duke 200",
    brand: "KTM",
    model: "Duke 200",
    year: 2022,
    km: "11,000 km",
    kmVal: 11000,
    fuel: "Petrol",
    price: 142000,
    badge: "Performance",
    badgeType: "badge-blue",
    tags: [
      { text: "Excellent", class: "tag-excellent" },
      { text: "High Demand", class: "tag-demand" }
    ],
    image: "assets/honda_hornet.png",
    mileage: 35,
    engine: 199,
    type: "Sports",
    owner: "Second Owner",
    location: "Bandra, Mumbai",
    seller: "Rohan D'souza",
    phone: "+91 98200 11223"
  },
  {
    id: "b8",
    title: "Honda CB Shine",
    brand: "Honda",
    model: "CB Shine",
    year: 2020,
    km: "15,000 km",
    kmVal: 15000,
    fuel: "Petrol",
    price: 58000,
    badge: "Good Condition",
    badgeType: "badge-purple",
    tags: [
      { text: "Good Condition", class: "tag-good" },
      { text: "Great Mileage", class: "tag-mileage" }
    ],
    image: "assets/yamaha_mt15.png",
    mileage: 55,
    engine: 125,
    type: "Commuter",
    owner: "Second Owner",
    location: "HSR Layout, Bangalore",
    seller: "Praveen Rao",
    phone: "+91 97400 33445"
  }
];

// --- NAVIGATION & ROUTER ---
function navigateTo(viewId) {
  // Map shortcut aliases
  if (viewId === 'find-bikes' || viewId === 'find') viewId = 'find-bikes';
  if (viewId === 'prediction' || viewId === 'predict') viewId = 'prediction';
  
  const views = ['home', 'prediction', 'find-bikes'];
  if (!views.includes(viewId)) viewId = 'home';

  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    const navEl = document.getElementById(`nav-${v}`);
    if (el) {
      if (v === viewId) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    }
    if (navEl) {
      if (v === viewId) {
        navEl.classList.add('active');
      } else {
        navEl.classList.remove('active');
      }
    }
  });

  // Scroll smooth to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Browser history support
  const url = viewId === 'home' ? '#' : `#${viewId}`;
  history.pushState({ view: viewId }, '', url);
}

// Handle Browser Back / Forward buttons
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.view) {
    navigateTo(e.state.view);
  } else {
    const hash = window.location.hash.replace('#', '');
    navigateTo(hash || 'home');
  }
});

// Mobile Drawer Toggle
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) {
    drawer.classList.toggle('open');
  }
}

// --- BRAND & MODEL DROPDOWN SYNC ---
function handleBrandChange() {
  const brandSelect = document.getElementById('brandSelect');
  const modelSelect = document.getElementById('modelSelect');
  if (!brandSelect || !modelSelect) return;

  const selectedBrand = brandSelect.value;
  const models = BRAND_MODELS[selectedBrand] || [];

  modelSelect.innerHTML = '';
  models.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.name;
    opt.textContent = m.name;
    modelSelect.appendChild(opt);
  });
}

// --- ML PRICE PREDICTION ESTIMATOR ENGINE ---
function calculatePricePrediction(event) {
  if (event) event.preventDefault();

  const brand = document.getElementById('brandSelect').value;
  const modelName = document.getElementById('modelSelect').value;
  const year = parseInt(document.getElementById('yearSelect').value);
  const kmDriven = parseInt(document.getElementById('kmSelect').value);
  const owner = document.getElementById('ownerSelect').value;
  const fuel = document.getElementById('fuelSelect').value;

  // Find model reference specs
  const modelsList = BRAND_MODELS[brand] || [];
  let modelObj = modelsList.find(m => m.name === modelName);
  if (!modelObj) {
    modelObj = { basePrice: 110000, mileage: 45, engine: 150 };
  }

  const currentYear = 2026;
  const ageYears = Math.max(0, currentYear - year);

  // Depreciation Curve Matrix
  let depRate = 0;
  if (ageYears === 1) depRate = 0.15;
  else if (ageYears === 2) depRate = 0.25;
  else if (ageYears === 3) depRate = 0.35;
  else if (ageYears === 4) depRate = 0.44;
  else if (ageYears === 5) depRate = 0.52;
  else depRate = 0.60;

  // 1. Calculate Market Average for Year & Model
  let marketAvg = Math.round(modelObj.basePrice * (1 - depRate));
  
  // 2. Condition & Mileage Impact
  let conditionImpact = 0;
  if (kmDriven <= 5000) conditionImpact = +1500;
  else if (kmDriven <= 15000) conditionImpact = -2500;
  else if (kmDriven <= 30000) conditionImpact = -5500;
  else if (kmDriven <= 50000) conditionImpact = -9000;
  else conditionImpact = -14000;

  // Owner deduction
  if (owner === 'Second') conditionImpact -= 2000;
  else if (owner === 'Third') conditionImpact -= 5000;

  // 3. Demand Factor Adjustment
  let demandFactor = 0;
  if (["MT-15 V2", "Hunter 350", "Classic 350", "Duke 200"].includes(modelName)) {
    demandFactor = 1500;
  } else if (fuel === 'Electric') {
    demandFactor = 2000;
  }

  // 4. Final Price
  let finalPrice = marketAvg + conditionImpact + demandFactor;
  if (finalPrice < 15000) finalPrice = 15000;

  // Update UI Elements with smooth animation
  formatAndDisplayPrice('resalePriceDisplay', finalPrice);
  document.getElementById('valMarketAvg').textContent = `₹ ${marketAvg.toLocaleString('en-IN')}`;
  
  const condEl = document.getElementById('valConditionImpact');
  if (conditionImpact < 0) {
    condEl.className = 'breakdown-value text-red';
    condEl.textContent = `- ₹ ${Math.abs(conditionImpact).toLocaleString('en-IN')}`;
  } else {
    condEl.className = 'breakdown-value text-green';
    condEl.textContent = `+ ₹ ${conditionImpact.toLocaleString('en-IN')}`;
  }

  const demandEl = document.getElementById('valDemandFactor');
  demandEl.textContent = `+ ₹ ${demandFactor.toLocaleString('en-IN')}`;

  document.getElementById('valFinalPrice').textContent = `₹ ${finalPrice.toLocaleString('en-IN')}`;

  showToast(`Estimated resale price updated for ${brand} ${modelName}!`);
}

function formatAndDisplayPrice(elementId, targetValue) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = `₹ ${targetValue.toLocaleString('en-IN')}`;
}

// --- FIND BIKES CATALOG & FILTER ENGINE ---
function renderBikeCards(bikes) {
  const grid = document.getElementById('bikeGrid');
  if (!grid) return;

  grid.innerHTML = '';
  if (bikes.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 0; color: var(--text-muted);">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px;margin-bottom:12px;color:#94A3B8;"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
        <h3>No bikes found matching your criteria</h3>
        <p>Try resetting your filters to explore more options.</p>
        <button class="btn btn-outline btn-shadow" style="margin-top:16px;" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  bikes.forEach(bike => {
    const card = document.createElement('div');
    card.className = 'bike-card';
    card.innerHTML = `
      <div class="card-top-bar">
        <span class="match-badge ${bike.badgeType}">${bike.badge}</span>
        <button class="fav-btn" onclick="toggleFavorite(this)" aria-label="Add to wishlist">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      
      <div class="bike-card-img-wrapper">
        <img src="${bike.image}" alt="${bike.title}" class="card-bike-img">
      </div>

      <h3 class="bike-card-name">${bike.title}</h3>
      <p class="bike-card-meta">${bike.year} • ${bike.km} • ${bike.fuel}</p>
      
      <div class="bike-card-price">₹ ${bike.price.toLocaleString('en-IN')}</div>

      <div class="bike-card-tags">
        ${bike.tags.map(t => `<span class="tag-pill ${t.class}">${t.text}</span>`).join('')}
      </div>

      <button class="btn btn-outline btn-card-details" onclick="openBikeDetailModal('${bike.id}')">View Details</button>
    `;
    grid.appendChild(card);
  });
}

function applyFilters() {
  const budget = document.getElementById('filterBudget').value;
  const brand = document.getElementById('filterBrand').value;
  const mileage = document.getElementById('filterMileage').value;
  const engine = document.getElementById('filterEngine').value;
  const fuel = document.getElementById('filterFuel').value;
  const type = document.getElementById('filterType').value;

  let filtered = BIKES_INVENTORY.filter(bike => {
    // Budget
    if (budget === '30-60' && (bike.price < 30000 || bike.price > 60000)) return false;
    if (budget === '50-100' && (bike.price < 50000 || bike.price > 100000)) return false;
    if (budget === '100-150' && (bike.price < 100000 || bike.price > 150000)) return false;
    if (budget === '150+' && bike.price < 150000) return false;

    // Brand
    if (brand !== 'all' && bike.brand !== brand) return false;

    // Mileage
    if (mileage !== 'any' && bike.mileage < parseInt(mileage)) return false;

    // Engine CC
    if (engine === '100-200' && (bike.engine < 100 || bike.engine > 200)) return false;
    if (engine === '200-400' && (bike.engine < 200 || bike.engine > 400)) return false;
    if (engine === '400+' && bike.engine < 400) return false;

    // Fuel
    if (fuel !== 'all' && bike.fuel !== fuel) return false;

    // Type
    if (type !== 'all' && bike.type !== type) return false;

    return true;
  });

  renderBikeCards(filtered);
  showToast(`Found ${filtered.length} bikes matching your criteria`);
}

function resetFilters() {
  document.getElementById('filterBudget').value = 'all';
  document.getElementById('filterBrand').value = 'all';
  document.getElementById('filterMileage').value = 'any';
  document.getElementById('filterEngine').value = 'any';
  document.getElementById('filterFuel').value = 'all';
  document.getElementById('filterType').value = 'all';

  renderBikeCards(BIKES_INVENTORY);
  showToast('Filters reset to default');
}

function filterByBrandName(brandName) {
  navigateTo('find-bikes');
  const brandSelect = document.getElementById('filterBrand');
  if (brandSelect) {
    brandSelect.value = brandName;
    applyFilters();
  }
}

function toggleExtraFilters() {
  showToast('Advanced filter options expanded');
}

function toggleFavorite(btn) {
  btn.classList.toggle('active');
  if (btn.classList.contains('active')) {
    btn.style.color = '#EF4444';
    showToast('Added to saved bikes!');
  } else {
    btn.style.color = '#94A3B8';
    showToast('Removed from saved bikes.');
  }
}

// --- BIKE DETAIL INSPECTOR MODAL ---
function openBikeDetailModal(bikeId) {
  const bike = BIKES_INVENTORY.find(b => b.id === bikeId);
  if (!bike) return;

  const content = document.getElementById('bikeDetailContent');
  content.innerHTML = `
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: center;">
      <div style="background:#F8FAFC; border-radius:16px; padding:20px; text-align:center;">
        <img src="${bike.image}" alt="${bike.title}" style="max-width:100%; height:auto; object-fit:contain;">
      </div>
      <div>
        <span class="match-badge ${bike.badgeType}" style="margin-bottom:8px;">${bike.badge}</span>
        <h2 style="font-family:var(--font-heading); font-size:26px; font-weight:800; color:var(--text-dark);">${bike.title}</h2>
        <p style="font-size:14px; color:var(--text-muted); margin-bottom:16px;">${bike.location}</p>
        
        <div style="font-family:var(--font-heading); font-size:32px; font-weight:800; color:var(--success-dark); margin-bottom:20px;">
          ₹ ${bike.price.toLocaleString('en-IN')}
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:24px;">
          <div style="background:#F1F5F9; padding:10px 14px; border-radius:10px;">
            <div style="font-size:11px; color:var(--text-muted);">Registration Year</div>
            <div style="font-weight:700; color:var(--text-dark);">${bike.year}</div>
          </div>
          <div style="background:#F1F5F9; padding:10px 14px; border-radius:10px;">
            <div style="font-size:11px; color:var(--text-muted);">Kilometers Run</div>
            <div style="font-weight:700; color:var(--text-dark);">${bike.km}</div>
          </div>
          <div style="background:#F1F5F9; padding:10px 14px; border-radius:10px;">
            <div style="font-size:11px; color:var(--text-muted);">Mileage</div>
            <div style="font-weight:700; color:var(--text-dark);">${bike.mileage} km/l</div>
          </div>
          <div style="background:#F1F5F9; padding:10px 14px; border-radius:10px;">
            <div style="font-size:11px; color:var(--text-muted);">Engine Capacity</div>
            <div style="font-weight:700; color:var(--text-dark);">${bike.engine} CC</div>
          </div>
        </div>

        <div style="border-top:1px solid #E2E8F0; padding-top:16px; margin-top:16px;">
          <div style="font-size:13px; color:var(--text-muted); margin-bottom:4px;">Seller Information</div>
          <div style="font-weight:700; color:var(--text-dark);">${bike.seller}</div>
          <div style="font-size:13px; color:var(--primary); font-weight:600; margin-bottom:16px;">📞 ${bike.phone}</div>
          <button class="btn btn-primary w-full" onclick="showToast('Contact request sent to ${bike.seller}!'); closeModal('bikeDetailModal');">Contact Seller</button>
        </div>
      </div>
    </div>
  `;

  openModal('bikeDetailModal');
}

// --- MODALS ENGINE ---
function openModal(modalId, mode = 'login') {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');

  if (modalId === 'authModal') {
    switchAuthTab(mode);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
}

function switchAuthTab(tab) {
  const tabLogin = document.getElementById('tabLogin');
  const tabSignup = document.getElementById('tabSignup');
  const signupGroup = document.getElementById('signupConfirmPassGroup');
  const submitBtn = document.getElementById('authSubmitBtn');

  if (tab === 'login') {
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
    signupGroup.style.display = 'none';
    submitBtn.textContent = 'Sign In';
  } else {
    tabSignup.classList.add('active');
    tabLogin.classList.remove('active');
    signupGroup.style.display = 'block';
    submitBtn.textContent = 'Create Account';
  }
}

// --- BACKEND PROCESSING & FORM HANDLERS ---
function handleAuthSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const emailInput = form.querySelector('input[type="email"]');
  const email = emailInput ? emailInput.value : '';

  // Simulate Backend API Storage
  const userSession = {
    email: email,
    token: "jwt_" + Math.random().toString(36).substring(2),
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('bikebuddy_user', JSON.stringify(userSession));

  closeModal('authModal');
  showToast(`Welcome to BikeBuddy, ${email.split('@')[0]}! Logged in successfully.`);

  // Update nav buttons to show logged in state
  const authContainer = document.querySelector('.nav-auth-buttons');
  if (authContainer) {
    authContainer.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="font-size:13.5px; font-weight:600; color:var(--primary); background:var(--primary-light); padding:6px 14px; border-radius:9999px;">
          👤 ${email.split('@')[0]}
        </span>
        <button class="btn btn-outline" style="padding:6px 12px; font-size:12px;" onclick="handleLogout()">Logout</button>
      </div>
    `;
  }
}

function handleLogout() {
  localStorage.removeItem('bikebuddy_user');
  location.reload();
}

function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending Message...';

  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const message = form.querySelector('textarea').value;

  // Simulate Backend API Database Persistence
  const contactEntry = {
    id: 'msg_' + Date.now(),
    name: name,
    email: email,
    message: message,
    createdAt: new Date().toISOString()
  };

  setTimeout(() => {
    let submissions = JSON.parse(localStorage.getItem('bikebuddy_contact_submissions') || '[]');
    submissions.push(contactEntry);
    localStorage.setItem('bikebuddy_contact_submissions', JSON.stringify(submissions));

    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    form.reset();
    closeModal('contactModal');

    showToast(`Thank you, ${name}! Your inquiry has been processed by our backend.`);
  }, 700);
}

// --- REALISTIC INTERACTIVE 360-DEGREE 3D HERO ROTATION ---
function initHero3DRotation() {
  const heroCol = document.querySelector('.hero-image-col');
  const bikeImg = document.getElementById('heroBikeImg');
  const badge = document.querySelector('.circle-badge-bg');

  if (!heroCol || !bikeImg) return;

  heroCol.addEventListener('mousemove', (e) => {
    const rect = heroCol.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Realistic 3D rotational perspective
    const rotY = ((x - centerX) / centerX) * 35; // 35 deg Y-axis turn
    const rotX = ((y - centerY) / centerY) * -15; // 15 deg X-axis pitch

    if (badge) badge.style.transform = `rotateY(${rotY * 0.3}deg) rotateX(${rotX * 0.3}deg)`;
    bikeImg.style.transform = `translateZ(50px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(1.05)`;
  });

  heroCol.addEventListener('mouseleave', () => {
    if (badge) badge.style.transform = `rotateY(0deg) rotateX(0deg)`;
    bikeImg.style.transform = `translateZ(40px) rotate(-1deg) scale(1)`;
  });
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  handleBrandChange();
  renderBikeCards(BIKES_INVENTORY);
  initHero3DRotation();

  // Check saved login session
  const savedUser = localStorage.getItem('bikebuddy_user');
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      const authContainer = document.querySelector('.nav-auth-buttons');
      if (authContainer && user.email) {
        authContainer.innerHTML = `
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:13.5px; font-weight:600; color:var(--primary); background:var(--primary-light); padding:6px 14px; border-radius:9999px;">
              👤 ${user.email.split('@')[0]}
            </span>
            <button class="btn btn-outline" style="padding:6px 12px; font-size:12px;" onclick="handleLogout()">Logout</button>
          </div>
        `;
      }
    } catch(e) {}
  }

  // Check URL hash for initial view routing
  const hash = window.location.hash.replace('#', '');
  if (hash && ['home', 'prediction', 'find-bikes'].includes(hash)) {
    navigateTo(hash);
  } else {
    navigateTo('home');
  }
});
