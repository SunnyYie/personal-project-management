import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  // If the user is already signed in, redirect to the dashboard

  // If the user is not signed in, show the SignIn component
  return <SignUp fallbackRedirectUrl="/" signInFallbackRedirectUrl="/" />;
}
