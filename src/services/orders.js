// src/services/orders.js
const ORDERS_KEY = "demoshop:orders:v1";

function load() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}
function save(arr) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(arr));
}

export function listOrders() {
  return load();
}

export function getOrder(id) {
  return load().find(o => o.id === id);
}

export function createOrder(payload) {
  const id = (crypto?.randomUUID?.() || `ord_${Date.now()}`);
  const order = {
    id,
    createdAt: new Date().toISOString(),
    status: payload.status || "pending",
    ...payload, // {items, amount, currency, method, customer, note, paymentRef...}
  };
  const all = load();
  all.unshift(order); // plus récent en premier
  save(all);
  return order;
}

export function updateOrder(id, patch) {
  const all = load();
  const i = all.findIndex(o => o.id === id);
  if (i === -1) return null;
  all[i] = { ...all[i], ...patch };
  save(all);
  return all[i];
}

export function clearOrders() {
  localStorage.removeItem(ORDERS_KEY);
}
