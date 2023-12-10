"use client";

// import { Dialog } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import Bookmark from "./bookmark";
import { useRouter } from "next/navigation";

import { 
  Button, 
  Input 
} from "@nextui-org/react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"


export default function UserBookmarks({ session }) {
  const supabase = createClientComponentClient();
  const user = session?.user;
  const router = useRouter();

  const [bookmarks, setBookmarks] = useState(null);
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
      </ul>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Bookmark</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Bookmark</DialogTitle>
          </DialogHeader>
          <div>
            <Input 
              id="title" 
              label="Bookmark Name"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Input 
              id="url" 
              label="Bookmark URL"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => {insertBookmark({ title, url })}}>
                Done
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
