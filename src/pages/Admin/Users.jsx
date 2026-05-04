export default function Users() {
  const users = [
    { id: 1, name: "Nguyen Van A", email: "a@gmail.com", role: "customer" },
    { id: 2, name: "Tran Van B", email: "b@gmail.com", role: "admin" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">👤 User Management</h1>

      <table className="w-full bg-white rounded-xl shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center border-t">
              <td className="p-3">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}