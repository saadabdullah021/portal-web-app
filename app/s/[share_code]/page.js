import { redirect } from "next/navigation";

export default async function ShareRedirectPage({ params }) {
  // Await params for App Router dynamic segment
  const { share_code } = await params; 

  // API URL
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_LOCAL}/api/get-slug-by-share-code?code=${share_code}`;

  // Fetch slug
  const res = await fetch(apiUrl, { cache: "no-store" });

  if (!res.ok) {
    // If API returns 404, redirect to /404
    return redirect("/404");
  }

  const data = await res.json();
  const slug = data?.slug;

  if (!slug) {
    return redirect("/404");
  }

  // Redirect to actual property page
  redirect(`/unit-details?slug=${slug}`);
}
