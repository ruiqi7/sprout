import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import Post from '../types/Post';

// Solution adapted from https://github.com/CVWO/sample-react-app-2022/blob/master/src/components/CommentItem.tsx
type Props = {
    post: Post;
}

const PostCard: React.FC<Props> = ({ post }) => {
    return (
        <Card>
            <CardContent>
                <Typography> {post.title} </Typography>
                <Typography> {post.body} </Typography>
                <Typography> {post.username} </Typography>
                <Typography> {post.time} </Typography>
                <Link to = {`/forum/posts/${post.id}`} />
            </CardContent>
        </Card>
    )
}

export default PostCard;