"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { Database } from "@/supabase";

import Button from "@/app/components/Button";

export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: `${location.origin}/callback`,
        scopes: "user-read-email user-read-private user-top-read",
      },
    });
    console.log("data: ", data, "error: ", error);
    if (!error) {
      // await fetch("/api/cookie");
      // const { data } = await supabase.auth.getSession();
      // console.log("data: ", data);
      // if (data.session) {
      // document.cookie = `providerToken=${data?.session?.provider_refresh_token}; HttpOnly; SameSite=Strict; path=/`;
      // }
    }
    router.refresh();
  };

  // https://netninja.dev/courses/next-13-masterclass/lectures/48541276
  return (
    <div className="grid place-items-center">
      <Button title="Log in with" hasImage onClick={() => handleSignIn()} />
    </div>
  );
}
