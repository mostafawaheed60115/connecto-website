// ===============================================
// GLOBAL TOGGLES + HELPERS (shared across all platforms)
// ===============================================
//website loading//

 window.addEventListener("load", () => {
      setTimeout(() => {
        const loader = document.getElementById("loading-screen");
        loader.style.animation = "fadeOut 0.5s ease forwards";
        setTimeout(() => {
          loader.style.display = "none";
          document.querySelector(".app").style.display = "flex";
        }, 500);
      }, 2000);
    });

///////////////////////
// Sidebar collapse toggle
document.getElementById("toggleSidebar").onclick = () => {
  document.getElementById("sidebar").classList.toggle("collapsed");
};

// Dark mode toggle
const toggleDark = document.createElement("button");
toggleDark.innerText = "🌙";
toggleDark.className = "collapse-btn";
document.querySelector(".brand").appendChild(toggleDark);
toggleDark.onclick = () => {
  document.body.classList.toggle("dark");
};

// ---------- Shared Helper Functions ----------
function clearMainContent() {
  document.getElementById('main-content').innerHTML = '';
}

function setContextActions(actions = []) {
  const container = document.getElementById('context-actions-container');
  container.innerHTML = '';
  actions.forEach(a => {
    const btn = document.createElement('div');
    btn.className = 'action';
    btn.textContent = a.label;
    btn.dataset.action = a.action;
    btn.addEventListener('click', () => {
      if (typeof a.onClick === 'function') a.onClick();
    });
    container.appendChild(btn);
  });
}

// Utility
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function buildCSVFromInventory(inv) {
  const header = ['SKU','Name','Stock','Price','30dSales'];
  const rows = inv.map(i => [i.sku, i.name, i.stock, i.price, i.sales30d].map(v=>`"${v}"`).join(','));
  return [header.join(','), ...rows].join('\n');
}
function downloadCSV(filename, csv) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; document.body.appendChild(a);
  a.click(); a.remove(); URL.revokeObjectURL(url);
}


// ===============================================
// GENERIC PLACEHOLDER VIEW
// ===============================================
function renderSimple(platform, item) {
  clearMainContent();
  setContextActions([
    { label: 'Quick action 1', action: 'qa1', onClick: ()=>alert('Quick action 1 (demo)') },
    { label: 'Quick action 2', action: 'qa2', onClick: ()=>alert('Quick action 2 (demo)') }
  ]);
  const c = document.createElement('div');
  c.className = 'card';
  c.innerHTML = `<h3 style="margin-top:0">${platform.toUpperCase()} — ${item}</h3>
    <p class="muted">This is a placeholder view for <strong>${item}</strong>. Replace this with live components you build (charts, tables, editors).</p>`;
  document.getElementById('main-content').appendChild(c);
}


// ===============================================
// MENU WIRING
// ===============================================
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;
    const items = document.getElementById(cat + '-items');
    const caret = document.getElementById(cat + '-caret');
    items.classList.toggle('visible');
    caret.textContent = items.classList.contains('visible') ? '▾' : '▸';
  });
});

document.querySelectorAll('.item-btn').forEach(it => {
  it.addEventListener('click', () => {
    const platform = it.dataset.cat;
    const item = it.dataset.item;

    if (platform === 'amazon') {
      if (item === 'overview') renderAmazonOverview();
      else if (item === 'catalog') renderAmazonCatalog();
      else if (item === 'inventory') renderAmazonInventory();
      else if (item === 'growth') renderAmazonGrowth();
      else if (item === 'performance') renderAmazonPerformance();
      else if (item === 'advertising') renderAmazonAdvertising();
      else renderSimple(platform, item);
    } else if (platform === 'noon') {
      if (item === 'overview') renderNoonOverview();
      else if (item === 'sales') renderNoonSales();
        else if (item === 'revenue') renderNoonRevenue();
        else if (item === 'reputation') renderNoonReputation();
        else if (item === 'performance') renderNoonPerformance();
      else renderSimple(platform, item);
    } else {
      renderSimple(platform, item);
    }
  });
});

// Default load
window.addEventListener('load', () => {
  document.getElementById('amazon-items').classList.add('visible');
  document.getElementById('amazon-caret').textContent = '▾';
  renderAmazonOverview();
});
