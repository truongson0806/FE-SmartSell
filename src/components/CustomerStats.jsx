import React from 'react';

export default function CustomerStats({ totalCustomers, activeCustomers, totalRevenue }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <p>Tổng khách hàng</p>
        <p className="stat-value total">{totalCustomers}</p>
      </div>

      <div className="stat-card">
        <p>Khách hàng đang hoạt động</p>
        <p className="stat-value active">{activeCustomers}</p>
      </div>

      <div className="stat-card">
        <p>Tổng doanh thu</p>
        <p className="stat-value revenue">{totalRevenue.toLocaleString()}đ</p>
      </div>
    </div>
  );
}