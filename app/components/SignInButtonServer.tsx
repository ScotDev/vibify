import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/supabase";
import Button from "./Button";

export default function SignOutButtonServer() {
  async function SignIn() {
    "use server";
    const supabase = createServerActionClient<Database>({ cookies });

    const handleSignIn = async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "spotify",
        options: {
          // redirectTo: `${location.origin}/callback`,
          redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN_URL}/callback`,
          scopes: "user-read-email user-read-private user-top-read",
        },
      });
      console.log("data: ", data, "error: ", error);

      // router.refresh();
    };

    await handleSignIn();
  }
  return (
    <form action={SignIn}>
      {/* <button className="btn" type="submit">
        Log out
      </button> */}
      <Button title="Log in with" hasImage type="submit" />
    </form>
  );
}
