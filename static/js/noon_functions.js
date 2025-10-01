// Render Noon Overview
Chart.defaults.plugins.tooltip.backgroundColor = "rgba(0, 0, 0, 0.8)";
Chart.defaults.plugins.tooltip.titleColor = "#fff";
Chart.defaults.plugins.tooltip.bodyColor = "#ddd";

Chart.defaults.plugins.legend.labels.color = getComputedStyle(document.body).getPropertyValue('--bs-body-color');
Chart.defaults.color = getComputedStyle(document.body).getPropertyValue('--bs-body-color');
function renderNoonOverview() {
  const payload = noonData.overview;
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

  // Sales chart
  const chartCard = document.createElement('div');
  chartCard.className = 'card';
  chartCard.innerHTML = `<h3 style="margin-top:0">Sales trend</h3><canvas id="noonSalesChart" height="100"></canvas>`;
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

  // Product Performance table
  const perfCard = document.createElement('div');
  perfCard.className = 'card';
  perfCard.innerHTML = `<h3 style="margin-top:0">Product Performance</h3>
    <table class="table">
      <thead><tr><th>Product</th><th>Orders</th><th>Revenue</th><th>Reviews</th><th>Rating</th></tr></thead>
      <tbody>
        <tr><td>Smartphone X</td><td>320</td><td>$48,000</td><td>110</td><td>4.6</td></tr>
        <tr><td>Bluetooth Earbuds</td><td>210</td><td>$12,600</td><td>95</td><td>4.2</td></tr>
        <tr><td>Laptop Pro 15"</td><td>150</td><td>$120,000</td><td>40</td><td>4.8</td></tr>
        <tr><td>Smartwatch Z</td><td>95</td><td>$19,000</td><td>30</td><td>4.0</td></tr>
        <tr><td>Gaming Mouse</td><td>80</td><td>$3,200</td><td>22</td><td>4.4</td></tr>
      </tbody>
    </table>`;
  document.getElementById('main-content').appendChild(perfCard);

  // Category breakdown chart
  const catCard = document.createElement('div');
  catCard.className = 'card';
  catCard.innerHTML = `<h3 style="margin-top:0">Revenue by Category</h3><canvas id="noonCategoryChart" height="120"></canvas>`;
  document.getElementById('main-content').appendChild(catCard);

  // Chart.js - Sales trend
  const ctx = document.getElementById('noonSalesChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: payload.salesTimeseries.labels,
      datasets: [{ label: 'Orders', data: payload.salesTimeseries.values, borderWidth: 1, backgroundColor: '#215C5C' }]
    },
    options: { responsive:true, plugins:{ legend:{display:false} } }
  });

  // Chart.js - Category breakdown
  const ctx2 = document.getElementById('noonCategoryChart').getContext('2d');
  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: ["Electronics","Fashion","Home","Beauty","Sports"],
      datasets: [{
        data: [5200, 3100, 2500, 1900, 1820],
        backgroundColor: ["#007bff","#28a745","#ffc107","#dc3545","#6f42c1"]
      }]
    },
    options: { responsive:true, plugins:{ legend:{ position:'right' } } }
  });

  // Context actions
  setContextActions([
    { label: 'Filter: Delivered', action: 'del', onClick: ()=>alert('Filter delivered (demo)') },
    { label: 'Export PDF', action: 'pdf', onClick: ()=>alert('Export PDF (demo)') },
    { label: 'Top Products CSV', action: 'csv', onClick: ()=>alert('Export Top Products (demo)') }
  ]);
}
///////////////////Noon sales/////////////
// Render Noon Sales
function renderNoonSales() {
  const payload = noonData.sales; // make sure you add noonData.sales in your dataset
  clearMainContent();

  // KPIs
  const kpiRow = document.createElement('div');
  kpiRow.className = 'kpi-row';
  kpiRow.innerHTML = `
    <div class="kpi"><div class="label">Orders</div><div class="value">${payload.kpis.orders}</div></div>
    <div class="kpi"><div class="label">Revenue</div><div class="value">$${numberWithCommas(payload.kpis.revenue)}</div></div>
    <div class="kpi"><div class="label">Returns</div><div class="value">${payload.kpis.returns}</div></div>
    <div class="kpi"><div class="label">Avg Order Value</div><div class="value">$${numberWithCommas(payload.kpis.aov)}</div></div>
    <div class="kpi"><div class="label">Conversion</div><div class="value">${payload.kpis.conversion}%</div></div>
  `;
  document.getElementById('main-content').appendChild(kpiRow);

  // Sales trend chart
  const chartCard = document.createElement('div');
  chartCard.className = 'card';
  chartCard.innerHTML = `<h3 style="margin-top:0">Sales Trend (Last 30 days)</h3><canvas id="noonSalesTrendChart" height="120"></canvas>`;
  document.getElementById('main-content').appendChild(chartCard);

  // Orders table
  const ordersCard = document.createElement('div');
  ordersCard.className = 'card';
  ordersCard.innerHTML = `<h3 style="margin-top:0">Recent Orders</h3>
    <table class="table">
      <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Amount</th><th>Items</th><th>Status</th></tr></thead>
      <tbody>${payload.orders.map(o => `<tr>
        <td>${o.orderId}</td>
        <td>${o.customer}</td>
        <td>${o.date}</td>
        <td>$${o.amount}</td>
        <td>${o.items}</td>
        <td>${o.status}</td>
      </tr>`).join('')}</tbody>
    </table>`;
  document.getElementById('main-content').appendChild(ordersCard);

  // Category performance chart
  const catCard = document.createElement('div');
  catCard.className = 'card';
  catCard.innerHTML = `<h3 style="margin-top:0">Category Performance</h3><canvas id="noonSalesCategoryChart" height="120"></canvas>`;
  document.getElementById('main-content').appendChild(catCard);

  // Top customers table
  const custCard = document.createElement('div');
  custCard.className = 'card';
  custCard.innerHTML = `<h3 style="margin-top:0">Top Customers</h3>
    <table class="table">
      <thead><tr><th>Customer</th><th>Orders</th><th>Total Spend</th><th>Last Order</th></tr></thead>
      <tbody>${payload.topCustomers.map(c => `<tr>
        <td>${c.name}</td>
        <td>${c.orders}</td>
        <td>$${numberWithCommas(c.spend)}</td>
        <td>${c.lastOrder}</td>
      </tr>`).join('')}</tbody>
    </table>`;
  document.getElementById('main-content').appendChild(custCard);

  // Chart.js - Sales Trend
  const ctx = document.getElementById('noonSalesTrendChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: payload.salesTrend.labels,
      datasets: [{
        label: 'Revenue',
        data: payload.salesTrend.values,
        borderColor: '#215C5C',
        fill: true,
        tension: 0.35
      }]
    },
    options: { responsive: true, plugins:{ legend:{ display:false } } }
  });

  // Chart.js - Category Performance
  const ctx2 = document.getElementById('noonSalesCategoryChart').getContext('2d');
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: payload.categories.labels,
      datasets: [{
        label: 'Revenue',
        data: payload.categories.values,
        backgroundColor: ['#007bff','#28a745','#ffc107','#dc3545','#6f42c1']
      }]
    },
    options: { responsive: true, plugins:{ legend:{ display:false } } }
  });

  // Context actions
  setContextActions([
    { label: 'Export CSV', action: 'csv', onClick: ()=>alert('Export sales CSV (demo)') },
    { label: 'Filter: Returns', action: 'ret', onClick: ()=>alert('Filter returns (demo)') },
    { label: 'Compare Periods', action: 'cmp', onClick: ()=>alert('Compare periods (demo)') }
  ]);
}

///////////////////////////////////////////////
//////////noon revenue////////////
// Render Noon Revenue
function renderNoonRevenue() {
  const payload = noonData.revenue;
  clearMainContent();

  // KPIs
  const kpiRow = document.createElement("div");
  kpiRow.className = "kpi-row";
  kpiRow.innerHTML = `
    <div class="kpi"><div class="label">Total Revenue (30d)</div><div class="value">$${numberWithCommas(payload.kpis.totalRevenue)}</div></div>
    <div class="kpi"><div class="label">Avg Order Value</div><div class="value">$${payload.kpis.avgOrderValue}</div></div>
    <div class="kpi"><div class="label">Refunds</div><div class="value">$${payload.kpis.refunds}</div></div>
    <div class="kpi"><div class="label">Net Revenue</div><div class="value">$${numberWithCommas(payload.kpis.netRevenue)}</div></div>
  `;
  document.getElementById("main-content").appendChild(kpiRow);

  // Revenue Trend chart
  const chartCard = document.createElement("div");
  chartCard.className = "card";
  chartCard.innerHTML = `<h3 style="margin-top:0">Revenue Trend</h3><canvas id="noonRevenueChart" height="100"></canvas>`;
  document.getElementById("main-content").appendChild(chartCard);

  // Category Revenue Breakdown
  const categoryCard = document.createElement("div");
  categoryCard.className = "card";
  categoryCard.innerHTML = `<h3 style="margin-top:0">Revenue by Category</h3><canvas id="noonCategoryChart" height="150"></canvas>`;
  document.getElementById("main-content").appendChild(categoryCard);

  // Top Products by Revenue
  const tableCard = document.createElement("div");
  tableCard.className = "card";
  tableCard.innerHTML = `
    <h3 style="margin-top:0">Top Products</h3>
    <table class="table">
      <thead><tr><th>SKU</th><th>Product</th><th>Revenue</th><th>Orders</th></tr></thead>
      <tbody>${payload.topProducts.map(p => `
        <tr>
          <td>${p.sku}</td>
          <td>${p.name}</td>
          <td>$${numberWithCommas(p.revenue)}</td>
          <td>${p.orders}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  `;
  document.getElementById("main-content").appendChild(tableCard);

  // Chart.js - Revenue Timeseries
  const ctx1 = document.getElementById("noonRevenueChart").getContext("2d");
  new Chart(ctx1, {
    type: "line",
    data: {
      labels: payload.revenueTimeseries.labels,
      datasets: [{
        label: "Revenue",
        data: payload.revenueTimeseries.values,
        borderColor: "#215C5E",
        backgroundColor: "rgba(33,92,94,0.1)",
        fill: true,
        tension: 0.3
      }]
    },
    options: { responsive:true }
  });

  // Chart.js - Category Breakdown
  const ctx2 = document.getElementById("noonCategoryChart").getContext("2d");
  new Chart(ctx2, {
    type: "doughnut",
    data: {
      labels: payload.categoryBreakdown.labels,
      datasets: [{
        label: "Revenue Share",
        data: payload.categoryBreakdown.values,
        backgroundColor: ["#215C5E","#F5AF2D","#E85C41","#4E79A7","#A5BE00"]
      }]
    },
    options: { responsive:true, plugins:{ legend:{ position:"right" } } }
  });

  // Context actions
  setContextActions([
    { label: "Export CSV", action: "csv", onClick: () => alert("Export CSV (demo)") },
    { label: "Compare Periods", action: "cmp", onClick: () => alert("Compare periods (demo)") }
  ]);
}

/////////////////////////////////
////////noon reputation/////////
function renderNoonReputation() {
  const payload = noonData.reputation;
  clearMainContent();

  // KPIs
  const kpiRow = document.createElement("div");
  kpiRow.className = "kpi-row";
  kpiRow.innerHTML = `
    <div class="kpi"><div class="label">Overall Rating</div><div class="value">${payload.kpis.rating} ★</div></div>
    <div class="kpi"><div class="label">Total Reviews</div><div class="value">${numberWithCommas(payload.kpis.totalReviews)}</div></div>
    <div class="kpi"><div class="label">Positive %</div><div class="value">${payload.kpis.positiveRate}%</div></div>
    <div class="kpi"><div class="label">Negative %</div><div class="value">${payload.kpis.negativeRate}%</div></div>
  `;
  document.getElementById("main-content").appendChild(kpiRow);

  // Rating Distribution
  const ratingCard = document.createElement("div");
  ratingCard.className = "card";
  ratingCard.innerHTML = `<h3 style="margin-top:0">Rating Distribution</h3><canvas id="noonRatingChart" height="120"></canvas>`;
  document.getElementById("main-content").appendChild(ratingCard);

  // Sentiment Trend
  const sentimentCard = document.createElement("div");
  sentimentCard.className = "card";
  sentimentCard.innerHTML = `<h3 style="margin-top:0">Sentiment Over Time</h3><canvas id="noonSentimentChart" height="100"></canvas>`;
  document.getElementById("main-content").appendChild(sentimentCard);

  // Recent Reviews Table
  const reviewCard = document.createElement("div");
  reviewCard.className = "card";
  reviewCard.innerHTML = `
    <h3 style="margin-top:0">Recent Reviews</h3>
    <table class="table">
      <thead><tr><th>Customer</th><th>Rating</th><th>Comment</th><th>Date</th></tr></thead>
      <tbody>
        ${payload.recentReviews.map(r => `
          <tr>
            <td>${r.customer}</td>
            <td>${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</td>
            <td>${r.comment}</td>
            <td>${r.date}</td>
          </tr>`).join("")}
      </tbody>
    </table>
  `;
  document.getElementById("main-content").appendChild(reviewCard);

  // Chart.js - Rating Distribution
  const ctx1 = document.getElementById("noonRatingChart").getContext("2d");
  new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["5★", "4★", "3★", "2★", "1★"],
      datasets: [{
        label: "Reviews",
        data: payload.ratingDistribution,
        backgroundColor: ["#4CAF50","#8BC34A","#FFC107","#FF9800","#F44336"]
      }]
    },
    options: { responsive:true, plugins:{ legend:{ display:false } } }
  });

  // Chart.js - Sentiment Over Time
  const ctx2 = document.getElementById("noonSentimentChart").getContext("2d");
  new Chart(ctx2, {
    type: "line",
    data: {
      labels: payload.sentimentTimeseries.labels,
      datasets: [
        { label:"Positive", data:payload.sentimentTimeseries.positive, borderColor:"#4CAF50", tension:0.3 },
        { label:"Negative", data:payload.sentimentTimeseries.negative, borderColor:"#F44336", tension:0.3 }
      ]
    },
    options: { responsive:true }
  });

  // Context actions
  setContextActions([
    { label: "Reply to Reviews", action: "reply", onClick: () => alert("Reply feature (demo)") },
    { label: "Export Report", action: "report", onClick: () => alert("Export report (demo)") }
  ]);
}
////////////////////////////
////////noon performance/////////
// Render Noon Performance
function renderNoonPerformance() {
  const payload = noonData.performance;
  clearMainContent();

  // KPIs
  const kpiRow = document.createElement("div");
  kpiRow.className = "kpi-row";
  kpiRow.innerHTML = `
    <div class="kpi"><div class="label">Fulfillment Rate</div><div class="value">${payload.kpis.fulfillmentRate}%</div></div>
    <div class="kpi"><div class="label">On-Time Delivery</div><div class="value">${payload.kpis.onTimeDelivery}%</div></div>
    <div class="kpi"><div class="label">Cancellation Rate</div><div class="value">${payload.kpis.cancellationRate}%</div></div>
    <div class="kpi"><div class="label">Return Rate</div><div class="value">${payload.kpis.returnRate}%</div></div>
    <div class="kpi"><div class="label">Customer Satisfaction</div><div class="value">${payload.kpis.satisfaction}%</div></div>
  `;
  document.getElementById("main-content").appendChild(kpiRow);

  // Chart: Delivery Performance
  const deliveryCard = document.createElement("div");
  deliveryCard.className = "card";
  deliveryCard.innerHTML = `<h3 style="margin-top:0">Delivery Performance</h3><canvas id="noonDeliveryChart" height="100"></canvas>`;
  document.getElementById("main-content").appendChild(deliveryCard);

  // Chart: Cancellations & Returns
  const issueCard = document.createElement("div");
  issueCard.className = "card";
  issueCard.innerHTML = `<h3 style="margin-top:0">Cancellations & Returns</h3><canvas id="noonIssuesChart" height="100"></canvas>`;
  document.getElementById("main-content").appendChild(issueCard);

  // Table: Detailed Performance Log
  const perfCard = document.createElement("div");
  perfCard.className = "card";
  perfCard.innerHTML = `
    <h3 style="margin-top:0">Weekly Performance</h3>
    <table class="table">
      <thead><tr><th>Week</th><th>Orders</th><th>On-Time %</th><th>Cancellations</th><th>Returns</th><th>Satisfaction</th></tr></thead>
      <tbody>
        ${payload.performanceTable.map(p => `
          <tr>
            <td>${p.week}</td>
            <td>${p.orders}</td>
            <td>${p.onTime}%</td>
            <td>${p.cancellations}</td>
            <td>${p.returns}</td>
            <td>${p.satisfaction}%</td>
          </tr>`).join("")}
      </tbody>
    </table>
  `;
  document.getElementById("main-content").appendChild(perfCard);

  // Chart.js - Delivery Performance
  const ctx1 = document.getElementById("noonDeliveryChart").getContext("2d");
  new Chart(ctx1, {
    type: "line",
    data: {
      labels: payload.deliveryTimeseries.labels,
      datasets: [
        { label: "On-Time Delivery %", data: payload.deliveryTimeseries.onTime, borderColor: "#4CAF50", tension: 0.3 },
        { label: "Late Deliveries %", data: payload.deliveryTimeseries.late, borderColor: "#F44336", tension: 0.3 }
      ]
    },
    options: { responsive:true }
  });

  // Chart.js - Issues
  const ctx2 = document.getElementById("noonIssuesChart").getContext("2d");
  new Chart(ctx2, {
    type: "bar",
    data: {
      labels: payload.issueTimeseries.labels,
      datasets: [
        { label: "Cancellations", data: payload.issueTimeseries.cancellations, backgroundColor: "#FF9800" },
        { label: "Returns", data: payload.issueTimeseries.returns, backgroundColor: "#9C27B0" }
      ]
    },
    options: { responsive:true }
  });

  // Context actions
  setContextActions([
    { label: "Download Report", action: "report", onClick: () => alert("Performance report exported (demo)") },
    { label: "Improve Delivery", action: "tips", onClick: () => alert("Show delivery improvement tips (demo)") }
  ]);
}

///////////////////////