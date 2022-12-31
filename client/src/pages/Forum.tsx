import React, { useState } from "react";
import NavBar from "../components/NavBar";
import PostList from "./PostList";

const Forum: React.FC = () => {
    const [searchRequested, setSearchRequested] = useState(false);
    const [category, setCategory] = useState("");

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
        setSearchRequested(false);
    }

    const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (category) {
            setSearchRequested(true);
        }
    }

    return (
        <div className="forum">
            <NavBar />
            <form>
                <div className="form-field">
                    <input
                        type="text"
                        required 
                        value={category} 
                        onChange={handleOnChange}
                        placeholder="Category"
                    />
                </div>
                <button className="search-button" onClick={handleSearch}>Search</button>
            </form>
            <PostList searchRequested={searchRequested} searchStr={category} />
        </div>
    );
}

export default Forum;