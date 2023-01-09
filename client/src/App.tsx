import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import Forum from './pages/forum/Forum';
import PostDetails from './pages/posts/PostDetails';
import Error from './pages/error/Error';
import './App.css';

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
            <Route path ="*" element ={<Error code={404} />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
