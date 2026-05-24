"use client";

import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { isSignedIn, userId } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {isSignedIn ? `Logged in as ${userId}` : "Hello from tRPC"}
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton>
                <button className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
                  Sign in
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
