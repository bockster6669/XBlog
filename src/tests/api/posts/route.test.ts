import { NextRequest } from 'next/server';
import { GET } from '@/app/api/posts/route';
import { PostRepo } from '@/repository/post.repo';

// Mock the PostRepo
jest.mock('@/repository/post.repo', () => ({
  PostRepo: {
    findMany: jest.fn(),
  },
}));

describe('GET /api/posts', () => {
  it('returns posts when valid parameters are provided', async () => {
    const mockPosts = [{ id: '1', title: 'Test Post' }];
    (PostRepo.findMany as jest.Mock).mockResolvedValue(mockPosts);

    const req = new NextRequest('http://localhost:3000/api/posts?search=test&take=10&orderBy={"createdAt":"desc"}');
    const res = await GET(req);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual(mockPosts);
  });

  it('returns 400 when invalid parameters are provided', async () => {
    const req = new NextRequest('http://localhost:3000/api/posts?take=invalid');
    const res = await GET(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('Invalid search parameters');
  });

  it('returns 500 when an error occurs', async () => {
    (PostRepo.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

    const req = new NextRequest('http://localhost:3000/api/posts');
    const res = await GET(req);

    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toContain('Failed to fetch posts');
  });
});