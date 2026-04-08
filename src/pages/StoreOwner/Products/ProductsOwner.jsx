import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../network/httpRequest";
import {
  Add,
  Search,
  Edit,
  Delete,
  ViewList,
  GridView,
} from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddProductModal from "../../../components/AddProductModal/AddProductModal";
import CategoryModal from "../../../components/CategoryModal/CategoryModal";

export default function ProductsOwnerPage() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const menuRef = useRef(null);
  // Load sản phẩm
  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.post("/products/getListProducts", {
        page: page,
        limit: 10,
      });

      setProducts(res.data.data);
      setPagination(res.data.pagination);
    } catch (error) {
      console.log("Lỗi load sản phẩm", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Thống kê
  const totalProducts = pagination.total || 0;

  const lowStock = products.filter((p) =>
    p.variants?.some((v) => v.stock < 10 && v.stock > 0)
  ).length;

  const outOfStock = products.filter((p) =>
    p.variants?.every((v) => v.stock === 0)
  ).length;

  // Tìm kiếm
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );
  const openDeletePopup = (id) => {
    setDeleteProductId(id);
    setShowDeletePopup(true);
  };
  

  const handleDeleteProduct = async () => {
    try {
      await axiosInstance.delete(
        `/products/deleteProductById/${deleteProductId}`
      );
  
      toast.success("Xóa sản phẩm thành công");
  
      fetchProducts();
      setShowDeletePopup(false);
    } catch (error) {
      console.log(error);
      toast.error("Xóa sản phẩm thất bại");
    }
  };
  const handleEditProduct = async (product) => {
    try {
      const res = await axiosInstance.get(
        `/products/getProductById/${product._id}`
      );

      setSelectedProduct(res.data.data);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-6">
      {/* Thống kê */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow">
          <p className="text-sm">Tổng sản phẩm</p>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>

        <div className="bg-linear-to-r from-orange-400 to-orange-500 text-white p-6 rounded-2xl shadow">
          <p className="text-sm">Sắp hết hàng</p>
          <p className="text-3xl font-bold">{lowStock}</p>
        </div>

        <div className="bg-linear-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl shadow">
          <p className="text-sm">Hết hàng</p>
          <p className="text-3xl font-bold">{outOfStock}</p>
        </div>
      </div>

      {/* Thanh công cụ */}
      <div className="bg-white p-4 rounded-2xl shadow flex justify-between items-center">
        <div className="flex items-center gap-3 border px-3 py-2 rounded-lg">
          <Search />
          <input
            placeholder="Tìm sản phẩm..."
            className="outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setView("table")}
            className="p-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <ViewList />
          </button>
          <button
            onClick={() => setView("grid")}
            className="p-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <GridView />
          </button>
          <button
            onClick={() => setShowCategoryModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 cursor-pointer"
          >
            Danh mục
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 cursor-pointer"
          >
            <Add /> Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* GRID */}
      {view === "grid" && (
        <div className="grid grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const totalStock = p.variants?.reduce((sum, v) => sum + v.stock, 0);

            return (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
              >
                {/* Image */}
                <img src={p.images?.[0]} className="w-full h-44 object-cover" />

                {/* Info */}
                <div className="p-4 space-y-1">
                  <p className="font-semibold text-lg line-clamp-1">{p.name}</p>

                  <p className="text-sm text-gray-500">
                    {p.brand} • {p.productModel}
                  </p>

                  <p className="text-sm text-gray-500">
                    Danh mục: {p.categories?.name || "Không có"}
                  </p>

                  <div className="flex justify-between mt-2">
                    <span className="font-bold text-blue-600">
                      {p.price?.toLocaleString()}đ
                    </span>
                    <span className="text-sm text-gray-500">
                      Tồn: {totalStock}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleEditProduct(p)}
                      className="flex-1 bg-blue-500 text-white py-1 rounded-lg text-sm cursor-pointer"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => openDeletePopup(p._id)}
                      className="flex-1 bg-red-500 text-white py-1 rounded-lg text-sm cursor-pointer"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE */}
      {view === "table" && (
        <div className="bg-white rounded-2xl shadow overflow-visible">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500">
                <th className="p-3">Sản phẩm</th>
                <th>Hãng</th>
                <th>Model</th>
                <th>Giá</th>
                <th>Tồn kho</th>
                <th>Năm</th>
                <th>Ngày tạo</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((p) => {
                const totalStock = p.variants?.reduce(
                  (sum, v) => sum + v.stock,
                  0
                );

                return (
                  <tr
                    key={p._id}
                    onClick={() => {
                      setSelectedProduct(p);
                      setShowDetail(true);
                    }}
                    className="border-t hover:bg-gray-50 cursor-pointer "
                  >
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={p.images?.[0]}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.description}</p>
                      </div>
                    </td>

                    <td>{p.brand}</td>
                    <td>{p.productModel}</td>
                    <td className="font-semibold text-blue-600">
                      {p.price?.toLocaleString()} đ
                    </td>
                    <td>{totalStock}</td>
                    <td>{p.releaseYear}</td>
                    <td>{new Date(p.createdAt).toLocaleDateString()}</td>

                    <td className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenId(menuOpenId === p._id ? null : p._id);
                        }}
                        className="hover:bg-gray-200 rounded-full cursor-pointer"
                      >
                        <MoreHorizIcon size={20} />
                      </button>

                      {menuOpenId === p._id && (
                        <div
                          ref={menuRef}
                          className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleEditProduct(p)}
                          >
                            Chỉnh sửa
                          </button>

                          <button
                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                            onClick={() => openDeletePopup(p._id)}
                          >
                            Xóa
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Phân trang */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded cursor-pointer"
        >
          Trước
        </button>

        <span className="px-3 py-1 cursor-pointer">
          Trang {pagination.page} / {pagination.totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === pagination.totalPages}
          className="px-3 py-1 border rounded"
        >
          Sau
        </button>
      </div>

      {/* Modal chi tiết */}
      {showDetail && selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-200 rounded-2xl shadow-lg p-6 relative">
            <button
              onClick={() => setShowDetail(false)}
              className="absolute top-3 right-3 text-lg text-gray-500 hover:text-black cursor-pointer hover:rounded-full hover:bg-red-400 px-2"
            >
              ✕
            </button>

            <div className="grid grid-cols-2 gap-6">
              <img
                src={selectedProduct.images?.[0]}
                className="w-full h-80 object-cover rounded-xl"
              />

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>

                <p>
                  <b>Hãng:</b> {selectedProduct.brand}
                </p>
                <p>
                  <b>Model:</b> {selectedProduct.productModel}
                </p>
                <p>
                  <b>Hệ điều hành:</b> {selectedProduct.os}
                </p>
                <p>
                  <b>Chip:</b> {selectedProduct.chipset}
                </p>
                <p>
                  <b>Màn hình:</b> {selectedProduct.screen} inch
                </p>
                <p>
                  <b>Pin:</b> {selectedProduct.batteryMah} mAh
                </p>
                <p>
                  <b>Camera:</b> {selectedProduct.cameraMainMp} MP
                </p>
                <p>
                  <b>Năm:</b> {selectedProduct.releaseYear}
                </p>

                <p className="text-lg font-bold text-blue-600">
                  Giá: {selectedProduct.price?.toLocaleString()}đ
                </p>
              </div>
            </div>

            {/* Variants */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Kho</h3>
              <table className="w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2">SKU</th>
                    <th>Màu</th>
                    <th>RAM</th>
                    <th>ROM</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProduct.variants?.map((v) => (
                    <tr key={v._id} className="border-t text-center">
                      <td className="p-2">{v.sku}</td>
                      <td>{v.color}</td>
                      <td>{v.ramGb} GB</td>
                      <td>{v.storageGb} GB</td>
                      <td>{v.price?.toLocaleString()}đ</td>
                      <td>{v.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-80 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-red-600">
              Xóa sản phẩm
            </h3>
            <p className="text-gray-500 mb-4">
              Bạn có chắc muốn xóa sản phẩm này?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="px-4 py-2 border rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal thêm sản phẩm */}
      <AddProductModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedProduct(null);
        }}
        onSuccess={fetchProducts}
        product={selectedProduct}
      />
      {/* Modal thêm danh mục */}
      <CategoryModal
        open={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
      />
    </div>
  );
}
