import { useNavigate } from 'react-router-dom';
import Post from '../../types/Post';
import './PostCard.css';

// Solution adapted from https://github.com/CVWO/sample-react-app-2022/blob/master/src/components/CommentItem.tsx
type Props = {
    post: Post;
}

const PostCard: React.FC<Props> = ({ post }) => {
    const navigate = useNavigate();

    return (
        <button className="postcard" onClick={() => navigate(`/forum/post/${post.id}`)}>
            <div className="postcard_left">
                <span className="postcard_title">{ post.title }</span>
                <span className="postcard_body">{ post.body }</span>
                <span className="postcard_info">Posted by <b>{ post.username }</b> on { Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long' , day: 'numeric', hour: 'numeric', minute: '2-digit'}).format(new Date(post.time)) }</span>
            </div>
            <span className="postcard_category">{ post.category }</span>
            <span className="postcard_comments">{ post.comments.length }</span>
        </button>
    )
}

export default PostCard;