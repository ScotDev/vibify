import { redirect } from "next/navigation";
export default function page() {
  console.log("Not found");
  return redirect("/");
}
