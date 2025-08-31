"use client";

import type * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { GlassCard } from "@/components/ui/glass-card";
import CodeBlock from "@/components/ui/code-block";

type Tool = "vscode" | "neovim" | "zed" | "other";
type Language = "json" | "yaml" | "toml" | "lua" | "vim";

type EditConfigFormProps = {
	id: string;
	initial?: {
		name?: string;
		tool?: Tool;
		filePath?: string;
		language?: Language;
		isPublic?: boolean;
		description?: string;
		content?: string;
	};
	onSave?: (data: {
		id: string;
		name: string;
		tool: Tool;
		filePath: string;
		language: Language;
		isPublic: boolean;
		description: string;
		content: string;
		updatedAt: string;
	}) => Promise<void> | void;
};

const toolOptions: { value: Tool; label: string }[] = [
	{ value: "vscode", label: "VS Code" },
	{ value: "neovim", label: "Neovim" },
	{ value: "zed", label: "Zed" },
	{ value: "other", label: "Other" },
];

const languageOptions: { value: Language; label: string }[] = [
	{ value: "json", label: "JSON" },
	{ value: "yaml", label: "YAML" },
	{ value: "toml", label: "TOML" },
	{ value: "lua", label: "Lua" },
	{ value: "vim", label: "Vimscript" },
];

export default function EditConfigForm({ id, initial, onSave }: EditConfigFormProps) {
	const [name, setName] = useState(initial?.name ?? "User Settings");
	const [tool, setTool] = useState<Tool>(initial?.tool ?? "vscode");
	const [filePath, setFilePath] = useState(initial?.filePath ?? (tool === "vscode" ? "settings.json" : "init.lua"));
	const [language, setLanguage] = useState<Language>(
		initial?.language ?? (tool === "vscode" ? "json" : tool === "neovim" ? "lua" : "json")
	);
	const [isPublic, setIsPublic] = useState(initial?.isPublic ?? true);
	const [description, setDescription] = useState(initial?.description ?? "");
	const [content, setContent] = useState(
		initial?.content ??
			(tool === "vscode"
				? '{\n  "editor.fontSize": 14,\n  "files.exclude": { "**/.DS_Store": true }\n}'
				: tool === "neovim"
				? "-- init.lua\nvim.o.number = true\nvim.o.tabstop = 2\n"
				: "# config here\n")
	);
	const [saving, setSaving] = useState(false);

	// Keep sensible defaults in sync when tool changes (only if not provided from initial)
	useEffect(() => {
		if (!initial?.filePath) {
			setFilePath(tool === "vscode" ? "settings.json" : tool === "neovim" ? "init.lua" : "config");
		}
		if (!initial?.language) {
			setLanguage(tool === "vscode" ? "json" : tool === "neovim" ? "lua" : "json");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tool]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSaving(true);
		const payload = {
			id,
			name,
			tool,
			filePath,
			language,
			isPublic,
			description,
			content,
			updatedAt: new Date().toISOString(),
		};
		try {
			if (onSave) {
				await onSave(payload);
			} else {
				// Replace with server action or API call
				console.log("[v0] EditConfigForm payload:", payload);
			}
		} finally {
			setSaving(false);
		}
	}

	return (
		<motion.form
			onSubmit={handleSubmit}
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.22, ease: "easeOut" }}
			className="space-y-6"
		>
			<GlassCard variant="purple" className="p-4 sm:p-6">
				<div className="grid gap-4 sm:gap-6 md:grid-cols-2">
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="VS Code settings"
							/>
						</div>

						<div className="space-y-2">
							<Label>Tool</Label>
							<Select value={tool} onValueChange={(val: Tool) => setTool(val)}>
								<SelectTrigger>
									<SelectValue placeholder="Select tool" />
								</SelectTrigger>
								<SelectContent>
									{toolOptions.map((t) => (
										<SelectItem key={t.value} value={t.value}>
											{t.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="filePath">File path / name</Label>
							<Input
								id="filePath"
								placeholder={tool === "vscode" ? "settings.json" : "init.lua"}
								value={filePath}
								onChange={(e) => setFilePath(e.target.value)}
							/>
						</div>

						<div className="space-y-2">
							<Label>Language</Label>
							<Select value={language} onValueChange={(val: Language) => setLanguage(val)}>
								<SelectTrigger>
									<SelectValue placeholder="Select language" />
								</SelectTrigger>
								<SelectContent>
									{languageOptions.map((l) => (
										<SelectItem key={l.value} value={l.value}>
											{l.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="flex items-center justify-between rounded-md border bg-background/60 p-3">
							<div className="space-y-0.5">
								<Label className="text-sm">Public</Label>
								<p className="text-xs text-muted-foreground">Make this config visible to others</p>
							</div>
							<Switch checked={isPublic} onCheckedChange={setIsPublic} />
						</div>

						<div className="space-y-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Short description of this configuration"
								className="min-h-[88px]"
							/>
						</div>
					</div>

					<div className="space-y-3">
						<div className="space-y-2">
							<Label htmlFor="content">Config content</Label>
							<Textarea
								id="content"
								value={content}
								onChange={(e) => setContent(e.target.value)}
								className="min-h-[220px] font-mono text-sm"
								placeholder="// Paste your configuration here"
							/>
						</div>

						<GlassCard variant="purple" className="overflow-hidden p-0">
							<div className="border-b px-3 py-2 text-xs text-muted-foreground">Preview ({language})</div>
							<div className="relative max-h-[360px] overflow-auto">
								<CodeBlock code={content} language={language} className="rounded-none border-0" />
							</div>
						</GlassCard>
					</div>
				</div>

				<div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
					<Button variant="outline" type="button" asChild className="rounded-full bg-transparent">
						<a href={`/configs/${id}`}>Cancel</a>
					</Button>
					<Button type="submit" disabled={saving} className="rounded-full">
						{saving ? "Saving..." : "Save changes"}
					</Button>
				</div>
			</GlassCard>
		</motion.form>
	);
}
