import { authenticate } from "api/login";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 3000
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { type: 'text', label: 'Username'},
        password: { type: 'text', label: 'Password' }
      },
      async authorize(credentials) {
        const res = await authenticate(credentials);

        if (!res.isMatch) {
          return null;
        }

        return {
          username: res.username,
          apiKey: res.apiKey
        };
      }
    })
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          user: user
        }
      }

      return token;
    },
    async session({ session, token}) {
      session.user = token.user;
      
      return session;
    }
  }
};

export default NextAuth(authOptions);