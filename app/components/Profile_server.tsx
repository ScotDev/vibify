import { Sign } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import SignOutButtonServer from "../components/SignOutButtonServer";

export default async function Profile_server() {
  async function testAction() {
    "use server";
    const cookieStore = cookies();
    const token = cookieStore.get("providerAccessToken");
    console.log("user server", token);
    cookieStore.set("test", token!.value, { path: "/" });
    revalidatePath("/profile");
  }

  return (
    <div>
      Profile_server
      <form action={testAction}>
        <button className="btn" type="submit">
          Test
        </button>
      </form>
      <SignOutButtonServer />
    </div>
  );
}
