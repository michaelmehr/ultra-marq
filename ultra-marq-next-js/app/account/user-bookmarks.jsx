'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default async function UserBookmarks() {
    const supabase = createClientComponentClient()

    const { data: bookmarks } = await supabase.from("bookmarks").select()

    return (
        <ul>
            {bookmarks?.map((bookmark) => (
                <li key={bookmark.id}>{bookmark.name}</li>
            ))}
        </ul>
    )
}