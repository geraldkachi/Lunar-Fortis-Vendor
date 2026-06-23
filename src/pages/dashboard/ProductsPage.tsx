import { useState } from "react";
import { Badge, Pagination, ConfirmModal, SuccessModal, Select } from "@/components/ui";
import { PRODUCTS, formatPrice } from "@/lib/mockData";
import { paginate } from "@/lib/utils";
import { ArrowLeft, Plus, Edit2, Trash2 } from "lucide-react";
import type { Product } from "@/types";

const STATS = [
  { label: "TOTAL PRODUCTS", value: "1259" },
  { label: "ACTIVE PRODUCTS", value: "25" },
  { label: "INACTIVE PRODUCT", value: "12" },
];

// ── Product Form (Create/Edit) ────────────────────────────────────────────────
function ProductForm({ product, onBack, onSave }: {
  product?: Product; onBack: () => void; onSave: (isNew: boolean) => void;
}) {
  const isEdit = !!product;
  const [form, setForm] = useState({
    title: product?.name ?? "",
    location: product?.location ?? "",
    details: product?.serviceDetails ?? "",
    currency: "NGN",
    amount: product ? String(product.amount / 1000) : "95,000",
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const imgs = product?.images ?? [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&q=80",
  ];

  return (
    <div>
      <p className="text-xs text-[#6B7280] mb-4">
        Products › <span className="text-[#0D1B2A] font-medium">{isEdit ? "Edit Products" : "Create New Products"}</span>
      </p>
      <div className="max-w-lg">
        <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">{isEdit ? "Edit Product" : "Create New Product"}</h2>

        <div className="space-y-4">
          <div>
            <label className="lf-label">Service Title</label>
            <input value={form.title} onChange={e => set("title", e.target.value)} className="lf-input" />
          </div>
          <div>
            <label className="lf-label">Location</label>
            <input value={form.location} onChange={e => set("location", e.target.value)} className="lf-input" />
          </div>
          <div>
            <label className="lf-label">Service Details</label>
            <textarea value={form.details} onChange={e => set("details", e.target.value)} rows={5} className="lf-input resize-none" />
          </div>
          <div>
            <label className="lf-label">Amount</label>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm">
                🇳🇬 NGN
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              <input value={form.amount} onChange={e => set("amount", e.target.value)} className="lf-input flex-1" placeholder="95,000/Day" />
            </div>
          </div>

          {/* Product Upload */}
          <div>
            <p className="text-xs font-semibold text-[#0D1B2A] mb-1">PRODUCT UPLOAD</p>
            <p className="text-xs text-[#6B7280] mb-3">
              First Picture is the title picture. You can change the order of photos. Just grab your photos and drag
            </p>
            <div className="flex gap-2 mb-2">
              {imgs.map((src, i) => (
                <div key={i} className="w-20 h-14 rounded-lg overflow-hidden bg-[#F3F4F6] relative">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              <label className="w-20 h-14 rounded-lg border-2 border-dashed border-[#E5E7EB] flex items-center justify-center cursor-pointer hover:border-[#0D1B2A] transition-colors">
                <Plus size={18} className="text-[#9CA3AF]" />
                <input type="file" className="hidden" accept="image/*" multiple />
              </label>
            </div>
            <p className="text-xs text-[#9CA3AF]">Supported formats are *jpg and *png</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onBack} className="flex-1 btn-outline">Back</button>
            <button onClick={() => onSave(!isEdit)} className="flex-1 bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold py-3 px-5 rounded-xl text-sm transition-colors">
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Product Detail View ───────────────────────────────────────────────────────
function ProductDetail({ product, onBack, onEdit, onDelete }: {
  product: Product; onBack: () => void; onEdit: () => void; onDelete: () => void;
}) {
  return (
    <div>
      <p className="text-xs text-[#6B7280] mb-4">
        Products › <span className="text-[#0D1B2A] font-medium">Product Details</span>
      </p>

      {/* <div className="grid grid-cols-[1fr_300px] gap-8"> */}
      <div className="grid md:grid-cols-5 gap-8">
        {/* Left */}
        <div className="col-span-3">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#0D1B2A]">Product Details</h2>
          </div>

          {/* 
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#0D1B2A]">Product Details</h2>
            <div className="flex gap-2">
              <button onClick={onEdit} className="flex items-center gap-1.5 text-xs text-[#4F7FAF] font-semibold hover:underline">
                <Edit2 size={13} /> Edit Product
              </button>
              <button onClick={onDelete} className="flex items-center gap-1.5 text-xs text-[#EF4444] font-semibold hover:underline">
                <Trash2 size={13} /> Delete Product
              </button>
            </div>
          </div> */}

          <div className="mb-5">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">PRODUCT DETAILS</p>
            <div className="space-y-2 text-sm">
              {[["Service Title", product.name], ["Location", product.location], ["Service Details", product.serviceDetails ?? ""]].map(([l, v]) => (
                <div key={l} className={l === "Service Details" ? "flex flex-col gap-1" : "flex justify-between"}>
                  <span className="text-[#6B7280] text-xs">{l}</span>
                  <span className={cn("text-[#0D1B2A]", l === "Service Details" ? "text-xs leading-relaxed" : "font-medium text-xs")}>{v}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-[#6B7280]">Amount</span>
              <span className="text-sm font-bold text-[#0D1B2A]">₦95,000/Day</span>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">OTHER DETAILS</p>
            <div className="space-y-2 text-xs">
              {[["Number of Guest", "4"], ["Internet Connectivity", "Wifi"], ["Electricity", "24hr light"]].map(([l, v]) => (
                <div key={l} className="flex justify-between">
                  <span className="text-[#6B7280]">{l}</span>
                  <span className="text-[#0D1B2A] font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Images */}
        <div className="col-span-2">

          <div className="flex items-center justify-between mb-5">
            {/* <h2 className="text-xl font-bold text-[#0D1B2A]">Product Details</h2> */}
            <div className="flex gap-2">
              {/* <button onClick={onEdit} className="flex items-center gap-1.5 text-xs text-[#4F7FAF] font-semibold hover:underline"> */}
              <button onClick={onEdit} className="flex items-center gap-1.5 text-xs text-[#0E1B28] font-semibold hover:underline">
                <Edit2 size={13} /> Edit Product
              </button>
              {/* <button onClick={onDelete} className="flex items-center gap-1.5 text-xs text-[#EF4444] font-semibold hover:underline"> */}
              <button onClick={onDelete} className="flex items-center gap-1.5 text-xs text-[#0E1B28] font-semibold hover:underline">
                <Trash2 size={13} /> Delete Product
              </button>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-xs font-semibold text-[#0D1B2A] mb-1">PRODUCT UPLOADS</p>
            <p className="text-xs text-[#4F7FAF]">First Picture is the title picture.</p>
            <p className="text-xs text-[#6B7280]">You can change the order of photos. Just grab your photos and drag</p>
          </div>
          <div className="flex gap-2 mb-4">
            {product.images?.slice(0, 3).map((src, i) => (
              <div key={i} className="w-20 h-14 rounded-lg overflow-hidden bg-[#F3F4F6]">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-xs text-[#9CA3AF] mb-4">Supported formats are *jpg and *png</p>

          <p className="text-xs font-semibold text-[#0D1B2A] mb-2">PREVIEW</p>
          <div className="rounded-xl overflow-hidden h-40 bg-[#F3F4F6]">
            <img src={product.images?.[0]} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

// ── Main Products Page ────────────────────────────────────────────────────────
type View = "list" | "create" | "edit" | "detail";

export default function ProductsPage() {
  const [view, setView] = useState<View>("list");
  const [selected, setSelected] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<"created" | "updated" | "delete_confirm" | "deleted" | null>(null);

  const { items, total, totalPages } = paginate(PRODUCTS, page);

  if (view === "create") {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Products</h1>
        <ProductForm onBack={() => setView("list")} onSave={() => setModal("created")} />
        {modal === "created" && (
          <SuccessModal icon="info" title="Product Created" message="You have successfully created a new product."
            onClose={() => { setModal(null); setView("list"); }} closeLabel="Close" />
        )}
      </div>
    );
  }

  if (view === "edit" && selected) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Products</h1>
        <ProductForm product={selected} onBack={() => setView("detail")} onSave={() => setModal("updated")} />
        {modal === "updated" && (
          <SuccessModal icon="info" title="Product Updated" message="You have successfully updated a new product."
            onClose={() => { setModal(null); setView("detail"); }} closeLabel="Close" />
        )}
      </div>
    );
  }

  if (view === "detail" && selected) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#0D1B2A] mb-4">Products</h1>
        <button onClick={() => setView("list")} className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0D1B2A] mb-4">
          <ArrowLeft size={15} /> Back
        </button>
        <ProductDetail product={selected}
          onBack={() => setView("list")}
          onEdit={() => setView("edit")}
          onDelete={() => setModal("delete_confirm")} />
        {modal === "delete_confirm" && (
          <ConfirmModal icon="warning" title="Delete Product?"
            message='Are you sure you want to delete this booking. Click on the "Proceed" button to continue.'
            onCancel={() => setModal(null)} onConfirm={() => setModal("deleted")}
            cancelLabel="Back" confirmLabel="Proceed" />
        )}
        {modal === "deleted" && (
          <SuccessModal icon="warning" title="Product Deleted" message="This product has been successfully deleted."
            onClose={() => { setModal(null); setView("list"); }} closeLabel="Done" />
        )}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Products</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {STATS.map(s => (
          <div key={s.label} className="stat-card">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">{s.label}</p>
            <p className="text-2xl font-bold text-[#0D1B2A]">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0D1B2A]">Products</h2>
          <button onClick={() => setView("create")}
            className="flex items-center gap-1.5 bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
            <Plus size={15} /> Create New Product
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr>{["PRODUCT NAME", "LOCATION", "AMOUNT", "STATUS", "CREATION DATE"].map(h => <th key={h} className="table-th">{h}</th>)}</tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p.id} onClick={() => { setSelected(p); setView("detail"); }}
                className="hover:bg-[#F9FAFB] transition-colors cursor-pointer">
                <td className="table-td font-medium">{p.name}</td>
                <td className="table-td text-[#6B7280]">{p.location}</td>
                <td className="table-td font-semibold">{formatPrice(p.amount)}</td>
                <td className="table-td"><Badge variant={p.status} /></td>
                <td className="table-td text-[#6B7280]">{p.createdDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-[#E5E7EB]">
          <Pagination page={page} totalPages={totalPages} total={total} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}
