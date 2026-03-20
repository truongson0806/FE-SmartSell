export default function HomePage() {
    const categories = [
      'Điện thoại',
      'Laptop',
      'Tablet',
      'Âm thanh',
      'Đồng hồ',
      'Phụ kiện',
      'Gia dụng',
      'Camera'
    ];
  
    const flashDeals = [
      {
        name: 'Tai nghe không dây Pro X',
        price: '1.490.000đ',
        oldPrice: '1.990.000đ',
        badge: '-25%'
      },
      {
        name: 'Sạc nhanh 67W USB-C',
        price: '390.000đ',
        oldPrice: '550.000đ',
        badge: '-29%'
      },
      {
        name: 'Ốp lưng MagSafe cao cấp',
        price: '190.000đ',
        oldPrice: '290.000đ',
        badge: '-34%'
      },
      {
        name: 'Pin dự phòng 20.000mAh',
        price: '790.000đ',
        oldPrice: '990.000đ',
        badge: '-20%'
      }
    ];
  
    const products = [
      {
        name: 'iPhone 16 Pro Max 256GB',
        price: '27.490.000đ',
        oldPrice: '30.990.000đ',
        tag: 'Trả góp 0%'
      },
      {
        name: 'Samsung Galaxy S25 Ultra',
        price: '26.990.000đ',
        oldPrice: '29.990.000đ',
        tag: 'Giảm sốc'
      },
      {
        name: 'Xiaomi 14T Pro',
        price: '14.990.000đ',
        oldPrice: '16.990.000đ',
        tag: 'Hot deal'
      },
      {
        name: 'OPPO Reno 13 5G',
        price: '10.690.000đ',
        oldPrice: '11.990.000đ',
        tag: 'Mới'
      },
      {
        name: 'MacBook Air M2',
        price: '19.990.000đ',
        oldPrice: '22.990.000đ',
        tag: 'Sinh viên'
      },
      {
        name: 'iPad Air 11 Wi‑Fi',
        price: '15.490.000đ',
        oldPrice: '17.290.000đ',
        tag: 'Best seller'
      },
      {
        name: 'Tai nghe Buds ANC',
        price: '1.290.000đ',
        oldPrice: '1.690.000đ',
        tag: 'Âm thanh'
      },
      {
        name: 'Đồng hồ Watch Fit',
        price: '2.690.000đ',
        oldPrice: '3.290.000đ',
        tag: 'Theo dõi sức khỏe'
      }
    ];
  
    const quickIcons = [
      'Phụ kiện',
      'Tủ lạnh',
      'Quạt mini',
      'Gia dụng AI',
      'Camera',
      'Apple',
      'Điện máy'
    ];
  
    return (
      <div className="min-h-screen bg-slate-100 text-slate-800">
        <header className="sticky top-0 z-50 border-b border-emerald-700 bg-emerald-600 text-white shadow-md">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
            <div className="text-2xl font-black tracking-tight">HH Mobile</div>
            <div className="hidden w-64 items-center rounded-xl bg-white/15 px-3 py-2 md:flex">
              <span className="text-sm text-white/90">☰ Danh mục</span>
            </div>
            <div className="flex-1">
              <div className="rounded-2xl bg-white p-1 shadow-inner">
                <input
                  className="w-full rounded-xl border-0 px-4 py-2 text-sm text-slate-700 outline-none"
                  placeholder="Bạn cần tìm gì hôm nay?"
                />
              </div>
            </div>
            <div className="hidden items-center gap-5 text-sm lg:flex">
              <span>📍 Cửa hàng gần bạn</span>
              <span>🛒 Giỏ hàng</span>
              <span>👤 Đăng nhập</span>
            </div>
          </div>
        </header>
  
        <main className="mx-auto max-w-7xl px-4 py-4">
          <section className="grid gap-4 lg:grid-cols-[220px_1fr]">
            <aside className="rounded-3xl bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-bold uppercase text-slate-500">Danh mục</h2>
              <div className="space-y-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm font-medium transition hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <span>{item}</span>
                    <span>›</span>
                  </button>
                ))}
              </div>
            </aside>
  
            <div className="space-y-4">
              <section className="grid gap-4 xl:grid-cols-[1fr_280px]">
                <div className="overflow-hidden rounded-3xl bg-linear-to-r from-orange-100 via-white to-red-100 p-5 shadow-sm">
                  <div className="grid items-center gap-6 md:grid-cols-2">
                    <div>
                      <span className="inline-flex rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                        Flash sale toàn tuần
                      </span>
                      <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900 md:text-4xl">
                        Deal công nghệ <br /> giá cực hời
                      </h1>
                      <p className="mt-3 max-w-md text-sm text-slate-600">
                        Phong cách lấy cảm hứng từ trang bán lẻ điện máy: banner lớn, CTA rõ,
                        nhiều khối khuyến mãi và danh sách sản phẩm dày đặc.
                      </p>
                      <div className="mt-5 flex gap-3">
                        <button className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow">
                          Mua ngay
                        </button>
                        <button className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
                          Xem ưu đãi
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="rounded-2xl bg-white p-4 shadow">
                          <div className="mb-3 aspect-square rounded-2xl bg-slate-100" />
                          <p className="text-sm font-semibold">Sản phẩm nổi bật {item}</p>
                          <p className="mt-1 text-rose-600 font-bold">Từ 9.990.000đ</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
  
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900">Khuyến mãi nhanh</h3>
                  <div className="mt-4 space-y-3">
                    {flashDeals.map((item) => (
                      <div key={item.name} className="rounded-2xl border border-slate-200 p-3">
                        <div className="mb-2 inline-flex rounded-full bg-rose-100 px-2 py-1 text-xs font-bold text-rose-600">
                          {item.badge}
                        </div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="font-bold text-rose-600">{item.price}</span>
                          <span className="text-xs text-slate-400 line-through">{item.oldPrice}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
  
              <section className="overflow-hidden rounded-[28px] border-4 border-red-500 bg-white shadow-sm">
                <div className="bg-linear-to-r from-red-700 via-red-600 to-orange-500 px-5 py-4 text-white">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-black uppercase">Bùng nổ khuyến mãi</h2>
                      <p className="text-sm text-red-50">Mua sắm cực đỉnh hôm nay</p>
                    </div>
                    <div className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                      00 : 12 : 48
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
                  {flashDeals.map((item) => (
                    <div key={item.name} className="rounded-3xl border border-slate-200 bg-white p-4">
                      <div className="mb-4 aspect-square rounded-2xl bg-slate-100" />
                      <p className="min-h-10 text-sm font-semibold">{item.name}</p>
                      <div className="mt-2 flex items-end gap-2">
                        <span className="text-lg font-black text-rose-600">{item.price}</span>
                        <span className="text-xs text-slate-400 line-through">{item.oldPrice}</span>
                      </div>
                      <button className="mt-4 w-full rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                        Thêm vào giỏ
                      </button>
                    </div>
                  ))}
                </div>
              </section>
  
              <section className="rounded-3xl bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-black">Danh sách sản phẩm</h2>
                  <div className="hidden gap-2 md:flex">
                    {['Tất cả', 'Điện thoại', 'Laptop', 'Âm thanh'].map((tab, index) => (
                      <button
                        key={tab}
                        className={`rounded-full px-4 py-2 text-sm font-medium ${
                          index === 0
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
  
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <article
                      key={product.name}
                      className="group rounded-3xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-600">
                          {product.tag}
                        </span>
                        <span className="text-xs text-slate-400">Còn hàng</span>
                      </div>
                      <div className="mb-4 aspect-square rounded-2xl bg-slate-100 transition group-hover:bg-slate-200" />
                      <h3 className="min-h-12 text-sm font-semibold text-slate-800">
                        {product.name}
                      </h3>
                      <div className="mt-3 flex items-end gap-2">
                        <span className="text-lg font-black text-rose-600">{product.price}</span>
                        <span className="text-xs text-slate-400 line-through">{product.oldPrice}</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                        <span>⭐ 4.8</span>
                        <span>Trả góp 0%</span>
                      </div>
                      <button className="mt-4 w-full rounded-2xl border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white">
                        Xem chi tiết
                      </button>
                    </article>
                  ))}
                </div>
              </section>
  
              <section className="rounded-3xl bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-xl font-black">Danh mục phụ kiện</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                  {quickIcons.map((item) => (
                    <div key={item} className="rounded-3xl bg-rose-50 p-4 text-center">
                      <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-white shadow" />
                      <p className="text-sm font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
  
              <section className="rounded-3xl bg-emerald-800 px-6 py-8 text-white shadow-sm">
                <h2 className="text-center text-3xl font-black">Trải nghiệm mua sắm 5T</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-5">
                  {[
                    'Tốt hơn về giá',
                    'Thân thiện - hiếu khách',
                    'Thu cũ đổi mới',
                    'Thanh toán linh hoạt',
                    'Trả góp dễ dàng'
                  ].map((item) => (
                    <div key={item} className="rounded-3xl bg-white/10 p-4 text-center backdrop-blur">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-700">
                        ✓
                      </div>
                      <p className="text-sm font-semibold">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>
    );
  }
  