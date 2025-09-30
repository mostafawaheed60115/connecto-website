// Amazon demo data
const amazonData = {
  overview: {
    kpis: { orders: 2384, revenue: 45230, conversion: 4.2, adSpend: 3120 },
    salesTimeseries: {
      labels: ["Sep 1","Sep 5","Sep 10","Sep 15","Sep 20","Sep 25","Sep 30"],
      values: [3000, 3500, 4200, 3800, 4800, 5200, 5430]
    },
inventory: [
  { sku: "AMZ-1001", name: "Widget A", stock: 120, price: 19.99, sales30d: 45 },
  { sku: "AMZ-1002", name: "Widget B", stock: 20, price: 29.99, sales30d: 85 },
  { sku: "AMZ-1003", name: "Widget C", stock: 0, price: 14.99, sales30d: 0 },
  { sku: "AMZ-1004", name: "Gadget Pro", stock: 75, price: 49.99, sales30d: 60 },
  { sku: "AMZ-1005", name: "Gadget Mini", stock: 200, price: 15.49, sales30d: 150 },
  { sku: "AMZ-1006", name: "Headphones X", stock: 45, price: 89.99, sales30d: 30 },
  { sku: "AMZ-1007", name: "Wireless Mouse", stock: 300, price: 24.95, sales30d: 210 },
  { sku: "AMZ-1008", name: "Ergo Keyboard", stock: 90, price: 59.99, sales30d: 65 },
  { sku: "AMZ-1009", name: "USB-C Charger", stock: 500, price: 12.99, sales30d: 400 },
  { sku: "AMZ-1010", name: "Smartwatch Lite", stock: 35, price: 129.00, sales30d: 25 },
  { sku: "AMZ-1011", name: "Smartwatch Pro", stock: 12, price: 249.00, sales30d: 9 },
  { sku: "AMZ-1012", name: "Bluetooth Speaker", stock: 150, price: 39.95, sales30d: 110 },
  { sku: "AMZ-1013", name: "Portable SSD 1TB", stock: 60, price: 119.99, sales30d: 45 },
  { sku: "AMZ-1014", name: "Laptop Stand", stock: 400, price: 34.99, sales30d: 300 },
  { sku: "AMZ-1015", name: "4K Monitor 27in", stock: 18, price: 329.00, sales30d: 12 },
  { sku: "AMZ-1016", name: "Office Chair Deluxe", stock: 25, price: 199.00, sales30d: 18 },
  { sku: "AMZ-1017", name: "Desk Lamp LED", stock: 260, price: 22.50, sales30d: 175 },
  { sku: "AMZ-1018", name: "Action Camera 4K", stock: 40, price: 149.99, sales30d: 28 },
  { sku: "AMZ-1019", name: "Drone Mini", stock: 15, price: 399.99, sales30d: 10 },
  { sku: "AMZ-1020", name: "VR Headset", stock: 8, price: 499.00, sales30d: 5 }
],
    ads: [
      { campaign: "Brand - Search", spend: 1200, acos: 18.2, roas: 3.2 },
      { campaign: "Sponsored Prod", spend: 1920, acos: 22.5, roas: 2.4 }
    ]
  },
catalog: {
  categories: ["All products", "Active", "Inactive", "Drafts", "Out of stock", "Archived"],
  products: [
    { sku: "AMZ-1001", title: "Wireless Bluetooth Earbuds", price: 49.99, status: "Active" },
    { sku: "AMZ-1002", title: "Smartphone Tripod Stand", price: 24.99, status: "Active" },
    { sku: "AMZ-1003", title: "LED Desk Lamp with USB Port", price: 34.50, status: "Active" },
    { sku: "AMZ-1004", title: "Waterproof Fitness Tracker", price: 59.99, status: "Out of stock" },
    { sku: "AMZ-1005", title: "Gaming Mouse RGB", price: 39.00, status: "Active" },
    { sku: "AMZ-1006", title: "Mechanical Keyboard Blue Switches", price: 79.99, status: "Active" },
    { sku: "AMZ-1007", title: "USB-C Charging Cable (2m)", price: 12.99, status: "Inactive" },
    { sku: "AMZ-1008", title: "Portable Power Bank 20000mAh", price: 29.99, status: "Active" },
    { sku: "AMZ-1009", title: "Noise Cancelling Headphones", price: 89.99, status: "Active" },
    { sku: "AMZ-1010", title: "Laptop Cooling Pad", price: 27.99, status: "Drafts" },
    { sku: "AMZ-1011", title: "4K Action Camera", price: 129.99, status: "Active" },
    { sku: "AMZ-1012", title: "Ergonomic Office Chair", price: 199.99, status: "Out of stock" },
    { sku: "AMZ-1013", title: "Stainless Steel Water Bottle", price: 18.00, status: "Active" },
    { sku: "AMZ-1014", title: "Portable Projector Mini HD", price: 149.99, status: "Active" },
    { sku: "AMZ-1015", title: "Smart Home Wi-Fi Plug", price: 22.49, status: "Active" },
    { sku: "AMZ-1016", title: "Digital Drawing Tablet", price: 89.00, status: "Inactive" },
    { sku: "AMZ-1017", title: "External SSD 1TB", price: 129.50, status: "Active" },
    { sku: "AMZ-1018", title: "Wireless Charging Pad", price: 15.99, status: "Active" },
    { sku: "AMZ-1019", title: "Smart LED Light Bulbs (4-pack)", price: 34.99, status: "Drafts" },
    { sku: "AMZ-1020", title: "HDMI 2.1 Cable (3m)", price: 14.49, status: "Archived" }
  ]
}

};