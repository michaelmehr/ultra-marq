"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function UserBookmarks({ session }) {

  const supabase = createClientComponentClient()
  const [bookmarks, setBookmarks] = useState(null)
  const user = session?.user

  const getBookmarks = useCallback(async () => {
    try {

      const { data, error, status } = await supabase
        .from('bookmarks')
        .select('id, title, url')
        .eq('user_id', user?.id)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setBookmarks(data)
      }
    } catch (error) {
      alert('Error loading bookmarks!')
    }
  }, [user, supabase])

  useEffect(() => {
    getBookmarks()
  }, [user, getBookmarks])

  return (
    <div>
      <p>User Bookmarks</p>
      <ul>
        {bookmarks?.map((bookmark) => (
          <li key={bookmark.id}>
            <Link href={bookmark.url}>{bookmark.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
