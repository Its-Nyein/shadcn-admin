import { redirect } from "next/navigation";

// Redirect to dashboard - middleware will handle authentication
export default function Home() {
  redirect("/dashboard");
}
