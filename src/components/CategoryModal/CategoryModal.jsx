import { useState, useEffect } from "react";
import axiosInstance from "../../network/httpRequest";
import toast from "react-hot-toast";

export default function CategoryModal({ open, onClose }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    _id: null,
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories/getListCategories");
      setCategories(res.data.data);
    } catch {
      toast.error("Lỗi tải danh mục");
    }
  };

  useEffect(() => {
    if (open) fetchCategories();
  }, [open]);

  if (!open) return null;

  const resetForm = () => {
    setForm({
      name: "",
      slug: "",
      description: "",
      _id: null,
    });
  };

  const handleCreateCategory = async () => {
    try {
      await axiosInstance.post("/categories/create", form);
      toast.success("Thêm danh mục thành công");
      resetForm();
      fetchCategories();
    } catch {
      toast.error("Lỗi tạo danh mục");
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await axiosInstance.put(
        `/categories/updateCategoryById/${form._id}`,
        form
      );
      toast.success("Cập nhật danh mục thành công");
      resetForm();
      fetchCategories();
    } catch {
      toast.error("Lỗi cập nhật danh mục");
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDeleteCategory = async () => {
    try {
      await axiosInstance.delete(`/categories/deleteCategoryById/${deleteId}`);
      toast.success("Xóa danh mục thành công");
      fetchCategories();
      setShowConfirm(false);
    } catch {
      toast.error("Lỗi xóa danh mục");
    }
  };

  const handleEdit = (category) => {
    setForm(category);
  };

  return (
    <>
      {/* MAIN MODAL */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
        <div className="bg-white w-237.5 rounded-2xl shadow-2xl animate-scaleIn">
          {/* HEADER */}
          <div className="flex justify-between items-center border-b px-6 py-4">
            <h2 className="text-xl font-semibold">Quản lý danh mục</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-xl cursor-pointer hover:bg-red-500 hover:rounded-full px-2"
            >
              ×
            </button>
          </div>

          {/* BODY */}
          <div className="p-6">
            {/* FORM */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              <input
                placeholder="Tên danh mục"
                className="border p-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                    slug: generateSlug(e.target.value),
                  })
                }
              />

              <input
                placeholder="Slug"
                className="border p-2 rounded-lg bg-gray-100"
                value={form.slug}
                disabled
              />

              <input
                placeholder="Mô tả"
                className="border p-2 rounded-lg"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mb-5">
              <button
                onClick={form._id ? handleUpdateCategory : handleCreateCategory}
                className={`${
                  form._id
                    ? "bg-blue-600 hover:bg-blue-700 "
                    : "bg-purple-600 hover:bg-purple-700"
                } text-white px-5 py-2 rounded-lg cursor-pointer`}
              >
                {form._id ? "Cập nhật" : "Thêm danh mục"}
              </button>

              <button
                onClick={resetForm}
                className="px-5 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                Làm mới
              </button>
            </div>

            {/* TABLE */}
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <table className="w-full">
                <thead className="bg-gray-100 text-sm">
                  <tr>
                    <th className="p-3 text-left">Tên danh mục</th>
                    <th className="p-3 text-left">Slug</th>
                    <th className="p-3 text-left">Mô tả</th>
                    <th className="p-3 text-center">Hành động</th>
                  </tr>
                </thead>

                <tbody className="text-sm">
                  {categories.map((c) => (
                    <tr
                      key={c._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-3 font-medium">{c.name}</td>
                      <td className="p-3 text-gray-500">{c.slug}</td>
                      <td className="p-3 text-gray-500">{c.description}</td>
                      <td className="p-3">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(c)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg cursor-pointer"
                          >
                            Sửa
                          </button>

                          <button
                            onClick={() => confirmDelete(c._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg cursor-pointer"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRM DELETE POPUP */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-xl shadow-xl w-95 animate-scaleIn">
            <h3 className="text-lg font-semibold mb-2 text-red-600">
              Xóa danh mục
            </h3>

            <p className="text-gray-500 mb-4">
              Bạn có chắc chắn muốn xóa danh mục này không?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                Hủy
              </button>

              <button 
                onClick={handleDeleteCategory}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer "
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ANIMATION */}
      <style>
        {`
        .animate-fadeIn {
          animation: fadeIn .2s ease;
        }
        .animate-scaleIn {
          animation: scaleIn .2s ease;
        }

        @keyframes fadeIn {
          from {opacity:0}
          to {opacity:1}
        }

        @keyframes scaleIn {
          from {opacity:0; transform: scale(0.9)}
          to {opacity:1; transform: scale(1)}
        }
        `}
      </style>
    </>
  );
}
