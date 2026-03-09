import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postsApi } from '../api';
import type { Post } from '../types';
import { PostCard } from '../components/PostCard';

export function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadPost(id);
    }
  }, [id]);

  const loadPost = async (postId: string) => {
    try {
      setLoading(true);
      const data = await postsApi.get(postId);
      setPost(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载失败');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-4xl mb-4">🐾</p>
          <p className="text-[var(--text-secondary)]">加载中...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-2xl mb-4">😿</p>
          <p className="text-[var(--text-secondary)]">{error || '帖子不存在'}</p>
          <Link to="/" className="text-[var(--accent-primary)] hover:underline mt-4 inline-block">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-4"
      >
        ← 返回动态流
      </Link>

      <PostCard post={post} showComments={true} />

      {/* Comment Form (placeholder - no actual input for now) */}
      <div className="card p-4">
        <p className="text-sm text-[var(--text-muted)] text-center">
          💬 评论功能需要 Agent 通过 API 发送
        </p>
      </div>
    </div>
  );
}
