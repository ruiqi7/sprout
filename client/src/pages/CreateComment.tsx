import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const CreateComment: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        (async () => {
            const res = await axios.get("http://localhost:8000/forum/user");
            setUsername(res.data);
        })();
    }, []);

    const handleComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const comment = {
            Username: username,
            Content: content
        }
        axios.post(`http://localhost:8000/forum/post/${id}/comment`, comment)
            .then(() => navigate(`/forum/post/${id}`))
    }

    return (
        <form>
            <div className="form-field">
                <input
                    type="text"
                    required 
                    value={content} 
                    onChange={e => setContent(e.target.value)}
                    placeholder="Reply..."
                />
            </div>
            <button className="comment-button" onClick={handleComment}>Comment</button>
            <Link to={`/forum/post/${id}`}>
                <button>Back</button>
            </Link>
        </form>
    );
}

export default CreateComment;