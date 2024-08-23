import { fetchPaginatedPosts } from '@/lib/features/posts/posts.slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useState, useEffect } from 'react';

const useGetPaginatedPosts = (postPerPage: number) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const totalPosts = useAppSelector((state) => state.posts.totalPosts);
  const postsStatus = useAppSelector((state) => state.posts.status);
  const postsError = useAppSelector((state) => state.posts.error);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalPosts / postPerPage);

  useEffect(() => {
    dispatch(fetchPaginatedPosts({ postPerPage, currentPage }));
  }, [dispatch, postPerPage, currentPage]);

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
