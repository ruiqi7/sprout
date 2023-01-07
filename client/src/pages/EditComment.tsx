import axios from 'axios';
import React, { useState } from 'react';

import CommentCard from '../components/CommentCard';
import Comment from '../types/Comment';

type Props = {
    comment: Comment;
}

const EditComment: React.FC<Props> = ({ comment }) => {
    const id = comment.id;
    const [content, setContent] = useState(comment.content);
    const [backRequested, setBackRequested] = useState(false);

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const updatedComment = {
            ID: id,
            Username: comment.username,
            Content: content
        }
        axios.put(`http://localhost:8000/forum/comment/${id}`, updatedComment)
    }

    const handleBack = () => {
        setBackRequested(true);
    }

    if (backRequested) {
        comment.content = content;
        return (
            <CommentCard comment={comment} username={comment.username} />
        );
    }

    return (
        <div>
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
                <button className="edit-button" onClick={handleEdit}>Edit</button>
            </form>
            <button onClick={handleBack}>Back</button>
        </div>
    );
}

export default EditComment;