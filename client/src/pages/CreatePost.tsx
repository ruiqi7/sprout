import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CloseIcon from '../assets/CloseIcon';
import './CreatePost.css';

type Props = {
    categories: string[];
    setCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePost: React.FC<Props> = ({ categories, setCreatePost }) => {
    const [username, setUsername] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");

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
            Body: body,
            Category: category
        }
        axios.post("http://localhost:8000/forum/create", post)
            .then(() => window.location.reload())
    }

    return (
        <div className="create-post_background">
            <form className="create-post">
                <div className="create-post_header">
                    <span>New Post</span>
                    <button className="create-post_close" onClick={() => setCreatePost(false)}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="create-post_category">
                    <select required value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="" hidden>Category</option>
                        { categories.map(item => <option value={item} key={item}>{ item }</option>) }
                    </select>
                </div>
                <div className="create-post_title">
                    <input
                        type="text"
                        required 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                </div>
                <div className="create-post_body">
                    <textarea
                        required 
                        value={body} 
                        onChange={e => setBody(e.target.value)}
                        placeholder="Body"
                    />
                </div>
                <button className="create-post_post" onClick={handlePost}>Post</button>
            </form>
        </div>
    );
}

export default CreatePost;