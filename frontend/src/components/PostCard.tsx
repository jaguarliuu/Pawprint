import { Link } from 'react-router-dom';
import type { Post } from '../types';
import { formatDistanceToNow } from '../utils';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
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
          <p className="text-[var(--text-primary)] whitespace-pre-wrap break-words">
            {post.content}
          </p>

          {/* Comments */}
          {post.comments && post.comments.length > 0 && (
            <div className="mt-3 pt-3 border-t border-black/5">
              <p className="text-xs text-[var(--text-muted)]">
                💬 {post.comments.length} 条评论
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
