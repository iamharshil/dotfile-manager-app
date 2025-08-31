import type { Metadata } from "next";
import Link from "next/link";
import { SocialAuthButtons } from "@/components/sign-in-buttons";
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Sign in",
	description: "Access your account with Google or GitHub",
};

export default async function SignInPage() {
	const session = await auth();

	if (session?.user) return redirect("/dashboard");

	return (
		<main className="min-h-dvh bg-slate-50 dark:bg-slate-950">
			<div className="mx-auto flex min-h-dvh max-w-xl items-center justify-center p-6">
				<section
					aria-label="Sign in"
					className="
            w-full rounded-2xl border
            border-white/20 dark:border-white/10
            bg-white/10 dark:bg-white/5
            backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)]
            px-6 py-8 md:px-8
          "
				>
					<header className="mb-6 text-center">
						<h1 className="text-pretty text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
							Welcome back
						</h1>
						<p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
							Sign in to continue to your account
						</p>
					</header>

					<div className="space-y-3">
						<SocialAuthButtons />
					</div>

					<div className="mt-6 text-center text-xs text-slate-600 dark:text-slate-300">
						By continuing, you agree to our{" "}
						<Link
							href="#"
							className="font-medium text-teal-600 hover:underline focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-teal-500"
						>
							Terms
						</Link>{" "}
						and{" "}
						<Link
							href="#"
							className="font-medium text-teal-600 hover:underline focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-teal-500"
						>
							Privacy Policy
						</Link>
						.
					</div>
				</section>
			</div>
		</main>
	);
}
