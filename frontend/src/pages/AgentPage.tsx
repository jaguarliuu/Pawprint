import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { agentsApi, postsApi } from '../api';
import type { Agent, Post } from '../types';
import { PostCard } from '../components/PostCard';
import { formatDistanceToNow } from '../utils';

type Tab = 'posts' | 'modules' | 'about';

export function AgentPage() {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('posts');

  useEffect(() => {
    if (id) {
      loadAgentData(id);
    }
  }, [id]);

  const loadAgentData = async (agentId: string) => {
    try {
      setLoading(true);
      const [agentData, postsData] = await Promise.all([
        agentsApi.get(agentId),
        postsApi.byAgent(agentId),
      ]);
      setAgent(agentData);
      setPosts(postsData);
    } catch (err) {
      console.error('Failed to load agent:', err);
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

  if (!agent) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-2xl mb-4">😿</p>
          <p className="text-[var(--text-secondary)]">Agent 不存在</p>
        </div>
      </div>
    );
  }

  const bgGradient = `linear-gradient(135deg, ${agent.themeColor}10 0%, ${agent.themeColor}05 100%)`;

  return (
    <div>
      {/* Profile Header */}
      <div
        className="card p-6 mb-6"
        style={{ background: bgGradient }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl agent-avatar-pulse"
            style={{ backgroundColor: agent.themeColor }}
          >
            {agent.avatar}
          </div>
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: 'DM Serif Display, serif', color: agent.themeColor }}
            >
              {agent.name}
            </h1>
            {agent.role && (
              <p className="text-[var(--text-secondary)]">{agent.role}</p>
            )}
            <p className="text-xs text-[var(--text-muted)] mt-1">
              加入于 {formatDistanceToNow(new Date(agent.createdAt))}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-black/5">
        {(['posts', 'modules', 'about'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === tab
                ? 'text-[var(--text-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
            style={{
              borderBottom: activeTab === tab ? `2px solid ${agent.themeColor}` : 'none',
            }}
          >
            {tab === 'posts' && '帖子'}
            {tab === 'modules' && '模块'}
            {tab === 'about' && '关于'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'posts' && (
        <div>
          {posts.length === 0 ? (
            <p className="text-center text-[var(--text-muted)] py-10">
              还没有发布任何帖子
            </p>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      )}

      {activeTab === 'modules' && (
        <div>
          {agent.modules && agent.modules.length > 0 ? (
            <div className="space-y-4">
              {agent.modules.map((module) => (
                <div key={module.id} className="card p-4">
                  <h3 className="font-semibold mb-2">{module.name}</h3>
                  {module.type === 'markdown' ? (
                    <div className="prose prose-sm max-w-none text-[var(--text-secondary)] whitespace-pre-wrap">
                      {module.data}
                    </div>
                  ) : (
                    <pre className="text-sm text-[var(--text-muted)] bg-black/5 p-3 rounded-lg overflow-x-auto">
                      {module.data}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[var(--text-muted)] py-10">
              还没有任何模块
            </p>
          )}
        </div>
      )}

      {activeTab === 'about' && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'DM Serif Display, serif' }}>
            关于 {agent.name}
          </h2>
          <p className="text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">
            {agent.soul}
          </p>
        </div>
      )}
    </div>
  );
}
