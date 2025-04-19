"use client";

import Container from "@/components/container";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react"; // For eye icons
import { Loader2 } from "lucide-react"; // For loading spinner
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";

import { siteDetails } from "@/data/siteDetails";
import { loginDetails } from "@/data/login";
import { useSignIn, useUser, useClerk } from "@clerk/nextjs"; // Clerk hooks
import { useRouter } from "next/navigation"; // For redirecting
import { toast } from "sonner";

// Define Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false); // For password visibility
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state
  const [error, setError] = useState(""); // For error messages
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const { isSignedIn, isLoaded: isUserLoaded } = useUser();
  const { signIn, setActive, isLoaded: isSignInLoaded } = useSignIn(); // Clerk sign-in hook
  const { redirectToSignIn } = useClerk(); // Clerk redirect hook
  const router = useRouter(); // For redirecting

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Effects after all hooks
  // Redirect if already signed in
  useEffect(() => {
    if (isUserLoaded && isSignInLoaded) {
      if (isSignedIn) {
        router.push("/home");
      }
      setIsCheckingAuth(false);
    }
  }, [isSignedIn, isUserLoaded, isSignInLoaded, router]);

  // 3. Conditional rendering (never before hooks)
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log("Login Data:", data);
    // Handle login logic here

    setIsSubmitting(true); // Start loading
    setError(""); // Clear previous errors

    try {
      // Attempt to sign in
      if (signIn) {
        const result = await signIn.create({
          identifier: data.email,
          password: data.password,
        });

        if (result.status === "complete") {
          // Set the user as active and redirect to the dashboard
          await setActive({ session: result.createdSessionId });
          router.push("/dashboard");
        }
      } else {
        setError("Sign-in service is unavailable.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.errors[0].message); // Display error message
      toast("Uh oh! Wrong password or email .", {
        description: "Check and try again!",
        closeButton: true,
      });
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <div className="relative bg-signup-image h-full md:h-screen">
      {/* Gradient overlay */}
      <div className="bg-gradient-overlay"></div>

      {/* Hero section */}
      <Container className="relative z-10">
        <div className="pt-8 max-w-screen-xl flex flex-col justify-between items-center mx-auto gap-4 md:pt-20 md:gap-4 md:flex-row">
          {/* Details block */}
          <div className="flex flex-col justify-between my-auto gap-8 text-center max-w-2xl md:text-left md:max-w-md">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-20">
              <Image
                src={siteDetails.siteLogo}
                alt={siteDetails.siteName}
                width={64}
                height={64}
                className="rounded-full shadow-md"
                priority
              />
              <span className="manrope text-2xl font-semibold text-white cursor-pointer lg:text-3xl">
                {siteDetails.siteName}
              </span>
            </Link>

            <div className="w-full text-white text-start">
              <h1 className="text-2xl font-bold mb-4 lg:text-4xl">
                {loginDetails?.cta.title}
              </h1>
              <span className="text-lg italic leading-loose font-light">
                {loginDetails?.cta.description}
              </span>

              <div className="mt-8 flex justify-start items-center gap-4">
                {/* Dashes here */}
                <span className="block w-12 h-1 bg-white font-bold"></span>
                <span className="block w-8 h-0.5 bg-white"></span>
                <span className="block w-8 h-0.5 bg-white"></span>
              </div>
            </div>
          </div>

          {/* form */}
          <div className="mt-20 md:mt-0 bg-white rounded-t-3xl p-9 pt-20 shadow-lg w-full h-full md:pb-86 max-w-md md:max-w-md lg:max-w-xl">
            <p className="text-blac text-sm font-light mb-2">
              {loginDetails?.description}
            </p>
            <h2 className="text-2xl font-medium mb-9 text-black">
              {loginDetails?.title}
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Email</FormLabel>
                      <FormControl>
                        <Input
                          className="border border-offset1 py-6 px-2"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="border border-offset1 py-6 px-2"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 py-2 top-2 text-sm text-gray-500"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center mx-auto">
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="mt-4 max-w-md font-semibold py-6 px-8 bg-black text-white cursor-pointer"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "LOG IN ➜"
                    )}
                  </Button>

                  {/* forgot password */}
                  <Link
                    href="/forgot-password"
                    className="text-sm text-black hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </form>
            </Form>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <Link href="/signup">
                <Button className="w-full mt-10 py-6 font-semibold text-white bg-primary-red hover:bg-primary-red/80">
                  BACK TO SIGNUP
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
