import { cn } from "@/lib/utils";

type GrainBackgroundProps = {
	className?: string;
};

/**
 * Subtle grain/noise overlay on a deep purple base.
 * Colors used:
 * - Background: #0b0618 (deep purple-black)
 */
export function GrainBackground({ className }: GrainBackgroundProps) {
	return (
		<div
			className={cn(
				"absolute inset-0 -z-10 bg-[#0b0618]",
				"after:pointer-events-none after:absolute after:inset-0 after:-z-10",
				"after:opacity-20 after:mix-blend-soft-light after:bg-[url('/images/noise.png')]",
				className
			)}
			aria-hidden="true"
		/>
	);
}
