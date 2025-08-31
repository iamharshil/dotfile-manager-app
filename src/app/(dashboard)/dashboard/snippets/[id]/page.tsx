"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CodeBlock from "@/components/ui/code-block";
import { motion } from "framer-motion";

type PageProps = { params: { id: string } };

function getSnippet(id: string) {
	return {
		id,
		title: "Example: Debounced Search Hook",
		language: "tsx",
		tags: ["react", "hooks", "debounce"],
		code: `import { useEffect, useState } from 'react'

export function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}`,
		updatedAt: "2025-08-31",
	};
}

export default function SnippetViewPage({ params }: PageProps) {
	const snippet = getSnippet(params.id);

	return (
		<main className="min-h-dvh">
			<div className="mx-auto max-w-3xl p-4 md:p-6">
				<motion.section
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.25 }}
					className="rounded-xl border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50 border-black/5 dark:border-white/10 p-4 md:p-6"
				>
					<header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
						<div>
							<h1 className="text-xl md:text-2xl font-semibold text-pretty">{snippet.title}</h1>
							<div className="mt-2 flex flex-wrap items-center gap-2">
								<Badge variant="secondary" className="capitalize">
									{snippet.language}
								</Badge>
								{snippet.tags.map((t) => (
									<Badge key={t} variant="outline" className="capitalize">
										{t}
									</Badge>
								))}
								<span className="text-xs text-muted-foreground">Updated {snippet.updatedAt}</span>
							</div>
						</div>
						<div className="flex gap-2">
							<Link href={`/snippets/${snippet.id}/edit`}>
								<Button variant="default">Edit</Button>
							</Link>
							<Link href="/snippets">
								<Button variant="secondary">Back</Button>
							</Link>
						</div>
					</header>

					<div className="mt-4">
						<CodeBlock code={snippet.code} language={snippet.language} />
					</div>
				</motion.section>
			</div>
		</main>
	);
}
