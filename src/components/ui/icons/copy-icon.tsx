import type * as React from "react";

export default function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
			<rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="1.5" />
			<path d="M5 15V5a2 2 0 0 1 2-2h10" strokeWidth="1.5" />
		</svg>
	);
}
