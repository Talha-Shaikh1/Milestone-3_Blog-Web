'use client';

import { useState } from 'react';

interface Comment {
  name: string;
  comment: string;
}

interface CommentSectionProps {
  postId: string;
  initialComments: Comment[];
}

export default function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, postId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setComments([...comments, { name: formData.name, comment: formData.comment }]);
        setFormData({ name: '', email: '', comment: '' });
      } else {
        alert(data.message || 'Failed to submit comment.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while submitting the comment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">Leave a Comment</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 w-full mb-4"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border p-2 w-full mb-4"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Your Comment"
          className="border p-2 w-full mb-4"
          rows={4}
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Comments</h2>
        {comments.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {comments.map((comment, index) => (
              <li key={index} className="border p-4 rounded-lg">
                <p className="font-semibold">{comment.name}</p>
                <p className="text-gray-700">{comment.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
