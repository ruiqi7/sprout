import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentPopup from '../../components/popups/CommentPopup';

type Props = {
    setCommentRequested: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateComment: React.FC<Props> = ({ setCommentRequested }) => {
    const { id } = useParams();
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
            Content: content.trim()
        }
        axios.post(`http://localhost:8000/forum/post/${id}/comment`, comment)
            .then(() => window.location.reload())
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