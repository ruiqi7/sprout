import React, { useState } from 'react';
import CloseIcon from '../../assets/CloseIcon';
import './Popup.css';

type Props = {
    header: string;
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    body: string;
    setBody: React.Dispatch<React.SetStateAction<string>>;
    handleClose: React.MouseEventHandler<HTMLButtonElement>;
    buttonText: string;
    handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

const PostPopup: React.FC<Props> = ({ header, category, setCategory, title, setTitle, body, setBody, handleClose, buttonText, handleSubmit }) => {
    const categories = ["Education", "Environment", "Health", "Humanities", "Politics", "Science", "Sports", "Technology"];
    const [error, setError] = useState("");

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!category || !title.trim() || !body.trim()) {
            setError("Please fill in all the fields.");
            return
        }
        handleSubmit(e);
    }

    return (
        <div className="popup">
            <form className="popup_box" noValidate>
                <div className="popup_header">
                    <span>{ header }</span>
                    <button className="popup_close" onClick={handleClose}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="popup_category">
                    <select required value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="" hidden>Category</option>
                        { categories.map(item => <option value={item} key={item}>{ item }</option>) }
                    </select>
                </div>
                <div className="popup_title">
                    <input
                        type="text"
                        value={title} 
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                </div>
                <div className="popup_body">
                    <textarea
                        className="popup_post"
                        value={body} 
                        onChange={e => setBody(e.target.value)}
                        placeholder="What's on your mind?"
                        rows={9}
                    />
                </div>
                <button className="popup_submit" onClick={handleClick}>{ buttonText }</button>
                <span className="popup_error">{ error }</span>
            </form>
        </div>
    );
}

export default PostPopup;