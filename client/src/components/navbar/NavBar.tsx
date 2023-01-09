import axios from 'axios';
import { useEffect, useState } from 'react';
import Sprout from '../../assets/Sprout';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import './NavBar.css';

type Props = {
    back: boolean;
    setStatusCode: React.Dispatch<React.SetStateAction<number>>;
}

const NavBar: React.FC<Props> = ({ back, setStatusCode }) => {
    const [username, setUsername] = useState("");
    
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("http://localhost:8000/user");
                setUsername(res.data);
            } catch (err) {
                if (axios.isAxiosError(err) && err.response) {
                    setStatusCode(err.response.status);
                } else {
                    setStatusCode(400);
                }
            }
        })();
    }, []);

    return (
        <div className="navbar">
            <div className="navbar_logo">
                <Sprout />
                <span className="navbar_name">SPROUT</span>
            </div>
            { username ? (<SignedInLinks back={back} setStatusCode={setStatusCode} />) : <SignedOutLinks back={back} /> }
        </div>
    );
}

export default NavBar;