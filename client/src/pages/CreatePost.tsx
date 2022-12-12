import axios from 'axios';
import React, { useState } from 'react';

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const post = {
            ID: 6,
            Username: "poster",
            Title: title,
            Body: body,
            Time: "now"
        }
        axios.post("http://localhost:8000/forum/create", post)
            // .then(res => {
            //     console.log(res);
            //     console.log(res.data);
            // });
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
            <button className="post-button" onClick={handleClick}>Post</button>
        </form>
    );
}

export default CreatePost;