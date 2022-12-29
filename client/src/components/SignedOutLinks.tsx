import { NavLink } from 'react-router-dom';

const SignedOutLinks: React.FC = () => {
    return (
        <ul className="right">
            <li><NavLink to='/signin'>Sign In</NavLink></li>
        </ul>
    );
}

export default SignedOutLinks;