import { redirect } from "next/navigation";

// Root URL ("/") sends visitors to /members. The site has two designed
// landing pages — /members and /companies — and /members is the default.
export default function Home() {
  redirect("/members");
}
