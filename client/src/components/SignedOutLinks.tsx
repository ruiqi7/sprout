import { NavLink } from 'react-router-dom';

const SignedOutLinks: React.FC = () => {
    return (
        <ul className="navbar_links">
            <li><NavLink to='/signin'>Sign In</NavLink></li>
        </ul>
    );
}

export default SignedOutLinks;