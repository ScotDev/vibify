import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/supabase";
import Button from "./Button";

export default function SignOutButtonServer() {
  async function SignOut() {
    "use server";
    const supabase = createServerActionClient<Database>({ cookies });
    const { error } = await supabase.auth.signOut();

    const cookieStore = cookies();
    const hasRefreshToken = cookieStore.get("providerRefreshToken");
    if (hasRefreshToken) {
      cookieStore.delete("providerRefreshToken");
    }
    const hasAccessToken = cookieStore.get("providerAccessToken");
    if (hasAccessToken) {
      cookieStore.delete("providerAccessToken");
    }
    if (error) console.log(error);
    // revalidatePath("/profile");
    // revalidatePath("/");
    redirect("/login");
  }

  return (
    <form action={SignOut}>
      {/* <button className="btn" type="submit">
        Log out
      </button> */}
      <Button title="Log out" type="submit" hasImage />
    </form>
  );
}
