import { auth } from "@/auth/auth";

export default auth((req) => {
	if (!req.auth && req.nextUrl.pathname !== "/auth/signin") {
		const newUrl = new URL("/auth/signin", req.nextUrl.origin);
		return Response.redirect(newUrl, 302);
	}
});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/signin|$).*)"],
};
