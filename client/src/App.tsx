import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PostList from './pages/PostList';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forum/posts" element={<PostList />} />
            <Route path='/forum/create' element={<CreatePost />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
