import Blooming from '../../assets/Blooming';
import NavBar from '../../components/navbar/NavBar';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home">
            <NavBar isSignedIn={false} back={false} />
            <div className="home_contents">
                <span className="home_left">Sprout isn't just any<br/>discussion forum.<br/>It's a space for<br/>GROWTH.</span>
                <div className="home_right">
                    <div className="home_slogan">
                        <span className="home_share">Share</span>
                        <span className="home_learn">Learn</span>
                        <span className="home_grow">Grow</span>
                    </div>
                    <Blooming />
                </div>
            </div>
        </div>
    );
}

export default Home;