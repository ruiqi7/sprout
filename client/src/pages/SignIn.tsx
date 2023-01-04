import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Welcoming from '../assets/Welcoming';
import NavBar from '../components/NavBar';
import './SignIn.css';

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
        <div className="signin">
            <NavBar back={true}/>
            <Welcoming className="signin_welcoming"/>
            <form>
                <span>Welcome!</span>
                <div className="signin_username">
                    <input
                        type="text"
                        required 
                        value={username} 
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </div>
                <button className="signin_button" onClick={handleSignIn}>Sign in!</button>
            </form>
        </div>
    );
}

export default SignIn;