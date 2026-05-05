import React, { useState, useEffect, useRef } from "react";
import { Search, FilterList } from "@mui/icons-material";

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
  onResetFilter,
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [localSearch, setLocalSearch] = useState(search);
  const filterRef = useRef();

  // 🔥 debounce search (tránh gọi API liên tục)
  useEffect(() => {
    const delay = setTimeout(() => {
      onSearchChange(localSearch);
    }, 400);

    return () => clearTimeout(delay);
  }, [localSearch]);

  // 🔥 đóng filter khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    <div className="search-bar-container" ref={filterRef}>
      {/* SEARCH */}
      <div className="search-bar">
        <div className="search-input-wrapper">
          <Search />
          <input
            placeholder="Tìm theo tên, email hoặc số điện thoại..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>

        <button
          onClick={() => setShowFilter(!showFilter)}
          className="filter-button"
        >
          <FilterList /> Bộ lọc
        </button>
      </div>

      {/* FILTER */}
      <div className={`filter-dropdown ${showFilter ? 'visible' : 'hidden'}`}>
        <div className="filter-content">
          <h3 className="filter-title">Bộ lọc khách hàng</h3>

          {/* Rank */}
          <div className="filter-group">
            <label className="filter-label">Xếp hạng</label>
            <select
              className="filter-select"
              value={filterRank}
              onChange={(e) => onFilterRankChange(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="diamond">Kim cương</option>
              <option value="gold">Vàng</option>
              <option value="silver">Bạc</option>
              <option value="bronze">Đồng</option>
            </select>
          </div>

          {/* Status */}
          <div className="filter-group">
            <label className="filter-label">Trạng thái</label>
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => onFilterStatusChange(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          {/* Date */}
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

          {/* ACTION */}
          <div className="filter-actions">
            <button onClick={onResetFilter} className="reset-button">Reset</button>

            <button onClick={() => setShowFilter(false)} className="apply-button">
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}