'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Bookmark({ bookmark }) {
  const router = useRouter()
  async function deleteBookmark() {
    const supabase = createClientComponentClient()
    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', bookmark.id)
      if (error) {
        throw error
      }
      alert("Bookmark deleted")
    } catch (error) {
      alert("ERROR: Could not delete bookmark")
    } finally {
      router.refresh()
    }
  }

  return (
    <li key={bookmark.id}>
      <Link href={bookmark.url}>{bookmark.title}</Link>
      <button onClick={deleteBookmark}>X</button>
    </li>
  )
}