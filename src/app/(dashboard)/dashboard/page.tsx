import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppShell from "@/components/app-shell";
import { auth } from "@/auth/auth";

export default async function Page() {
  const session = await auth();
  return (
    <AppShell
      title="Dashboard"
      description="Overview of your snippets and configuration files."
      action={{ href: "/dashboard/snippets/new", label: "New snippet" }}
      session={session}
    >
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="bg-white/[0.06] supports-[backdrop-filter]:bg-white/[0.04]">
          <CardHeader>
            <CardTitle className="text-base">Snippets</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-semibold">12</p>
              <p className="text-sm text-muted-foreground">Total saved</p>
            </div>
            <Button asChild className="rounded-full">
              <Link href="/dashboard/snippets">View all</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.06] supports-[backdrop-filter]:bg-white/[0.04]">
          <CardHeader>
            <CardTitle className="text-base">Configs</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-semibold">5</p>
              <p className="text-sm text-muted-foreground">Total saved</p>
            </div>
            <Button asChild className="rounded-full">
              <Link href="/dashboard/configs">View all</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.06] supports-[backdrop-filter]:bg-white/[0.04]">
          <CardHeader>
            <CardTitle className="text-base">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button asChild className="rounded-full">
              <Link href="/dashboard/snippets/new">New snippet</Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link href="/dashboard/configs/new">New config</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="bg-white/[0.06] supports-[backdrop-filter]:bg-white/[0.04]">
          <CardHeader>
            <CardTitle className="text-base">Recent snippets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Debounce function",
              "Tailwind container",
              "Next.js middleware",
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-white/20 bg-white/40 p-3 dark:border-white/10 dark:bg-zinc-900/30 relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md backdrop-saturate-150 transition"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{item}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    Updated 2 days ago
                  </p>
                </div>
                <Button asChild variant="ghost" className="rounded-full">
                  <Link href="/dashboard/snippets">Open</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/[0.06] supports-[backdrop-filter]:bg-white/[0.04]">
          <CardHeader>
            <CardTitle className="text-base">Recent configs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["VSCode settings.json", "Neovim init.lua"].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-white/20 bg-white/40 p-3 dark:border-white/10 dark:bg-zinc-900/30 relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md backdrop-saturate-150 transition"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{item}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    Updated 5 days ago
                  </p>
                </div>
                <Button asChild variant="ghost" className="rounded-full">
                  <Link href="/dashboard/configs">Open</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
