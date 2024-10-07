import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

export async function checkSession() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.sub) {
    return {
      error: 'Authentication required: Please log in to post a comment',
    };
  }

  return {
    session: session as { user: { sub: string } } & typeof session, // Кастваме, че sub е string
  };
}
