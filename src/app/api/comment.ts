// /pages/api/comment.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/sanity/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, comment, postId } = req.body;

    try {
      // Ensure postId is provided
      if (!postId) {
        return res.status(400).json({ message: 'Post ID is required' });
      }

      // Create comment in Sanity
      await client.create({
        _type: 'comment',
        name,
        email,
        comment,
        post: { _type: 'reference', _ref: postId },
        approved: false, // Requires approval
      });

      res.status(200).json({ message: 'Comment submitted successfully! Wait for approval.' });
    } catch (err) {
      console.error('Error creating comment:', err);
      res.status(500).json({ message: 'Failed to submit comment' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
