import axios from 'axios';
import React, { useState } from 'react';
import Popup from '../components/Popup';
import Post from '../types/Post';

type Props = {
    post: Post;
    setEditRequested: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPost: React.FC<Props> = ({ post, setEditRequested }) => {
    const id = post.id;
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [category, setCategory] = useState(post.category);

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const updatedPost = {
            ID: id,
            Username: post.username,
            Title: title,
            Body: body,
            Category: category
        }
        axios.put(`http://localhost:8000/forum/post/${id}`, updatedPost)
            .then(() => window.location.reload())
    }

    return (
        <Popup 
            header="Edit Post"
            category={category}
            setCategory={setCategory}
            title={title}
            setTitle={setTitle}
            body={body}
            setBody={setBody}
            handleClose={() => setEditRequested(false)}
            buttonText="Edit"
            handleSubmit={handleEdit}
        />
    );
}

export default EditPost;