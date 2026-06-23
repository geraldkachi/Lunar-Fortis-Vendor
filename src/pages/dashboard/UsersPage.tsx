import { useState } from "react";
import { Badge, SuccessModal, Select } from "@/components/ui";
import { TEAM_USERS } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Plus, MoreVertical, Search } from "lucide-react";
import type { TeamUser } from "@/types";

const STATS = [
  { label: "ALL USERS", value: "—" },
  { label: "ACTIVE USERS", value: "4" },
  { label: "DISABLED USERS", value: "1" },
];

function AddUserModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-modal p-6">
        <h3 className="text-base font-bold text-[#0D1B2A] mb-1">Add a New User</h3>
        <p className="text-xs text-[#6B7280] mb-5">Please fill the fields below to add a new user.</p>
        <div className="space-y-4">
          <div>
            <label className="lf-label">Full Name</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Tolulope Alkojayi" className="lf-input" />
          </div>
          <div>
            <label className="lf-label">Email Address</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="blodugil@gmail.com" className="lf-input" />
          </div>
          <Select label="Role" value={form.role} onChange={v => setForm(f => ({ ...f, role: v }))}
            placeholder="Select Roles" options={[{ value: "admin", label: "Admin" }, { value: "user", label: "User" }]} />
          <button onClick={onSuccess} className="btn-primary">Send Invitation</button>
        </div>
      </div>
    </div>
  );
}

function ModifyUserPanel({ user, onClose }: { user: TeamUser; onClose: () => void }) {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-modal p-6">
        <h3 className="text-base font-bold text-[#0D1B2A] mb-5">Modify User</h3>
        <div className="space-y-4">
          <div><label className="lf-label">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="lf-input" /></div>
          <div><label className="lf-label">Email</label>
            <input value={user.email} readOnly className="lf-input opacity-60 cursor-not-allowed" /></div>
          <Select label="Role" value={role} onChange={setRole}
            options={[{ value: "admin", label: "Admin" }, { value: "user", label: "User" }]} />
          <Select label="Status" value={status} onChange={v => setStatus(v as any)}
            options={[{ value: "active", label: "Active" }, { value: "disabled", label: "Disabled" }]} />
          <button onClick={onClose} className="btn-primary">Update User</button>
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [users] = useState<TeamUser[]>(TEAM_USERS);
  const [addModal, setAddModal] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [modifyUser, setModifyUser] = useState<TeamUser | null>(null);
  const [dropdownId, setDropdownId] = useState<string | null>(null);

  const STATS_DATA = [
    { label: "ALL USERS", value: String(users.length) },
    { label: "ACTIVE USERS", value: String(users.filter(u => u.status === "active").length) },
    { label: "DISABLED USERS", value: String(users.filter(u => u.status === "disabled").length) },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">User Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {STATS_DATA.map(s => (
          <div key={s.label} className="stat-card">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">{s.label}</p>
            <p className="text-2xl font-bold text-[#0D1B2A]">{s.value}</p>
          </div>
        ))}
      </div>

      {users.length === 0 ? (
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-16 flex flex-col items-center">
          <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-4">
            <Search size={24} className="text-[#9CA3AF]" />
          </div>
          <p className="text-sm font-semibold text-[#0D1B2A] mb-1">No User Found</p>
          <p className="text-xs text-[#6B7280] mb-5 text-center">No merchant found. Your recent activity will show up here.</p>
          <button onClick={() => setAddModal(true)}
            className="bg-[#0D1B2A] text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-[#1a2d40]">
            Add New User
          </button>
        </div>
      ) : (
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-end">
            <button onClick={() => setAddModal(true)}
              className="flex items-center gap-1.5 bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
              <Plus size={15} /> Add New User
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr>{["ADMIN","EMAIL ADDRESS","ROLE","STATUS","LAST ACTIVE","ACTION"].map(h => <th key={h} className="table-th">{h}</th>)}</tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="table-td font-medium">{u.name}</td>
                  <td className="table-td text-[#6B7280]">{u.email}</td>
                  <td className="table-td capitalize">{u.role}</td>
                  <td className="table-td"><Badge variant={u.status} /></td>
                  <td className="table-td text-[#6B7280]">{u.lastActive}</td>
                  <td className="table-td relative">
                    <button onClick={() => setDropdownId(dropdownId === u.id ? null : u.id)}
                      className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical size={16} className="text-[#6B7280]" />
                    </button>
                    {dropdownId === u.id && (
                      <div className="absolute right-4 top-8 bg-white border border-[#E5E7EB] rounded-xl shadow-modal z-10 w-36 py-1">
                        <button onClick={() => { setModifyUser(u); setDropdownId(null); }}
                          className="w-full text-left px-4 py-2 text-xs text-[#0D1B2A] hover:bg-[#F9FAFB]">
                          Modify User
                        </button>
                        <button className="w-full text-left px-4 py-2 text-xs text-[#EF4444] hover:bg-[#FEF2F2]">
                          Delete User
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-[#E5E7EB]">
            <p className="text-xs text-[#6B7280]">1 - {users.length} of {users.length}</p>
          </div>
        </div>
      )}

      {addModal && (
        <AddUserModal onClose={() => setAddModal(false)} onSuccess={() => { setAddModal(false); setAddSuccess(true); }} />
      )}
      {addSuccess && (
        <SuccessModal icon="info" title="Invitation Sent"
          message="You have successfully sent an invitation to a new user."
          onClose={() => setAddSuccess(false)} closeLabel="Close" />
      )}
      {modifyUser && <ModifyUserPanel user={modifyUser} onClose={() => setModifyUser(null)} />}
    </div>
  );
}
