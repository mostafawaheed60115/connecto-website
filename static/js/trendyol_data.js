const trendyolData = {
  overview: {
    kpis: {
      orders: 1280,
      revenue: 84000,
      reviews: 420,
      rating: 4.5,
      returns: 52,
      topCategory: "Fashion"
    },
    salesTimeseries: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"],
      values: [120, 140, 160, 155, 180, 200, 210, 230, 250]
    },
    salesTable: [
      { orderId: "#TY1001", customer: "Ali Y.", amount: 120, items: 2, status: "Delivered", date: "2025-09-21" },
      { orderId: "#TY1002", customer: "Nour H.", amount: 85, items: 1, status: "Shipped", date: "2025-09-20" },
      { orderId: "#TY1003", customer: "Sarah A.", amount: 300, items: 3, status: "Delivered", date: "2025-09-19" },
      { orderId: "#TY1004", customer: "Omar S.", amount: 220, items: 2, status: "Returned", date: "2025-09-18" },
      { orderId: "#TY1005", customer: "Heba M.", amount: 150, items: 2, status: "Delivered", date: "2025-09-17" }
    ]
  },

  sales: {
    monthlySales: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"],
      values: [12000, 13500, 14000, 13800, 16000, 17200, 18000, 19500, 21000]
    },
    topProducts: [
      { name: "Summer Dress", units: 620, revenue: 18600, rating: 4.4 },
      { name: "Sneakers", units: 450, revenue: 27000, rating: 4.6 },
      { name: "Handbag", units: 300, revenue: 21000, rating: 4.3 },
      { name: "T-Shirt", units: 700, revenue: 10500, rating: 4.2 },
      { name: "Jeans", units: 280, revenue: 14000, rating: 4.5 }
    ]
  }
};