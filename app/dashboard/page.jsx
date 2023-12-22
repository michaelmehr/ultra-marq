import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import UserBookmarks from "../components/user-bookmarks";

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div>
      <h1 className="text-5xl font-bold">Dashboard</h1>
      <UserBookmarks session={session} />
    </div>
  );
}
