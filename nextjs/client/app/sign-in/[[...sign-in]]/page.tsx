import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  // If the user is not signed in, show the SignIn component
  return (
    <SignIn
      fallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    />
  );
}
