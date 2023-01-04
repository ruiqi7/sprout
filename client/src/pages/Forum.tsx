import React, { useState } from "react";
import NavBar from "../components/NavBar";
import PostList from "./PostList";

const Forum: React.FC = () => {
    const [searchRequested, setSearchRequested] = useState(false);
    const [category, setCategory] = useState("All"); // dropdown menu such that a category must be chosen
    const [query, setQuery] = useState("");

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
        setSearchRequested(false);
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
            <NavBar back={false}/>
            <form>
                <div className="form-field">
                    <input
                        type="text"
                        required 
                        value={category} 
                        onChange={handleCategoryChange}
                        placeholder="Category"
                    />
                </div>
                <div className="form-field">
                    <input
                        type="text"
                        required 
                        value={query} 
                        onChange={handleQueryChange}
                        placeholder="Search..."
                    />
                </div>
                <button className="search-button" onClick={handleSearch}>Search</button>
            </form>
            <PostList searchRequested={searchRequested} category={category} query={query} />
        </div>
    );
}

export default Forum;