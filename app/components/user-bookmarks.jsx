"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import Bookmark from "./bookmark";
import { useRouter } from "next/navigation";

import { 
  Button, 
  Card, 
  CardBody, 
  CardFooter,
  CardHeader,
  Input,
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
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
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
    <Card className="border rounded">
      <CardHeader>
        <h3 className="text-3xl">User Bookmarks</h3>
      </CardHeader>
      <CardBody>
        <ul className="flex flex-col">
          {bookmarks?.map((bookmark) => (
            <Bookmark key={bookmark.id} bookmark={bookmark} />
          ))}       
        </ul>
      </CardBody>
      <CardFooter>
        <Button onPress={onOpen}>BETTER Add Bookmark</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Add Bookmark</ModalHeader>
                <ModalBody>
                  <Input 
                    id="title" 
                    label="Bookmark Name"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Input 
                    id="url" 
                    label="Bookmark URL"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button onPressStart={() => {insertBookmark({ title, url })}} onPress={onClose}>
                    Done
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
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
      </CardFooter>
    </Card>
  );
}
