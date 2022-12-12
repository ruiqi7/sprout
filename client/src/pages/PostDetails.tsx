import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Post from '../types/Post';
import EditPost from './EditPost';

const PostDetails = () => {
    const { id } = useParams();
    const server = `http://localhost:8000/forum/post/${id}`;
    const [post, setPost] = useState<Post>();
    const [editRequested, setEditRequested] = useState(false);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await axios.get(server);
            setPost(res.data);
        })();
    }, []);

    const handleEdit = () => {
        setEditRequested(true);
    }

    const handleDelete = () => {
        axios.delete(server);
        setDeleted(true);
    }

    if (post && editRequested) {
        return (
            <EditPost post={post} />
        )
    }

    if (deleted) {
        return (
            <div>
                <h2>Post deleted!</h2>
                <Link to="/forum/posts">Back</Link>
            </div>
        );
    }

    return (
        <div className="post-details">
            { post && <h2>{ post.title }</h2> }
            { post && <p>{ post.body }</p> }
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <Link to="/forum/posts">
                <button>Back</button>
            </Link>
        </div>
     );
}
 
export default PostDetails;