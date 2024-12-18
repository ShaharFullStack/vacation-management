import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/Store";
import { notify } from "../../../Utils/Notify";
import { useTitle } from "../../../Utils/UseTitle";
import logo from "../../../Assets/Images/3ndanimated.gif";
import staticLogo from "../../../Assets/Images/Spinner/logo.png";
import { useEffect, useState } from "react";
import "./Home.css";

export function Home(): JSX.Element {
    useTitle("Shahar Travels Home Page");

    const navigate = useNavigate();
    const user = useSelector<AppState, UserModel | null>(state => state.user);
    const [showGif, setShowGif] = useState(true);

    // Function to handle both notification and navigation
    function handleChoose(path: string, message: string): void {
        notify.success(message);
        setTimeout(() => navigate(path), 500); // Adding a small delay for better UX
    }

    useEffect(() => {
        // Set a timeout to replace the GIF after 1.5 seconds
        const timer = setTimeout(() => {
            setShowGif(false);
        }, 1500);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="Home">
            {user && (
                <div className="userGreet">
                    {user.roleId === 1 ? (
                        <>Hello {user.firstName}, welcome to your admin panel.</>
                    ) : (
                        <>Hello {user.firstName}, this is your user menu.</>
                    )}
                </div>
            )}
            <div className="homeLinks">
                {user && (
                    <div className="link-div" onClick={() => handleChoose("/vacations", "Redirecting to Vacations Packages")}>
                        <h2>Our Tour Packages</h2>
                        <NavLink to="/vacations"></NavLink>
                    </div>
                )}
                <div className="link-div" onClick={() => handleChoose("/about", "Redirecting to About")}>
                    <h2>About</h2>
                    <NavLink to="/about"></NavLink>
                </div>
                <div className="link-div" onClick={() => handleChoose("/contact-us", "Redirecting to Contact Us")}>
                    <h2>Contact Us</h2>
                    <NavLink to="/contact-us"></NavLink>
                </div>
            </div>
            <div className="home-logo">
                <img
                    src={showGif ? logo : staticLogo}
                    alt="Logo"
                    onClick={() => handleChoose("/vacations", "Redirecting to Vacations Packages")}
                />
            </div>
        </div>
    );
}
