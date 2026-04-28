import { Search } from "@mui/icons-material";

export default function OrderFilter({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  resetFilter,
}) {
  return (
    <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <label className="mb-2 block text-xs font-semibold text-slate-500">
            Tìm kiếm
          </label>
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
            <Search className="text-slate-400" fontSize="small" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Mã đơn, email, số điện thoại..."
              className="ml-2 w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-500">
            Trạng thái
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none"
          >
            <option>Tất cả</option>
            <option>Đã thanh toán</option>
            <option>Đang giao</option>
            <option>Hoàn thành</option>
            <option>Đã hủy</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-500">
            Từ ngày
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-500">
            Đến ngày
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={resetFilter}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
}