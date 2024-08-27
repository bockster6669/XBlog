import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '../../../../../prisma/db';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Username',
          type: 'email',
          placeholder: 'jsmith@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;
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
  ],
};
