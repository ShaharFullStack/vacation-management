
// Updated VacationCard Component with Indicators
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import { AppState } from "../../../Redux/Store";
import { likeService } from "../../../Services/LikeService";
import { notify } from "../../../Utils/Notify";
import "./VacationCard.css";
import { Heart } from "lucide-react";

type VacationCardProps = {
    vacation: VacationModel;
};

export function VacationCard({ vacation }: VacationCardProps): JSX.Element {
    const user = useSelector((state: AppState) => state.user);
    const [isLiked, setIsLiked] = useState<boolean>(vacation.isLiked || false);
    const [isExiting, setIsExiting] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Synchronize local liked state with vacation prop
        setIsLiked(vacation.isLiked || false);
    }, [vacation]);

    const startDate = new Date(vacation.startDate).toLocaleDateString();
    const endDate = new Date(vacation.endDate).toLocaleDateString();

    const handleCardClick = () => {
        setIsExiting(true);
        setTimeout(() => {
            navigate(`/vacation-details/${vacation.vacationId}`);
        }, 500);
    };

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

    const isUpcoming = new Date(vacation.startDate) > new Date();
    const isActive = new Date(vacation.startDate) <= new Date() && new Date(vacation.endDate) >= new Date();

    return (
        <div
            className={`vacation-card ${isExiting ? "exiting" : ""}`}
            onClick={handleCardClick}
        >
            <div className="image-container">
                <img
                    src={vacation.imageUrl}
                    alt={vacation.destination}
                    className="vacation-image"
                />
                <div className="gradient-overlay" />
            </div>

            <button
                onClick={handleLikeToggle}
                disabled={isLiking}
                className={`like-button ${isLiked ? "liked" : ""}`}
                aria-label={isLiked ? "Unlike vacation" : "Like vacation"}
            >
                <Heart className={`heart-icon ${isLiked ? "filled" : ""}`} />
            </button>

            <h2 className="vacation-title">{vacation.destination}</h2>

            <div className="vacation-price">
                <div className="price-dollar">{vacation.price.toLocaleString()} $</div>
            </div>

            <div className="vacation-dates">
                <span>
                    Since:<br />
                    {startDate}
                </span>
                <span>
                    Until:<br />
                    {endDate}
                </span>
            </div>

            <div className="vacation-indicators">
                {isUpcoming && <span className="indicator upcoming">Upcoming</span>}
                {isActive && <span className="indicator active">Active</span>}
            </div>
        </div>
    );
}
