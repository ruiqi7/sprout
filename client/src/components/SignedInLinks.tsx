import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const SignedInLinks: React.FC = () => {
    const navigate = useNavigate();
    
    const handleSignOut = () => {
        axios.post("http://localhost:8000/signout")
            .then(() => navigate("/"))
    }
    
    return (
        <ul className="navbar_links">
            <li><NavLink to='/forum/create'>Create Post</NavLink></li>
            <li><NavLink to='' onClick={handleSignOut}>Sign Out</NavLink></li>
        </ul>
    );
}

export default SignedInLinks;