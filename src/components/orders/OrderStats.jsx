export default function OrderStats({
  totalOrders,
  totalRevenue,
  processing,
  shipping,
}) {
  const stats = [
    {
      title: "Tổng đơn",
      value: totalOrders,
      desc: "Tất cả đơn hàng",
    },
    {
      title: "Doanh thu",
      value: `${totalRevenue.toLocaleString()}đ`,
      desc: "Không tính đơn huỷ",
    },
    {
      title: "Đã thanh toán",
      value: processing,
      desc: "Chờ xử lý giao hàng",
    },
    {
      title: "Đang giao",
      value: shipping,
      desc: "Đơn đang vận chuyển",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">{item.title}</p>
          <h2 className="mt-3 text-2xl font-bold text-slate-900">
            {item.value}
          </h2>
          <p className="mt-1 text-xs text-slate-400">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}