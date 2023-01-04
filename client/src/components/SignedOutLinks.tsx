import { NavLink } from 'react-router-dom';

type Props = {
    back: boolean;
}

const SignedOutLinks: React.FC<Props> = ({ back }) => {
    return (
        <ul className="navbar_links">
            { back ? <li><NavLink to='/'>Back</NavLink></li> : <li><NavLink to='/signin'>Sign In</NavLink></li> }
        </ul>
    );
}

export default SignedOutLinks;