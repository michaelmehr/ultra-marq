import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"

export default async function UserBookmarks() {
    const supabase = createClientComponentClient()

    const { data: bookmarks } = await supabase.from("bookmarks").select()

    return (
        <table>
            <tr>
                <th>Name</th>
                <th>URL</th>
            </tr>
            {bookmarks?.map((bookmark) => (
                <tr key={bookmark.id}>
                    <td>
                        {bookmark.name}
                    </td>
                    <td>
                        <Link href={bookmark.url}>Click</Link>
                    </td>
                </tr>
            ))}
        </table>
    )
}