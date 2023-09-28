// Next imports
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Local component imports
import Code from "../components/Code";
import SmallMediaItem from "../components/SmallMediaItem";
import ClipboardButton from "../components/ClipboardButton";
import { Loading, LoadingMediaItem } from "./Loading";

// Types
import type { Database } from "@/supabase";

// Third-party library imports
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Profile_server() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.auth.getSession();

  if (!data?.session || error) {
    console.log("No session,", data?.session, error);
    redirect("/login?redirect_URL=profile");
  }

  // const token = await handleTokenRefresh();
  const accessToken = cookies().get("providerAccessToken")?.value;
  //   If no access token found and no refresh token found, then sign out
  if (!accessToken) {
    console.log("No token,", accessToken);

    // redirect("/callback?redirect_URL=profile");
    redirect("/token?redirect_URL=profile");
  }

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

  let loading = false;
  const userData = await getProfileData(accessToken);
  const userTopItems = await getTopTracks(accessToken);

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
    </div>
  );
}
