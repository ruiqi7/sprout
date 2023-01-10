import axios from 'axios';
import React, { useState } from 'react';
import CommentPopup from '../../components/popups/CommentPopup';
import { errorHandler } from '../../handler/ErrorHandler';
import Comment from '../../types/Comment';

type Props = {
    comment: Comment;
    setCommentToEdit: React.Dispatch<React.SetStateAction<Comment | undefined>>;
    setStatusCode: React.Dispatch<React.SetStateAction<number>>;
}

const EditComment: React.FC<Props> = ({ comment, setCommentToEdit, setStatusCode }) => {
    const id = comment.id;
    const [content, setContent] = useState(comment.content);

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const updatedComment = {
            ID: id,
            Username: comment.username,
            Content: content.trim()
        }
        axios.put(`http://localhost:8000/forum/comment/${id}`, updatedComment)
            .then(() => window.location.reload())
            .catch(err => setStatusCode(errorHandler(err)));
    }

    return (
        <CommentPopup
            header="Edit Comment"
            content={content}
            setContent={setContent}
            handleClose={() => setCommentToEdit(undefined)}
            buttonText="Edit"
            handleSubmit={handleEdit}
        />
    );
}

export default EditComment;