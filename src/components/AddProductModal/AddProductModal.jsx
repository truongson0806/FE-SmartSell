  import { useState, useEffect } from "react";
  import axiosInstance from "../../network/httpRequest";

  export default function AddProductModal({ open, onClose, onSuccess, product }) {
    const [showConfirmSave, setShowConfirmSave] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [form, setForm] = useState({
      name: "",
      brand: "",
      price: "",
      productModel: "",
      description: "",
      categories: "",
      os: "",
      chipset: "",
      screen: "",
      batteryMah: "",
      cameraMainMp: "",
      releaseYear: "",
    });

    const [categories, setCategories] = useState([]);

    const [variants, setVariants] = useState([
      {
        sku: "",
        price: "",
        stock: "",
        color: "",
        ramGb: "",
        storageGb: "",
      },
    ]);

    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const resetForm = () => {
      setForm({
        name: "",
        brand: "",
        price: "",
        productModel: "",
        description: "",
        categories: "",
        os: "",
        chipset: "",
        screen: "",
        batteryMah: "",
        cameraMainMp: "",
        releaseYear: "",
      });
    
      setVariants([
        {
          sku: "",
          price: "",
          stock: "",
          color: "",
          ramGb: "",
          storageGb: "",
        },
      ]);
    
      setImageFiles([]);
      setImagePreview([]);
      setUploadProgress(0);
    };
    // Load categories
    useEffect(() => {
      if (open) {
        fetchCategories();
      }
    }, [open]);
    useEffect(() => {
      if (product) {
        setForm({
          name: product.name || "",
          brand: product.brand || "",
          price: product.price || "",
          productModel: product.productModel || "",
          description: product.description || "",
          categories: product.categories || "",
          os: product.os || "",
          chipset: product.chipset || "",
          screen: product.screen || "",
          batteryMah: product.batteryMah || "",
          cameraMainMp: product.cameraMainMp || "",
          releaseYear: product.releaseYear || "",
        });

        setVariants(product.variants || []);
        setImagePreview(product.images || []);
      }
    }, [product]);
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories/getListCategories");
        setCategories(res.data.data);
      } catch (error) {
        console.log("Lỗi load categories", error);
      }
    };

    if (!open) return null;

    // chọn ảnh
    const handleSelectImages = (e) => {
      const files = Array.from(e.target.files);

      setImageFiles((prev) => [...prev, ...files]);

      const preview = files.map((file) => URL.createObjectURL(file));
      setImagePreview((prev) => [...prev, ...preview]);
    };

    // xoá ảnh
    const removeImage = (index) => {
      const newPreview = [...imagePreview];
      newPreview.splice(index, 1);
      setImagePreview(newPreview);

      // nếu là ảnh mới thì xoá trong imageFiles
      if (index >= imagePreview.length - imageFiles.length) {
        const newFiles = [...imageFiles];
        newFiles.splice(index - (imagePreview.length - imageFiles.length), 1);
        setImageFiles(newFiles);
      }
    };

    // upload ảnh Cloudinary
    const uploadImages = async () => {
      const urls = [];
      setIsUploading(true);

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "cap1_smart");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dsvbtzeye/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (data.secure_url) {
          urls.push(data.secure_url);
        }

        // tính %
        const percent = Math.round(((i + 1) / imageFiles.length) * 100);
        setUploadProgress(percent);
      }

      setIsUploading(false);
      return urls;
    };

    // variant
    const handleVariantChange = (index, field, value) => {
      const updated = [...variants];
      updated[index][field] = value;
      setVariants(updated);
    };

    const addVariant = () => {
      setVariants([
        ...variants,
        { sku: "", price: "", stock: "", color: "", ramGb: "", storageGb: "" },
      ]);
    };

    const removeVariant = (index) => {
      const updated = variants.filter((_, i) => i !== index);
      setVariants(updated);
    };

    // submit
    const handleSubmit = async () => {
      try {
        let imageUrls = [];

        if (imageFiles.length > 0) {
          imageUrls = await uploadImages();
        }

        const payload = {
          name: form.name,
          brand: form.brand,
          price: Number(form.price),
          productModel: form.productModel,
          description: form.description,
          // categories: product.categories?._id || product.categories || "",
          categories: form.categories,
          images:
            imageFiles.length > 0
              ? [
                  ...imagePreview.filter((img) => img.startsWith("http")),
                  ...imageUrls,
                ]
              : imagePreview,
          variants: variants.map((v) => ({
            sku: v.sku,
            price: Number(v.price),
            stock: Number(v.stock),
            color: v.color,
            ramGb: Number(v.ramGb),
            storageGb: Number(v.storageGb),
          })),
          os: form.os,
          chipset: form.chipset,
          screen: form.screen,
          batteryMah: Number(form.batteryMah),
          cameraMainMp: Number(form.cameraMainMp),
          releaseYear: Number(form.releaseYear),
        };

        if (product?._id) {
          await axiosInstance.put(
            `/products/updateProductById/${product._id}`,
            payload
          );
        } else {
          await axiosInstance.post("products/create", payload);
          resetForm();
        }

        setShowConfirmSave(false);
        setShowSuccessPopup(true);

        onSuccess();
      } catch (error) {
        console.log(error);
        setShowErrorPopup(true);
      }
    };

    const input =
      "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div className="bg-white w-250 rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="p-5 border-b bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
            <h2 className="text-xl font-semibold">Thêm sản phẩm mới</h2>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Thông tin cơ bản */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-4">Thông tin cơ bản</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className={input}
                  placeholder="Tên sản phẩm"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  className={input}
                  placeholder="Thương hiệu"
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                />
                <input
                  className={input}
                  placeholder="Giá"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                <input
                  className={input}
                  placeholder="Model"
                  value={form.productModel}
                  onChange={(e) =>
                    setForm({ ...form, productModel: e.target.value })
                  }
                />

                {/* Category dropdown */}
                <select
                  className={input}
                  value={form.categories}
                  onChange={(e) =>
                    setForm({ ...form, categories: e.target.value })
                  }
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Upload ảnh */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-4">Hình ảnh sản phẩm</h3>

              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500">
                <p className="text-gray-500">Bấm để chọn hình ảnh</p>
                <input
                  type="file"
                  multiple
                  onChange={handleSelectImages}
                  className="hidden"
                />
              </label>

              <div className="grid grid-cols-5 gap-3 mt-4">
                {imagePreview.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Variants */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-4">Phiên bản sản phẩm</h3>

              {variants.map((variant, index) => (
                <div key={index} className="grid grid-cols-6 gap-3 mb-3">
                  <input
                    className={input}
                    placeholder="SKU"
                    value={variant.sku}
                    onChange={(e) =>
                      handleVariantChange(index, "sku", e.target.value)
                    }
                  />
                  <input
                    className={input}
                    placeholder="Giá"
                    value={variant.price}
                    onChange={(e) =>
                      handleVariantChange(index, "price", e.target.value)
                    }
                  />
                  <input
                    className={input}
                    placeholder="Kho"
                    value={variant.stock}
                    onChange={(e) =>
                      handleVariantChange(index, "stock", e.target.value)
                    }
                  />
                  <input
                    className={input}
                    placeholder="Màu"
                    value={variant.color}
                    onChange={(e) =>
                      handleVariantChange(index, "color", e.target.value)
                    }
                  />
                  <input
                    className={input}
                    placeholder="RAM"
                    value={variant.ramGb}
                    onChange={(e) =>
                      handleVariantChange(index, "ramGb", e.target.value)
                    }
                  />
                  <input
                    className={input}
                    placeholder="Storage"
                    value={variant.storageGb}
                    onChange={(e) =>
                      handleVariantChange(index, "storageGb", e.target.value)
                    }
                  />

                  <button
                    className="text-red-500 text-sm col-span-6 text-right hover:underline"
                    onClick={() => removeVariant(index)}
                  >
                    Xóa phiên bản
                  </button>
                </div>
              ))}
              <button
                onClick={addVariant}
                className="mt-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                + Thêm phiên bản
              </button>
            </div>

            {/* Thông số */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-4">Thông số kỹ thuật</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className={input}
                  placeholder="Hệ điều hành"
                  value={form.os}
                  onChange={(e) => setForm({ ...form, os: e.target.value })}
                />
                <input
                  className={input}
                  placeholder="Chipset"
                  value={form.chipset}
                  onChange={(e) => setForm({ ...form, chipset: e.target.value })}
                />
                <input
                  className={input}
                  placeholder="Màn hình"
                  value={form.screen}
                  onChange={(e) => setForm({ ...form, screen: e.target.value })}
                />
                <input
                  className={input}
                  placeholder="Pin"
                  value={form.batteryMah}
                  onChange={(e) =>
                    setForm({ ...form, batteryMah: e.target.value })
                  }
                />
                <input
                  className={input}
                  placeholder="Camera"
                  value={form.cameraMainMp}
                  onChange={(e) =>
                    setForm({ ...form, cameraMainMp: e.target.value })
                  }
                />
                <input
                  className={input}
                  placeholder="Năm phát hành"
                  value={form.releaseYear}
                  onChange={(e) =>
                    setForm({ ...form, releaseYear: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Mô tả */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-4">Mô tả sản phẩm</h3>
              <textarea
                className={input}
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
            <button
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={() => setShowConfirmSave(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Lưu sản phẩm
            </button>
          </div>
        </div>
        {/* CONFIRM SAVE */}
        {showConfirmSave && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-2">Lưu sản phẩm</h3>
              <p className="text-gray-500 mb-4">
                Bạn có chắc muốn lưu sản phẩm này?
              </p>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowConfirmSave(false)}
                  className="px-4 py-2 border rounded"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS POPUP */}
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
              <h3 className="text-lg font-semibold mb-2 text-green-600">
                Thành công
              </h3>
              <p className="text-gray-500 mb-4">Lưu sản phẩm thành công</p>

              <button
                onClick={() => {
                  setShowSuccessPopup(false);
                  resetForm();
                  onClose();
                }}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {/* ERROR POPUP */}
        {showErrorPopup && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
              <h3 className="text-lg font-semibold mb-2 text-red-600">Lỗi</h3>
              <p className="text-gray-500 mb-4">Có lỗi xảy ra khi lưu sản phẩm</p>

              <button
                onClick={() => setShowErrorPopup(false)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
        {/* UPLOAD PROGRESS */}
        {isUploading && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
              <h3 className="text-lg font-semibold mb-3">Đang tải ảnh lên</h3>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>

              <p className="text-sm text-gray-500">{uploadProgress}%</p>
            </div>
          </div>
        )}
      </div>
    );
  }
