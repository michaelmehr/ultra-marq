"use client";

import { Dialog } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function UserBookmarks({ session }) {

  const supabase = createClientComponentClient()
  const user = session?.user

  const [bookmarks, setBookmarks] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

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

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  // async function insertBookmark() {
  //   try {
      
  //   }
  // }
  
  return (
    <div>
      <h3>User Bookmarks</h3>
      <ul>
        {bookmarks?.map((bookmark) => (
          <li key={bookmark.id}>
            <Link href={bookmark.url}>{bookmark.title}</Link>
          </li>
        ))}
      </ul>
      <button type="button" onClick={openModal}>
        Add Bookmark
      </button>
      <Dialog open={isOpen} onClose={closeModal}>
        <div>
          <Dialog.Panel>
            <Dialog.Title>Add Bookmark</Dialog.Title>
            <div>
              <label htmlFor="title">Bookmark Name</label>
              <input id="title" type="text" />
            </div>
            <div>
              <label htmlFor="url">URL</label>
              <input id="url" type="text" /> 
            </div>
            <button>Submit</button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
