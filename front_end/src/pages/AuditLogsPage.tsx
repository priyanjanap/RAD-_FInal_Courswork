import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAuditLogs } from "../services/auditService";
import type { AuditLog } from "../types/AuditLog";
import Loading from "../components/PageLoading";

const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getAuditLogs()
      .then((res) => {
        if (Array.isArray(res)) {
          setLogs(res);
        } else {
          console.error("Unexpected response format:", res);
          setError("Invalid audit log format received.");
        }
      })
      .catch((err) => {
        console.error("Audit fetch error:", err);
        toast.error("Failed to fetch audit logs");
        setError("Failed to fetch audit logs.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-3xl shadow-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-300 via-indigo-400 to-blue-300 text-transparent bg-clip-text">
          📜 Audit Logs
        </h1>

        {error && (
          <p className="text-red-400 text-center font-semibold mb-6">
            {error}
          </p>
        )}

        {logs.length === 0 ? (
          <p className="text-gray-300 text-center text-lg">
            No audit logs found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-lg mt-6">
            <table className="w-full border-collapse text-sm lg:text-base">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white uppercase text-xs tracking-wider">
                  <th className="px-4 py-3 border border-gray-700 text-left">Timestamp</th>
                  <th className="px-4 py-3 border border-gray-700 text-left">User</th>
                  <th className="px-4 py-3 border border-gray-700 text-left">Action</th>
                  <th className="px-4 py-3 border border-gray-700 text-left">Entity</th>
                  <th className="px-4 py-3 border border-gray-700 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log._id}
                    className="border-b border-white/5 hover:bg-purple-800/10 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 text-gray-300">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-white font-medium">{log.user?.name || "Unknown"}</div>
                      <div className="text-xs text-gray-400">{log.user?.email}</div>
                    </td>
                    <td className="px-4 py-3 capitalize text-indigo-300 font-semibold">
                      {log.action.toLowerCase()}
                    </td>
                    <td className="px-4 py-3 text-purple-200 font-medium">{log.entity}</td>
                    <td className="px-4 py-3 text-gray-300">{log.description || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogsPage;
