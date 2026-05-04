export default function Orders() {
  const orders = [
    { id: 1, customer: "A", total: "$100", status: "Pending" },
    { id: 2, customer: "B", total: "$200", status: "Completed" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">📦 Orders</h1>

      <table className="w-full bg-white rounded-xl shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Customer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="text-center border-t">
              <td className="p-3">{o.customer}</td>
              <td>{o.total}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}