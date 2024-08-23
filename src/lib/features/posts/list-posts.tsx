'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { getErrorMessage, isAsyncThunkConditionError } from '@/lib/utils';
import { useToast } from '../../../components/ui/use-toast';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchPaginatedPosts } from './posts.slice';
import { useRouter } from 'next/navigation';

const ListPosts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const totalPosts = useAppSelector((state) => state.posts.totalPosts);
  const postsStatus = useAppSelector((state) => state.posts.status);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { toast } = useToast();
  const postPerPage = 2;

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await dispatch(
          fetchPaginatedPosts({ postPerPage, currentPage })
        ).unwrap();

        setTotalPages(Math.ceil(totalPosts / postPerPage));
      } catch (error) {
        if (!isAsyncThunkConditionError(error)) {
          const message = getErrorMessage(error);
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: message,
          });
        }
      }
    };

    fetchPosts();
  }, [currentPage, toast, dispatch, totalPosts]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <Table className="">
        <TableCaption>A list of blog posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Content</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {postsStatus === 'pending'
            ? Array.from<number>({ length: postPerPage }).map((_, index) => (
                <tr key={index}>
                  <td colSpan={5}>
                    <Skeleton className="h-12 my-1" />
                  </td>
                </tr>
              ))
            : posts.map((post) => (
                <TableRow key={post.id} onClick={()=>router.push(`/post/${post.id}`)}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author.username}</TableCell>
                  <TableCell>{post.category.name}</TableCell>
                  <TableCell>{post.content}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={handlePrevPage} />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 3 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationNext href="#" onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ListPosts;
