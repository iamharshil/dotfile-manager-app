"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

type DivProps = React.HTMLAttributes<HTMLDivElement> &
	HTMLMotionProps<"div"> & {
		variant?: "default" | "purple";
	};

export const GlassCard = React.forwardRef<HTMLDivElement, DivProps>(function GlassCard(
	{ className, children, variant = "default", ...props },
	ref
) {
	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 6 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			className={cn(
				"rounded-xl border shadow-sm",
				variant === "purple"
					? [
							// subtle glass on deep purple bg
							"bg-white/[0.06] supports-[backdrop-filter]:bg-white/[0.04]",
							"border-white/10",
							"outline outline-1 -outline-offset-1 outline-white/[0.03]",
							"text-white",
					  ]
					: [
							// original neutral glass (kept for other pages)
							"bg-white/70 dark:bg-zinc-900/60",
							"backdrop-blur-md supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-zinc-900/50",
							"border-black/5 dark:border-white/10",
							"outline outline-1 -outline-offset-1 outline-black/[0.02] dark:outline-white/[0.03]",
					  ],
				"backdrop-blur-md",
				"transition-colors",
				className
			)}
			{...props}
		>
			{children}
		</motion.div>
	);
});
