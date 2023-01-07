import axios from 'axios';
import { useState } from 'react';
import DeleteIcon from '../assets/DeleteIcon';
import EditIcon from '../assets/EditIcon';
import EditComment from '../pages/EditComment';
import Comment from '../types/Comment';
import './CommentCard.css';

type Props = {
    comment: Comment;
    username: string;
}

const CommentCard: React.FC<Props> = ({ comment, username }) => {
    const [editRequested, setEditRequested] = useState(false);
    const [deleted, setDeleted] = useState(false);
    
    const handleEdit = () => {
        setEditRequested(true);
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/forum/comment/${comment.id}`);
        setDeleted(true);
    }

    if (comment && editRequested) {
        return (
            <EditComment comment={comment} />
        );
    }

    if (deleted) {
        return (
            <p className="comment-card_deleted">[ Comment deleted! ]</p>
        );
    }

    return (
        <div className="comment-card">
            <p className="comment-card_info">
                <b>{ comment.username }</b> commented on <span>{ Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long' , day: 'numeric', hour: 'numeric', minute: '2-digit'}).format(new Date(comment.time)) }</span>
            </p>
            <p className="comment-card_content">{ comment.content }</p>
            { comment.username === username
                ? <div>
                    <button className="commment-card_edit" onClick={handleEdit}><EditIcon /><span>Edit</span></button>
                    <button onClick={handleDelete}><DeleteIcon /><span>Delete</span></button>
                  </div>
                : <></>
            }
        </div>
    )
}

export default CommentCard;