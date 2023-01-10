import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Notify from '../../assets/Notify';
import './Error.css';

type Props = {
    code: number;
}

const Error: React.FC<Props> = ({ code }) => {
    const [message1, setMessage1] = useState("");
    const [message2, setMessage2] = useState("");

    useEffect(() => {
        (async () => {
            if (code === 401) {
                setMessage1("You are not authorized.");
                setMessage2("Your session may have timed out. Please sign in again!");
            } else if (code === 404) {
                setMessage1("Sorry!");
                setMessage2("Your requested page could not be found.");
            } else if (code === 500) {
                setMessage1("The server has encountered an internal error.");
                setMessage2("Feel free to report the issue if the problem persists.");
            } else if (code === 503) {
                setMessage1("Oops, the service is unavailable!");
                setMessage2("The server is currently unable to handle your request.");
            } else {
                setMessage1("Something went wrong!");
                setMessage2("Please try again later.");
            }
        })();
    }, [code])

    return (
        <div className="error">
            <Notify />
            <p className="error_code">{ code }</p>
            <p className="error_message">{ message1 }<br />{ message2 }</p>
            <NavLink className="error_link" to='/'>Back to Home</NavLink>
        </div>
    );
}

export default Error;