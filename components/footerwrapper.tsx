"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // Define public and protected routes
  const publicRoutes = ["/", "/login", "/signup", "verify-email"]; // Add all public routes here
  const protectedRoutes = ["/home", "/search", "/books", "/books/[slug]"]; // Add all protected routes here

  // Determine which navbar to render based on the route
  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    route.includes("[")
      ? pathname.startsWith(route.split("[")[0])
      : route === pathname
  );

  return (
    <>
      {/* {isPublicRoute && <HomeNavbar />} */}
      {isProtectedRoute && <Footer />}
    </>
  );
}
