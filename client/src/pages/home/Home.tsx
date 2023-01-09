import { useState } from 'react';
import Blooming from '../../assets/Blooming';
import NavBar from '../../components/navbar/NavBar';
import Error from '../error/Error';
import './Home.css';

const Home: React.FC = () => {
    const [statusCode, setStatusCode] = useState(200);

    if (statusCode >= 400) {
        return <Error code={statusCode} />
    }

    return (
        <div className="home">
            <NavBar back={false} setStatusCode={setStatusCode} />
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