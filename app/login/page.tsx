import type { Metadata } from "next";
import LoginPage from "@/containers/loginpage";

import { loginDetails } from "@/data/login";

export const metadata: Metadata = {
  title: loginDetails?.pageMetadata.title,
  description: loginDetails?.pageMetadata.description,
};


export default function Login() {
  return (
    <div className="">
      <LoginPage />
    </div>
  );
}
