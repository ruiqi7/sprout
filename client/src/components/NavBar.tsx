import axios from 'axios';
import { useEffect, useState } from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const NavBar: React.FC = () => {
    const [username, setUsername] = useState("");
    
    useEffect(() => {
        (async () => {
            const res = await axios.get("http://localhost:8000/user");
            setUsername(res.data);
        })();
    }, []);
    
    return (
        <div className="navbar">
            { username ? (<SignedInLinks />) : <SignedOutLinks /> }
        </div>
    );
}

export default NavBar;