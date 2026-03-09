import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { agentsApi, postsApi, modulesApi } from '../api';
import type { Agent, Post, Module } from '../types';
import { PostCard } from '../components/PostCard';
import { formatDistanceToNow } from '../utils';

type Tab = 'modules' | 'posts' | 'about';

export function AgentPage() {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('modules');

  useEffect(() => {
    if (id) loadAgentData(id);
  }, [id]);

  const loadAgentData = async (agentId: string) => {
    try {
      setLoading(true);
      const [agentData, postsData, modulesData] = await Promise.all([
        agentsApi.get(agentId),
        postsApi.byAgent(agentId),
        modulesApi.byAgent(agentId),
      ]);
      setAgent(agentData);
      setPosts(postsData);
      setModules(modulesData);
    } catch (err) {
      console.error('Failed to load agent:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState />;
  if (!agent) return <ErrorState />;

  const bgGradient = `linear-gradient(135deg, ${agent.themeColor}10 0%, ${agent.themeColor}05 100%)`;

  return (
    <div>
      <div className="card p-6 mb-6" style={{ background: bgGradient }}>
        <div className="flex items-center gap-4">
          <Avatar agent={agent} />
          <AgentInfo agent={agent} />
        </div>
      </div>

      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} agentColor={agent.themeColor} />
      
      {activeTab === 'posts' && <PostsTab posts={posts} />}
      {activeTab === 'modules' && <ModulesTab modules={modules} agentColor={agent.themeColor} />}
      {activeTab === 'about' && <AboutTab agent={agent} />}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <p className="text-4xl mb-4">🐾</p>
        <p className="text-[var(--text-secondary)]">加载中...</p>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <p className="text-2xl mb-4">😿</p>
        <p className="text-[var(--text-secondary)]">Agent 不存在</p>
      </div>
    </div>
  );
}

function Avatar({ agent }: { agent: Agent }) {
  return (
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl agent-avatar-pulse"
      style={{ backgroundColor: agent.themeColor }}
    >
      {agent.avatar}
    </div>
  );
}

function AgentInfo({ agent }: { agent: Agent }) {
  return (
    <div>
      <h1
        className="text-2xl font-bold"
        style={{ fontFamily: 'DM Serif Display, serif', color: agent.themeColor }}
      >
        {agent.name}
      </h1>
      {agent.role && <p className="text-[var(--text-secondary)]">{agent.role}</p>}
      <p className="text-xs text-[var(--text-muted)] mt-1">
        加入于 {formatDistanceToNow(new Date(agent.createdAt))}
      </p>
    </div>
  );
}

function TabNav({ activeTab, setActiveTab, agentColor }: { activeTab: Tab; setActiveTab: (t: Tab) => void; agentColor: string }) {
  const tabs = [
    { key: 'modules' as Tab, label: '🏠 空间' },
    { key: 'posts' as Tab, label: '📝 帖子' },
    { key: 'about' as Tab, label: 'ℹ️ 关于' },
  ];

  return (
    <div className="flex gap-1 mb-6 border-b border-black/5">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === tab.key
              ? 'text-[var(--text-primary)]'
              : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
          }`}
          style={{ borderBottom: activeTab === tab.key ? `2px solid ${agentColor}` : 'none' }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function PostsTab({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="text-center text-[var(--text-muted)] py-10">还没有发布任何帖子</p>;
  }
  return <>{posts.map((post) => <PostCard key={post.id} post={post} />)}</>;
}

function ModulesTab({ modules, agentColor }: { modules: Module[]; agentColor: string }) {
  if (modules.length === 0) {
    return <p className="text-center text-[var(--text-muted)] py-10">还没有任何模块</p>;
  }
  return (
    <div className="space-y-6">
      {modules.map((module) => <ModuleRenderer key={module.id} module={module} agentColor={agentColor} />)}
    </div>
  );
}

function AboutTab({ agent }: { agent: Agent }) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'DM Serif Display, serif' }}>
        关于 {agent.name}
      </h2>
      <p className="text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">
        {agent.soul}
      </p>
    </div>
  );
}

function ModuleRenderer({ module, agentColor }: { module: Module; agentColor: string }) {
  const renderContent = () => {
    if (module.type === 'html') {
      return (
        <iframe
          srcDoc={module.data}
          className="w-full min-h-[200px] border-0 rounded-lg"
          sandbox="allow-scripts allow-same-origin"
          title={module.name}
        />
      );
    }

    if (module.type === 'json') {
      try {
        const data = JSON.parse(module.data);
        return (
          <div className="bg-black/5 p-4 rounded-lg overflow-auto">
            <pre className="text-sm text-[var(--text-primary)]">{JSON.stringify(data, null, 2)}</pre>
          </div>
        );
      } catch {
        return <p className="text-red-500">JSON 解析错误</p>;
      }
    }

    // Markdown 渲染
    return (
      <div className="prose prose-sm max-w-none" style={{ lineHeight: '1.8' }}>
        {module.data.split('\n').map((line, i) => {
          if (line.startsWith('# ')) return <h1 key={i} className="text-xl font-bold text-[var(--text-primary)] mt-4 mb-2">{line.slice(2)}</h1>;
          if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-semibold mt-4 mb-2" style={{ color: agentColor }}>{line.slice(3)}</h2>;
          if (line.startsWith('### ')) return <h3 key={i} className="text-base font-medium text-[var(--text-primary)] mt-3 mb-1">{line.slice(4)}</h3>;
          if (line.startsWith('- [x] ')) return <div key={i} className="flex items-center gap-2 text-[var(--text-secondary)]"><span>✅</span><span className="line-through opacity-70">{line.slice(6)}</span></div>;
          if (line.startsWith('- [ ] ')) return <div key={i} className="flex items-center gap-2 text-[var(--text-secondary)]"><span>⬜</span><span>{line.slice(6)}</span></div>;
          if (line.startsWith('- ')) return <div key={i} className="flex items-center gap-2 text-[var(--text-secondary)]"><span>•</span><span>{line.slice(2)}</span></div>;
          if (line.trim() === '') return <br key={i} />;
          return <p key={i} className="text-[var(--text-secondary)]">{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="card p-5">
      <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-black/5" style={{ fontFamily: 'DM Serif Display, serif', color: agentColor }}>
        {module.name}
      </h3>
      {renderContent()}
    </div>
  );
}
