import { useState, useEffect } from "react";
import axiosInstance from "../../network/httpRequest";

export default function CategoryModal({ open, onClose }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get(
        "/categories/getListCategories"
      );
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  // ⚠️ return null đặt SAU hooks
  if (!open) return null;

  const handleCreateCategory = async () => {
    try {
      await axiosInstance.post("/categories/create", form);
      alert("Thêm danh mục thành công");
      setForm({ name: "", slug: "", description: "" });
      fetchCategories();
    } catch (error) {
      console.log(error);
      alert("Lỗi tạo danh mục");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[600px] rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Quản lý danh mục</h2>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <input
            placeholder="Tên danh mục"
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Slug"
            className="border p-2 rounded"
            value={form.slug}
            onChange={(e) =>
              setForm({ ...form, slug: e.target.value })
            }
          />

          <textarea
            placeholder="Mô tả"
            className="border p-2 rounded col-span-2"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
        </div>

        <button
          onClick={handleCreateCategory}
          className="bg-purple-600 text-white px-4 py-2 rounded mb-4 cursor-pointer"
        >
          Thêm danh mục
        </button>

        <div className="border rounded-lg max-h-[200px] overflow-y-auto">
          {categories.map((c) => (
            <div
              key={c._id}
              className="p-3 border-b flex justify-between"
            >
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-gray-500">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}