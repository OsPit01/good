"use client";

import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import { api } from "@/trpc/react";
import { useState } from "react";

export default function Home() {
  const { isSignedIn, userId } = useAuth();

  const { data: posts, refetch } = api.post.getAll.useQuery();

  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      setName("");
      void refetch(); // 👈 Исправлено
    },
  });

  if (!isSignedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <SignInButton mode="modal">
          <button className="rounded-full bg-purple-600 px-10 py-3 font-semibold text-white">
            Sign in
          </button>
        </SignInButton>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="w-full max-w-md p-8">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-lg">Привет, {userId?.slice(0, 20)}...</p>
          <UserButton />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim()) createPost.mutate({ name });
          }}
          className="mb-8 flex gap-2"
        >
          <input
            type="text"
            placeholder="Название поста..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-lg px-4 py-2 text-black"
          />
          <button
            type="submit"
            disabled={createPost.isPending}
            className="rounded-lg bg-purple-600 px-4 py-2 font-semibold disabled:opacity-50"
          >
            {createPost.isPending ? "Создание..." : "Создать"}
          </button>
        </form>

        <h2 className="mb-4 text-xl font-bold">Мои посты:</h2>
        {posts?.length === 0 && <p>Нет постов. Создай первый!</p>}
        {posts?.map((post) => (
          <div key={post.id} className="mb-2 rounded-lg bg-white/10 p-3">
            {post.name}
          </div>
        ))}
      </div>
    </main>
  );
}
