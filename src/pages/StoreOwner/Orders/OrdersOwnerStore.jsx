import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../network/httpRequest";

import CancelOrderModal from "../../../components/orders/CancelOrderModal";
import OrderStats from "../../../components/orders/OrderStats";
import OrderFilter from "../../../components/orders/OrderFilter";
import OrdersTable from "../../../components/orders/OrdersTable";
import OrderDetailModal from "../../../components/orders/OrderDetailModal";

export default function OrdersOwnerPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelOrder, setCancelOrder] = useState(null);

  const [loading, setLoading] = useState(false);

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

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/orders/getAllOrders?page=1&limit=100"
      );

      const list = res.data?.data || [];

      const mapped = list.map((o) => ({
        id: o._id,
        customer: o.userId?.email || "Khách",
        phone: o.phoneNumber || "Chưa có",
        total: o.totalAmount || 0,
        status: mapStatus(o.orderStatus),
        statusBE: o.orderStatus,
        paymentMethod: o.paymentMethod,
        paymentStatus: o.paymentStatus,
        date: o.createdAt?.slice(0, 10),
        items: o.items || [],
        address: o.shippingAddress,
        note: o.note,
        raw: o,
      }));

      setOrders(mapped);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, orderStatus) => {
    const oldOrders = orders;

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

    try {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
              ...order,
              statusBE: orderStatus,
              status: mapStatus(orderStatus),
            }
            : order
        )
      );

      await axiosInstance.put(`/orders/updateOrderStatus/${orderId}`, {
        orderStatus,
      });

      toast.success("Cập nhật trạng thái thành công");
    } catch (err) {
      console.error(err);
      setOrders(oldOrders);
      toast.error("Cập nhật trạng thái thất bại");
    }
  };

  const handleConfirmCancel = async () => {
    if (!cancelOrder) return;

    try {
      await axiosInstance.put(`/orders/cancelOrder/${cancelOrder.id}`);
      toast.success("Đã huỷ đơn hàng");
      setCancelOrder(null);
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Huỷ đơn thất bại");
    }
  };

  const filteredOrders = useMemo(() => {
    const keyword = search.toLowerCase();

    return orders.filter((o) => {
      return (
        (o.customer.toLowerCase().includes(keyword) ||
          o.id.toLowerCase().includes(keyword) ||
          o.phone.toLowerCase().includes(keyword)) &&
        (statusFilter === "Tất cả" || o.status === statusFilter) &&
        (!fromDate || o.date >= fromDate) &&
        (!toDate || o.date <= toDate)
      );
    });
  }, [orders, search, statusFilter, fromDate, toDate]);

  const totalOrders = orders.length;

  const totalRevenue = orders
    .filter((o) => o.statusBE !== "CANCELLED")
    .reduce((sum, o) => sum + o.total, 0);

  const resetFilter = () => {
    setSearch("");
    setStatusFilter("Tất cả");
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Store Owner</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Quản lý đơn hàng
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Theo dõi đơn hàng, doanh thu và trạng thái vận chuyển.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800"
        >
          Làm mới dữ liệu
        </button>
      </div>

      <OrderStats
        totalOrders={totalOrders}
        totalRevenue={totalRevenue}
        processing={orders.filter((o) => o.statusBE === "PROCESSING").length}
        shipping={orders.filter((o) => o.statusBE === "SHIPPING").length}
      />

      <OrderFilter
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        resetFilter={resetFilter}
      />

      <OrdersTable
        orders={filteredOrders}
        loading={loading}
        onView={setSelectedOrder}
        onUpdateStatus={handleUpdateStatus}
      />

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      <CancelOrderModal
        order={cancelOrder}
        onClose={() => setCancelOrder(null)}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}