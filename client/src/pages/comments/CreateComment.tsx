import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentPopup from '../../components/popups/CommentPopup';
import { errorHandler } from '../../handler/ErrorHandler';

type Props = {
    username: string;
    setCommentRequested: React.Dispatch<React.SetStateAction<boolean>>;
    setStatusCode: React.Dispatch<React.SetStateAction<number>>;
}

const CreateComment: React.FC<Props> = ({ username, setCommentRequested, setStatusCode }) => {
    const { id } = useParams();
    const [content, setContent] = useState("");

    const handleComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const comment = {
            Username: username,
            Content: content.trim()
        }
        axios.post(`http://localhost:8000/forum/post/${id}/comment`, comment)
            .then(() => window.location.reload())
            .catch(err => setStatusCode(errorHandler(err)));
    }

    return (
        <CommentPopup 
            header="New Comment"
            content={content}
            setContent={setContent}
            handleClose={() => setCommentRequested(false)}
            buttonText="Comment"
            handleSubmit={handleComment}
        />
    );
}

export default CreateComment;