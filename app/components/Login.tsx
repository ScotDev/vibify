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
    router.refresh();
  };

  return (
    <div>
      <Button title="Log in with" hasImage onClick={() => handleSignIn()} />
    </div>
  );
}
