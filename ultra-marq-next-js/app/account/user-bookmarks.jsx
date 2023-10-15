'use client'
import { useCallback, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"

export default function UserBookmarks({ session }) {
    const supabase = createClientComponentClient()
    const [loading, setLoading] = useState(true)
    const [bookmarks, setBookmarks] = useState(null)
    const user = session?.user

    const getBookmarks = useCallback(async () => {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('bookmarks')
                .select('*')

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setBookmarks(data)
            }
        } catch (error) {
            alert('Error loading bookmarks!')
        } finally {
            setLoading(false)
        }
    }, [user, supabase])

    useEffect(() => {
        getBookmarks()
    }, [user, getBookmarks])
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>URL</th>
                </tr>
            </thead>
            <tbody>
                {bookmarks?.map((bookmark) => (
                    <tr key={bookmark.id}>
                        <td>
                            {bookmark.name}
                        </td>
                        <td>
                            {/* {bookmark.url} */}
                            <Link href={bookmark.url}>Click</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

