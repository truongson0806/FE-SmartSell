import httpRequest from "./httpRequest";

// GET danh sách khách hàng
export const getCustomers = async () => {
  try {
    const response = await httpRequest.get("/customers");
    
    // Chuẩn hóa dữ liệu trả về
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
    
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khách hàng:", error);
    throw error;
  }
};

// GET thống kê khách hàng
export const getCustomerStats = async () => {
  try {
    const response = await httpRequest.get("/customers/stats");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thống kê:", error);
    throw error;
  }
};

// POST thêm khách hàng mới
export const createCustomer = async (data) => {
  try {
    const response = await httpRequest.post("/customers", data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm khách hàng:", error);
    throw error;
  }
};

// PUT cập nhật khách hàng
export const updateCustomer = async (id, data) => {
  try {
    const response = await httpRequest.put(`/customers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật khách hàng:", error);
    throw error;
  }
};

// DELETE xóa khách hàng
export const deleteCustomer = async (id) => {
  try {
    const response = await httpRequest.delete(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa khách hàng:", error);
    throw error;
  }
};

// GET tìm kiếm khách hàng
export const searchCustomers = async (keyword) => {
  try {
    const response = await httpRequest.get(`/customers/search?q=${keyword}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm:", error);
    throw error;
  }
};

// GET lọc khách hàng theo hạng
export const filterByRank = async (rank) => {
  try {
    const response = await httpRequest.get(`/customers/rank/${rank}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lọc theo hạng:", error);
    throw error;
  }
};
// Đăng ký
export const CustomerRegister = async (data) => {
  try {
    const response = await httpRequest.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    throw error;
  }
};
// Đăng nhập
export const CustomerLogin = async (data) => {
  try {
    const response = await httpRequest.post("/auth/login", data);

    // lưu token + user
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }

    if (response.data?.user) {
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    throw error;
  }
};


export default {
  CustomerRegister,
  CustomerLogin,
  getCustomers,
  getCustomerStats,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
  filterByRank
};