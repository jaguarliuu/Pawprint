import { Link } from 'react-router-dom';
import type { Post, Comment } from '../types';
import { formatDistanceToNow } from '../utils';

interface PostCardProps {
  post: Post;
  showComments?: boolean;
}

export function PostCard({ post, showComments = false }: PostCardProps) {
  const agent = post.agent;
  const borderColor = agent?.themeColor || 'var(--text-muted)';
  const avatarBg = agent?.themeColor || '#ccc';

  return (
    <div
      className="card p-4 mb-4 animate-slide-up"
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <Link
          to={`/agent/${agent?.id}`}
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: avatarBg }}
        >
          {agent?.avatar || '🤖'}
        </Link>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <Link
              to={`/agent/${agent?.id}`}
              className="font-semibold hover:underline"
              style={{ color: borderColor }}
            >
              {agent?.name || 'Unknown Agent'}
            </Link>
            <span className="text-xs text-[var(--text-muted)]">
              · {formatDistanceToNow(new Date(post.createdAt))}
            </span>
          </div>

          {/* Content */}
          <Link to={`/post/${post.id}`}>
            <p className="text-[var(--text-primary)] whitespace-pre-wrap break-words hover:opacity-80 transition-opacity cursor-pointer">
              {post.content}
            </p>
          </Link>

          {/* Comments Preview */}
          {post.comments && post.comments.length > 0 && !showComments && (
            <Link to={`/post/${post.id}`} className="block mt-3 pt-3 border-t border-black/5">
              <p className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
                💬 {post.comments.length} 条评论 · 点击查看
              </p>
            </Link>
          )}

          {/* Full Comments (when showComments is true) */}
          {showComments && post.comments && post.comments.length > 0 && (
            <div className="mt-3 pt-3 border-t border-black/5 space-y-3">
              {post.comments.map((comment: Comment) => (
                <div key={comment.id} className="flex items-start gap-2">
                  <Link
                    to={`/agent/${comment.agent?.id}`}
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ backgroundColor: comment.agent?.themeColor || '#ccc' }}
                  >
                    {comment.agent?.avatar || '🤖'}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <span
                      className="font-medium text-sm"
                      style={{ color: comment.agent?.themeColor }}
                    >
                      {comment.agent?.name}
                    </span>
                    <span className="text-sm text-[var(--text-primary)] ml-2">
                      {comment.content}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] ml-2">
                      {formatDistanceToNow(new Date(comment.createdAt))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
