import { getErrorMessage, wait } from '@/lib/utils';
import { CommentRepo } from '@/repository/comment.repo';
import { NextRequest, NextResponse } from 'next/server';
import {
  UpdateCommentSchema,
} from '@/resolvers/comment.resolver';

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const commentId = params.id;

//   if (!commentId) {
//     return NextResponse.json(
//       { error: 'commentId is missing in parameters.' },
//       { status: 400 }  // Changed to 400 Bad Request
//     );
//   }

//   try {
//     const replies = await CommentRepo.findMany({
//       where: { parentId: commentId },
//       include: {
//         author: true,
//         replies: true,
//       },
//     });
//     return NextResponse.json(replies, { status: 200 });
//   } catch (error) {
//     const message = getErrorMessage(error);
//     console.error('Error fetching replies:', message); // Log error for debugging
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

// export async function POST(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const parentId = params.id;

//   if (!parentId) {
//     return NextResponse.json(
//       { error: 'parentId is missing in parameters.' },
//       { status: 400 }  // Changed to 400 Bad Request
//     );
//   }

//   const body = await req.json();

//   const validatedFields = CreateCommentSchema.safeParse(body)

//   if (!validatedFields.success) {
//     const errorMessages = validatedFields.error.errors.map(error => error.message).join(", ");
//     return NextResponse.json(
//       { error: errorMessages },
//       { status: 400 } // 400 Bad Request
//     );
//   }

//   const { content, postId } = validatedFields.data;

//   if (!content || !postId) {
//     return NextResponse.json(
//       { error: 'Content and postId are required.' },
//       { status: 400 }  // Changed to 400 Bad Request
//     );
//   }

//   try {
//     const trimContent = content.trim();
//     if (!trimContent) {
//       return NextResponse.json(
//         { error: 'Cannot create comment with empty text.' },
//         { status: 400 } // 400 Bad Request
//       );
//     }

//     const session = await getServerSession(authOptions);

//     if (!session || !session.user || !session.user.email) {
//       return NextResponse.json(
//         { error: 'User is not authenticated or session is invalid.' },
//         { status: 401 }  // Changed to 401 Unauthorized
//       );
//     }

//     const user = await UserRepo.findUnique({
//       where: { email: session.user.email },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { error: 'User profile not found.' },
//         { status: 404 }  // Changed to 404 Not Found
//       );
//     }

//     const newComment = await CommentRepo.create({
//       data: {
//         content: trimContent,
//         author: { connect: { id: user.id } },
//         post: { connect: { id: postId } },
//         parent: { connect: { id: parentId } },
//       },
//     });

//     return NextResponse.json(newComment, { status: 201 });  // 201 Created
//   } catch (error) {
//     const message = getErrorMessage(error);
//     console.error('Error creating a comment:', message);  // Log error for debugging
//     return NextResponse.json({ error: 'Internal server error: ' + message }, { status: 500 });
//   }
// }

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const commentId = params.id;

  if (!commentId) {
    return NextResponse.json(
      { error: 'commentId is missing in parameters.' },
      { status: 400 } // Changed to 400 Bad Request
    );
  }

  const body = await req.json();
  const validatedFields = UpdateCommentSchema.safeParse(body);

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors
      .map((error) => error.message)
      .join(', ');
    return NextResponse.json(
      { error: errorMessages },
      { status: 400 } // 400 Bad Request
    );
  }
  const { data } = validatedFields.data;

  try {
    const updatedComment = await CommentRepo.update({
      where: { id: commentId },
      data,
    });
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('Error updating a comment:', message); // Log error for debugging
    return NextResponse.json(
      { error: 'Failed to update comment: ' + message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const commentId = params.id;

  if (!commentId) {
    return NextResponse.json(
      { error: 'commentId is missing in parameters.' },
      { status: 400 } // Changed to 400 Bad Request
    );
  }

  try {
    const deletedComment = await CommentRepo.delete({
      where: { id: commentId },
    });
    return NextResponse.json(deletedComment, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('Error deleting a comment:', message); // Log error for debugging
    return NextResponse.json(
      { error: 'Failed to delete comment: ' + message },
      { status: 500 }
    );
  }
}
