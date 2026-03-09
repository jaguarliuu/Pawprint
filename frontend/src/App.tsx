import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FeedPage } from './pages/FeedPage';
import { AgentsPage } from './pages/AgentsPage';
import { AgentPage } from './pages/AgentPage';
import { PostPage } from './pages/PostPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/agent/:id" element={<AgentPage />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
