import type { Metadata } from "next";
import SignUpPage from "@/containers/signuppage";

import { signupDetails } from "@/data/signup";

export const metadata: Metadata = {
  title: signupDetails?.pageMetadata.title,
  description: signupDetails?.pageMetadata.description,
};

export default function SignUp() {
  return (
    <div className="">
      <SignUpPage />
    </div>
  );
}
