import React from 'react';

export default function page() {
  return (
    <main className="mt-8 space-y-6">
      <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        About page
      </h1>
      <section>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Overview
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          This is an open-source blog application built with Next.js, Prisma,
          PostgreSQL, and Redux. The project is intended as a learning
          experience for beginners and those looking to contribute to an
          open-source project. The app allows users to create, view, and manage
          blog posts, tags, and user profiles. The goal of this project is
          to be a collaborative and beginner-friendly environment for
          contributors who want to gain experience working on real-world
          applications. We welcome all contributions, whether they are bug
          fixes, new features, or documentation improvements.
        </p>
      </section>
      <section>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Features
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>User authentication and profile management</li>
          <li>Creating, editing, and deleting blog posts</li>
          <li>Tags management for organizing posts</li>
          <li>Responsive design using ShadCN/UI</li>
          <li>State management with Redux Toolkit</li>
        </ul>
      </section>
      <section>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Tech Stack
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Frontend: Next.js</li>
          <li>Backend: Next.js API Routes</li>
          <li>Database: PostgreSQL</li>
          <li>ORM: Prisma</li>
          <li>State Management: Redux Toolkit</li>
          <li>Auth solution: NextAuth.js</li>
          <li>Styling: ShadCN/UI</li>
        </ul>
      </section>
    </main>
  );
}
