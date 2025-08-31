"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<main className="min-h-[100dvh] w-full bg-background">
			<section className="mx-auto flex h-[100dvh] max-w-xl flex-col items-center justify-center px-4">
				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.22, ease: [0.21, 1.02, 0.35, 1] }}
					className="w-full rounded-2xl border border-black/10 bg-white/60 p-6 shadow-lg backdrop-blur-md md:p-8 dark:border-white/10 dark:bg-white/5"
				>
					<div className="space-y-3 text-center md:space-y-4">
						<p className="text-sm font-medium tracking-wide text-muted-foreground">Error</p>
						<h1 className="text-balance text-3xl font-semibold leading-tight md:text-4xl">
							404 — Page not found
						</h1>
						<p className="text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
							The page you’re looking for doesn’t exist or has been moved. You can head back to the
							dashboard or return home.
						</p>
					</div>

					<div className="mt-6 flex flex-col items-center justify-center gap-2 md:mt-8 md:flex-row">
						{/* Primary uses the app’s brand (similar to GitHub-style dark button in light mode) */}
						<Button asChild className="w-full md:w-auto">
							<Link href="/dashboard">Go to Dashboard</Link>
						</Button>
						<Button asChild variant="outline" className="w-full md:w-auto bg-transparent">
							<Link href="/">Back Home</Link>
						</Button>
					</div>
				</motion.div>

				<motion.div
					aria-hidden
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.6 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-48 w-[min(90%,36rem)] rounded-full bg-black/[0.03] blur-3xl dark:bg-white/[0.04]"
				/>
			</section>
		</main>
	);
}
