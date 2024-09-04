import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { SignInFormSchema } from '../../../../resolvers/sign-in-form.resolver';
import { UserRepo } from '@/repository/user.repo';

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
          throw new Error('No credentials were found');
        }
        const validatedFields = SignInFormSchema.safeParse(credentials);

        if (!validatedFields.success) {
          throw new Error('Credentials are not in valid format');
        }
        const { email, password } = validatedFields.data;

        let user = null;

        try {
          user = await UserRepo.findUnique({ where: { email } });
        } catch (error) {
          console.log(error);
          throw new Error('Error occured while searching for a user');
        }

        if (!user) {
          throw new Error("This user doesn't exists");
        }

        const isTheSamePass = await bcrypt.compare(password, user.password);

        if (!isTheSamePass) throw new Error('Wrong credentials');

        return user;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {},
  pages: {
    signIn: '/signin',
  },
};
