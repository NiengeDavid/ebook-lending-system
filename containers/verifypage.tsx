"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // For loading spinner
import { Button } from "@/components/ui/button";
import Container from "@/components/container";
import IndexHeader from "@/components/indexHeader";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { verifyDetails } from "@/data/verifyDetails"; // Metadata for the page

export default function VerifyPage() {
  const [code, setCode] = useState(""); // For verification code input
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [error, setError] = useState(""); // For error messages

  const { isLoaded, signUp, setActive } = useSignUp(); // Clerk hooks
  const router = useRouter(); // For redirecting

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true); // Start loading
    setError(""); // Clear previous errors

    try {
      // Attempt to verify the email code
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification is successful, set the user as active
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/home"); // Redirect to dashboard
      }
    } catch (err: any) {
      console.error("Error verifying email:", err);
      setError(err.errors[0].message); // Display error message
      toast("Uh oh! Something went wrong.", {
        description: "There was a problem with your request. Try again",
        closeButton: true,
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      <IndexHeader />

      <Container>
        <div className="w-full flex flex-col items-center justify-center mt-60">
          <div className="w-full max-w-md p-6 bg-white">
            <h1 className="text-2xl font-extrabold text-center mb-4 text-[#281B1B]">
              {verifyDetails?.title}
            </h1>
            <p className="text-sm text-center text-[#281B1B] mb-6">
              {verifyDetails?.description}
            </p>

            {/* Verification Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 items-center flex justify-center flex-col"
            >
              {/* <Input
            type="text"
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          /> */}

              <InputOTP
                value={code}
                onChange={(code) => setCode(code)}
                required
                maxLength={6}
                className="enabled:hover:border-blue-600 disabled:opacity-75"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              {/* Error Message */}
              {error && <p className="text-sm text-red-500">{error}</p>}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary-red hover:bg-primary-red/80 cursor-pointer text-white font-bold mt-8"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
