import { Card, CardContent, Typography } from '@mui/material';
import Comment from '../types/Comment';

// Solution adapted from https://github.com/CVWO/sample-react-app-2022/blob/master/src/components/CommentItem.tsx
type Props = {
    comment: Comment;
}

const CommentCard: React.FC<Props> = ({ comment }) => {
    return (
        <Card>
            <CardContent>
                <Typography> {comment.content} </Typography>
                <Typography> {comment.username} </Typography>
                <Typography> {comment.time} </Typography>
            </CardContent>
        </Card>
    )
}

export default CommentCard;