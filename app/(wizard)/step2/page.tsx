import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import type { Database } from "@/supabase";

import ConfigurationForm from "@/app/components/ConfigurationForm";

export default async function page({
  searchParams,
}: {
  searchParams: { seed: string };
}) {
  const seed = searchParams.seed;

  const supabase = createClientComponentClient<Database>();

  const { data } = await supabase.auth.getSession();

  // if (!data?.session) {
  //   redirect("/login");
  // }

  return (
    <>
      <ConfigurationForm seed={seed}></ConfigurationForm>
    </>
  );
}
