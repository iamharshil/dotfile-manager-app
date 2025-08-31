"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export default function ToasterProvider() {
	// fetch theme from next-theme
	const { theme } = useTheme();

	const allowedThemes = ["dark", "light", "system"];
	const toasterTheme = allowedThemes.includes(theme as string) ? (theme as "dark" | "light" | "system") : "dark";

	return <Toaster richColors theme={toasterTheme} closeButton position="top-right" />;
}
