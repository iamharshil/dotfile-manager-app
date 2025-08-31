"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

type Props = {
	googleHref?: string;
	githubHref?: string;
};

/**
 * Social auth buttons with glassmorphism-friendly styles and strong focus states.
 * Wire up with:
 * - hrefs (googleHref/githubHref) to your auth endpoints, OR
 * - handlers (onGoogleClick/onGithubClick) for a custom flow.
 */
export function SocialAuthButtons({ googleHref = "#", githubHref = "#" }: Props) {
	return (
		<div className="flex flex-col gap-3">
			<AuthButton
				provider="google"
				label="Sign in with Google"
				onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
				href={googleHref}
			/>
			<AuthButton
				provider="github"
				label="Sign in with GitHub"
				onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
				href={githubHref}
			/>
		</div>
	);
}

function AuthButton({
	provider,
	label,
	onClick,
	href,
}: {
	provider: "google" | "github";
	label: string;
	onClick?: () => void;
	href: string;
}) {
	const content = (
		<span className="flex w-full items-center justify-center gap-2">
			{provider === "google" ? <GoogleIcon /> : <Github className="h-5 w-5" aria-hidden="true" />}
			<span className="text-sm font-medium">{label}</span>
		</span>
	);

	// Primary brand for GitHub to create visual hierarchy, glass-outline for Google
	const baseClasses =
		provider === "github"
			? "bg-teal-600 hover:bg-teal-500 text-white"
			: "bg-white/80 hover:bg-white text-slate-900 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white border border-white/40 dark:border-white/20";

	return onClick ? (
		<Button
			type="button"
			onClick={onClick}
			className={[
				"h-11 w-full rounded-xl",
				baseClasses,
				"transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
			].join(" ")}
			aria-label={label}
			data-provider={provider}
		>
			{content}
		</Button>
	) : (
		<Button
			asChild
			className={[
				"h-11 w-full rounded-xl",
				baseClasses,
				"transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
			].join(" ")}
			aria-label={label}
			data-provider={provider}
		>
			<a href={href}>{content}</a>
		</Button>
	);
}

function GoogleIcon() {
	// Minimal accessible Google 'G' logo
	return (
		<svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path
				fill="#EA4335"
				d="M12 10.2v3.9h5.5c-.24 1.25-1.66 3.66-5.5 3.66A6.36 6.36 0 0 1 5.6 12 6.36 6.36 0 0 1 12 5.25c1.8 0 3.01.76 3.7 1.41l2.52-2.44C16.8 2.9 14.6 2 12 2 6.86 2 2.7 6.16 2.7 11.3S6.86 20.6 12 20.6c6.1 0 10.1-4.29 10.1-10.34 0-.69-.07-1.22-.16-1.77H12z"
			/>
			<path
				fill="#4285F4"
				d="M3.9 7.15 6.7 9.2A6.34 6.34 0 0 1 12 5.25c1.8 0 3.01.76 3.7 1.41l2.52-2.44C16.8 2.9 14.6 2 12 2 8.69 2 5.78 3.66 3.9 7.15z"
			/>
			<path
				fill="#FBBC05"
				d="M12 20.6c3.84 0 7.06-2.53 8.12-6.1l-3.62-2.79c-.57 1.77-2.12 3.33-4.5 3.33-2.69 0-4.97-1.83-5.78-4.32l-2.8 2.05A9.62 9.62 0 0 0 12 20.6z"
			/>
			<path
				fill="#34A853"
				d="M3.9 15.45A9.6 9.6 0 0 0 12 20.6c2.93 0 5.39-1.09 7.12-3.01l-3.62-2.79c-.98.62-2.23 1.02-3.5 1.02-2.69 0-4.97-1.83-5.78-4.32z"
			/>
		</svg>
	);
}
