import React from 'react';
import CloseIcon from '../assets/CloseIcon';
import './Popup.css';

type Props = {
    header: string;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    handleClose: React.MouseEventHandler<HTMLButtonElement>;
    buttonText: string;
    handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

const CommentPopup: React.FC<Props> = ({ header, content, setContent, handleClose, buttonText, handleSubmit }) => {
    return (
        <div className="popup">
            <form className="popup_box">
                <div className="popup_header">
                    <span>{ header }</span>
                    <button className="popup_close" onClick={handleClose}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="popup_body">
                    <textarea
                        required 
                        value={content} 
                        onChange={e => setContent(e.target.value)}
                        placeholder="Share your thoughts!"
                        rows={14}
                    />
                </div>
                <button className="popup_submit" onClick={handleSubmit}>{ buttonText }</button>
            </form>
        </div>
    );
}

export default CommentPopup;