import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import SignIn from './pages/SignIn';
import axios from 'axios';
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
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
