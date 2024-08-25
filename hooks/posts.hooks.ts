import { fetchPaginatedPosts } from '@/lib/features/posts/posts.slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useState } from 'react';

const useGetPaginatedPosts = (postPerPage: number) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  
  dispatch(fetchPaginatedPosts({ postPerPage, currentPage }));

  const posts = useAppSelector((state) => state.posts.posts);
  const totalPosts = useAppSelector((state) => state.posts.totalPosts);
  const postsStatus = useAppSelector((state) => state.posts.status);
  const postsError = useAppSelector((state) => state.posts.error);
  const totalPages = Math.ceil(totalPosts / postPerPage);

  console.log({
    postsError,
    posts,
    totalPosts,
    postsStatus,
    currentPage,
    setCurrentPage,
    totalPages,
  });
  return {
    postsError,
    posts,
    totalPosts,
    postsStatus,
    currentPage,
    setCurrentPage,
    totalPages,
  };
};

export default useGetPaginatedPosts;
