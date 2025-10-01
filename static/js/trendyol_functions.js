function renderTrendyolOverview() {
  const payload = trendyolData.overview;
  clearMainContent();

  // KPIs
  const kpiRow = document.createElement('div');
  kpiRow.className = 'kpi-row';
  kpiRow.innerHTML = `
    <div class="kpi"><div class="label">Orders (30d)</div><div class="value">${payload.kpis.orders}</div></div>
    <div class="kpi"><div class="label">Revenue</div><div class="value">$${numberWithCommas(payload.kpis.revenue)}</div></div>
    <div class="kpi"><div class="label">Reviews</div><div class="value">${payload.kpis.reviews}</div></div>
    <div class="kpi"><div class="label">Rating</div><div class="value">${payload.kpis.rating}</div></div>
    <div class="kpi"><div class="label">Returns</div><div class="value">${payload.kpis.returns}</div></div>
    <div class="kpi"><div class="label">Top Category</div><div class="value">${payload.kpis.topCategory}</div></div>
  `;
  document.getElementById('main-content').appendChild(kpiRow);

  // Sales trend chart
  const chartCard = document.createElement('div');
  chartCard.className = 'card';
  chartCard.innerHTML = `<h3 style="margin-top:0">Sales Trend</h3><canvas id="trendyolSalesChart" height="100"></canvas>`;
  document.getElementById('main-content').appendChild(chartCard);

  // Orders table
  const orderCard = document.createElement('div');
  orderCard.className = 'card';
  orderCard.innerHTML = `<h3 style="margin-top:0">Recent Orders</h3>
    <table class="table">
      <thead><tr><th>Order</th><th>Customer</th><th>Amount</th><th>Items</th><th>Status</th><th>Date</th></tr></thead>
      <tbody>${payload.salesTable.map(o => `<tr>
        <td>${o.orderId}</td>
        <td>${o.customer}</td>
        <td>$${o.amount}</td>
        <td>${o.items}</td>
        <td>${o.status}</td>
        <td>${o.date}</td>
      </tr>`).join('')}</tbody>
    </table>`;
  document.getElementById('main-content').appendChild(orderCard);

  // Chart.js - Sales trend
  const ctx = document.getElementById('trendyolSalesChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: payload.salesTimeseries.labels,
      datasets: [{
        label: 'Orders',
        data: payload.salesTimeseries.values,
        borderWidth: 2,
        borderColor: '#ff6600',
        backgroundColor: 'rgba(255,102,0,0.2)',
        tension: 0.3,
        fill: true
      }]
    },
    options: { responsive:true, plugins:{ legend:{display:true} } }
  });

  // Context actions
  setContextActions([
    { label: 'Export CSV', action: 'csv', onClick: ()=>alert('Export Trendyol CSV (demo)') },
    { label: 'Export PDF', action: 'pdf', onClick: ()=>alert('Export Trendyol PDF (demo)') }
  ]);
}

function renderTrendyolSales() {
  const payload = trendyolData.sales;
  clearMainContent();

  // Monthly sales chart
  const chartCard = document.createElement('div');
  chartCard.className = 'card';
  chartCard.innerHTML = `<h3 style="margin-top:0">Monthly Sales</h3><canvas id="trendyolMonthlySalesChart" height="100"></canvas>`;
  document.getElementById('main-content').appendChild(chartCard);

  const ctx = document.getElementById('trendyolMonthlySalesChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: payload.monthlySales.labels,
      datasets: [{
        label: 'Revenue ($)',
        data: payload.monthlySales.values,
        backgroundColor: '#ff6600'
      }]
    },
    options: { responsive:true, plugins:{ legend:{display:false} } }
  });

  // Top products table
  const prodCard = document.createElement('div');
  prodCard.className = 'card';
  prodCard.innerHTML = `<h3 style="margin-top:0">Top Products</h3>
    <table class="table">
      <thead><tr><th>Product</th><th>Units</th><th>Revenue</th><th>Rating</th></tr></thead>
      <tbody>${payload.topProducts.map(p => `<tr>
        <td>${p.name}</td>
        <td>${p.units}</td>
        <td>$${p.revenue}</td>
        <td>${p.rating}</td>
      </tr>`).join('')}</tbody>
    </table>`;
  document.getElementById('main-content').appendChild(prodCard);

  setContextActions([
    { label: 'Download Top Products', action: 'download', onClick: ()=>alert('Download Trendyol Top Products (demo)') }
  ]);
}