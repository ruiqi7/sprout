import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const SignedInLinks: React.FC = () => {
    const navigate = useNavigate();
    
    const handleSignOut = () => {
        axios.post("http://localhost:8000/signout")
            .then(res => navigate("/"))
    }
    
    return (
        <ul className="right">
            <li><NavLink to='/forum/create'>Create Post</NavLink></li>
            <li><NavLink to='' onClick={handleSignOut}>Sign Out</NavLink></li>
        </ul>
    );
}

export default SignedInLinks;