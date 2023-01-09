import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostPopup from '../../components/popups/PostPopup';

type Props = {
    setCreateRequested: React.Dispatch<React.SetStateAction<boolean>>;
    setStatusCode: React.Dispatch<React.SetStateAction<number>>;
}

const CreatePost: React.FC<Props> = ({ setCreateRequested, setStatusCode }) => {
    const [username, setUsername] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("http://localhost:8000/forum/user");
                setUsername(res.data);
            } catch (err) {
                if (axios.isAxiosError(err) && err.response) {
                    setStatusCode(err.response.status);
                } else {
                    setStatusCode(400);
                }
            }
        })();
    }, []);

    const handlePost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const post = {
            Username: username,
            Title: title.trim(),
            Body: body.trim(),
            Category: category
        }
        axios.post("http://localhost:8000/forum/post/create", post)
            .then(() => window.location.reload())
            .catch(err => setStatusCode(err.response.status));
    }

    return (
        <PostPopup 
            header="New Post"
            category={category}
            setCategory={setCategory}
            title={title}
            setTitle={setTitle}
            body={body}
            setBody={setBody}
            handleClose={() => setCreateRequested(false)}
            buttonText="Post"
            handleSubmit={handlePost}
        />
    );
}

export default CreatePost;