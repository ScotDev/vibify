import SignOutButton from "../components/SignOutButton";
import Code from "../components/Code";
import SmallMediaItem from "../components/SmallMediaItem";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { setCookie } from "cookies-next";

import type { Database } from "@/supabase";
import ClipboardButton from "../components/ClipboardButton";

// export const dynamic = "force-dynamic";

const checkToken = async () => {
  const hasAccessToken = cookies().has("providerAccessToken");
  if (hasAccessToken) {
    return {
      data: { access_token: cookies().get("providerAccessToken")?.value },
      error: null,
    };
  }
  const providerRefreshToken = cookies().get("providerRefreshToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/spotify/?providerRefreshToken=${providerRefreshToken}`
  );
  const { data, error } = await res.json();
  const date = new Date(0);
  const oneHour = new Date(date.setSeconds(3600));
  if (data) {
    setCookie("providerAccessToken", data.access_token, {
      maxAge: 3600,
      expires: oneHour,
      secure: true,
    });
    console.log("cookies set");
  }

  console.log(data, error);
  return { data, error };
};

const getProfileData = async (access_token: string) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

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
  // await new Promise((resolve) => setTimeout(resolve, 3000));
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
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
    options
  );

  return await res.json();
};

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.auth.getSession();

  const token = await checkToken();

  if (!token.data || token.error) {
    // This works to avoid a hard error on the client, but the singOut logic doesn't actually
    // seem to excecute (the cookies are not removed)
    await supabase.auth.signOut();
    redirect("/login");
  }

  if (!data.session || error) {
    return redirect("/login");
  }

  const userData = await getProfileData(token.data.access_token as string);

  const userTopItems = await getTopTracks(token.data.access_token as string);

  return (
    <div className="flex flex-col pt-12 gap-6">
      <h1>Profile</h1>
      <div className="flex flex-col pt-6 gap-2 max-w-96 py-2">
        <p className="text-xs">Display name</p>
        {/* <h3>{data?.session?.user.user_metadata?.name}</h3> */}
        <h3>{userData.display_name}</h3>
      </div>
      <div className="flex flex-col gap-2 max-w-96 py-2">
        <p className="text-xs">Email address</p>
        {/* <h4>{data?.session?.user.user_metadata?.email}</h4> */}
        <h4>{userData?.email}</h4>
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

      <div className="md:flex md:flex-wrap grid grid-cols-2 gap-6 md:gap-16 mb-24">
        {userTopItems?.items?.map((item: any) => {
          return <SmallMediaItem key={item.name} data={item} />;
        })}
      </div>

      <SignOutButton />
    </div>
  );
}
