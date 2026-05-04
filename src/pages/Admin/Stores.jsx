export default function Stores() {
  const stores = [
    { id: 1, name: "Shop A", owner: "Nguyen Van A" },
    { id: 2, name: "Shop B", owner: "Tran Van B" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">🏪 Store Management</h1>

      <ul className="space-y-3">
        {stores.map((s) => (
          <li key={s.id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">{s.name}</p>
            <p className="text-sm text-gray-500">Owner: {s.owner}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}