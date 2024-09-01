import { Prisma, PrismaClient } from '@prisma/client';
import { tags, users } from '../constants/prisma-seed.constants';
const prisma = new PrismaClient();

async function seedTags() {
  try {
    await Promise.all(
      tags.map((tag) =>
        prisma.tag.upsert({
          where: { name: tag.name },
          create: tag,
          update: {},
        })
      )
    );
    console.log('Tags has been seeded');
  } catch (error) {
    console.log('Error creating tags:', error);
  }
}

async function seedUsers() {
  try {
    await Promise.all(
      users.map((user) =>
        prisma.user.upsert({
          where: { username: user.username },
          create: user,
          update: {},
        })
      )
    );
    console.log('Users has been seeded');
  } catch (error) {
    console.log('Error creating user:', error);
  }
}

async function seedPosts() {
  try {
    const [user1, user2] = await prisma.user.findMany({ take: 2 });
    const [tag1, tag2] = await prisma.tag.findMany({ take: 2 });
    const tags = await prisma.tag.findMany();
    const posts: Prisma.PostCreateInput[] = [
      {
        title: 'Introduction to Next.js',
        content:
          'This post covers the basics of Next.js, a popular React framework.',
        author: { connect: { id: user1.id } },
        excerpt: 'Excerpt',
        tags: {
          connect: tags.map((tag) => ({ id: tag.id })),
        },
      },
      {
        title: 'Understanding Prisma',
        content:
          'This post explains how to use Prisma with Next.js for database interactions.',
        author: { connect: { id: user2.id } },
        excerpt: 'Excerpt',
        tags: {
          connect: tags.map((tag) => ({ id: tag.id })),
        },
      },
    ];

    await Promise.all(posts.map((post) => prisma.post.create({ data: post })));
    console.log('Posts has been seeded');
  } catch (error) {
    console.log('Error creating posts:', error);
  }
}

async function seedComments() {
  try {
    const [post1, post2] = await prisma.post.findMany({ take: 2 });
    const [user1, user2] = await prisma.user.findMany({ take: 2 });

    const comments = [
      {
        content: 'Great post! Very informative.',
        post: { connect: { id: post1.id } },
        author: { connect: { id: user1.id } },
        createdAt: new Date('2024-08-22T08:00:00Z'),
      },
      {
        content: 'Thanks for sharing this. Learned a lot!',
        post: { connect: { id: post2.id } },
        author: { connect: { id: user2.id } },
        createdAt: new Date('2024-08-23T09:00:00Z'),
      },
    ];

    await Promise.all(comments.map((comment) => prisma.comment.create({ data: comment })));
    console.log('Comments has been seeded');
  } catch (error) {
    console.log('Error creating comments:', error);
  }
}

async function main() {
  await seedTags();
  await seedUsers();
  await seedPosts();
  await seedComments();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
