import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import { db } from '../../../../../prisma/db';
import bcrypt from 'bcryptjs';
import { SignInFormSchema } from '../../../../../resolvers/sign-in-form.resolver';

export const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const validatedFields = SignInFormSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }
        const { email, password } = validatedFields.data;
        try {
          const user = await db.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) return null;

          const isTheSamePass = await bcrypt.compare(password, user.password);

          if (isTheSamePass) return user;

          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
   
  },
  pages: {
    signIn: '/signin',
  },
};
