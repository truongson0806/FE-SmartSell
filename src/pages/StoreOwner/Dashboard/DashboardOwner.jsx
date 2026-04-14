import {
  ShoppingCart,
  Inventory,
  AttachMoney,
  People,
  TrendingUp,
  Notifications,
  AutoAwesome,
  Task,
  Warning,
} from "@mui/icons-material";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

export default function DashboardOwnerPage() {
  // KPI
  const stats = [
    {
      title: "Doanh thu hôm nay",
      value: "12.500.000đ",
      color: "from-indigo-500 to-blue-500",
    },
    { title: "Đơn hàng", value: "86", color: "from-green-500 to-emerald-500" },
    {
      title: "Khách hàng mới",
      value: "24",
      color: "from-orange-500 to-pink-500",
    },
    {
      title: "Lợi nhuận",
      value: "5.200.000đ",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  // Revenue chart
  const revenueData = [
    { name: "T1", revenue: 4000 },
    { name: "T2", revenue: 3000 },
    { name: "T3", revenue: 5000 },
    { name: "T4", revenue: 4780 },
    { name: "T5", revenue: 5890 },
    { name: "T6", revenue: 6390 },
    { name: "T7", revenue: 7490 },
    { name: "T8", revenue: 8200 },
    { name: "T9", revenue: 9000 },
    { name: "T10", revenue: 10000 },
  ];

  // Customers chart
  const customersData = [
    { name: "Mon", value: 10 },
    { name: "Tue", value: 15 },
    { name: "Wed", value: 8 },
    { name: "Thu", value: 18 },
    { name: "Fri", value: 22 },
    { name: "Sat", value: 30 },
    { name: "Sun", value: 25 },
  ];

  // Orders table
  const orders = [
    {
      id: "#1201",
      customer: "Nguyễn Văn A",
      total: "1.200.000đ",
      status: "Đã thanh toán",
    },
    {
      id: "#1202",
      customer: "Trần Thị B",
      total: "850.000đ",
      status: "Đang giao",
    },
    {
      id: "#1203",
      customer: "Lê Văn C",
      total: "2.300.000đ",
      status: "Đã thanh toán",
    },
    {
      id: "#1204",
      customer: "Phạm Thị D",
      total: "540.000đ",
      status: "Đã hủy",
    },
    {
      id: "#1205",
      customer: "Hoàng Văn E",
      total: "1.100.000đ",
      status: "Chờ xử lý",
    },
    {
      id: "#1206",
      customer: "Nguyễn Văn F",
      total: "2.500.000đ",
      status: "Đã thanh toán",
    },
    {
      id: "#1207",
      customer: "Trần Văn G",
      total: "650.000đ",
      status: "Đang giao",
    },
  ];

  // Top products
  const products = [
    { name: "iPhone 15", sold: 120 },
    { name: "AirPods Pro", sold: 95 },
    { name: "Macbook M3", sold: 60 },
    { name: "iPad Pro", sold: 45 },
    { name: "Apple Watch", sold: 30 },
  ];

  // Low stock
  const lowStock = [
    { name: "iPhone 15", stock: 3 },
    { name: "AirPods Pro", stock: 5 },
    { name: "Macbook M3", stock: 2 },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br ${item.color}`}
          >
            <p className="text-sm opacity-80">{item.title}</p>
            <p className="text-2xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="font-semibold mb-4">Biểu đồ doanh thu</h2>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={revenueData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              fill="#c7d2fe"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-4">Đơn hàng</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-4">Khách hàng</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={customersData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="value" stroke="#f97316" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-4">Sản phẩm bán chạy</h2>
          {products.map((p, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <span>{p.name}</span>
              <span className="font-semibold">{p.sold}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Low stock + Activity + Notifications */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Warning /> Sắp hết hàng
          </h2>
          {lowStock.map((item, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <span>{item.name}</span>
              <span className="text-red-500">{item.stock}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Notifications /> Thông báo
          </h2>
          <p>• Có 5 đơn hàng mới</p>
          <p>• 2 sản phẩm sắp hết hàng</p>
          <p>• Doanh thu tăng 12%</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <AutoAwesome /> AI Insight
          </h2>
          <p>• Nên nhập thêm iPhone 15</p>
          <p>• Khách mua nhiều cuối tuần</p>
          <p>• Nên chạy quảng cáo AirPods</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="font-semibold mb-4">Đơn hàng gần đây</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2">Mã đơn</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={i} className="border-b">
                <td className="py-3">{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.total}</td>
                <td>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
