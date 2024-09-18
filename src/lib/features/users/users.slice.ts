import { User } from '@prisma/client';
import { apiSlice } from '../api/apiSlice';
import { PersonalInfoValues } from '@/resolvers/forms/personal-info-form.resolver';
import { SecurityValues } from '@/resolvers/forms/security-form.resolver';

export const apiSliceWithUsers = apiSlice
  .enhanceEndpoints({ addTagTypes: ['User'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserData: builder.query<User, string>({
        query: (userId) => `/users/${userId}`,
        providesTags: (result, err, arg) => [{ type: 'User', id: arg }],
      }),
      updateUserData: builder.mutation<
        User,
        { userId: string; newUserData: PersonalInfoValues }
      >({
        query: ({ userId, newUserData }) => ({
          url: `/users/${userId}`,
          method: 'PATCH',
          body: newUserData,
        }),
        invalidatesTags: (result, err, arg) => [
          { type: 'User', id: result?.id },
        ],
      }),
      updateUserPass: builder.mutation<
        void,
        { userId: string; data: SecurityValues }
      >({
        query: ({
          userId,
          data: { currentPassword, newPassword, confirmPassword },
        }) => ({
          url: `/users/${userId}/password`,
          method: 'PATCH',
          body: { currentPassword, newPassword, confirmPassword },
        }),
      }),
    }),
  });

export const {
  useGetUserDataQuery,
  useUpdateUserDataMutation,
  useUpdateUserPassMutation,
} = apiSliceWithUsers;
