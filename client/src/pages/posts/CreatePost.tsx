import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostPopup from '../../components/popups/PostPopup';

type Props = {
    setCreateRequested: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePost: React.FC<Props> = ({ setCreateRequested }) => {
    const [username, setUsername] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        (async () => {
            const res = await axios.get("http://localhost:8000/forum/user");
            setUsername(res.data);
        })();
    }, []);

    const handlePost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const post = {
            Username: username,
            Title: title,
            Body: body,
            Category: category
        }
        axios.post("http://localhost:8000/forum/create", post)
            .then(() => window.location.reload())
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