"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
	const [initialState, setInitialState] = useState(false);

	useEffect(() => {
		setInitialState(true);
	}, []);

	if (!initialState) return <>{children}</>;
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
