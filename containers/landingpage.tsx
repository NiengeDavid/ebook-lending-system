import { useUser, UserButton } from "@clerk/nextjs";

export default function LandingPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="">
      <h1 className="text-base font-bold">
        {isLoaded && isSignedIn
          ? `Welcome ${user?.primaryEmailAddress || user?.emailAddresses[0]?.emailAddress}`
          : "Welcome!"}
      </h1>
      <p>This is the landing page of your application.</p>
    </div>
  );
}
