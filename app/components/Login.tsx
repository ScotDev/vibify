"use client";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

import type { Database } from "@/supabase";

// import SignInButtonServer from "./SignInButtonServer";
import Button from "./Button";

// export default function Login() {
// const supabase = createServerComponentClient<Database>({ cookies });

// async function SignIn() {
//   "use server";
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "spotify",
//     options: {
//       redirectTo: `${location.origin}/callback`,
//       scopes: "user-read-email user-read-private user-top-read",
//     },
//   });
//   console.log("data: ", data, "error: ", error);
// }

//   return (
//     <div className="grid place-items-center">
//       <SignInButtonServer />
//     </div>
//   );
// }

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// import type { Database } from "@/supabase";

// import Button from "@/app/components/Button";

export default function Login() {
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
  };

  return (
    <div className="grid place-items-center">
      <Button title="Log in with" hasImage onClick={() => handleSignIn()} />
    </div>
  );
}
