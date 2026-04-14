import { useState } from "react";
import { Search, Visibility, FilterList } from "@mui/icons-material";

export default function OrdersOwnerPage() {
  const fakeOrders = [
    {
      id: "#1001",
      customer: "Nguyễn Văn A",
      total: 1200000,
      status: "Đã thanh toán",
      date: "2026-03-20",
      items: ["iPhone 15"],
    },
    {
      id: "#1002",
      customer: "Trần Thị B",
      total: 800000,
      status: "Đang giao",
      date: "2026-03-21",
      items: ["Áo Hoodie"],
    },
    {
      id: "#1003",
      customer: "Lê Văn C",
      total: 2300000,
      status: "Hoàn thành",
      date: "2026-03-22",
      items: ["Macbook M3"],
    },
    {
      id: "#1004",
      customer: "Phạm Thị D",
      total: 540000,
      status: "Đã hủy",
      date: "2026-03-23",
      items: ["Giày Sneaker"],
    },
    {
      id: "#1005",
      customer: "Hoàng Văn E",
      total: 1500000,
      status: "Đang giao",
      date: "2026-03-24",
      items: ["Chuột Logitech"],
    },
    {
      id: "#1006",
      customer: "Nguyễn Văn F",
      total: 3200000,
      status: "Đã thanh toán",
      date: "2026-03-25",
      items: ["Màn hình"],
    },
  ];

  const [orders, setOrders] = useState(fakeOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const filteredOrders = orders.filter((o) => {
    return (
      (o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "Tất cả" || o.status === statusFilter) &&
      (!fromDate || o.date >= fromDate) &&
      (!toDate || o.date <= toDate)
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã thanh toán":
        return "bg-blue-100 text-blue-600";
      case "Đang giao":
        return "bg-orange-100 text-orange-600";
      case "Hoàn thành":
        return "bg-green-100 text-green-600";
      case "Đã hủy":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100";
    }
  };

  const resetFilter = () => {
    setStatusFilter("Tất cả");
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        <p className="text-sm opacity-80">
          Theo dõi và quản lý đơn hàng cửa hàng
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Tổng đơn</p>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Doanh thu</p>
          <p className="text-2xl font-bold text-blue-600">
            {totalRevenue.toLocaleString()}đ
          </p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="relative">
        <div className="bg-white p-4 rounded-2xl shadow flex gap-4 items-center">
          <div className="flex items-center border rounded-lg px-3 py-2 w-full">
            <Search className="text-gray-400" />
            <input
              placeholder="Tìm mã đơn hoặc khách hàng..."
              className="outline-none ml-2 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            <FilterList />
            Bộ lọc
          </button>
        </div>

        {/* Filter Dropdown */}
        <div
          className={`absolute right-0 mt-3 w-[420px] bg-white rounded-2xl shadow-lg border transition-all duration-300 ${
            showFilter
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="p-5 space-y-4">
            <h3 className="font-semibold">Bộ lọc đơn hàng</h3>

            <div>
              <label className="text-sm text-gray-500">Trạng thái</label>
              <select
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>Tất cả</option>
                <option>Đã thanh toán</option>
                <option>Đang giao</option>
                <option>Hoàn thành</option>
                <option>Đã hủy</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-500">Từ ngày</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Đến ngày</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={resetFilter}
                className="px-4 py-2 border rounded-lg"
              >
                Reset
              </button>

              <button
                onClick={() => setShowFilter(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-500">
              <th className="p-4">Mã đơn</th>
              <th>Khách hàng</th>
              <th>Ngày</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Chi tiết</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.date}</td>
                <td className="font-semibold">{o.total.toLocaleString()}đ</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${getStatusColor(
                      o.status
                    )}`}
                  >
                    {o.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => setSelectedOrder(o)}
                    className="text-blue-500"
                  >
                    <Visibility />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[400px] space-y-3">
            <h2 className="text-lg font-semibold">
              Chi tiết đơn {selectedOrder.id}
            </h2>
            <p>Khách hàng: {selectedOrder.customer}</p>
            <p>Ngày: {selectedOrder.date}</p>
            <p>Tổng: {selectedOrder.total.toLocaleString()}đ</p>

            <div>
              <b>Sản phẩm:</b>
              <ul className="list-disc ml-5">
                {selectedOrder.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
