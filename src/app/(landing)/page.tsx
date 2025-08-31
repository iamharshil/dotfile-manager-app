"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { GrainBackground } from "@/components/ui/grain-bg";
import { GlassCard } from "@/components/ui/glass-card";
import { Highlight, themes } from "prism-react-renderer";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const previewCode = `// Save and share snippets effortlessly
function greet(name: string) {
  return \`Hello, \${name}!\`
}

// Tag your snippet to find it later
// tags: ['greeting', 'typescript', 'demo']

console.log(greet("World"))`;

export default function LandingPage() {
	const [copied, setCopied] = useState(false);
	const [isDark, setIsDark] = useState(false);

	const onCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(previewCode);
			setCopied(true);
			toast.success("Code copied to clipboard!");
			setTimeout(() => setCopied(false), 1200);
		} catch {}
	}, []);

	useEffect(() => {
		// Detect dark mode based on the .dark class on <html>
		const root = document.documentElement;
		const update = () => setIsDark(root.classList.contains("dark"));
		update();
		const observer = new MutationObserver(update);
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	// Motion helpers
	const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };
	const fade = { initial: { opacity: 0 }, animate: { opacity: 1 } };
	const prismTheme = isDark ? themes.dracula : themes.duotoneLight;

	return (
		<main className="relative min-h-dvh text-white">
			{/* Background */}
			<GrainBackground />

			<section className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16">
				{/* Hero */}
				<motion.div
					{...fadeUp}
					transition={{ duration: 0.4, ease: "easeOut" }}
					className="relative overflow-hidden"
				>
					<GlassCard className="p-6 md:p-10" variant="purple">
						<div className="flex flex-col gap-6">
							<div className="space-y-3">
								<span className="inline-block rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs tracking-wide text-zinc-300">
									Modern • Private • Fast
								</span>
								<h1 className="text-balance text-3xl font-semibold md:text-5xl">
									The fastest way to save snippets and developer configs
								</h1>
								<p className="text-pretty text-sm leading-relaxed text-zinc-300 md:text-base">
									Capture reusable code, store VS Code and Neovim settings, and share with your team.
									Powerful tags and instant search wrapped in a polished, mobile‑first glass UI.
								</p>
							</div>
							<div className="flex flex-col gap-3 sm:flex-row">
								<Link href="/dashboard">
									<Button
										size="lg"
										className="w-full bg-[#7c3aed] text-white hover:bg-[#6d28d9] sm:w-auto"
									>
										Get Started
									</Button>
								</Link>
								<Link href="/snippets">
									<Button
										size="lg"
										variant="secondary"
										className="w-full border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.1] sm:w-auto"
									>
										Browse Snippets
									</Button>
								</Link>
								<Link href="/dashboard/configs">
									<Button
										size="lg"
										variant="outline"
										className="w-full border-white/15 bg-transparent text-white hover:bg-white/[0.06] sm:w-auto"
									>
										Explore Configs
									</Button>
								</Link>
							</div>
							{/* Trust row */}
							<div className="flex flex-wrap items-center gap-2 text-xs text-zinc-300">
								<span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">
									Private by default
								</span>
								<span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">
									Tag & search
								</span>
								<span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">
									Share securely
								</span>
							</div>
						</div>
					</GlassCard>
				</motion.div>

				{/* Feature grid */}
				<motion.div
					{...fadeUp}
					transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
					className="mt-6 grid gap-4 md:grid-cols-3"
				>
					{[
						{
							title: "Snippets",
							desc: "Organize reusable code by language, tags, and folders.",
							href: "/snippets",
						},
						{
							title: "Configs",
							desc: "Version and share VS Code or Neovim configs in one place.",
							href: "/dashboard/configs",
						},
						{
							title: "Fast Search",
							desc: "Filter by tags, language, and title to find things instantly.",
							href: "/dashboard",
						},
					].map((f) => (
						<Link key={f.title} href={f.href} className="group">
							<GlassCard className="p-5 md:p-6 transition" variant="purple">
								<h3 className="text-lg font-medium">{f.title}</h3>
								<p className="mt-1 text-sm text-zinc-300">{f.desc}</p>
								<span className="mt-3 inline-block text-sm text-zinc-300 transition group-hover:text-white">
									Open →
								</span>
							</GlassCard>
						</Link>
					))}
				</motion.div>

				{/* How it works */}
				<motion.div
					{...fadeUp}
					transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
					className="mt-8 grid gap-4 md:grid-cols-3"
				>
					{[
						{
							step: "1",
							title: "Capture",
							desc: "Paste your code or drop a config file. Add a title, tags, and language.",
						},
						{
							step: "2",
							title: "Organize",
							desc: "Group by folders, apply tags, and keep everything searchable.",
						},
						{
							step: "3",
							title: "Share",
							desc: "Share privately with teammates or publish read-only links.",
						},
					].map((s) => (
						<GlassCard key={s.step} className="p-5 md:p-6" variant="purple">
							<div className="flex items-center gap-3">
								<span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-xs">
									{s.step}
								</span>
								<h4 className="font-medium">{s.title}</h4>
							</div>
							<p className="mt-2 text-sm text-zinc-300">{s.desc}</p>
						</GlassCard>
					))}
				</motion.div>

				{/* Code preview with copy */}
				<motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }} className="mt-8">
					<GlassCard variant="purple">
						<div className="flex items-center justify-between px-4 py-3 md:px-6">
							<div className="text-sm text-zinc-300">Preview (TypeScript)</div>
							<Button
								size="sm"
								variant="secondary"
								onClick={onCopy}
								className="border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.1]"
							>
								{copied ? "Copied" : "Copy"}
							</Button>
						</div>
						<div className="px-4 pb-4 md:px-6 md:pb-6">
							<pre className="overflow-auto rounded-xl border border-white/10 bg-black/30 text-xs leading-relaxed text-zinc-200">
								{/* <code>{previewCode}</code> */}
								<Highlight theme={prismTheme} code={previewCode} language="typescript">
									{({ className: highlightClass, style, tokens, getLineProps, getTokenProps }) => (
										<pre
											className={cn(
												highlightClass,
												"m-0 p-4 text-sm leading-6 border rounded-xl",
												"whitespace-pre"
											)}
											style={style}
										>
											{tokens.map((line, i) => (
												<div key={i} {...getLineProps({ line })}>
													{line.map((token, key) => (
														<span key={key} {...getTokenProps({ token })} />
													))}
												</div>
											))}
										</pre>
									)}
								</Highlight>
							</pre>
						</div>
					</GlassCard>
				</motion.div>

				{/* Final CTA */}
				<motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} className="mt-8">
					<GlassCard className="p-6 md:p-8" variant="purple">
						<div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
							<div>
								<h2 className="text-balance text-xl font-semibold md:text-2xl">
									Start organizing your dev knowledge
								</h2>
								<p className="mt-1 text-sm text-zinc-300">
									Create your first snippet or import your editor configs in seconds.
								</p>
							</div>
							<div className="flex gap-3">
								<Link href="/snippets/new">
									<Button size="lg" className="bg-[#7c3aed] text-white hover:bg-[#6d28d9]">
										Create Snippet
									</Button>
								</Link>
								<Link href="/dashboard/configs/new">
									<Button
										size="lg"
										variant="secondary"
										className="border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.1]"
									>
										Add Config
									</Button>
								</Link>
							</div>
						</div>
					</GlassCard>
				</motion.div>
			</section>
		</main>
	);
}
