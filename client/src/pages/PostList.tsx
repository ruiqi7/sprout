import axios from 'axios';
import React from 'react';

import Post from '../types/Post';
import PostCard from '../components/PostCard';

// Solution adapted from https://stackoverflow.com/questions/47705112/display-api-data-using-axios-and-a-list-in-react
class PostList extends React.Component<{ searchRequested: boolean, searchStr: string }> {
    state = {
        posts: [] as Post[]
    }

    getPosts(searchStr: string) {
        axios.get("http://localhost:8000/forum/posts" + searchStr)
            .then(res => this.setState(res.data));
    }

    componentDidMount(): void {
        this.getPosts("");
    }

    componentDidUpdate(prevProps: Readonly<{ searchRequested: boolean, searchStr: string }>): void {
        if (this.props !== prevProps && this.props.searchRequested) {
            this.getPosts(`/${this.props.searchStr}`);
        }
    }

    render() {
        return (
            <div className="post-list">
                {this.state.posts && this.state.posts.map(post => <PostCard post={post} key={post.id} />)}
            </div>
        );
    }
}

export default PostList;