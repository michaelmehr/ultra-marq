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
    <div className="w-4/5 m-auto">
      <h1 className="text-5xl font-bold">Dashboard</h1>
      <div className="py-4">
        <UserBookmarks session={session} />
      </div>
    </div>
  );
}
