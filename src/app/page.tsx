"use client";

import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { api } from "@/trpc/react"; // 👈 1. ДОБАВИТЬ - импорт tRPC
import { useState } from "react"; // 👈 2. ДОБАВИТЬ - для работы с формой

export default function Home() {
  const { isSignedIn, userId } = useAuth();
  //  запрос на получение постов (как в видео)
  const { data: latestPost } = api.post.getLatest.useQuery();
  const { data: posts } = api.post.getAll.useQuery();
  // для создания нового поста
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      setName("");
    },
  }); // очищаем форму после успешного создания
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
        <div>
          {posts?.map((post) => (
            <div key={post.id}> {post.name} </div>
          ))}
        </div>
      </div>
    </main>
  );
}
