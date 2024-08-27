'use client';

import React, { useEffect } from 'react';
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
import { useRouter } from 'next/navigation';
import { useToastContext } from '../../../../contexts/toast.context';
import { useGetPaginatedPosts } from './hooks';

const ListPosts = () => {
  const postPerPage = 2;
  const toast = useToastContext();
  const {
    posts,
    postsStatus,
    postsError,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useGetPaginatedPosts(postPerPage);
  const router = useRouter();

  useEffect(() => {
    if (postsError) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: postsError,
      });
    }
  }, [postsError, toast]);

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
                <TableRow
                  key={post.id}
                  onClick={() => router.push(`/post/${post.id}`)}
                  className=" cursor-pointer"
                >
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author.username}</TableCell>
                  <TableCell>{post.category.name}</TableCell>
                  <TableCell>{post.content}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <Pagination className="">
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
              <PaginationNext className="" href="#" onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ListPosts;
