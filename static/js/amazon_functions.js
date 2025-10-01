// Render Amazon Overview
Chart.defaults.plugins.tooltip.backgroundColor = "rgba(0, 0, 0, 0.8)";
Chart.defaults.plugins.tooltip.titleColor = "#fff";
Chart.defaults.plugins.tooltip.bodyColor = "#ddd";

Chart.defaults.plugins.legend.labels.color = getComputedStyle(document.body).getPropertyValue('--bs-body-color');
Chart.defaults.color = getComputedStyle(document.body).getPropertyValue('--bs-body-color');
function renderAmazonOverview() {
  const payload = amazonData.overview;
  clearMainContent();

  // ========== GLOBAL SNAPSHOT ==========
  const snapshot = document.createElement('div');
  snapshot.className = 'card';
  snapshot.innerHTML = `
    <h3 style="margin-top:0">Global Snapshot</h3>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">
      <div class="kpi"><div class="label">Sales (today)</div><div class="value">$${numberWithCommas(0)}</div><div class="muted">vs yesterday ▼</div></div>
      <div class="kpi"><div class="label">Open Orders</div><div class="value">24</div><div class="muted">Pending: 0 / FBA: 24</div></div>
      <div class="kpi"><div class="label">Buyer Messages</div><div class="value">0</div><div class="muted">Needs reply</div></div>
      <div class="kpi"><div class="label">Customer Feedback</div><div class="value">⭐ 4.60</div><div class="muted">Past Year (10)</div></div>
    </div>
    <div style="margin-top:20px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">
      <div class="kpi"><div class="label">Featured Offer %</div><div class="value">22%</div><div class="muted">↑ Trending</div></div>
      <div class="kpi"><div class="label">Total Balance</div><div class="value">$24,991</div><div class="muted">Available</div></div>
      <div class="kpi"><div class="label">IPI</div><div class="value">637</div><div class="muted">Current</div></div>
      <div class="kpi"><div class="label">Global Promo Sales</div><div class="value">$3,149</div><div class="muted">Last 7 days</div></div>
    </div>
  `;
  document.getElementById('main-content').appendChild(snapshot);

  // Add a small line chart (Sales Today trend)
  const chartCard = document.createElement('div');
  chartCard.className = 'card';
  chartCard.innerHTML = `
    <h3 style="margin-top:0">Sales Trend</h3>
    <canvas id="amazonSalesTrend" height="80"></canvas>
  `;
  document.getElementById('main-content').appendChild(chartCard);

  const ctxTrend = document.getElementById('amazonSalesTrend').getContext('2d');
  new Chart(ctxTrend, {
    type: 'line',
    data: {
      labels: ["25 Sep","26 Sep","27 Sep","28 Sep","29 Sep"],
      datasets: [{
        label: 'Sales',
        data: [4000, 5200, 3100, 4800, 3600],
        fill: false,
        borderWidth: 2,
        tension: 0.35
      }]
    },
    options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
  });

  // ========== PRODUCT PERFORMANCE ==========
  const productPerf = document.createElement('div');
  productPerf.className = 'card';
  productPerf.innerHTML = `
    <h3 style="margin-top:0">Product Performance (Last 30 days)</h3>
    <div style="display:flex;gap:10px;margin-bottom:10px;">
      <select><option>Active</option><option>Inactive</option></select>
      <select><option>Frequently interacted</option><option>Best sellers</option></select>
      <input type="text" placeholder="Search SKU/Title..." style="flex:1;padding:6px;">
    </div>
    <table class="table">
      <thead>
        <tr><th>Product</th><th>Sales</th><th>Units</th><th>Page Views</th><th>Inventory</th><th>Price</th><th>Actions</th></tr>
      </thead>
      <tbody>
        ${payload.inventory.map(i => `
          <tr>
            <td><strong>${i.name}</strong><br><span class="muted">${i.sku}</span></td>
            <td>$${numberWithCommas(i.sales30d * i.price)}</td>
            <td>${i.sales30d}</td>
            <td>${Math.floor(Math.random()*1500)}</td>
            <td>${i.stock} FBA</td>
            <td>$${i.price.toFixed(2)}</td>
            <td><button class="btn-sm">⋮</button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div style="text-align:right;margin-top:8px;">
      <button class="btn-sm">Go to Manage All Inventory →</button>
    </div>
  `;
  document.getElementById('main-content').appendChild(productPerf);

  // ========== RECOMMENDATIONS ==========
  const recs = document.createElement('div');
  recs.className = 'card';
  recs.innerHTML = `
    <h3 style="margin-top:0">Recommendations</h3>
    <div style="display:flex;gap:16px;overflow-x:auto;padding:8px;">
      <div class="rec-card"><h4>📈 Match Competitive Price</h4><p>Your LYNX Ironing Board is priced higher than competitors.</p><button class="btn-sm">Adjust Price</button></div>
      <div class="rec-card"><h4>⭐ Improve Listing Quality</h4><p>Update product titles and add better images for 2 SKUs.</p><button class="btn-sm">Review Listings</button></div>
      <div class="rec-card"><h4>🎯 Launch Sponsored Ads</h4><p>Boost sales of new products with Sponsored Ads campaign.</p><button class="btn-sm">Create Campaign</button></div>
    </div>
  `;
  document.getElementById('main-content').appendChild(recs);

  // ========== CONTEXT ACTIONS ==========
  setContextActions([
    { label: 'All channels', action: 'all-channels', onClick: () => alert('Filter: All channels (demo)') },
    { label: 'Last 30 days', action: '30d', onClick: () => alert('Filter: 30 days (demo)') },
    { label: 'Export CSV', action: 'export', onClick: () => downloadCSV('amazon_overview.csv', buildCSVFromInventory(payload.inventory)) }
  ]);
}


/////////////////////////////////////////////////// Render Amazon Catalog////////////////////////////
function renderAmazonCatalog() {
  const payload = amazonData.catalog;
  clearMainContent();
  setContextActions([
    { label: 'All products', action: 'all', onClick: () => alert('Show all products (demo)') },
    { label: 'Add product', action: 'add', onClick: () => alert('Open add product modal (demo)') },
    { label: 'Categories', action: 'cats', onClick: () => alert('Manage categories (demo)') }
  ]);
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<h3 style="margin-top:0">Catalog - ${payload.categories.length} categories</h3>
    <div style="display:flex;gap:8px;margin-bottom:12px;">
      ${payload.categories.map(c => `<div style="padding:8px 10px;border-radius:8px;background:#fafafa;border:1px solid #eee;">${c}</div>`).join('')}
    </div>
    <table class="table">
      <thead><tr><th>SKU</th><th>Title</th><th>Price</th><th>Status</th></tr></thead>
      <tbody>${payload.products.map(p => `<tr>
        <td>${p.sku}</td>
        <td>${p.title}</td>
        <td>$${p.price.toFixed(2)}</td>
        <td>${p.status}</td>
      </tr>`).join('')}</tbody>
    </table>`;
  document.getElementById('main-content').appendChild(card);
}

/////////// Render Amazon Inventory/////////////////////////
function renderAmazonInventory() {
  const payload = amazonData.overview.inventory;
  clearMainContent();
  setContextActions([
    { label: 'Reorder low stock', action: 'reorder', onClick: () => alert('Reorder requested (demo)') },
    { label: 'Stock adjustments', action: 'adjust', onClick: () => alert('Stock adjust flow (demo)') }
  ]);
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<h3 style="margin-top:0">Inventory Management</h3>
    <table class="table">
      <thead><tr><th>SKU</th><th>Product</th><th>Stock</th><th>Price</th><th>Action</th></tr></thead>
      <tbody>${payload.map(i => `<tr>
        <td>${i.sku}</td>
        <td>${i.name}</td>
        <td>${i.stock}</td>
        <td>$${i.price.toFixed(2)}</td>
        <td><button style="padding:6px 8px;border-radius:8px;border:none;cursor:pointer;background:var(--bs-primary);color:white" onclick="alert('Edit ${i.sku} (demo)')">Edit</button></td>
      </tr>`).join('')}</tbody>
    </table>`;
  document.getElementById('main-content').appendChild(card);
}
///////////////////////Amazon growth//////////////////////
function renderAmazonGrowth() {
  clearMainContent();
  setContextActions([
    { label: 'View Trends', action: 'trends', onClick: () => alert('Trends (demo)') },
    { label: 'Export Report', action: 'export', onClick: () => alert('Exporting Growth Report (demo)') }
  ]);

  // Example payload for growth (demo values)
  const payload = {
    salesGrowth: "18%",
    revenueGrowth: "22%",
    newCustomers: 540,
    returningCustomers: 320,
    monthlySales: [1200, 1350, 1600, 1900, 2200, 2500],
    months: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"]
  };

  // KPIs
  const kpiRow = document.createElement("div");
  kpiRow.className = "kpi-row";
  kpiRow.innerHTML = `
    <div class="kpi"><div class="label">Sales Growth</div><div class="value">${payload.salesGrowth}</div></div>
    <div class="kpi"><div class="label">Revenue Growth</div><div class="value">${payload.revenueGrowth}</div></div>
    <div class="kpi"><div class="label">New Customers</div><div class="value">${payload.newCustomers}</div></div>
    <div class="kpi"><div class="label">Returning Customers</div><div class="value">${payload.returningCustomers}</div></div>
  `;

  document.getElementById("main-content").appendChild(kpiRow);

  // Chart Card
  const chartCard = document.createElement("div");
  chartCard.className = "card";
  chartCard.innerHTML = `<h3 style="margin-top:0">Monthly Sales Growth</h3>
    <canvas id="growthChart" height="100"></canvas>`;
  document.getElementById("main-content").appendChild(chartCard);

  // Render Chart
  const ctx = document.getElementById("growthChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: payload.months,
      datasets: [{
        label: "Monthly Sales",
        data: payload.monthlySales,
        borderColor: "#0077ff",
        backgroundColor: "rgba(0,119,255,0.1)",
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#0077ff"
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 500 } }
      }
    }
  });
}
///////////////////////////////////////////
///////////////////Amazon performance////////////////
function renderAmazonPerformance() {
  clearMainContent();
  setContextActions([
    { label: 'Download Report', action: 'report', onClick: () => alert('Downloading Performance Report (demo)') },
    { label: 'View Alerts', action: 'alerts', onClick: () => alert('Viewing Alerts (demo)') },
    { label: 'Improve Metrics', action: 'improve', onClick: () => alert('Improvement Suggestions (demo)') }
  ]);

  // Example payload (demo data)
  const payload = {
    defectRate: "0.8%",
    lateShipment: "1.2%",
    customerRating: "4.6 / 5",
    onTimeDelivery: "97%",
    metrics: {
      labels: ["Defect Rate", "Late Shipment", "Customer Rating", "On-Time Delivery"],
      values: [0.8, 1.2, 4.6, 97]
    },
    feedback: [
      { customer: "John D.", rating: 5, comment: "Fast shipping and great quality!" },
      { customer: "Sarah K.", rating: 4, comment: "Good service but packaging can improve." },
      { customer: "Ali M.", rating: 3, comment: "Shipment was slightly delayed." }
    ],
    recommendations: [
      { title: "Improve Packaging", text: "Customer feedback indicates room to improve packaging quality." },
      { title: "Reduce Shipment Delays", text: "Late shipments can be minimized by syncing inventory with courier." },
      { title: "Boost Customer Engagement", text: "Introduce loyalty programs to increase repeat customers." }
    ]
  };

  // KPI Row
  const kpiRow = document.createElement("div");
  kpiRow.className = "kpi-row";
  kpiRow.innerHTML = `
    <div class="kpi"><div class="label">Order Defect Rate</div><div class="value">${payload.defectRate}</div></div>
    <div class="kpi"><div class="label">Late Shipment</div><div class="value">${payload.lateShipment}</div></div>
    <div class="kpi"><div class="label">Customer Rating</div><div class="value">${payload.customerRating}</div></div>
    <div class="kpi"><div class="label">On-Time Delivery</div><div class="value">${payload.onTimeDelivery}</div></div>
  `;
  document.getElementById("main-content").appendChild(kpiRow);

  // Chart
  const chartCard = document.createElement("div");
  chartCard.className = "card";
  chartCard.innerHTML = `<h3 style="margin-top:0">Performance Metrics</h3>
    <canvas id="performanceChart" height="100"></canvas>`;
  document.getElementById("main-content").appendChild(chartCard);

  const ctx = document.getElementById("performanceChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: payload.metrics.labels,
      datasets: [{
        label: "Value",
        data: payload.metrics.values,
        backgroundColor: ["#ff4d4f", "#ffae00", "#0077ff", "#52c41a"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // Feedback Table
  const feedbackCard = document.createElement("div");
  feedbackCard.className = "card";
  feedbackCard.innerHTML = `
    <h3 style="margin-top:0">Recent Customer Feedback</h3>
    <table class="table">
      <thead><tr><th>Customer</th><th>Rating</th><th>Comment</th></tr></thead>
      <tbody>
        ${payload.feedback.map(f => `
          <tr>
            <td>${f.customer}</td>
            <td>${"⭐".repeat(f.rating)}</td>
            <td>${f.comment}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  document.getElementById("main-content").appendChild(feedbackCard);

  // Recommendations
  const recWrapper = document.createElement("div");
  recWrapper.style.display = "flex";
  recWrapper.style.gap = "12px";
  recWrapper.style.overflowX = "auto";
  payload.recommendations.forEach(r => {
    const recCard = document.createElement("div");
    recCard.className = "rec-card";
    recCard.innerHTML = `<h4>${r.title}</h4><p>${r.text}</p><button class="btn-sm">Apply</button>`;
    recWrapper.appendChild(recCard);
  });
  
  const recContainer = document.createElement("div");
  recContainer.className = "card";
  recContainer.innerHTML = `<h3 style="margin-top:0">Recommendations</h3>`;
  recContainer.appendChild(recWrapper);
  document.getElementById("main-content").appendChild(recContainer);
}
/////////////////////////////
//////////////Amazon Advertising ///////////
function renderAmazonAdvertising() {
  clearMainContent();
  setContextActions([
    { label: 'Create Campaign', action: 'create', onClick: () => alert('Create campaign flow (demo)') },
    { label: 'Export Ads Report', action: 'export', onClick: () => alert('Exporting ads data (demo)') },
    { label: 'Optimize Budget', action: 'optimize', onClick: () => alert('Optimizing campaigns (demo)') }
  ]);

  // Example payload (mock/demo data)
  const payload = {
    kpis: {
      spend: 2400,
      impressions: 185000,
      clicks: 8500,
      ctr: "4.6%",
      acos: "21%"
    },
    campaigns: [
      { name: "Summer Deals", type: "Sponsored Products", spend: 820, impressions: 65000, clicks: 2800, sales: 3400, acos: "24%" },
      { name: "Back to School", type: "Sponsored Brands", spend: 650, impressions: 55000, clicks: 2600, sales: 4100, acos: "16%" },
      { name: "Clearance Sale", type: "Sponsored Products", spend: 930, impressions: 65000, clicks: 3100, sales: 3700, acos: "23%" }
    ],
    timeseries: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      spend: [300, 400, 450, 500, 600, 650],
      revenue: [800, 1000, 1200, 1350, 1500, 1700]
    },
    recommendations: [
      { title: "Boost High CTR Campaigns", text: "Increase budget on campaigns with CTR > 5% for maximum ROI." },
      { title: "Pause Low Performers", text: "Reduce spend on campaigns with ACOS above 30%." },
      { title: "Use Negative Keywords", text: "Filter irrelevant traffic to improve ad efficiency." }
    ]
  };

  // KPIs
  const kpiRow = document.createElement("div");
  kpiRow.className = "kpi-row";
  kpiRow.innerHTML = `
    <div class="kpi"><div class="label">Ad Spend</div><div class="value">$${payload.kpis.spend}</div></div>
    <div class="kpi"><div class="label">Impressions</div><div class="value">${payload.kpis.impressions.toLocaleString()}</div></div>
    <div class="kpi"><div class="label">Clicks</div><div class="value">${payload.kpis.clicks.toLocaleString()}</div></div>
    <div class="kpi"><div class="label">CTR</div><div class="value">${payload.kpis.ctr}</div></div>
    <div class="kpi"><div class="label">ACOS</div><div class="value">${payload.kpis.acos}</div></div>
  `;
  document.getElementById("main-content").appendChild(kpiRow);

  // Chart (Spend vs Revenue)
  const chartCard = document.createElement("div");
  chartCard.className = "card";
  chartCard.innerHTML = `<h3 style="margin-top:0">Spend vs Revenue</h3>
    <canvas id="adChart" height="100"></canvas>`;
  document.getElementById("main-content").appendChild(chartCard);

  const ctx = document.getElementById("adChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: payload.timeseries.labels,
      datasets: [
        {
          label: "Ad Spend",
          data: payload.timeseries.spend,
          borderColor: "#ff4d4f",
          backgroundColor: "rgba(255,77,79,0.1)",
          tension: 0.3,
          fill: true
        },
        {
          label: "Revenue",
          data: payload.timeseries.revenue,
          borderColor: "#52c41a",
          backgroundColor: "rgba(82,196,26,0.1)",
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } }
    }
  });

  // Campaigns Table
  const tableCard = document.createElement("div");
  tableCard.className = "card";
  tableCard.innerHTML = `
    <h3 style="margin-top:0">Active Campaigns</h3>
    <table class="table">
      <thead>
        <tr><th>Campaign</th><th>Type</th><th>Spend</th><th>Impressions</th><th>Clicks</th><th>Sales</th><th>ACOS</th></tr>
      </thead>
      <tbody>
        ${payload.campaigns.map(c => `
          <tr>
            <td>${c.name}</td>
            <td>${c.type}</td>
            <td>$${c.spend}</td>
            <td>${c.impressions.toLocaleString()}</td>
            <td>${c.clicks.toLocaleString()}</td>
            <td>$${c.sales}</td>
            <td>${c.acos}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
  document.getElementById("main-content").appendChild(tableCard);

  // Recommendations
  const recWrapper = document.createElement("div");
  recWrapper.style.display = "flex";
  recWrapper.style.gap = "12px";
  recWrapper.style.overflowX = "auto";

  payload.recommendations.forEach(r => {
    const recCard = document.createElement("div");
    recCard.className = "rec-card";
    recCard.innerHTML = `<h4>${r.title}</h4><p>${r.text}</p><button class="btn-sm">Apply</button>`;
    recWrapper.appendChild(recCard);
  });

  const recContainer = document.createElement("div");
  recContainer.className = "card";
  recContainer.innerHTML = `<h3 style="margin-top:0">Optimization Recommendations</h3>`;
  recContainer.appendChild(recWrapper);
  document.getElementById("main-content").appendChild(recContainer);
}

/////Amazon ADv end///////////