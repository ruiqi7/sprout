import axios from 'axios';
import React from 'react';
import { errorHandler } from '../../handler/ErrorHandler';
import Comment from '../../types/Comment';
import CommentCard from './CommentCard';
import './CommentList.css';

class CommentList extends React.Component<{ id: string, username: string, setCommentToEdit: React.Dispatch<React.SetStateAction<Comment | undefined>>, setStatusCode: React.Dispatch<React.SetStateAction<number>> }> {
    state = {
        comments: [] as Comment[]
    }
    
    componentDidMount() {
        axios.get(`http://localhost:8000/forum/post/${this.props.id}/comments`)
            .then(res => this.setState(res.data))
            .catch(err => this.props.setStatusCode(errorHandler(err)));
    }

    render() {
        return (
            <div className="comment-list">
                {this.state.comments && this.state.comments.map((comment: Comment) => 
                    <CommentCard
                        comment={comment}
                        username={this.props.username}
                        setCommentToEdit={this.props.setCommentToEdit}
                        setStatusCode={this.props.setStatusCode}
                        key={comment.id}
                    />
                )}
            </div>
        );
    }
}

export default CommentList;
