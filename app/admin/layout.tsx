"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, Code2, FolderKanban, MessageSquare, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const nav = [
  { href: "/admin", label: "Profile", icon: User },
  { href: "/admin/skills", label: "Skills", icon: Code2 },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/messages", label: "Pesan", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  async function logout() {
    await createClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white p-5 md:flex">
        <Link href="/admin" className="mb-8 flex items-center gap-2 text-lg font-bold text-slate-900">
          <LayoutDashboard className="text-indigo-600" /> Cpanel
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <n.icon size={18} /> {n.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={logout}
          className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600"
        >
          <LogOut size={18} /> Keluar
        </button>
      </aside>

      {/* mobile top nav */}
      <div className="flex-1">
        <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white p-3 md:hidden">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap ${
                  active ? "bg-indigo-50 text-indigo-600" : "text-slate-600"
                }`}
              >
                <n.icon size={16} /> {n.label}
              </Link>
            );
          })}
          <button onClick={logout} className="ml-auto rounded-lg px-3 py-2 text-slate-500">
            <LogOut size={16} />
          </button>
        </nav>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
