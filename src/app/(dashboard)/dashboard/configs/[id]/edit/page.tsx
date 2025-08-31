import AppShell from "@/components/app-shell";
import EditConfigForm from "@/components/edit-config";

export default function ConfigEditPage({ params }: { params: { id: string } }) {
	const { id } = params;

	const initial = {
		name: "User Settings",
		tool: "vscode" as const,
		filePath: "settings.json",
		language: "json" as const,
		isPublic: true,
		description: "Personal VS Code preferences",
		content: '{\n  "editor.formatOnSave": true,\n  "files.autoSave": "onFocusChange"\n}',
	};

	return (
		<AppShell
			title="Edit config"
			description="Update name, tool, file path, and content. Changes are saved to your workspace."
		>
			<div className="mx-auto w-full max-w-5xl px-4 py-6 sm:py-8">
				<EditConfigForm id={id} initial={initial} />
			</div>
		</AppShell>
	);
}
