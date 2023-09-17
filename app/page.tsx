import Button from "./components/Button";
import Link from "next/link";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { Database } from "@/supabase";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.auth.getSession();
  if (!data.session || error) {
    redirect("/login");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.session?.user ? (
        <Link href="/step1">
          <Button title="Get Started" />
        </Link>
      ) : (
        <Link href="/login">
          <Button title="Log in" />
        </Link>
      )}
    </main>
  );
}
