import { Navigate, Route, Routes } from "react-router-dom";
import { About } from "../../PagesArea/About/About";
import { Home } from "../../PagesArea/Home/Home";
import { Login } from "../../UserArea/Login/Login";
import { Register } from "../../UserArea/Register/Register";
import { AddVacation } from "../../VacationArea/AddVacation/AddVacation";
import { Vacations } from "../../VacationArea/Vacations/Vacations";
import { Page404 } from "../Page404/Page404";
import { VacationDetails } from "../../VacationArea/VacationDetails/VacationDetails";
import "./Routing.css";
import { useSelector } from "react-redux";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/Store";
import { EditVacation } from "../../VacationArea/EditVacation/EditVacation";
import { LikedVacations } from "../../VacationArea/LikedVacations/LikedVacations";
import { ContactUs } from "../../PagesArea/ContactUs/ContactUs";
import { Reports } from "../../VacationArea/Reports/Reports";

export function Routing(): JSX.Element {
    const user = useSelector<AppState, UserModel | null>(state => state.user);

    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route path="/vacations" element={<Vacations />} />

                {/* Available to all logged-in users */}
                {user ? (
                    <Route path="/liked-vacations" element={<LikedVacations />} />
                ) : (
                    <Route path="/liked-vacations" element={<Navigate to="/login" />} />
                )}


                <Route path="/vacation-details/:id" element={<VacationDetails />} />
                <Route path="/vacations/report" element={<Vacations />} />

                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/about" element={<About />} />
                {/* Admin-specific routes */}
                {user && user.roleId === 1 && <Route path="/vacations/new" element={<AddVacation />} />}
                {user && user.roleId === 1 && <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />}
                {user && user.roleId === 1 && <Route path="/vacations/reports" element={<Reports />} />}

                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}
