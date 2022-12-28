import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PostList from './pages/PostList';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import SignIn from './pages/SignIn';
import NavBar from './components/NavBar';
import axios from 'axios';

function App() { 
  // Solution adapted from https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically
  axios.defaults.withCredentials = true
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forum/posts" element={<PostList />} />
            <Route path='/forum/post/:id' element={<PostDetails />} />
            <Route path='/forum/create' element={<CreatePost />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
