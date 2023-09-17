"use client";

// React imports
import { useEffect, useState } from "react";

// Local component imports
import SignOutButton from "../components/SignOutButton";
import Code from "../components/Code";
import SmallMediaItem from "../components/SmallMediaItem";
import ClipboardButton from "../components/ClipboardButton";
import { Loading, LoadingMediaItem } from "./Loading";

// Local utility imports
import { checkToken } from "../utils/token";

// Types
import type { Database } from "@/supabase";

// Third-party imports
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Framework imports
import { useRouter } from "next/navigation";

// I would much prefer to use next js on the server, but I've run into too many issue with cookies
// The work-around is simply to bypass the server and use the client directly
// https://github.com/vercel/next.js/issues/49373

export default function Profile() {
  const [userData, setUserData] = useState<any>({});
  // Add types
  const [userTopItems, setUserTopItems] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const getProfileData = async (access_token: string) => {
    // TODO: Add error handling here
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
    // TODO: Add error handling here
    const options = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      // next: {
      //   revalidate: 0,
      // },
      // time_range: "short_term",
    };

    const res = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=6",
      options
    );

    return await res.json();
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      const spotifyToken = await checkToken();

      if (!data.session || error || spotifyToken.status !== 200) {
        await supabase.auth.signOut();
        return router.push("/login");
      }

      const userData = await getProfileData(
        spotifyToken.data.access_token as string
      );
      // Add error handling
      setUserData(userData);

      try {
        const userTopItems = await getTopTracks(
          spotifyToken.data.access_token as string
        );
        // Add error handling
        setUserTopItems(userTopItems);
      } catch (err) {
        // Handle error
        console.log(err);
        setUserTopItems({});
      }
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };

    checkSession();
  }, []);

  if (
    Object.keys(userData).length === 0 &&
    Object.keys(userTopItems).length === 0 &&
    !loading
  ) {
    return (
      <div className="grid place-items-center">
        <h2>Error loading profile information</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-12 gap-6">
      <h1>Profile</h1>
      <div className="flex flex-col pt-6 gap-2 max-w-96 py-2">
        <p className="text-xs">Display name</p>
        {/* <h3>{data?.session?.user.user_metadata?.name}</h3> */}
        {loading ? <Loading /> : <h3>{userData?.display_name}</h3>}
      </div>
      <div className="flex flex-col gap-2 max-w-96 py-2">
        <p className="text-xs">Email address</p>
        {/* <h4>{data?.session?.user.user_metadata?.email}</h4> */}
        {loading ? <Loading /> : <h4>{userData?.email}</h4>}
      </div>

      <div className="flex flex-col gap-2 max-w-96 py-2">
        <p className="text-xs">Profile URL</p>
        <div className="flex gap-2">
          {loading ? (
            <Loading height="h-10" />
          ) : (
            <>
              <Code href={userData?.external_urls?.spotify} loading={loading}>
                {userData?.external_urls?.spotify}
              </Code>
              <ClipboardButton
                title="Copy"
                value={userData?.external_urls?.spotify}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 max-w-96 py-2">
        <p className="text-xs">Subscription type</p>
        {loading ? (
          <Loading />
        ) : (
          <p className="capitalize">{userData?.product}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 max-w-96 py-2">
        <p className="text-xs">User country</p>
        {loading ? (
          <Loading />
        ) : (
          <p className="capitalize">{userData?.country}</p>
        )}
      </div>

      <p className="text-xl pt-6">Top tracks last 4 weeks</p>

      <div className="user-items-grid">
        {loading && (
          <>
            {Array.from(Array(6).keys()).map((_, index) => {
              return <LoadingMediaItem key={index} />;
            })}
          </>
        )}
        {userTopItems?.items?.map((item: any) => {
          return <SmallMediaItem key={item.name} data={item} />;
        })}
      </div>

      <SignOutButton />
    </div>
  );
}
