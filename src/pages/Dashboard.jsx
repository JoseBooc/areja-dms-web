import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [stats] = useState({
    totalRooms: 12,
    occupiedRooms: 8,
    vacantRooms: 4,
    totalTenants: 15,
    pendingPayments: 3,
  });

  const recentPayments = [
    { id: 1, tenant: "John Doe", amount: "₱2,500", date: "2025-08-01" },
    { id: 2, tenant: "Jane Smith", amount: "₱3,000", date: "2025-07-29" },
    { id: 3, tenant: "Carlos Reyes", amount: "₱2,800", date: "2025-07-28" },
  ];

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/"); // not logged in
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (error || !profile) {
        navigate("/"); // no profile found
        return;
      }

      setRole(profile.role);

      if (profile.role !== "admin") {
        alert("Access denied. Admins only.");
        navigate("/");
        return;
      }

      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Boarding House Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Rooms</h2>
          <p className="text-2xl">{stats.totalRooms}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Occupied Rooms</h2>
          <p className="text-2xl">{stats.occupiedRooms}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Vacant Rooms</h2>
          <p className="text-2xl">{stats.vacantRooms}</p>
        </div>
      </div>

      {/* Tenants and Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Total Tenants</h2>
          <p className="text-2xl">{stats.totalTenants}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Pending Payments</h2>
          <p className="text-2xl">{stats.pendingPayments}</p>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="mt-8 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Payments</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Tenant</th>
              <th className="text-left p-2">Amount</th>
              <th className="text-left p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentPayments.map((payment) => (
              <tr key={payment.id} className="border-b">
                <td className="p-2">{payment.tenant}</td>
                <td className="p-2">{payment.amount}</td>
                <td className="p-2">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
