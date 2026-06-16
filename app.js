const products = [
  {
    id: 1,
    name: "Cold brew",
    category: "Bebidas",
    price: 12500,
    desc: "Cafe frio de 18 horas",
    tag: "Popular",
    stock: 38,
    sold: 24,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Limonada premium",
    category: "Bebidas",
    price: 10500,
    desc: "Limon, hierbabuena y hielo",
    tag: "Nuevo",
    stock: 16,
    sold: 31,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Croissant mantequilla",
    category: "Panaderia",
    price: 8900,
    desc: "Hojaldrado y dorado",
    tag: "Fresh",
    stock: 22,
    sold: 19,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Bowl de frutas",
    category: "Mercado",
    price: 14500,
    desc: "Temporada, yogur y granola",
    tag: "Ligero",
    stock: 12,
    sold: 11,
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Sandwich del bar",
    category: "Comida",
    price: 22900,
    desc: "Pan artesanal y vegetales",
    tag: "Top",
    stock: 27,
    sold: 22,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Cerveza artesanal",
    category: "Bar",
    price: 18000,
    desc: "Rubia local 330 ml",
    tag: "Bar",
    stock: 7,
    sold: 28,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Queso campesino",
    category: "Mercado",
    price: 16800,
    desc: "Producto local por libra",
    tag: "Local",
    stock: 8,
    sold: 9,
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Torta de chocolate",
    category: "Panaderia",
    price: 13200,
    desc: "Porcion humeda con cacao",
    tag: "Dulce",
    stock: 18,
    sold: 17,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Tacos de la casa",
    category: "Comida",
    price: 25500,
    desc: "Tres unidades con salsa verde",
    tag: "Mesa",
    stock: 20,
    sold: 14,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
  },
];

const roleCopy = {
  seller: {
    profileKicker: "Caja activa",
    profileName: "Camila · Vendedor",
    profileDescription: "Toma pedidos, agrega productos y cobra sin salir del flujo.",
    viewKicker: "Punto de venta",
    viewTitle: "Productos frescos, cobro veloz.",
    cartKicker: "Pedido actual",
    cartTitle: "Carrito",
    customerLabel: "Cliente o mesa",
    customerPlaceholder: "Mesa 04",
    checkout: "Cobrar pedido",
    empty: "Selecciona productos para iniciar el pedido.",
    buttonLabel: "Agregar",
  },
  admin: {
    profileKicker: "Direccion",
    profileName: "Sofia · Admin",
    profileDescription: "Revisa ventas, stock, rotacion y decisiones del dia.",
    viewKicker: "Panel admin",
    viewTitle: "Control del negocio, claro y sin ruido.",
    cartKicker: "Operacion",
    cartTitle: "Resumen",
    customerLabel: "Responsable",
    customerPlaceholder: "Turno tarde",
    checkout: "Guardar cambios",
    empty: "El admin revisa inventario y rendimiento por producto.",
    buttonLabel: "Ver",
  },
  customer: {
    profileKicker: "Compra online",
    profileName: "Cliente invitado",
    profileDescription: "Explora el catalogo, arma tu pedido y paga en segundos.",
    viewKicker: "Tienda",
    viewTitle: "Elige lo que quieres, nosotros lo preparamos.",
    cartKicker: "Tu compra",
    cartTitle: "Bolsa",
    customerLabel: "Nombre para el pedido",
    customerPlaceholder: "Daniel",
    checkout: "Finalizar compra",
    empty: "Tu bolsa esta lista para tus favoritos.",
    buttonLabel: "Comprar",
  },
};

const money = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

let activeCategory = "Todos";
let activePayment = "Tarjeta";
let activeRole = "seller";
const cart = new Map();

const appShell = document.querySelector("#appShell");
const productGrid = document.querySelector("#productGrid");
const categoryTabs = document.querySelector("#categoryTabs");
const searchInput = document.querySelector("#searchInput");
const cartItems = document.querySelector("#cartItems");
const cartBadge = document.querySelector("#cartBadge");
const subtotalEl = document.querySelector("#subtotal");
const serviceEl = document.querySelector("#service");
const totalEl = document.querySelector("#total");
const checkoutButton = document.querySelector("#checkoutButton");
const clearCart = document.querySelector("#clearCart");
const productCount = document.querySelector("#productCount");
const categoryTitle = document.querySelector("#categoryTitle");
const toast = document.querySelector("#toast");
const serviceMode = document.querySelector("#serviceMode");
const serviceModeLabel = document.querySelector("#serviceModeLabel");
const roleSwitcher = document.querySelector("#roleSwitcher");
const inventoryList = document.querySelector("#inventoryList");
const exportReport = document.querySelector("#exportReport");

const categories = ["Todos", ...new Set(products.map((product) => product.category))];

function renderCategories() {
  categoryTabs.innerHTML = categories
    .map(
      (category) =>
        `<button class="segment ${category === activeCategory ? "active" : ""}" data-category="${category}" role="tab">${category}</button>`
    )
    .join("");
}

function getFilteredProducts() {
  const query = searchInput.value.trim().toLowerCase();
  return products.filter((product) => {
    const categoryMatch = activeCategory === "Todos" || product.category === activeCategory;
    const searchMatch = [product.name, product.category, product.desc].join(" ").toLowerCase().includes(query);
    return categoryMatch && searchMatch;
  });
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();
  productCount.textContent = `${filteredProducts.length} items`;
  categoryTitle.textContent = activeRole === "admin" ? "Inventario por categoria" : activeCategory === "Todos" ? "Todos los productos" : activeCategory;

  productGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-media">
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
            <span class="pill">${product.tag}</span>
          </div>
          <div class="product-info">
            <div>
              <h3>${product.name}</h3>
              <p>${product.desc}</p>
              <span class="price">${money.format(product.price)}</span>
            </div>
            <button class="add-button" data-add="${product.id}" aria-label="${roleCopy[activeRole].buttonLabel} ${product.name}">+</button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderInventory() {
  const filteredProducts = getFilteredProducts();
  inventoryList.innerHTML = filteredProducts
    .map((product) => {
      const stockPercent = Math.min(100, Math.round((product.stock / 40) * 100));
      const low = product.stock <= 12;
      return `
        <article class="inventory-row ${low ? "low" : ""}">
          <div>
            <h3>${product.name}</h3>
            <p class="inventory-meta">${product.category} · ${money.format(product.price)}</p>
          </div>
          <div>
            <div class="stock-bar"><div class="stock-fill" style="width: ${stockPercent}%"></div></div>
            <p class="inventory-meta">${product.sold} vendidos hoy</p>
          </div>
          <strong class="stock-note">${product.stock} en stock</strong>
        </article>
      `;
    })
    .join("");
}

function applyRole(role) {
  activeRole = role;
  const copy = roleCopy[role];
  appShell.dataset.role = role;

  document.querySelectorAll(".role-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.role === role);
  });

  document.querySelector("#profileKicker").textContent = copy.profileKicker;
  document.querySelector("#profileName").textContent = copy.profileName;
  document.querySelector("#profileDescription").textContent = copy.profileDescription;
  document.querySelector("#viewKicker").textContent = copy.viewKicker;
  document.querySelector("#viewTitle").textContent = copy.viewTitle;
  document.querySelector("#cartKicker").textContent = copy.cartKicker;
  document.querySelector("#cartTitle").textContent = copy.cartTitle;
  document.querySelector("#customerLabel").textContent = copy.customerLabel;
  document.querySelector("#customerName").placeholder = copy.customerPlaceholder;
  checkoutButton.textContent = copy.checkout;
  clearCart.title = role === "admin" ? "Reiniciar filtros" : "Limpiar carrito";
  clearCart.setAttribute("aria-label", clearCart.title);

  renderProducts();
  renderInventory();
  renderCart();
}

function addToCart(id) {
  const product = products.find((item) => item.id === Number(id));
  const current = cart.get(product.id) || { ...product, quantity: 0 };
  current.quantity += 1;
  cart.set(product.id, current);
  renderCart();
  showToast(activeRole === "customer" ? `${product.name} en tu bolsa` : `${product.name} agregado`);
}

function updateQuantity(id, delta) {
  const current = cart.get(Number(id));
  if (!current) return;
  current.quantity += delta;
  if (current.quantity <= 0) {
    cart.delete(Number(id));
  } else {
    cart.set(Number(id), current);
  }
  renderCart();
}

function getTotals() {
  const subtotal = [...cart.values()].reduce((sum, item) => sum + item.price * item.quantity, 0);
  const service = Math.round(subtotal * 0.08);
  return { subtotal, service, total: subtotal + service };
}

function renderCart() {
  const items = [...cart.values()];
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totals = getTotals();

  cartBadge.textContent = quantity;
  subtotalEl.textContent = money.format(totals.subtotal);
  serviceEl.textContent = money.format(totals.service);
  totalEl.textContent = money.format(totals.total);
  checkoutButton.disabled = activeRole !== "admin" && items.length === 0;

  if (activeRole === "admin") {
    cartBadge.textContent = "9";
    subtotalEl.textContent = money.format(1280000);
    serviceEl.textContent = "42% margen";
    totalEl.textContent = "4 alertas";
    cartItems.innerHTML = `<div class="empty-cart">${roleCopy.admin.empty}</div>`;
    return;
  }

  if (!items.length) {
    cartItems.innerHTML = `<div class="empty-cart">${roleCopy[activeRole].empty}</div>`;
    return;
  }

  cartItems.innerHTML = items
    .map(
      (item) => `
        <article class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <h3>${item.name}</h3>
            <p>${money.format(item.price)} · ${item.category}</p>
          </div>
          <div class="quantity" aria-label="Cantidad de ${item.name}">
            <button data-qty="${item.id}" data-delta="-1" aria-label="Restar">−</button>
            <strong>${item.quantity}</strong>
            <button data-qty="${item.id}" data-delta="1" aria-label="Sumar">+</button>
          </div>
        </article>
      `
    )
    .join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

roleSwitcher.addEventListener("click", (event) => {
  const button = event.target.closest("[data-role]");
  if (!button) return;
  applyRole(button.dataset.role);
});

categoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderCategories();
  renderProducts();
  renderInventory();
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-qty]");
  if (!button) return;
  updateQuantity(button.dataset.qty, Number(button.dataset.delta));
});

document.querySelector(".payment").addEventListener("click", (event) => {
  const button = event.target.closest("[data-payment]");
  if (!button) return;
  activePayment = button.dataset.payment;
  document.querySelectorAll(".pay-option").forEach((item) => item.classList.toggle("active", item === button));
});

searchInput.addEventListener("input", () => {
  renderProducts();
  renderInventory();
});

clearCart.addEventListener("click", () => {
  if (activeRole === "admin") {
    activeCategory = "Todos";
    searchInput.value = "";
    renderCategories();
    renderProducts();
    renderInventory();
    showToast("Filtros reiniciados");
    return;
  }
  cart.clear();
  renderCart();
  showToast(activeRole === "customer" ? "Bolsa limpia" : "Carrito limpio");
});

serviceMode.addEventListener("change", () => {
  serviceModeLabel.textContent = serviceMode.checked ? "Domicilio" : "Mesa";
});

checkoutButton.addEventListener("click", () => {
  if (activeRole === "admin") {
    showToast("Reporte administrativo actualizado");
    return;
  }

  const customer = document.querySelector("#customerName").value.trim() || serviceModeLabel.textContent;
  const { total } = getTotals();
  const action = activeRole === "customer" ? "Compra enviada" : "Pedido cobrado";
  showToast(`${action}: ${customer} · ${money.format(total)} con ${activePayment}`);
  cart.clear();
  renderCart();
});

exportReport.addEventListener("click", () => {
  showToast("Reporte listo para descargar");
});

renderCategories();
applyRole(activeRole);
