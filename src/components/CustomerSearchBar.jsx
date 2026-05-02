import React, { useState } from 'react';
import { Search, FilterList } from '@mui/icons-material';

export default function CustomerSearchBar({ 
  search, 
  onSearchChange,
  filterRank,
  onFilterRankChange,
  filterStatus,
  onFilterStatusChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
  onResetFilter
}) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <div className="search-input-wrapper">
          <Search />
          <input
            placeholder="Tìm theo tên, email hoặc số điện thoại..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <button onClick={() => setShowFilter(!showFilter)} className="filter-button">
          <FilterList /> Bộ lọc
        </button>
      </div>

      {/* Filter Dropdown */}
      <div className={`filter-dropdown ${showFilter ? 'visible' : 'hidden'}`}>
        <div className="filter-content">
          <h3 className="filter-title">Bộ lọc khách hàng</h3>

          <div className="filter-group">
            <label className="filter-label">Xếp hạng</label>
            <select 
              className="filter-select" 
              value={filterRank}
              onChange={(e) => onFilterRankChange(e.target.value)}
            >
              <option>Tất cả</option>
              <option>Kim cương</option>
              <option>Vàng</option>
              <option>Bạc</option>
              <option>Đồng</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Trạng thái</label>
            <select 
              className="filter-select"
              value={filterStatus}
              onChange={(e) => onFilterStatusChange(e.target.value)}
            >
              <option>Tất cả</option>
              <option>active</option>
              <option>inactive</option>
              <option>blocked</option>
            </select>
          </div>

          <div className="date-range">
            <div className="filter-group">
              <label className="filter-label">Từ ngày</label>
              <input
                type="date"
                className="filter-input"
                value={fromDate}
                onChange={(e) => onFromDateChange(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Đến ngày</label>
              <input
                type="date"
                className="filter-input"
                value={toDate}
                onChange={(e) => onToDateChange(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-actions">
            <button onClick={onResetFilter} className="reset-button">Reset</button>
            <button onClick={() => setShowFilter(false)} className="apply-button">Áp dụng</button>
          </div>
        </div>
      </div>
    </div>
  );
}