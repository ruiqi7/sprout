import Sprout from '../../assets/Sprout';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import './NavBar.css';

type Props = {
    isSignedIn: boolean;
    back: boolean;
    setStatusCode?: React.Dispatch<React.SetStateAction<number>>;
}

const NavBar: React.FC<Props> = ({ isSignedIn, back, setStatusCode }) => {
    return (
        <div className="navbar">
            <div className="navbar_logo">
                <Sprout />
                <span className="navbar_name">SPROUT</span>
            </div>
            { isSignedIn ? (<SignedInLinks back={back} setStatusCode={setStatusCode!} />) : <SignedOutLinks back={back} /> }
        </div>
    );
}

export default NavBar;