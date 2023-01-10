import axios from 'axios';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { errorHandler } from '../../handler/ErrorHandler';

type Props = {
    back: boolean;
    setStatusCode: React.Dispatch<React.SetStateAction<number>>;
}

const SignedInLinks: React.FC<Props> = ({ back, setStatusCode }) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        axios.post("http://localhost:8000/signout")
            .then(() => navigate("/"))
            .catch(err => setStatusCode(errorHandler(err)))
    }

    return (
        <ul className="navbar_links">
            { back ? <li><NavLink to='/forum/posts'>Back</NavLink></li> : <></> }
            <li><NavLink to='' onClick={handleSignOut}>Sign Out</NavLink></li>
        </ul>
    );
}

export default SignedInLinks;