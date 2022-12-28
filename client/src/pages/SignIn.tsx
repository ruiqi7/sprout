import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    
    const handleSignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const user = {
            Username: username
        }
        axios.post("http://localhost:8000/signin", user)
            .then(() => navigate("/forum/posts"))
    }

    return (
        <form>
            <div className="form-field">
                <input
                    type="text"
                    required 
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                />
            </div>
            <button className="signin-button" onClick={handleSignIn}>Sign in!</button>
        </form>
    );
}

export default SignIn;