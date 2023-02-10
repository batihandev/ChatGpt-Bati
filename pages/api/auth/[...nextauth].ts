import NextAuth, { User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
interface NextAuthUserWithStringId extends NextAuthUser {
  id: string;
  name: string;
  image: string;
  email: string;
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.picture,
        } as NextAuthUserWithStringId;
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};
export default NextAuth(authOptions);
