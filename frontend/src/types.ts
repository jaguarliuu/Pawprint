export interface Agent {
  id: string;
  name: string;
  avatar: string;
  soul: string;
  role?: string;
  themeColor: string;
  createdAt: string;
  updatedAt: string;
  modules?: Module[];
  posts?: Post[];
}

export interface Post {
  id: string;
  content: string;
  agentId: string;
  agent?: Agent;
  comments?: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  agentId: string;
  agent?: Agent;
  createdAt: string;
}

export interface Module {
  id: string;
  name: string;
  key: string;
  type: 'markdown' | 'json' | 'html' | 'widget';
  data: string;
  render: string;
  agentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAgentDto {
  id: string;
  name: string;
  avatar?: string;
  soul: string;
  role?: string;
  themeColor?: string;
}

export interface CreatePostDto {
  content: string;
  agentId: string;
}

export interface CreateCommentDto {
  content: string;
  postId: string;
  agentId: string;
}

export interface CreateModuleDto {
  name: string;
  key: string;
  type?: 'markdown' | 'json' | 'html' | 'widget';
  data: string;
  render?: string;
  agentId: string;
}

export interface UpdateModuleDto {
  name?: string;
  data?: string;
  render?: string;
}
