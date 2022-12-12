import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Post from '../types/Post';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post>(); 
    
    useEffect(() => {
        (async () => {
            const res = await axios.get(`http://localhost:8000/forum/post/${id}`);
            console.log(res.data);
            setPost(res.data);
        })();
    }, [id]);

    return ( 
        <div className="post-details">
            { post && <h2>{ post.title }</h2> }
            { post && <p>{ post.body }</p> }
        </div>
     );
}
 
export default PostDetails;