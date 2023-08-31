import SignOutButton from "../components/SignOutButton";
import Code from "../components/Code";
import SmallMediaItem from "../components/SmallMediaItem";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/supabase";
import Login from "../components/Login";
import ClipboardButton from "../components/ClipboardButton";

const getProfileData = async (access_token: string) => {
  const options = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };

  const res = await fetch("https://api.spotify.com/v1/me", options);
  return await res.json();
};

const getTopTracks = async (access_token: string) => {
  const options = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    // time_range: "short_term",
  };

  const res = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
    options
  );

  return await res.json();
};

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getSession();
  // console.log(data.session);

  const userData = await getProfileData(data.session?.provider_token as string);
  // console.log(userData);

  const userTopItems = await getTopTracks(
    data.session?.provider_token as string
  );
  // console.log(userTopItems);

  // TODO: Replace with protected route
  if (!data.session) {
    return (
      <div className="flex flex-col pt-12 gap-6">
        <Login />
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-12 gap-6">
      <h1>Profile</h1>
      <div className="flex flex-col pt-6 gap-2 max-w-96 py-2">
        <p className="text-xs">Display name</p>
        <h3>{data?.session?.user.user_metadata?.name}</h3>
      </div>
      <div className="flex flex-col gap-2 max-w-96 py-2">
        <p className="text-xs">Email address</p>
        <h4>{data?.session?.user.user_metadata?.email}</h4>
      </div>

      <div className="flex flex-col gap-2 max-w-96 py-2">
        <p className="text-xs">Profile URL</p>
        <div className="flex gap-2">
          <Code href={userData?.external_urls?.spotify}>
            {userData?.external_urls?.spotify}
          </Code>
          <ClipboardButton
            title="Copy"
            value={userData?.external_urls?.spotify}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 max-w-96 py-2">
        <p className="text-xs">Subscription type</p>
        <p className="capitalize">{userData?.product}</p>
      </div>

      <div className="flex flex-col gap-2 max-w-96 py-2">
        <p className="text-xs">User country</p>
        <p className="capitalize">{userData?.country}</p>
      </div>

      <p className="text-xl">Top tracks last 4 weeks</p>
      {/* TODO: Add next loading to track gallery here */}
      <div className="flex flex-wrap gap-16 mb-24">
        {userTopItems?.items?.map((item: any) => {
          return <SmallMediaItem key={item.name} data={item} />;
        })}
      </div>
      <SignOutButton />
    </div>
  );
}
