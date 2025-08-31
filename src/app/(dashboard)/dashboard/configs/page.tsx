"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppShell from "@/components/app-shell";

const mockConfigs = [
	{ id: "a", title: "VSCode settings.json", tool: "VSCode", updatedAt: "5d" },
	{ id: "b", title: "Neovim init.lua", tool: "Neovim", updatedAt: "1w" },
	{ id: "c", title: "Zsh .zshrc", tool: "Zsh", updatedAt: "3w" },
];

export default function Page() {
	const [q, setQ] = useState("");
	const filtered = mockConfigs.filter(
		(c) => c.title.toLowerCase().includes(q.toLowerCase()) || c.tool.toLowerCase().includes(q.toLowerCase())
	);

	return (
		<AppShell
			title="Configs"
			description="Store and reuse configuration files for your favorite tools."
			action={{ href: "/dashboard/configs/new", label: "New config" }}
		>
			<div className="mb-4 flex items-center gap-2">
				<Input
					value={q}
					onChange={(e) => setQ(e.target.value)}
					placeholder="Search configs by title or tool"
					className="max-w-md rounded-full"
					aria-label="Search configs"
				/>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{filtered.map((c) => (
					<Card
						key={c.id}
						className="border-white/20 bg-white/50 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/40"
					>
						<CardHeader className="pb-2">
							<CardTitle className="text-base">{c.title}</CardTitle>
						</CardHeader>
						<CardContent className="flex items-end justify-between gap-4">
							<div className="min-w-0">
								<p className="text-sm text-muted-foreground">Tool: {c.tool}</p>
								<p className="text-xs text-muted-foreground">Updated {c.updatedAt} ago</p>
							</div>
							<div className="flex items-center gap-2">
								<Button asChild variant="ghost" className="rounded-full">
									<Link href={`/dashboard/configs/${c.id}`}>View</Link>
								</Button>
								<Button
									asChild
									className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
								>
									<Link href={`/dashboard/configs/${c.id}/edit`}>Edit</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</AppShell>
	);
}
