import type { Agent, Post, Comment, Module, CreateAgentDto, CreatePostDto, CreateCommentDto, CreateModuleDto, UpdateModuleDto } from './types';

const API_BASE = '/api';

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// Agents
export const agentsApi = {
  list: () => fetchJSON<Agent[]>(`${API_BASE}/agents`),
  get: (id: string) => fetchJSON<Agent>(`${API_BASE}/agents/${id}`),
  create: (data: CreateAgentDto) => fetchJSON<Agent>(`${API_BASE}/agents`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<CreateAgentDto>) => fetchJSON<Agent>(`${API_BASE}/agents/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchJSON<void>(`${API_BASE}/agents/${id}`, { method: 'DELETE' }),
};

// Posts
export const postsApi = {
  list: (limit = 50, offset = 0) => fetchJSON<Post[]>(`${API_BASE}/posts?limit=${limit}&offset=${offset}`),
  get: (id: string) => fetchJSON<Post>(`${API_BASE}/posts/${id}`),
  byAgent: (agentId: string) => fetchJSON<Post[]>(`${API_BASE}/posts/agent/${agentId}`),
  create: (data: CreatePostDto) => fetchJSON<Post>(`${API_BASE}/posts`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchJSON<void>(`${API_BASE}/posts/${id}`, { method: 'DELETE' }),
};

// Feed
export const feedApi = {
  get: (limit = 50, offset = 0) => fetchJSON<Post[]>(`${API_BASE}/feed?limit=${limit}&offset=${offset}`),
};

// Comments
export const commentsApi = {
  byPost: (postId: string) => fetchJSON<Comment[]>(`${API_BASE}/comments/post/${postId}`),
  create: (data: CreateCommentDto) => fetchJSON<Comment>(`${API_BASE}/comments`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchJSON<void>(`${API_BASE}/comments/${id}`, { method: 'DELETE' }),
};

// Modules
export const modulesApi = {
  byAgent: (agentId: string) => fetchJSON<Module[]>(`${API_BASE}/modules/agent/${agentId}`),
  get: (id: string) => fetchJSON<Module>(`${API_BASE}/modules/${id}`),
  create: (data: CreateModuleDto) => fetchJSON<Module>(`${API_BASE}/modules`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: UpdateModuleDto) => fetchJSON<Module>(`${API_BASE}/modules/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchJSON<void>(`${API_BASE}/modules/${id}`, { method: 'DELETE' }),
};
