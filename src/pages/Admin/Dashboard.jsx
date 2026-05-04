export default function Dashboard() {
  const stats = [
    { label: "Users", value: 1200 },
    { label: "Orders", value: 350 },
    { label: "Revenue", value: "$12,000" },
    { label: "Stores", value: 45 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((item) => (
          <div key={item.label} className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">{item.label}</p>
            <h2 className="text-2xl font-bold">{item.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}