import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentIcon from '../assets/CommentIcon';
import DeleteIcon from '../assets/DeleteIcon';
import EditIcon from '../assets/EditIcon';
import Messages from '../assets/Messages';
import CommentList from '../components/CommentList';
import NavBar from '../components/NavBar';
import Post from '../types/Post';
import EditPost from './EditPost';
import './PostDetails.css';

const PostDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const server = `http://localhost:8000/forum/post/${id}`;
    const [post, setPost] = useState<Post>();
    const [editRequested, setEditRequested] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        (async () => {
            let res = await axios.get(server);
            setPost(res.data);

            res = await axios.get("http://localhost:8000/user");
            setUsername(res.data);
        })();
    }, []);

    const handleEdit = () => {
        setEditRequested(true);
    }

    const handleDelete = () => {
        axios.delete(server);
        setDeleted(true);
    }

    const handleComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigate(`/forum/post/${id}/comment`);
    }

    if (post && editRequested) {
        return (
            <EditPost post={post} />
        );
    }

    if (deleted) {
        return (
            <div>
                <NavBar back={true}/>
                <p className="post-details_deleted">[ Post deleted! ]</p>
            </div>
        );
    }

    return (
        <div>
            <NavBar back={true}/>
            <div className="post-details">
                { post && 
                    <div>
                        <span className="post-details_title">{ post.title }</span> 
                        <span className="post-details_category">{ post.category }</span>
                    </div>
                }
                { post && <p className="post-details_info">Posted by <span className="post-details_username">{ post.username }</span> on { Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long' , day: 'numeric', hour: 'numeric', minute: '2-digit'}).format(new Date(post.time)) }</p> }
                { post && <p className="post-details_body">{ post.body }</p> }
                { post && <p className="post-details_comments"><Messages /><span>{ post.comments.length }</span></p> }
                { post && post.username === username
                    ?  <div className="post-details_modify">
                            <button className="post-details_edit" onClick={handleEdit}><EditIcon /><span>Edit</span></button>
                            <button className="post-details_delete" onClick={handleDelete}><DeleteIcon /><span>Delete</span></button>
                        </div>
                    :  <div className="post-details_modify">
                            <button className="post-details_comment" onClick={handleComment}><CommentIcon /><span>Comment</span></button>
                        </div>
                }
                { id && <CommentList id={id} username={username} /> }
            </div>
        </div>
     );
}
 
export default PostDetails;