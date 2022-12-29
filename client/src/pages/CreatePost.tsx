import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreatePost: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        (async () => {
            const res = await axios.get("http://localhost:8000/forum/user");
            setUsername(res.data);
        })();
    }, []);

    const handlePost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const post = {
            Username: username,
            Title: title,
            Body: body
        }
        axios.post("http://localhost:8000/forum/create", post)
            .then(() => navigate("/forum/posts"))
    }

    return (
        <form>
            <div className="form-field">
                <input
                    type="text"
                    required 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                />
            </div>
            <div className="form-field">
                <input
                    type="text"
                    required 
                    value={body} 
                    onChange={e => setBody(e.target.value)}
                    placeholder="Body"
                />
            </div>
            <button className="post-button" onClick={handlePost}>Post</button>
            <Link to="/forum/posts">
                <button>Back</button>
            </Link>
        </form>
    );
}

export default CreatePost;