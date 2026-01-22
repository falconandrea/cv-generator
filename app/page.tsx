/**
 * Home Page
 *
 * Redirects to the editor page.
 */

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/editor");
}
