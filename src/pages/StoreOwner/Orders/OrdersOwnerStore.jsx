import { useState, useEffect } from "react";
import { Search, Visibility, FilterList } from "@mui/icons-material";
import axiosInstance from "../../../network/httpRequest";

export default function OrdersOwnerPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const userId = localStorage.getItem("userId");

  // 🚀 CALL API
  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get(
        `/orders/getOrdersByUserId/${userId}`
      );

      // map data BE → FE
      const mapped = res.data.data.map((o) => ({
        id: o._id,
        customer: o.userId?.email || "Khách",
        total: o.totalAmount,
        status: mapStatus(o.orderStatus),
        date: o.createdAt?.slice(0, 10),
        items: o.items.map((i) => i.sku),
        raw: o, // giữ data gốc
      }));

      setOrders(mapped);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🧠 map status BE → UI
  const mapStatus = (status) => {
    switch (status) {
      case "PROCESSING":
        return "Đã thanh toán";
      case "SHIPPING":
        return "Đang giao";
      case "DELIVERED":
        return "Hoàn thành";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return status;
    }
  };

  // 🔄 update status
  const handleUpdateStatus = async (orderId, status) => {
    try {
      await axiosInstance.put(`/orders/updateOrderStatus/${orderId}`, {
        orderStatus: status,
      });

      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

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
      {/* HEADER */}
      <div className="bg-linear-to-r from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow">
          <p>Tổng đơn</p>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p>Doanh thu</p>
          <p className="text-2xl font-bold text-blue-600">
            {totalRevenue.toLocaleString()}đ
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-2xl shadow flex gap-4 items-center">
        <div className="flex items-center border rounded-lg px-3 py-2 w-full">
          <Search />
          <input
            placeholder="Tìm kiếm..."
            className="outline-none ml-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-gray-100 px-4 py-2 rounded-lg"
        >
          <FilterList />
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Mã đơn</th>
              <th>Khách</th>
              <th>Ngày</th>
              <th>Tổng</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
              <th>Chi tiết</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="p-4">{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.date}</td>
                <td>{o.total.toLocaleString()}đ</td>

                <td>
                  <span className={`px-2 py-1 rounded ${getStatusColor(o.status)}`}>
                    {o.status}
                  </span>
                </td>

                {/* 🔥 ACTION */}
                <td className="space-x-2">
                  <button
                    onClick={() => handleUpdateStatus(o.id, "SHIPPING")}
                    className="text-orange-500"
                  >
                    🚚
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(o.id, "DELIVERED")}
                    className="text-green-600"
                  >
                    ✅
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(o.id, "CANCELLED")}
                    className="text-red-500"
                  >
                    ❌
                  </button>
                </td>

                <td>
                  <button onClick={() => setSelectedOrder(o)}>
                    <Visibility />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-100">
            <h2 className="font-bold">Chi tiết đơn</h2>

            <p>Mã: {selectedOrder.id}</p>
            <p>Khách: {selectedOrder.customer}</p>
            <p>Tổng: {selectedOrder.total.toLocaleString()}đ</p>

            <ul className="list-disc ml-5">
              {selectedOrder.items.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}