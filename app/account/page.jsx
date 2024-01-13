import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AccountForm from "./account-form";

export default async function Account() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="container">
      <h1 className="text-5xl">Account</h1>
      <div className="py-4">
        <AccountForm session={session} />
      </div>
    </div>
  );
}
