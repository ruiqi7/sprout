import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

import EditComment from '../pages/EditComment';
import Comment from '../types/Comment';

type Props = {
    comment: Comment;
}

const CommentCard: React.FC<Props> = ({ comment }) => {
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
            <h4>Comment deleted!</h4>
        );
    }

    return (
        <Card>
            <CardContent>
                <Typography> {comment.content} </Typography>
                <Typography> {comment.username} </Typography>
                <Typography> {comment.time} </Typography>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </CardContent>
        </Card>
    )
}

export default CommentCard;