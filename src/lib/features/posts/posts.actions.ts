import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreatePostFormValues } from '../../../../resolvers/create-post-form.resolver';
import axios from 'axios';
import { PostPostsResponse } from '@/app/api/posts/route';
import { getErrorMessage } from '@/lib/utils';


export const createdPost = createAsyncThunk(
  'posts/createdPost',
  async (body: CreatePostFormValues) => {
    try {
      const response = await axios.post<PostPostsResponse>(
        'http://localhost:3000/api/post',
        body
      );
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      throw message;
    }
  }
);
