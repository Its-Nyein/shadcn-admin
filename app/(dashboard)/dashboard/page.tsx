"use client";

import { authClient } from "@/lib/auth-client";
import { User } from "better-auth/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser(session.data.user);
        } else {
          router.push("/sign-in");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        router.push("/sign-in");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/sign-in");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Welcome back!
          </p>
        </div>

        {user && (
          <div className="mt-8 space-y-4">
            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
              <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                User Information
              </h2>
              <div className="mt-2 space-y-2">
                {user.name && (
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">
                    <span className="font-medium">Name:</span> {user.name}
                  </p>
                )}
                {user.email && (
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                )}
                {user.image && (
                  <div className="mt-4">
                    <Image
                      src={user.image as string}
                      alt="Profile"
                      className="h-16 w-16 rounded-full"
                      width={64}
                      height={64}
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
