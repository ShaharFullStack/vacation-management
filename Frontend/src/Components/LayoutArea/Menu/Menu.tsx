import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppState } from "../../../Redux/Store";
import "./Menu.css";

export function Menu(): JSX.Element {
    const user = useSelector((state: AppState) => state.user);

    return (
        <div className="Menu">
            {/* Home Menu */}
            <div className="main-menu">
                <div className="dropdown">
                    <NavLink to="/home" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Home
                    </NavLink>
                </div>
                <div className="dropdown">
                    <NavLink to="/vacations" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Vacations List
                    </NavLink>
                </div>
                {/* User and Admin Features */}
                {user && (
                    <>
                        <div className="dropdown">
                            <NavLink to="/liked-vacations" className={({ isActive }) => (isActive ? "active-link" : "")}>
                                My Vacations
                            </NavLink>
                        </div>
                        {user.roleId === 1 && (
                            <div className="dropdown">
                                Admin Menu
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink to="/vacations/new" className={({ isActive }) => (isActive ? "active-link" : "")}>
                                            Add Vacation
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/vacations/reports" className={({ isActive }) => (isActive ? "active-link" : "")}>
                                            Reports
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
