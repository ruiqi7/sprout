import React, { useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import PostList from '../../components/posts/PostList';
import SearchIcon from '../../assets/SearchIcon';
import CreatePost from '../posts/CreatePost';
import Error from '../error/Error';
import './Forum.css';

const Forum: React.FC = () => {
    const categories = ["All", "Education", "Environment", "Health", "Humanities", "Politics", "Science", "Sports", "Technology"];
    const [category, setCategory] = useState("All");
    const [query, setQuery] = useState("");
    const [searchRequested, setSearchRequested] = useState(false);
    const [createRequested, setCreateRequested] = useState(false);
    const [statusCode, setStatusCode] = useState(200);

    const handleCategoryChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: string) => {
        e.preventDefault();
        setCategory(item);
        setSearchRequested(true);
    }

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setSearchRequested(false);
    }

    const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSearchRequested(true);
    }

    if (statusCode >= 400) {
        return <Error code={statusCode} />
    }

    return (
        <div className="forum">
            <NavBar back={false} setStatusCode={setStatusCode} />
            <a className="forum_create" onClick={() => setCreateRequested(true)}>Create Post</a>
            <form>
                <div className="forum_category">
                    <span className="forum_filter">Filter by category</span>
                    { categories.map(item => <button type="button" className="forum_button" style={{ fontWeight: category === item ? 'bold' : 'normal' }} onClick={e => handleCategoryChange(e, item)} key={item}>{ item }</button>) }
                </div>
                <div className="forum_query">
                    <input
                        type="text"
                        value={query} 
                        onChange={handleQueryChange}
                        placeholder="Search..."
                    />
                </div>
                <button className="forum_search" onClick={handleSearch} >
                    <SearchIcon />
                </button>
            </form>
            <div className="forum_headers">
                <span className="forum_posts-header">Posts</span>
                <span className="forum_category-header">Category</span>
                <span className="forum_comments-header">Comments</span>
            </div>
            <PostList searchRequested={searchRequested} category={category} query={query} setStatusCode={setStatusCode} />
            { createRequested ? <CreatePost setCreateRequested={setCreateRequested} setStatusCode={setStatusCode} /> : <></> }
        </div>
    );
}

export default Forum;