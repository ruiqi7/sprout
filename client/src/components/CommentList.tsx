import axios from 'axios';
import React from 'react';

import Comment from '../types/Comment';
import CommentCard from './CommentCard';

class CommentList extends React.Component<{ id: string }> {
    state = {
        comments: [] as Comment[]
    }
    
    componentDidMount() {
        axios.get(`http://localhost:8000/forum/post/${this.props.id}/comments`)
            .then(res => this.setState(res.data));
    }

    render() {
        return (
            <div className="comment-list">
                {this.state.comments && this.state.comments.map((comment: Comment) => <CommentCard comment={comment} key={comment.id} />)}
            </div>
        );
    }
}

export default CommentList;
