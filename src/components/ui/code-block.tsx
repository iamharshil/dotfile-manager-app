"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";

type CodeBlockProps = {
	code: string;
	language?: string; // e.g. tsx, ts, js, json, bash, yaml, lua, etc.
	className?: string;
	wrap?: boolean;
};

export function CodeBlock({ code, language = "tsx", className, wrap = false }: CodeBlockProps) {
	const [copied, setCopied] = React.useState(false);
	const [isDark, setIsDark] = React.useState(false);

	React.useEffect(() => {
		// Detect dark mode based on the .dark class on <html>
		const root = document.documentElement;
		const update = () => setIsDark(root.classList.contains("dark"));
		update();
		const observer = new MutationObserver(update);
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	const prismTheme = isDark ? themes.dracula : themes.duotoneLight;

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), 1200);
		} catch {
			// ignore copy errors
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25, ease: "easeOut" }}
			className={cn(
				"relative rounded-xl border",
				// glassmorphism surface that blends with theme tokens
				"bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50",
				"border-black/5 dark:border-white/10",
				className
			)}
		>
			<div className="flex items-center justify-between px-3 py-2">
				<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{language}</span>
				<Button variant="secondary" size="sm" type="button" onClick={handleCopy} aria-label="Copy code">
					{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
					<span className="ml-2 text-xs">{copied ? "Copied" : "Copy"}</span>
				</Button>
			</div>
			<div className="rounded-b-xl overflow-x-auto">
				<Highlight theme={prismTheme} code={code} language={language as any}>
					{({ className: highlightClass, style, tokens, getLineProps, getTokenProps }) => (
						<pre
							className={cn(
								highlightClass,
								"m-0 p-4 text-sm leading-6",
								wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"
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
			</div>
		</motion.div>
	);
}

export default CodeBlock;
