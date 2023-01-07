import React, { useState } from "react";
import NavBar from "../components/NavBar";
import PostList from "./PostList";
import Search from "../assets/Search";
import CreatePost from "./CreatePost";
import './Forum.css';

const Forum: React.FC = () => {
    const categories = ["All", "Education", "Environment", "Health", "Humanities", "Politics", "Science", "Sports", "Technology"];
    const [category, setCategory] = useState("All");
    const [query, setQuery] = useState("");
    const [searchRequested, setSearchRequested] = useState(false);
    const [createPost, setCreatePost] = useState(false);

    const handleCategoryChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, category: string) => {
        e.preventDefault();
        setCategory(category);
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

    return (
        <div className="forum">
            <NavBar back={false} />
            <a className="forum_create" onClick={() => setCreatePost(true)}>Create Post</a>
            <form>
                <div className="forum_category">
                    <span className="forum_filter">Filter by category</span>
                    { categories.map(item => <button className="forum_button" style={{ fontWeight: category === item ? 'bold' : 'normal' }} onClick={e => handleCategoryChange(e, item)} key={item}>{ item }</button>) }
                </div>
                <div className="forum_query">
                    <input
                        type="text"
                        value={query} 
                        onChange={handleQueryChange}
                        placeholder="Search..."
                    />
                </div>
                <button className="forum_search" onClick={handleSearch}>
                    <Search />
                </button>
            </form>
            <div className="forum_headers">
                <span className="forum_posts-header">Posts</span>
                <span className="forum_category-header">Category</span>
                <span className="forum_comments-header">Comments</span>
            </div>
            <PostList searchRequested={searchRequested} category={category} query={query} />
            { createPost ? <CreatePost categories={categories.slice(1)} setCreatePost={setCreatePost} /> : <></> }
        </div>
    );
}

export default Forum;