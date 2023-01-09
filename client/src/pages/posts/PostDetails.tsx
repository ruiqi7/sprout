import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentIcon from '../../assets/CommentIcon';
import DeleteIcon from '../../assets/DeleteIcon';
import EditIcon from '../../assets/EditIcon';
import MessagesIcon from '../../assets/MessagesIcon';
import CommentList from '../../components/comments/CommentList';
import NavBar from '../../components/navbar/NavBar';
import Comment from '../../types/Comment';
import Post from '../../types/Post';
import CreateComment from '../comments/CreateComment';
import EditComment from '../comments/EditComment';
import Error from '../error/Error';
import EditPost from './EditPost';
import './PostDetails.css';

const PostDetails: React.FC = () => {
    const { id } = useParams();
    const server = `http://localhost:8000/forum/post/${id}`;
    const [post, setPost] = useState<Post>();
    const [username, setUsername] = useState("");
    const [deleted, setDeleted] = useState(false);
    const [editRequested, setEditRequested] = useState(false);
    const [commentRequested, setCommentRequested] = useState(false);
    const [commentToEdit, setCommentToEdit] = useState<Comment>();
    const [statusCode, setStatusCode] = useState(200);

    useEffect(() => {
        (async () => {
            try {
                let res = await axios.get(server);
                setPost(res.data);

                res = await axios.get("http://localhost:8000/forum/user");
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

    const handleEdit = () => {
        setEditRequested(true);
    }

    const handleDelete = () => {
        axios.delete(server);
        setDeleted(true);
    }

    if (statusCode >= 400) {
        return <Error code={statusCode} />
    }

    if (deleted) {
        return (
            <div>
                <NavBar back={true} setStatusCode={setStatusCode} />
                <p className="post-details_deleted">[ Post deleted! ]</p>
            </div>
        );
    }

    if (!post) {
        return <NavBar back={true} setStatusCode={setStatusCode} />
    }

    return (
        <div className="post-details">
            <NavBar back={true} setStatusCode={setStatusCode} />
            <div className="post-details_contents">
                <div className="post-details_post">
                    <div>
                        <span className="post-details_title">{ post.title }</span> 
                        <span className="post-details_category">{ post.category }</span>
                    </div>
                    <p className="post-details_info">Posted by <span className="post-details_username">{ post.username }</span> on { Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long' , day: 'numeric', hour: 'numeric', minute: '2-digit'}).format(new Date(post.time)) }</p>
                    <p className="post-details_body">{ post.body }</p>
                    <p className="post-details_comments"><MessagesIcon /><span>{ post.comments.length }</span></p>
                    { post.username === username
                        ?  <div className="post-details_modify">
                                <button className="post-details_edit" onClick={handleEdit}><EditIcon /><span>Edit</span></button>
                                <button className="post-details_delete" onClick={handleDelete}><DeleteIcon /><span>Delete</span></button>
                            </div>
                        :  <div className="post-details_modify">
                                <button className="post-details_comment" onClick={() => setCommentRequested(true)}><CommentIcon /><span>Comment</span></button>
                            </div>
                    }
                </div>
                { id && <CommentList id={id} username={username} setCommentToEdit={setCommentToEdit} setStatusCode={setStatusCode} /> }
            </div>
            { editRequested ? <EditPost post={post} setEditRequested={setEditRequested} setStatusCode={setStatusCode} /> : <></> }
            { commentRequested ? <CreateComment setCommentRequested={setCommentRequested} setStatusCode={setStatusCode} /> : <></> }
            { commentToEdit && <EditComment comment={commentToEdit} setCommentToEdit={setCommentToEdit} setStatusCode={setStatusCode} /> }
        </div>
     );
}
 
export default PostDetails;