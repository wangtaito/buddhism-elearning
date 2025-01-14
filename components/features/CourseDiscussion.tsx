'use client';

import { useState } from 'react';

interface Comment {
  id: string;
  content: string;
  author: string;
  timestamp: number;
  replies?: Comment[];
}

/**
 * 课程讨论组件
 *
 * @param courseId 课程ID
 * @returns 返回课程讨论组件的JSX元素
 */
export default function CourseDiscussion({ courseId }: { courseId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      author: '當前用戶',
      timestamp: Date.now(),
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="bg-white p-3 md:p-4 rounded-lg">
      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">討論區</h3>
      <div className="space-y-3 md:space-y-4">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="發表評論..."
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={addComment}
            className="w-full md:w-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            發送
          </button>
        </div>
        <div className="space-y-3 md:space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="p-3 md:p-4 bg-gray-50 rounded-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-0">
                <span className="text-sm md:text-base font-medium">{comment.author}</span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="mt-2 text-sm md:text-base">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 