"use client";

import Container from "@/components/container";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react"; // For eye icons
import { Loader2 } from "lucide-react"; // For loading spinner
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs"; // Clerk signup hook
import { useRouter } from "next/navigation"; // For redirecting
import { toast } from "sonner";

import { signupDetails } from "@/data/signup";
import { siteDetails } from "@/data/siteDetails";

// Define Zod schema for form validation
const signUpSchema = z
  .object({
    matriculationNumber: z.string().min(1, "Matriculation number is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state

  const { isLoaded, signUp } = useSignUp(); // Clerk signup hook
  const router = useRouter(); // For redirecting

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      matriculationNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    console.log("Form Data:", data);
    // Handle form submission logic here

    if (!isLoaded) return;

    try {
      // Create user with Clerk
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,

        unsafeMetadata: {
          // Additional user metadata
          registrationNumber: data.matriculationNumber,
        },
      });

      // Prepare email verification
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Redirect to email verification page
      router.push("/verify-email");
    } catch (err) {
      console.error("Error during signup:", err);
      toast("Uh oh! Something went wrong.", {
        description: "There was a problem with your request. Try again",
        closeButton: true,
      });
    } finally {
      setIsSubmitting(false); // Stop loading
      console.log("Form Data:", data);
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
                Building the Future...
              </h1>
              <span className="text-lg italic leading-loose font-light">
                Unlock a treasure trove of thousands of valuable resources at
                your fingertips by using your MIU account.
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
          <div className="mt-20 md:mt-0 bg-white rounded-t-3xl p-9 pt-20 shadow-lg w-full h-full md:pb-36 max-w-md md:max-w-md lg:max-w-xl">
            <p className="text-blac text-sm font-light mb-2">
              LET'S GET YOU STARTED
            </p>
            <h2 className="text-2xl font-medium mb-9 text-black">
              Create an Account
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Matriculation Number */}
                <FormField
                  control={form.control}
                  name="matriculationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        Matriculation Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="border border-offset1 py-6 px-2"
                          placeholder="Enter your matriculation number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                            className="absolute right-2 top-2 py-2 text-sm text-gray-500 cursor-pointer"
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

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="border border-offset1 py-6 px-2"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-2 top-2 py-2 text-sm text-gray-500 cursor-pointer"
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="mt-4 max-w-md font-semibold py-6 px-8 bg-black text-white cursor-pointer"
                >
                  SIGN UP ➜
                </Button>
              </form>
            </Form>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <Link href="/login">
                <Button className="w-full mt-10 py-6 font-semibold text-white bg-primary-red hover:bg-primary-red/80">
                  BACK TO LOGIN
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
