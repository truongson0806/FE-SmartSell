import { Close, WarningAmber } from "@mui/icons-material";

export default function CancelOrderModal({ order, onClose, onConfirm }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <WarningAmber />
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100"
          >
            <Close />
          </button>
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900">
          Huỷ đơn hàng?
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Bạn có chắc muốn huỷ đơn{" "}
          <span className="font-semibold text-slate-900">{order.id}</span>{" "}
          không? Hành động này sẽ chuyển trạng thái đơn sang đã huỷ.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Không
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            Xác nhận huỷ
          </button>
        </div>
      </div>
    </div>
  );
}