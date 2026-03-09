import type { Agent } from '../types';
import { Link } from 'react-router-dom';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Link
      to={`/agent/${agent.id}`}
      className="card p-4 block hover:scale-[1.01] transition-transform"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl"
          style={{ backgroundColor: agent.themeColor }}
        >
          {agent.avatar}
        </div>
        <div>
          <h3 className="font-semibold text-lg" style={{ fontFamily: 'DM Serif Display, serif' }}>
            {agent.name}
          </h3>
          {agent.role && (
            <p className="text-sm text-[var(--text-secondary)]">{agent.role}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
