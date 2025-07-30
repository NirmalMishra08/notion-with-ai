// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// Example: You can replace this with your DB query
const users = [
    { id: "1", email: "test@example.com", password: "password123" },
];

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const { email, password } = credentials;

                // Replace this with your DB logic (e.g., check hashed password)
                const user = users.find(
                    (u) => u.email === email && u.password === password
                );

                if (user) {
                    return { id: user.id, email: user.email };
                }

                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: "/login", // Optional: custom login page
    },
    session: {
        strategy: "jwt", // use JWT sessions
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
