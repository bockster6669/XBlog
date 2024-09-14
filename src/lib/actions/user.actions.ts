'use server';

import { UserRepo } from '@/repository/user.repo';
import { getErrorMessage } from '../utils';

export const deleteUser = async (email: string) => {
  try {
    await UserRepo.delete({
      where: {
        email,
      },
    });
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  }
};
