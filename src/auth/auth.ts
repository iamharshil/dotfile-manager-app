import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Google, GitHub],
	callbacks: {
		async session({ session, token, user }) {
			// manage next-auth session here
			return session;
		},
	},
	pages: {
		signIn: "/auth/signin",
	},
});
