import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import { AppState } from "../../../Redux/Store";
import { vacationService } from "../../../Services/VacationService";
import { likeService } from "../../../Services/LikeService";
import { notify } from "../../../Utils/Notify";
import { useTitle } from "../../../Utils/UseTitle";
import "./VacationDetails.css";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import dayjs from "dayjs";

export function VacationDetails(): JSX.Element {
    const user = useSelector<AppState, UserModel | null>((state) => state.user);
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const [vacation, setVacation] = useState<VacationModel>();
    const [isLiked, setIsLiked] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const [loading, setLoading] = useState(true);

    useTitle(`Vacation Details`);

    useEffect(() => {
        const fetchVacation = async () => {
            if (!id) {
                notify.error("Invalid vacation ID");
                navigate("/vacations");
                return;
            }

            try {
                setLoading(true);
                const fetchedVacation = await vacationService.getVacationById(id);

                if (fetchedVacation) {
                    setVacation(fetchedVacation);
                    setIsLiked(fetchedVacation.isLiked || false);
                } else {
                    throw new Error("Vacation not found");
                }
            } catch (err: any) {
                console.error("Error fetching vacation:", err);
                notify.error(err.message || "Vacation not found or unavailable.");
                navigate("/vacations");
            } finally {
                setLoading(false);
            }
        };

        fetchVacation();
    }, [id, navigate]);

    if (loading || !vacation) {
        return <Spinner />;
    }

    const handleLikeToggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        if (!user || !user.id) {
            notify.error("You must be logged in to like vacations.");
            return;
        }

        setIsLiking(true);
        try {
            if (isLiked) {
                await likeService.removeLike(vacation.vacationId, user.id);
                setIsLiked(false);
            } else {
                await likeService.addLike(vacation.vacationId, user.id);
                setIsLiked(true);
            }
        } catch (error: any) {
            console.error("Error toggling like:", error);
            notify.error(error.response?.data?.message || "Failed to update like status.");
        } finally {
            setIsLiking(false);
        }
    };

    const deleteMe = async () => {
        try {
            const sure = window.confirm("Are you sure you want to delete this vacation?");
            if (!sure) return;

            await vacationService.deleteVacation(id);
            notify.success("Vacation has been deleted");
            navigate("/vacations");
        } catch (err: any) {
            notify.error(err.message || "Failed to delete vacation");
        }
    };

    const isUpcoming = new Date(vacation.startDate) > new Date();
    const isActive = new Date(vacation.startDate) <= new Date() && new Date(vacation.endDate) >= new Date();

    return (
        <div className="VacationDetails">
            <div className="image-container">
                {user && (
                    <button
                        onClick={handleLikeToggle}
                        disabled={isLiking}
                        className={`like-button ${isLiked ? "liked" : ""}`}
                        aria-label={isLiked ? "Unlike vacation" : "Like vacation"}
                    >
                        <Heart className={`heart-icon ${isLiked ? "filled" : ""}`} />
                    </button>
                )}
                <div className="vacation-indicators">
                    {isUpcoming && <span className="indicator upcoming">Upcoming</span>}
                    {isActive && <span className="indicator active">Active</span>}
                </div>
                <img
                    src={vacation.imageUrl}
                    alt={vacation.destination}
                    onError={(e) => (e.currentTarget.src = "default-image.webp")}
                />
                <div className="gradient-overlay" />
            </div>
            <div className="content-container">
                <h2 className="vacation-title">{vacation.destination}</h2>
                <div className="vacation-price dolar">$ {vacation.price.toLocaleString()}</div>
                <div className="description-box">
                    <p>{vacation.description}</p>
                </div>
                <div className="vacation-dates">
                    <div className="date-box">
                        <span className="date-label">Start Date</span>
                        <span className="date-value">{dayjs(vacation.startDate).format("DD/MM/YYYY HH:mm")}</span>
                    </div>
                    <div className="date-box">
                        <span className="date-label">End Date</span>
                        <span className="date-value">{dayjs(vacation.endDate).format("DD/MM/YYYY HH:mm")}</span>
                    </div>
                </div>
                <div className="actions-container">
                    {user?.roleId === 1 ? (
                        <div className="admin-actions">
                            <NavLink className="action-button back" to="/vacations">
                                Back
                            </NavLink>
                            <NavLink className="action-button edit" to={`/vacations/edit/${id}`}>
                                Edit
                            </NavLink>
                            <button className="action-button delete" onClick={deleteMe}>
                                Delete
                            </button>
                        </div>
                    ) : (
                        <NavLink className="action-button back" to="/vacations">
                            Back
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
}
