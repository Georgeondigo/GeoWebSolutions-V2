import bcrypt from "bcryptjs";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "GeoWeb Admin",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const adminEmail = process.env.GEOWEB_ADMIN_EMAIL;

        const adminPasswordHashBase64 =
          process.env.GEOWEB_ADMIN_PASSWORD_HASH_B64;

        const adminPasswordHash = adminPasswordHashBase64
          ? Buffer.from(adminPasswordHashBase64, "base64").toString("utf8")
          : undefined;

        if (!adminEmail || !adminPasswordHash) {
          throw new Error("GeoWeb admin credentials are not configured.");
        }

        const emailMatches = credentials.email === adminEmail;

        if (!emailMatches) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          credentials.password,
          adminPasswordHash,
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: "geoweb-admin",
          email: adminEmail,
          name: "GeoWeb Admin",
        };
      },
    }),
  ],

  pages: {
    signIn: "/admin/login",
  },
};

export default NextAuth(authOptions);
