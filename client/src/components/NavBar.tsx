import axios from 'axios';
import { useEffect, useState } from 'react';
import Sprout from '../assets/Sprout';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import './NavBar.css';

type Props = {
    back: boolean;
}

const NavBar: React.FC<Props> = ({ back }) => {
    const [username, setUsername] = useState("");
    
    useEffect(() => {
        (async () => {
            const res = await axios.get("http://localhost:8000/user");
            setUsername(res.data);
        })();
    }, []);
    
    return (
        <div className="navbar">
            <div className="navbar_logo">
                <Sprout />
                <span className="navbar_name">SPROUT</span>
            </div>
            { username ? (<SignedInLinks back={back} />) : <SignedOutLinks back={back} /> }
        </div>
    );
}

export default NavBar;