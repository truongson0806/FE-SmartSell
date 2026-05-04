# API Endpoints Required for FE

## **🔴 CRITICAL - Đang dùng, cần phải có**

### 1. **Authentication (PRIORITY: HIGHEST)**
```
POST   /auth/register          - Đăng ký tài khoản
POST   /auth/login             - Đăng nhập
POST   /auth/logout            - Đăng xuất
POST   /auth/refresh-token     - Refresh JWT token
POST   /auth/verify-email      - Verify email
POST   /auth/forgot-password   - Forgot password
POST   /auth/reset-password    - Reset password
GET    /auth/me                - Get current user info
POST   /auth/change-password   - Change password
```

### 2. **Customers (PRIORITY: HIGH)**
```
GET    /customers              - Lấy danh sách khách hàng
GET    /customers/{id}         - Lấy chi tiết khách hàng
POST   /customers              - Tạo khách hàng mới
PUT    /customers/{id}         - Cập nhật khách hàng
DELETE /customers/{id}         - Xóa khách hàng
GET    /customers/search?q=    - Tìm kiếm khách hàng
GET    /customers/rank/{rank}  - Lọc theo hạng
GET    /customers/stats        - Thống kê khách hàng
```

### 3. **Products (PRIORITY: HIGH)**
```
POST   /products/getListProducts  - Lấy danh sách sản phẩm (phân trang)
GET    /products                  - Lấy danh sách sản phẩm (công khai)
GET    /products/{id}             - Chi tiết sản phẩm
POST   /products                  - Tạo sản phẩm
PUT    /products/{id}             - Cập nhật sản phẩm
DELETE /products/{id}             - Xóa sản phẩm
GET    /products/category/{id}    - Sản phẩm theo danh mục
GET    /products/search?q=        - Tìm kiếm sản phẩm
GET    /categories                - Danh sách danh mục
POST   /categories                - Tạo danh mục
```

### 4. **Orders (PRIORITY: HIGH)**
```
GET    /orders/getAllOrders        - Lấy danh sách đơn hàng
GET    /orders/{id}                - Chi tiết đơn hàng
POST   /orders                     - Tạo đơn hàng
PUT    /orders/{id}                - Cập nhật đơn hàng
DELETE /orders/{id}                - Hủy đơn hàng
PUT    /orders/{id}/status         - Cập nhật trạng thái
GET    /orders/user/{userId}       - Đơn hàng của user
PATCH  /orders/{id}/cancel         - Hủy đơn hàng
```

---

## **🟡 IMPORTANT - Nên có để FE hoàn chỉnh**

### 5. **Cart**
```
GET    /cart                   - Lấy giỏ hàng
POST   /cart/add               - Thêm vào giỏ
PUT    /cart/update/{id}       - Cập nhật số lượng
DELETE /cart/remove/{id}       - Xóa khỏi giỏ
DELETE /cart/clear             - Xóa toàn bộ giỏ
```

### 6. **Checkout & Payment**
```
POST   /checkout/validate      - Validate order
POST   /payment/process        - Xử lý thanh toán
GET    /payment/status/{id}    - Trạng thái thanh toán
POST   /payment/callback       - Payment gateway callback
```

### 7. **Users / Account**
```
GET    /users/{id}             - Chi tiết user
PUT    /users/{id}             - Cập nhật profile
DELETE /users/{id}             - Xóa tài khoản
GET    /users/{id}/addresses   - Danh sách địa chỉ
POST   /users/{id}/addresses   - Thêm địa chỉ
DELETE /users/{id}/addresses/{addrId} - Xóa địa chỉ
```

### 8. **Reviews & Ratings**
```
GET    /reviews/product/{productId}    - Review sản phẩm
POST   /reviews                        - Tạo review
PUT    /reviews/{id}                   - Cập nhật review
DELETE /reviews/{id}                   - Xóa review
```

### 9. **Wishlist**
```
GET    /wishlist               - Lấy danh sách yêu thích
POST   /wishlist/add           - Thêm vào wishlist
DELETE /wishlist/remove/{id}   - Xóa khỏi wishlist
```

### 10. **Store Owner / Dashboard Analytics**
```
GET    /dashboard/stats        - Thống kê chung
GET    /dashboard/revenue      - Doanh thu
GET    /dashboard/orders       - Đơn hàng mới
GET    /dashboard/customers    - Khách hàng mới
GET    /analytics/sales        - Phân tích doanh số
GET    /analytics/traffic      - Traffic analysis
```

---

## **🟢 OPTIONAL - Nice to have**

### 11. **Notifications**
```
GET    /notifications          - Danh sách thông báo
POST   /notifications/mark-read - Đánh dấu đã đọc
DELETE /notifications/{id}     - Xóa thông báo
```

### 12. **Promotions / Coupons**
```
GET    /coupons                - Danh sách mã giảm
POST   /coupons/apply          - Áp dụng mã
GET    /promotions             - Danh sách khuyến mãi
```

### 13. **Support / Chat**
```
POST   /support/tickets        - Tạo ticket hỗ trợ
GET    /support/tickets        - Danh sách ticket
POST   /chat/messages          - Gửi tin nhắn
GET    /chat/messages          - Lấy tin nhắn
```

### 14. **AI Features** (ChatBox integration)
```
POST   /ai/chat                - Gửi tin nhắn cho AI
GET    /ai/recommendations     - Khuyến nghị sản phẩm
POST   /ai/search              - Tìm kiếm thông minh
```

---

## **📊 Summary**

| Loại | Số lượng | Trạng thái |
|------|---------|-----------|
| **Critical (đang dùng)** | 24 | 🔴 PHẢI CÓ |
| **Important** | 19 | 🟡 NÊN CÓ |
| **Optional** | 8 | 🟢 TỐT CÓ |
| **TOTAL** | **51** | ⚠️ |

---

## **🎯 Backend Cần Implement (Priority Order)**

1. ✅ Authentication (register, login, verify token)
2. ✅ Customers CRUD + Search + Stats
3. ✅ Products CRUD + Category + Search
4. ✅ Orders CRUD + Status update
5. ✅ Users profile management
6. ✅ Cart management
7. ✅ Dashboard stats
8. ✅ Payment integration

---

## **❌ FE Current Status**

### Các pages có nhưng gọi API không đúng:
- ❌ ProductsOwnerPage - gọi POST `/products/getListProducts` (lạ lắm)
- ❌ OrdersOwnerPage - gọi GET `/orders/getAllOrders`
- ❌ Customer page - gọi GET `/customers`
- ❌ CustomerLogin - gọi POST `/auth/login`
- ❌ CustomerRegister - gọi POST `/auth/register`

### Cần thêm API service files:
- ❌ ProductAPI.js
- ❌ OrderAPI.js
- ❌ AuthAPI.js
- ❌ UserAPI.js
- ❌ CartAPI.js
- ❌ PaymentAPI.js
- ❌ ReviewAPI.js
