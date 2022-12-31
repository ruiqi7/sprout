import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import SignIn from './pages/SignIn';
import axios from 'axios';
import CreateComment from './pages/CreateComment';
import Forum from './pages/Forum';

function App() { 
  // Solution adapted from https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically
  axios.defaults.withCredentials = true
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forum/posts" element={<Forum />} />
            <Route path='/forum/post/:id' element={<PostDetails />} />
            <Route path='/forum/create' element={<CreatePost />} />
            <Route path='/forum/post/:id/comment' element={<CreateComment />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
