import Blooming from '../assets/Blooming';
import NavBar from '../components/NavBar';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home">
            <NavBar />
            <div className="home_contents">
                <span className="home_description">Sprout isn't just any discussion forum. It's a space for GROWTH.</span>
                <div className="home_slogan">
                    <span className="home_share">Share</span>
                    <span className="home_learn">Learn</span>
                    <span className="home_grow">Grow</span>
                </div>
                <Blooming />
            </div>
        </div>
    );
}

export default Home;