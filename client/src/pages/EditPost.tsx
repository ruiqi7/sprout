import axios from 'axios';
import React, { useState } from 'react';

import Post from '../types/Post';
import PostDetails from './PostDetails';

type Props = {
    post: Post;
}

const EditPost: React.FC<Props> = ({ post }) => {
    const id = post.id;
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [backRequested, setBackRequested] = useState(false);

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const updatedPost = {
            ID: id,
            Username: post.username,
            Title: title,
            Body: body
        }
        axios.put(`http://localhost:8000/forum/post/${id}`, updatedPost)
    }

    const handleBack = () => {
        setBackRequested(true);
    }

    if (backRequested) {
        return (
            <PostDetails />
        );
    }

    return (
        <div>
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
                <button className="edit-button" onClick={handleEdit}>Edit</button>
            </form>
            <button onClick={handleBack}>Back</button>
        </div>
    );
}

export default EditPost;