import { createClient } from "@/lib/supabase/server";
import { toggleRead, deleteMessage } from "../actions";
import MessagesAdmin from "./MessagesAdmin";
import { dummyMessages } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminMessages() {
  const hasEnv =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const { data } = hasEnv
    ? await createClient().from("messages").select("*").order("created_at", { ascending: false })
    : { data: null };

  return (
    <MessagesAdmin
      messages={data ?? dummyMessages}
      toggleAction={toggleRead}
      deleteAction={deleteMessage}
    />
  );
}
