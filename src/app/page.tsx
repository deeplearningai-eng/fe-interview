import { LatestPost } from "@/app/_components/Post";
import { api, HydrateClient } from "@/trpc/server";
// import { Courses }  from '@/app/_components/Courses'

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
          </div>

          <LatestPost />
          {/* <Courses /> */}
        </div>
      </main>
    </HydrateClient>
  );
}
