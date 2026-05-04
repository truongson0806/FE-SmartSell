const Settings = () => {
  return (
    <div>
      <h2>Cài đặt cửa hàng</h2>

      <div>
        <label>Tên cửa hàng:</label>
        <input type="text" placeholder="Nhập tên..." />
      </div>

      <div>
        <label>Email:</label>
        <input type="email" placeholder="Nhập email..." />
      </div>

      <div>
        <label>Số điện thoại:</label>
        <input type="text" placeholder="Nhập số..." />
      </div>

      <button>Lưu thay đổi</button>
    </div>
  );
};

export default Settings;