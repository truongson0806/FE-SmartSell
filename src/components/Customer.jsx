import React, { useState, useEffect } from "react";
import httpRequest from "../network/httpRequest";
import { getCustomers, createCustomer, deleteCustomer, updateCustomer } from "../network/CustomerAPI";
import CustomerSearchBar from "../../../components/CustomerSearchBar";
import CustomerStats from "../../../components/CustomerStats";
import "./Customer.css";

// chart
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// excel
import * as XLSX from "xlsx";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRank, setFilterRank] = useState("Tất cả");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showChart, setShowChart] = useState(true);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    totalRevenue: 0,
  });

  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    if (isNaN(d)) return "-";
    return d.toLocaleDateString("vi-VN");
  };

  // Fetch dữ liệu từ API
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await httpRequest.get("/customers");
      console.log("API Response:", response.data);
      
      // Xử lý dữ liệu từ API
      let data = [];
      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        data = response.data.data;
      } else if (response.data?.customers && Array.isArray(response.data.customers)) {
        data = response.data.customers;
      } else if (response.data?.result && Array.isArray(response.data.result)) {
        data = response.data.result;
      }
      
      setCustomers(data);
      calculateStats(data);
    } catch (error) {
      console.error("Lỗi khi fetch customers:", error);
      // Hiển thị thông báo lỗi
      setCustomers([]);
      calculateStats([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const totalCustomers = data.length;
    const activeCustomers = data.filter(
      (c) => (c.status || "").toLowerCase() === "active"
    ).length;
    const totalRevenue = data.reduce(
      (sum, c) => sum + Number(c.total_spent || 0),
      0
    );
    setStats({ totalCustomers, activeCustomers, totalRevenue });
  };

  const filteredCustomers = customers.filter((c) => {
    const matchSearch =
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search);
    const matchRank = filterRank === "Tất cả" || c.rank === filterRank;
    const matchStatus = filterStatus === "Tất cả" || c.status === filterStatus;
    const matchDate =
      (!fromDate || new Date(c.join_date || c.createdAt) >= new Date(fromDate)) &&
      (!toDate || new Date(c.join_date || c.createdAt) <= new Date(toDate));
    return matchSearch && matchRank && matchStatus && matchDate;
  });

  const chartData = filteredCustomers.map((c) => ({
    name: c.name || "No name",
    spending: Number(c.total_spent || 0),
  }));

  const exportToExcel = () => {
    const data = filteredCustomers.map((c) => ({
      Tên: c.name,
      Email: c.email,
      SĐT: c.phone,
      "Địa chỉ": c.address || "",
      "Tổng chi": Number(c.total_spent || 0).toLocaleString() + "đ",
      "Đơn hàng": Number(c.total_orders || 0),
      "Hạng": c.rank,
      "Trạng thái": c.status === 'active' ? 'Hoạt động' : 'Không hoạt động',
      "Ngày tham gia": formatDate(c.join_date || c.createdAt),
      "Đơn cuối": formatDate(c.last_order_date || c.lastOrderDate),
      "Ghi chú": c.note || "",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    
    ws['!cols'] = [
      { wch: 25 }, { wch: 25 }, { wch: 15 }, { wch: 30 },
      { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 15 },
      { wch: 15 }, { wch: 15 }, { wch: 20 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, "Danh sách khách hàng");
    XLSX.writeFile(wb, `khach_hang_${new Date().toLocaleDateString("vi-VN")}.xlsx`);
  };

  // Thêm khách hàng mới
  const handleAddCustomer = async () => {
    const newCustomer = {
      name: "Khách hàng mới",
      email: `new${Date.now()}@email.com`,
      phone: "0900000000",
      address: "Địa chỉ mới",
      total_spent: 0,
      total_orders: 0,
      rank: "Thành viên",
      status: "active",
      join_date: new Date().toISOString(),
      last_order_date: new Date().toISOString(),
      note: ""
    };
    
    try {
      const response = await httpRequest.post("/customers", newCustomer);
      if (response.data) {
        fetchCustomers(); // Refresh danh sách
        alert("✅ Thêm khách hàng thành công!");
      }
    } catch (error) {
      console.error("Lỗi thêm khách hàng:", error);
      alert("❌ Thêm khách hàng thất bại!");
    }
  };

  // Làm mới dữ liệu
  const handleRefresh = () => {
    fetchCustomers();
  };

  return (
    <div className="customer-container">
      <div className="page-header">
        <h1>👥 Quản lý khách hàng</h1>
        <p className="subtitle">Quản lý và theo dõi thông tin khách hàng</p>
      </div>

      <CustomerSearchBar
        search={search}
        onSearchChange={setSearch}
        filterRank={filterRank}
        onFilterRankChange={setFilterRank}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        fromDate={fromDate}
        onFromDateChange={setFromDate}
        toDate={toDate}
        onToDateChange={setToDate}
        onResetFilter={() => {
          setFilterRank("Tất cả");
          setFilterStatus("Tất cả");
          setFromDate("");
          setToDate("");
          setSearch("");
        }}
      />

      <CustomerStats {...stats} />

      <div className="action-bar">
        <button onClick={exportToExcel} className="btn-excel">
          📊 Xuất Excel
        </button>
        <button onClick={() => setShowChart(!showChart)} className="btn-chart">
          📈 {showChart ? "Ẩn biểu đồ" : "Xem biểu đồ"}
        </button>
        <button onClick={handleAddCustomer} className="btn-add">
          ➕ Thêm khách hàng
        </button>
        <button onClick={handleRefresh} className="btn-refresh">
          🔄 Làm mới
        </button>
      </div>

      {showChart && chartData.length > 0 && (
        <div className="chart-card">
          <h3>💰 Biểu đồ chi tiêu khách hàng</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis tickFormatter={(v) => v.toLocaleString() + "đ"} />
                <Tooltip formatter={(v) => v.toLocaleString() + "đ"} />
                <Bar dataKey="spending" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <div className="table-wrapper">
          {filteredCustomers.length === 0 ? (
            <div className="empty-state">
              <p>📭 Không tìm thấy khách hàng nào</p>
            </div>
          ) : (
            <table className="customer-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Khách hàng</th>
                  <th>Email</th>
                  <th>SĐT</th>
                  <th>Tổng chi</th>
                  <th>Đơn hàng</th>
                  <th>Hạng</th>
                  <th>Trạng thái</th>
                  <th>Ngày tham gia</th>
                  <th>Đơn cuối</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((c, index) => (
                  <tr key={c.id || c._id || index}>
                    <td>{index + 1}</td>
                    <td className="customer-name">
                      <div className="customer-info">
                        <strong>{c.name}</strong>
                        {c.address && <span className="address">{c.address}</span>}
                      </div>
                    </td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td className="price">{Number(c.total_spent || 0).toLocaleString()}đ</td>
                    <td className="text-center">{c.total_orders || 0}</td>
                    <td>
                      <span className={`rank rank-${(c.rank || '').toLowerCase()}`}>
                        {c.rank || 'Thành viên'}
                      </span>
                    </td>
                    <td>
                      <span className={`status ${c.status === 'active' ? 'active' : 'inactive'}`}>
                        {c.status === 'active' ? '🟢 Hoạt động' : '🔴 Không hoạt động'}
                      </span>
                    </td>
                    <td>{formatDate(c.join_date || c.createdAt)}</td>
                    <td>{formatDate(c.last_order_date || c.lastOrderDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}