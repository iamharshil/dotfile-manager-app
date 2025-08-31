"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppShell from "@/components/app-shell";

const mockSnippets = [
	{ id: "1", title: "Debounce function", language: "TypeScript", updatedAt: "2d" },
	{ id: "2", title: "Tailwind center container", language: "CSS", updatedAt: "3d" },
	{ id: "3", title: "Next.js route handler", language: "TS", updatedAt: "1w" },
	{ id: "4", title: "Prisma pagination", language: "TS", updatedAt: "2w" },
];

export default function Page() {
	const [q, setQ] = useState("");

	const filtered = mockSnippets.filter(
		(s) => s.title.toLowerCase().includes(q.toLowerCase()) || s.language.toLowerCase().includes(q.toLowerCase())
	);

	return (
		<AppShell
			title="Snippets"
			description="Your reusable code pieces organized by language."
			action={{ href: "/dashboard/snippets/new", label: "New snippet" }}
		>
			<div className="mb-4 flex items-center gap-2">
				<Input
					value={q}
					onChange={(e) => setQ(e.target.value)}
					placeholder="Search snippets by title or language"
					className="max-w-md rounded-full"
					aria-label="Search snippets"
				/>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{filtered.map((s) => (
					<Card
						key={s.id}
						className="border-white/20 bg-white/50 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/40"
					>
						<CardHeader className="pb-2">
							<CardTitle className="text-base">{s.title}</CardTitle>
						</CardHeader>
						<CardContent className="flex items-end justify-between gap-4">
							<div className="min-w-0">
								<p className="text-sm text-muted-foreground">Language: {s.language}</p>
								<p className="text-xs text-muted-foreground">Updated {s.updatedAt} ago</p>
							</div>
							<div className="flex items-center gap-2">
								<Button asChild variant="ghost" className="rounded-full">
									<Link href={`/dashboard/snippets/${s.id}`}>View</Link>
								</Button>
								<Button
									asChild
									className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
								>
									<Link href={`/dashboard/snippets/${s.id}/edit`}>Edit</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</AppShell>
	);
}
