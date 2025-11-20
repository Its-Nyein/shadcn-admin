import SignIn from "@/features/auth/components/sign-in";
import { Suspense } from "react";

function SignInFallback() {
  return (
    <div className="relative container grid min-h-screen flex-col items-center justify-center px-4 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex h-full items-center justify-center text-lg font-medium">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold">
              SA
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold">Shadcn Admin</span>
              <span className="text-muted-foreground text-sm">
                Shadcn Admin Dashboard
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm">Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInFallback />}>
      <SignIn />
    </Suspense>
  );
}
