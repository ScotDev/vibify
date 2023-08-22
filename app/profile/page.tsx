import SignOutButton from "../components/SignOutButton";
import Code from "../components/Code";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/supabase";

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getSession();
  console.log(data.session);
  return (
    <div className="flex flex-col gap-12">
      <Code>https://fonts.google.com/</Code>
      <h3>{data?.session?.user.user_metadata?.name}</h3>
      <h4>{data?.session?.user.user_metadata?.email}</h4>
      <SignOutButton />
    </div>
  );
}
