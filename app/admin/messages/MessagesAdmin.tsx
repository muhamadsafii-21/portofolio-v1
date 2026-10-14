"use client";

import { useRouter } from "next/navigation";
import { Trash2, Mail, MailOpen, Inbox } from "lucide-react";
import type { Message } from "@/types";

export default function MessagesAdmin({
  messages,
  toggleAction,
  deleteAction,
}: {
  messages: Message[];
  toggleAction: (id: string, isRead: boolean) => Promise<{ error: string | null }>;
  deleteAction: (id: string) => Promise<{ error: string | null }>;
}) {
  const router = useRouter();
  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Pesan Masuk</h1>
        {unread > 0 && (
          <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-semibold text-white">
            {unread} baru
          </span>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-slate-400">
          <Inbox size={32} />
          <p className="text-sm">Belum ada pesan masuk.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`rounded-2xl border bg-white p-5 shadow-sm ${
                m.is_read ? "border-slate-200" : "border-indigo-200 bg-indigo-50/40"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{m.name}</span>
                    {!m.is_read && (
                      <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-600">
                        Baru
                      </span>
                    )}
                  </div>
                  <a href={`mailto:${m.email}`} className="text-sm text-indigo-600 hover:underline">
                    {m.email}
                  </a>
                  <p className="mt-2 text-sm text-slate-600">{m.message}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    {new Date(m.created_at).toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={async () => {
                      await toggleAction(m.id, !m.is_read);
                      router.refresh();
                    }}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-indigo-600"
                    title={m.is_read ? "Tandai belum dibaca" : "Tandai sudah dibaca"}
                  >
                    {m.is_read ? <Mail size={16} /> : <MailOpen size={16} />}
                  </button>
                  <button
                    onClick={async () => {
                      await deleteAction(m.id);
                      router.refresh();
                    }}
                    className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
