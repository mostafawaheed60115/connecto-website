// Noon demo data
const noonData = {
  overview: {
    kpis: { 
      orders: 755, 
      revenue: 14520, 
      reviews: 312, 
      rating: 4.3,
      returns: 28,
      topCategory: "Electronics"
    },
    salesTimeseries: {
      labels: [
        "Sep 1","Sep 3","Sep 5","Sep 7","Sep 9",
        "Sep 11","Sep 13","Sep 15","Sep 17","Sep 19",
        "Sep 21","Sep 23","Sep 25","Sep 27","Sep 29","Sep 30"
      ],
      values: [500, 620, 710, 680, 820, 900, 880, 950, 870, 1020, 1100, 1250, 1350, 1490, 1550, 1620]
    },
    salesTable: [
      { orderId: "NO-4001", customer: "Ali M.", amount: 120, items: 2, status: "Delivered", date: "2025-09-01" },
      { orderId: "NO-4002", customer: "Sara K.", amount: 45, items: 1, status: "Cancelled", date: "2025-09-02" },
      { orderId: "NO-4003", customer: "Mohamed R.", amount: 299, items: 3, status: "Delivered", date: "2025-09-04" },
      { orderId: "NO-4004", customer: "Noura A.", amount: 75, items: 1, status: "Returned", date: "2025-09-05" },
      { orderId: "NO-4005", customer: "Hassan B.", amount: 450, items: 4, status: "Delivered", date: "2025-09-07" },
      { orderId: "NO-4006", customer: "Laila D.", amount: 80, items: 2, status: "Shipped", date: "2025-09-09" },
      { orderId: "NO-4007", customer: "Omar E.", amount: 199, items: 2, status: "Delivered", date: "2025-09-11" },
      { orderId: "NO-4008", customer: "Khalid S.", amount: 129, items: 1, status: "Processing", date: "2025-09-13" },
      { orderId: "NO-4009", customer: "Fatma H.", amount: 650, items: 5, status: "Delivered", date: "2025-09-15" },
      { orderId: "NO-4010", customer: "Youssef N.", amount: 349, items: 3, status: "Delivered", date: "2025-09-17" },
      { orderId: "NO-4011", customer: "Huda Z.", amount: 99, items: 1, status: "Delivered", date: "2025-09-19" },
      { orderId: "NO-4012", customer: "Mahmoud L.", amount: 149, items: 2, status: "Delivered", date: "2025-09-21" },
      { orderId: "NO-4013", customer: "Rania P.", amount: 499, items: 4, status: "Shipped", date: "2025-09-23" },
      { orderId: "NO-4014", customer: "Samir J.", amount: 220, items: 2, status: "Returned", date: "2025-09-25" },
      { orderId: "NO-4015", customer: "Aya W.", amount: 310, items: 3, status: "Delivered", date: "2025-09-27" },
      { orderId: "NO-4016", customer: "Karim O.", amount: 799, items: 6, status: "Delivered", date: "2025-09-30" }
    ]
  }
  
};
noonData.sales = {
  kpis: { orders: 1420, revenue: 35600, returns: 45, aov: 25.1, conversion: 2.3 },
  salesTrend: {
    labels: ["Sep 1","Sep 5","Sep 10","Sep 15","Sep 20","Sep 25","Sep 30"],
    values: [900,1100,980,1200,1500,1700,1800]
  },
  orders: [
    { orderId: "NO-5001", customer: "Ali Ahmed", date: "2025-09-21", amount: 220, items: 3, status: "Delivered" },
    { orderId: "NO-5002", customer: "Sara Y.", date: "2025-09-22", amount: 75, items: 2, status: "Pending" },
    { orderId: "NO-5003", customer: "Omar K.", date: "2025-09-23", amount: 150, items: 1, status: "Cancelled" },
    { orderId: "NO-5004", customer: "Lina M.", date: "2025-09-24", amount: 320, items: 4, status: "Delivered" }
  ],
  categories: {
    labels: ["Electronics","Fashion","Home","Beauty","Sports"],
    values: [15500, 7200, 5100, 4300, 3500]
  },
  topCustomers: [
    { name: "Ali Ahmed", orders: 12, spend: 2800, lastOrder: "2025-09-21" },
    { name: "Sara Y.", orders: 8, spend: 1950, lastOrder: "2025-09-22" },
    { name: "Lina M.", orders: 5, spend: 1420, lastOrder: "2025-09-24" }
  ]
};
noonData.revenue = {
  kpis: {
    totalRevenue: 48200,
    avgOrderValue: 120,
    refunds: 1800,
    netRevenue: 46400
  },
  revenueTimeseries: {
    labels: ["Day 1","Day 2","Day 3","Day 4","Day 5"],
    values: [1200, 1500, 1800, 2100, 2000]
  },
  categoryBreakdown: {
    labels: ["Electronics","Fashion","Home","Beauty","Sports"],
    values: [22000, 12000, 8000, 4000, 2000]
  },
  topProducts: [
    { sku:"NOON-2001", name:"Phone X", revenue:18000, orders:150 },
    { sku:"NOON-2002", name:"Sneakers Y", revenue:9500, orders:90 },
    { sku:"NOON-2003", name:"Blender Z", revenue:6200, orders:70 }
  ]
};
noonData.reputation = {
  kpis: {
    rating: 4.3,
    totalReviews: 1240,
    positiveRate: 78,
    negativeRate: 12
  },
  ratingDistribution: [800, 250, 100, 60, 30], // [5★,4★,3★,2★,1★]
  sentimentTimeseries: {
    labels: ["Week 1","Week 2","Week 3","Week 4"],
    positive: [200, 180, 210, 190],
    negative: [40, 35, 50, 45]
  },
  recentReviews: [
    { customer:"Ali", rating:5, comment:"Great product, fast delivery!", date:"2025-09-12" },
    { customer:"Sara", rating:4, comment:"Good but packaging could improve.", date:"2025-09-10" },
    { customer:"Hany", rating:2, comment:"Not as described.", date:"2025-09-08" }
  ]
};
noonData.performance = {
  kpis: {
    fulfillmentRate: 96,
    onTimeDelivery: 92,
    cancellationRate: 3.5,
    returnRate: 2.1,
    satisfaction: 88
  },
  deliveryTimeseries: {
    labels: ["Week 1","Week 2","Week 3","Week 4"],
    onTime: [93, 91, 94, 90],
    late: [7, 9, 6, 10]
  },
  issueTimeseries: {
    labels: ["Week 1","Week 2","Week 3","Week 4"],
    cancellations: [15, 12, 18, 10],
    returns: [8, 10, 9, 7]
  },
  performanceTable: [
    { week: "Week 1", orders: 500, onTime: 93, cancellations: 15, returns: 8, satisfaction: 89 },
    { week: "Week 2", orders: 450, onTime: 91, cancellations: 12, returns: 10, satisfaction: 87 },
    { week: "Week 3", orders: 520, onTime: 94, cancellations: 18, returns: 9, satisfaction: 90 },
    { week: "Week 4", orders: 480, onTime: 90, cancellations: 10, returns: 7, satisfaction: 86 }
  ]
};
