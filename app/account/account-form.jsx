"use client";
import Avatar from "../components/avatar";
import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Button, Input } from "@nextui-org/react";

export default function AccountForm({ session }) {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <Avatar
        uid={user.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullname, username, website, avatar_url: url });
        }}
      />
      <div>
        <Input
          id="email"
          className="pb-1.5"
          label="Email"
          type="text"
          value={session?.user.email}
          disabled
        />
      </div>
      <div>
        <Input
          id="fullName"
          className="pb-1.5"
          label="Full Name"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <Input
          id="username"
          className="pb-1.5"
          label="Username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <Input
          id="website"
          className="pb-1.5"
          label="Website"
          type="url"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className="flex space-x-2 py-1">
        <div>
          <Button
            className="button primary block border border-slate-500"
            onClick={() =>
              updateProfile({ fullname, username, website, avatar_url })
            }
            isDisabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </Button>
        </div>

        <div>
          <form action="/auth/signout" method="post">
            <Button
              className="button block border border-slate-500"
              type="submit"
              variant="danger"
            >
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
