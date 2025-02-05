import { useState, useEffect } from "react";

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserRole() {
      const response = await fetch("/api/auth/me"); // Endpoint to get user data
      const data = await response.json();
      setRole(data.role);
    }
    fetchUserRole();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Your role: {role}</p>
      {role === "admin" && <AdminControls />}
    </div>
  );
}

function AdminControls() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const updateUserRole = async () => {
    await fetch("/api/admin/update-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });
  };

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-lg">
      <h2 className="text-xl font-semibold">Admin Panel</h2>
      <input
        type="email"
        placeholder="User Email"
        className="border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select
        className="border p-2 ml-2 rounded"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={updateUserRole}
      >
        Update Role
      </button>
    </div>
  );
}

