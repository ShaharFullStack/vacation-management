import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { VacationModel } from "../../../Models/VacationModel";
import { AppState } from "../../../Redux/Store";
import { likeService } from "../../../Services/LikeService";
import { notify } from "../../../Utils/Notify";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import { VacationCard } from "../VacationCard/VacationCard";

export function LikedVacations(): JSX.Element {
    const user = useSelector((state: AppState) => state.user);
    const [likedVacations, setLikedVacations] = useState<VacationModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLikedVacations = async () => {
            if (!user || !user.id) {
                notify.error("Please log in to view liked vacations.");
                setLoading(false);
                return;
            }

            try {
                // Fetch liked vacations directly with details
                const likedVacationsData = await likeService.fetchUserLikedVacations(user.id);
                
                // Convert to VacationModel and mark as liked
                const formattedVacations = likedVacationsData.map(vacation => ({
                    ...vacation,
                    isLiked: true,
                    likeCount: +1
                }));

                setLikedVacations(formattedVacations);
            } catch (err) {
                console.error(err);
                notify.error("Failed to load liked vacations.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchLikedVacations();
    }, [user]);
    

    if (loading) return <Spinner />;

    return (
        <div className="LikedVacations">
            {likedVacations.length > 0 ? (
                <div className="liked-vacations-grid">
                    {likedVacations.map(vacation => (
                        <VacationCard 
                            key={vacation.vacationId} 
                            vacation={vacation} 
                        />
                    ))}
                </div>
            ) : (
                <p className="no-liked-vacations">
                    You haven't liked any vacations yet. 
                    Explore our vacation collection and start liking!
                </p>
            )}
        </div>
    );
}