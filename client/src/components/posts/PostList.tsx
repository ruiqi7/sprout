import axios from 'axios';
import React from 'react';
import Post from '../../types/Post';
import PostCard from './PostCard';
import { errorHandler } from '../../handler/ErrorHandler';
import './PostList.css';

// Solution adapted from https://stackoverflow.com/questions/47705112/display-api-data-using-axios-and-a-list-in-react
class PostList extends React.Component<{ searchRequested: boolean, category: string, query: string, setStatusCode: React.Dispatch<React.SetStateAction<number>> }> {
    state = {
        posts: [] as Post[]
    }

    getPosts(searchStr: string) {
        axios.get("http://localhost:8000/forum/posts/" + searchStr)
            .then(res => this.setState(res.data))
            .catch(err => this.props.setStatusCode(errorHandler(err)));
    }

    componentDidMount(): void {
        this.getPosts("All");
    }

    componentDidUpdate(prevProps: Readonly<{ searchRequested: boolean, category: string, query: string }>): void {
        if (this.props !== prevProps && this.props.searchRequested) {
            const category = this.props.category;
            const query = this.props.query;
            if (query) {
                this.getPosts(`${category}/${query}`);
            } else {
                this.getPosts(`${category}`);
            }
        }
    }

    render() {
        return (
            <div className="postlist">
                {this.state.posts && this.state.posts.map(post => <PostCard post={post} key={post.id} />)}
            </div>
        );
    }
}

export default PostList;