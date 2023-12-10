'use client'

import { Dialog } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@nextui-org/react"

export default function Bookmark({ bookmark }) {

  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(bookmark.title)
  const [url, setUrl] = useState(bookmark.url)

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

  async function editBookmark() {
    const supabase = createClientComponentClient()
    try {
      const { error } = await supabase
        .from('bookmarks')
        .update({ title, url })
        .eq('id', bookmark.id)

      if (error) {
        throw error;
      }
      alert("Bookmark updated")
    } catch (error) {
      alert("ERROR: Could not update bookmark")
    } finally {
      router.refresh()
    }
  }

  function openModal() {
    setIsEditing(true)
  }

  function closeModal() {
    setIsEditing(false)
  }

  function saveEdit() {
    editBookmark()
    closeModal()
  }

  return (
    <li className="flex justify-between">
      <Link href={bookmark.url}>{bookmark.title}</Link>
      <div>
        <Button onClick={openModal}>Edit</Button>
        <Button onClick={deleteBookmark}>X</Button>
      </div>
      <Dialog open={isEditing} onClose={closeModal}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
            <Dialog.Title>Edit Bookmark</Dialog.Title>
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
            <Button 
              onClick={saveEdit}
            >
              Save
            </Button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </li>
  )
}