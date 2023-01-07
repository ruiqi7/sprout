import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

type Props = {
    back: boolean;
}

const SignedInLinks: React.FC<Props> = ({ back }) => {
    const navigate = useNavigate();
    
    const handleSignOut = () => {
        axios.post("http://localhost:8000/signout")
            .then(() => navigate("/"))
    }
    
    return (
        <ul className="navbar_links">
            { back ? <li><NavLink to='/forum/posts'>Back</NavLink></li> : <li><NavLink to='/forum/create'>Create Post</NavLink></li> }
            <li><NavLink to='' onClick={handleSignOut}>Sign Out</NavLink></li>
        </ul>
    );
}

export default SignedInLinks;