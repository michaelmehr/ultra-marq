import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Link } from "next/link";

export default async function BookmarksIndex() {
  const supabase = createServerComponentClient({ cookies });

  const { data: bookmarks } = await supabase.from("bookmarks").select();

  return (
    <ul className="my-auto text-foreground">
      {bookmarks?.map((bookmark) => (
        <li key={bookmark.id}>{bookmark.name}</li>
      ))}
    </ul>
  );
}

function BookmarkLink() {
  return (
    <li>
      <Link></Link>
    </li>
  );
}
