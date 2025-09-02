"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/toggle-theme";
import { motion } from "framer-motion";
import { Cog, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, type useSession } from "next-auth/react";

interface AppShellProps {
  title: string;
  description?: string;
  action?: { href: string; label: string };
  children: React.ReactNode;
  className?: string;
  session?: ReturnType<typeof useSession> extends { data: infer D } ? D : null;
}

export default function AppShell({
  title,
  description,
  action,
  children,
  className,
  session,
}: AppShellProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-dvh bg-[#0b0618] pb-20 md:pb-0">
      <main className={cn("mx-auto max-w-6xl px-4 py-4 md:py-8", className)}>
        <motion.header
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className={cn(
            "sticky top-0 z-40 mb-6 flex items-center justify-between rounded-xl border px-3 py-3 md:mb-8 md:px-4 md:py-4",
            "bg-white/[0.06] supports-[backdrop-filter]:bg-white/[0.04]",
            "bg-background/60 border-white/10 dark:border-white/10 shadow-sm",
          )}
        >
          <div className="min-w-0">
            <h1 className="text-pretty text-xl font-semibold tracking-tight md:text-2xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-1">
            <nav
              aria-label="Primary"
              className="hidden items-center gap-2 md:flex"
            >
              <Button
                asChild
                variant={isActive("/dashboard") ? "default" : "ghost"}
                className="rounded-full"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button
                asChild
                variant={isActive("/dashboard/snippets") ? "default" : "ghost"}
                className="rounded-full"
              >
                <Link href="/dashboard/snippets">Snippets</Link>
              </Button>
              <Button
                asChild
                variant={isActive("/dashboard/configs") ? "default" : "ghost"}
                className="rounded-full"
              >
                <Link href="/dashboard/configs">Configs</Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-background/60 backdrop-blur-md"
                    aria-label="Open user menu"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        src={session?.user?.image ?? ""}
                        alt="User"
                      />
                      <AvatarFallback className="text-xs">U</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-44">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-2"
                    >
                      <Cog className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <button
                    type="button"
                    className="w-full"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </button>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </motion.header>
        {children}
      </main>
    </div>
  );
}
