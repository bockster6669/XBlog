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
import axios from 'axios';
import { Category, Post, User } from '@prisma/client';
import { GetPostsResponse } from '@/app/api/posts/route';
import { getErrorMessage } from '@/lib/utils';
import { useToast } from '../ui/use-toast';

type PostWithAutorAndCategory = Post & {
  category: Category;
  author: User;
};

const ListPosts: React.FC = () => {
  const [posts, setPosts] = useState<PostWithAutorAndCategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const postPerPage = 2;
      const skip = (currentPage - 1) * postPerPage;

      try {
        const response = await axios.get<GetPostsResponse>(
          `/api/posts?skip=${skip}&take=${postPerPage}`
        );
        const data = response.data;
        if ('error' in data) {
          return;
        }
        setPosts(data.posts);
        setTotalPages(Math.ceil(data.totalPosts / postPerPage));
      } catch (error) {
        const message = getErrorMessage(error);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

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
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      {loading ? (
        <div>
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-full mb-2" />
        </div>
      ) : (
        <Table>
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
            {posts.length > 1 &&
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author.username}</TableCell>
                  <TableCell>{post.category.name}</TableCell>
                  <TableCell>{post.content}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
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
