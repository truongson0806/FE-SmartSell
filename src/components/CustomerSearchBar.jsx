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

  return (
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
      {showFilter && (
        <div className="filter-dropdown">
          <div className="filter-content">
            <h3 className="filter-title">Bộ lọc khách hàng</h3>

            {/* Rank */}
            <div className="filter-group">
              <label>Xếp hạng</label>
              <select
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
              <label>Trạng thái</label>
              <select
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
                <label>Từ ngày</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => onFromDateChange(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Đến ngày</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => onToDateChange(e.target.value)}
                />
              </div>
            </div>

            {/* ACTION */}
            <div className="filter-actions">
              <button onClick={onResetFilter}>Reset</button>

              <button onClick={() => setShowFilter(false)}>
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}