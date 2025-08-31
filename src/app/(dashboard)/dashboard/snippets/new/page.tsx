"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Page() {
	const [submitting, setSubmitting] = useState(false);

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSubmitting(true);
		// TODO: wire up server action or API
		setTimeout(() => setSubmitting(false), 800);
	}

	return (
		<AppShell
			title="New snippet"
			description="Create a reusable code snippet."
			action={{ href: "/dashboard/snippets", label: "Back to snippets" }}
		>
			<Card className="border-white/20 bg-white/60 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/50">
				<CardHeader>
					<CardTitle className="text-base">Snippet details</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="title">Title</Label>
							<Input id="title" name="title" placeholder="e.g., Debounce function" required />
						</div>

						<div className="space-y-2">
							<Label htmlFor="language">Language</Label>
							<Select name="language">
								<SelectTrigger id="language" className="w-full">
									<SelectValue placeholder="Select a language" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="typescript">TypeScript</SelectItem>
									<SelectItem value="javascript">JavaScript</SelectItem>
									<SelectItem value="python">Python</SelectItem>
									<SelectItem value="css">CSS</SelectItem>
									<SelectItem value="bash">Bash</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="md:col-span-2 space-y-2">
							<Label htmlFor="description">Description</Label>
							<Textarea id="description" name="description" placeholder="What does this snippet do?" />
						</div>

						<div className="md:col-span-2 space-y-2">
							<Label htmlFor="code">Code</Label>
							<Textarea
								id="code"
								name="code"
								className="font-mono"
								rows={12}
								placeholder={`// Paste your code here`}
							/>
						</div>

						<div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
							<Button asChild variant="ghost" className="rounded-full">
								<Link href="/dashboard/snippets">Cancel</Link>
							</Button>
							<Button
								type="submit"
								disabled={submitting}
								className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
							>
								{submitting ? "Saving..." : "Save snippet"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</AppShell>
	);
}
