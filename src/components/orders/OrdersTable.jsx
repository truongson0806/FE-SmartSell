import { memo } from "react";
import {
  Visibility,
  LocalShipping,
  CheckCircle,
  Cancel,
  Paid,
  Inventory2,
} from "@mui/icons-material";

const statusOptions = [
  {
    value: "PROCESSING",
    label: "Đã thanh toán",
    icon: <Paid fontSize="small" />,
    className: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    value: "SHIPPING",
    label: "Đang giao",
    icon: <LocalShipping fontSize="small" />,
    className: "bg-orange-50 text-orange-700 border-orange-100",
  },
  {
    value: "DELIVERED",
    label: "Hoàn thành",
    icon: <CheckCircle fontSize="small" />,
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    value: "CANCELLED",
    label: "Đã hủy",
    icon: <Cancel fontSize="small" />,
    className: "bg-rose-50 text-rose-700 border-rose-100",
  },
];

function OrdersTable({ orders, loading, onView, onUpdateStatus }) {
  const getStatus = (statusBE) => {
    return statusOptions.find((item) => item.value === statusBE) || statusOptions[0];
  };

  const getProductImage = (order) => {
    return (
      order.items?.[0]?.productId?.image ||
      order.items?.[0]?.productId?.thumbnail ||
      order.items?.[0]?.productImage ||
      null
    );
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Đơn hàng mới nhất</h2>
          <p className="mt-1 text-sm text-slate-500">
            Quản lý đơn hàng, trạng thái và chi tiết giao hàng.
          </p>
        </div>

        <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          {orders.length} đơn
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
              <th className="px-6 py-4">Đơn hàng</th>
              <th className="px-5 py-4">Khách hàng</th>
              <th className="px-5 py-4">Ngày đặt</th>
              <th className="px-5 py-4">Tổng tiền</th>
              <th className="px-5 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-16 text-center text-slate-500">
                  Đang tải đơn hàng...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-16 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <Inventory2 />
                  </div>
                  <p className="mt-4 font-semibold text-slate-800">
                    Không có đơn hàng
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Đơn hàng mới sẽ hiển thị tại đây.
                  </p>
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const currentStatus = getStatus(order.statusBE);
                const productImage = getProductImage(order);

                return (
                  <tr
                    key={order.id}
                    className="group transition hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                          {productImage ? (
                            <img
                              src={productImage}
                              alt="product"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Inventory2 className="text-slate-400" />
                          )}
                        </div>

                        <div>
                          <p className="font-bold text-slate-900">
                            #{order.id?.slice(-8).toUpperCase()}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {order.items?.length || 0} sản phẩm
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <p className="max-w-[240px] truncate font-semibold text-slate-800">
                        {order.customer}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{order.phone}</p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="font-medium text-slate-700">{order.date}</p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="text-base font-bold text-slate-900">
                        {order.total.toLocaleString()}đ
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <div
                        className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-2 ${currentStatus.className}`}
                      >
                        {currentStatus.icon}

                        <select
                          value={order.statusBE}
                          onChange={(e) =>
                            onUpdateStatus(order.id, e.target.value)
                          }
                          className="cursor-pointer bg-transparent text-xs font-bold outline-none"
                        >
                          {statusOptions.map((status) => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end">
                        <button
                          onClick={() => onView(order)}
                          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Visibility fontSize="small" />
                          Xem
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(OrdersTable);