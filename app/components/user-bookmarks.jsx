"use client";

import { Dialog } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import Bookmark from "./bookmark";
import { useRouter } from "next/navigation";

export default function UserBookmarks({ session }) {
  const supabase = createClientComponentClient();
  const user = session?.user;
  const router = useRouter();

  const [bookmarks, setBookmarks] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const getBookmarks = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from("bookmarks")
        .select("id, title, url")
        .eq("user_id", user?.id);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setBookmarks(data);
      }
    } catch (error) {
      alert("Error loading bookmarks!");
    }
  }, [user, supabase]);

  useEffect(() => {
    getBookmarks();
  }, [user, getBookmarks]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function insertBookmark({ title, url }) {
    try {
      const { error } = await supabase
        .from("bookmarks")
        .insert({
          user_id: user.id,
          title,
          url,
        });
      if (error) {
        throw error;
      }
      alert("Bookmark added.");
    } catch (error) {
      alert("ERROR: Could not add bookmark");
    } finally {
      router.refresh()
    }
  }

  return (
    <div className="bg-slate-300 border rounded mt-3">
      <h3 className="text-2xl text-center">User Bookmarks</h3>
      <ul className="flex flex-col border border-black">
        {bookmarks?.map((bookmark) => (
          <Bookmark key={bookmark.id} bookmark={bookmark} />
        ))}
        <button
          className="border-black"
          type="button" 
          onClick={openModal}
        >
          Add Bookmark
        </button>
      </ul>
      <Dialog open={isOpen} onClose={closeModal}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
            <Dialog.Title>Add Bookmark</Dialog.Title>
            <div>
              <label htmlFor="title">Bookmark Name</label>
              <input 
                id="title" 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="url">URL</label>
              <input 
                id="url" 
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button 
              onClick={() => {
                insertBookmark({ title, url })
                closeModal()
              }}
            >
            Done</button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
