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
import zxcvbn from "zxcvbn";

import { signupDetails } from "@/data/signup";
import { siteDetails } from "@/data/siteDetails";

// Update your schema to include password strength check
const signUpSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    matriculationNumber: z.string().min(1, "Matriculation number is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine((val) => {
        const result = zxcvbn(val);
        return result.score >= 2; // Require at least "somewhat guessable"
      }, "Password is too weak. Please use a stronger password."),
    confirmPassword: z.string(),
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
      name: "",
      matriculationNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    console.log("Form Data:", data);
    setIsSubmitting(true);

    if (!isLoaded) return;

    try {
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.name.split(" ")[0], // Extract first name
        lastName: data.name.split(" ")[1] || "", // Extract last name
        unsafeMetadata: {
          fullName: data.name,
          email: data.email,
          registrationNumber: data.matriculationNumber,
        },
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      router.push("/verify-email");
    } catch (err: any) {
      console.error("Error during signup:", err);

      // Handle password breach error specifically
      if (
        err.errors &&
        err.errors.some((e: any) => e.code === "form_password_pwned")
      ) {
        toast.error("Password Compromised", {
          description:
            "This password has appeared in a data breach. Please choose a different, stronger password.",
          action: {
            label: "Understand",
            onClick: () => {},
          },
        });
        form.setError("password", {
          type: "manual",
          message: "This password has been compromised in a data breach",
        });
        form.setError("confirmPassword", {
          type: "manual",
          message: "Please choose a different password",
        });
      } else {
        // Handle other errors
        toast.error("Signup Failed", {
          description:
            err.message || "An unexpected error occurred during signup",
          action: {
            label: "Try Again",
            onClick: () => {},
          },
        });
      }
    } finally {
      setIsSubmitting(false);
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
          <div className="mt-20 md:mt-0 bg-white rounded-t-3xl p-9 pt-20 shadow-lg w-full h-full md:pb-8 max-w-md md:max-w-md lg:max-w-xl">
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
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          className="border border-offset1 py-6 px-2"
                          placeholder="Enter your full name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                  render={({ field }) => {
                    const strength = field.value
                      ? zxcvbn(field.value).score
                      : -1;
                    return (
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
                        {field.value && (
                          <div className="h-1.5 w-64 bg-gray-200 rounded-full mt-1 mb-5">
                            <div
                              className={`h-full mb-1 rounded-full ${
                                strength <= 1
                                  ? "bg-red-500"
                                  : strength <= 2
                                    ? "bg-yellow-500"
                                    : strength <= 3
                                      ? "bg-blue-500"
                                      : "bg-green-500"
                              }`}
                              style={{
                                width: `${((strength + 1) / 4) * 100}%`,
                              }}
                            />
                            <span className="text-sm font-extralight text-primary-text">
                              Password Strength
                            </span>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    );
                  }}
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "SIGN UP ➜"
                  )}
                </Button>

                {/* Add the CAPTCHA element */}
                <div id="clerk-captcha"></div>
              </form>
            </Form>

            {/* Back to Login */}
            <div className="text-center mt-4">
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
