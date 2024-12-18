import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { VacationModel } from "../../../Models/VacationModel";
import { AppState } from "../../../Redux/Store";
import { vacationService } from "../../../Services/VacationService";
import { likeService } from "../../../Services/LikeService";
import { notify } from "../../../Utils/Notify";
import { useTitle } from "../../../Utils/UseTitle";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import { VacationCard } from "../VacationCard/VacationCard";
import "./Vacations.css";
import { Search } from "lucide-react";

export function Vacations(): JSX.Element {
    useTitle("Vacations");

    const user = useSelector((state: AppState) => state.user);
    const reduxVacations = useSelector((state: AppState) => state.vacations);

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [filteredVacations, setFilteredVacations] = useState<VacationModel[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [sortCriteria, setSortCriteria] = useState<string>("startDate");
    const [loading, setLoading] = useState<boolean>(false);
    const pageSize = 9;


    useEffect(() => {
        const fetchVacations = async () => {
            setLoading(true);
            try {
                // Fetch vacations
                const allVacations = await vacationService.getAllVacations();

                // If user is logged in, update like status
                if (user && user.id) {
                    const likedVacations = await likeService.fetchUserLikedVacations(user.id);

                    // Mark liked vacations
                    const updatedVacations = allVacations.map(vacation => ({
                        ...vacation,
                        isLiked: likedVacations.some(liked => liked.vacationId === vacation.vacationId)
                    }));

                    setVacations(updatedVacations);
                    setFilteredVacations(updatedVacations.slice(0, pageSize));
                    setTotalPages(Math.ceil(updatedVacations.length / pageSize));
                } else {
                    setVacations(allVacations);
                    setFilteredVacations(allVacations.slice(0, pageSize));
                    setTotalPages(Math.ceil(allVacations.length / pageSize));
                }
            } catch (err) {
                notify.error("Failed to fetch vacations");
            } finally {
                setLoading(false);
            }
        };

        fetchVacations();
    }, [user]);

    // Update vacations when Redux state changes
    useEffect(() => {
        setVacations(reduxVacations);
        setFilteredVacations(reduxVacations.slice(0, pageSize));
        setTotalPages(Math.ceil(reduxVacations.length / pageSize));
    }, [reduxVacations]);

    const handleSortChange = (e: SelectChangeEvent<string>) => {
        const criteria = e.target.value;
        setSortCriteria(criteria);

        const sortedVacations = [...vacations].sort((a, b) => {
            if (criteria === "price") return a.price - b.price;
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        });

        setVacations(sortedVacations);
    }

    const handleSearchInputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = vacations.filter((v) =>
            v.destination.toLowerCase().includes(term)
        );
        setFilteredVacations(filtered);
        setCurrentPage(1);
    }, 300);

    const setFilterType = (filterType: string): void => {
        let filtered = vacations;

        switch (filterType) {
            case "liked":
                filtered = vacations.filter((v) => v.isLiked);
                break;
            case "upcoming":
                filtered = vacations.filter((v) => new Date(v.startDate) > new Date());
                break;
            case "active":
                filtered = vacations.filter((v) => {
                    const now = new Date();
                    return new Date(v.startDate) <= now && new Date(v.endDate) >= now;
                });
                break;
            default:
                filtered = vacations;
        }

        setFilteredVacations(filtered.slice(0, pageSize));
        setCurrentPage(1);
        setTotalPages(Math.ceil(filtered.length / pageSize));
    };

    useEffect(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setFilteredVacations(vacations.slice(startIndex, endIndex));
    }, [currentPage, vacations]);

    return (
        <div className="Vacations">
            <div className="form-div">
                <form className="search-form">
                    <TextField
                        type="search"
                        label="Search destination..."
                        onChange={handleSearchInputChange}
                        fullWidth
                        className="search-input"
                        disabled={loading}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                            endAdornment: searchTerm && (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => {
                                        setSearchTerm("");
                                        setFilteredVacations(vacations);
                                    }}>
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </form>
                <FormControl fullWidth className="sort-form">
                    <InputLabel id="sort-label">Sort by</InputLabel>
                    <Select
                        labelId="sort-label"
                        value={sortCriteria}
                        onChange={handleSortChange}
                        className="sort-select"
                        disabled={loading}
                    >
                        <MenuItem value="startDate">Start Date</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="filters">
                <button onClick={() => setFilterType("upcoming")}>Upcoming Vacations</button>
                <button onClick={() => setFilterType("active")}>Active Vacations</button>
                <button onClick={() => setFilterType("")}>All Vacations</button>
            </div>
            <div className="vacations-container">
                {loading ? (
                    <Spinner />
                ) : filteredVacations.length > 0 ? (
                    filteredVacations.map((vacation) => (
                        <VacationCard key={vacation.vacationId} vacation={vacation} />
                    ))
                ) : (
                    <p className="no-vacations-message">No Vacations Found</p>
                )}
            </div>
            <div className="pagination">
                <button
                    disabled={currentPage <= 1 || loading}
                    onClick={() => setCurrentPage(1)}
                >
                    ⏮ First
                </button>
                <button
                    disabled={currentPage <= 1 || loading}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                    ⬅ Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage >= totalPages || loading}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                    Next ➡
                </button>
                <button
                    disabled={currentPage >= totalPages || loading}
                    onClick={() => setCurrentPage(totalPages)}
                >
                    ⏭ Last
                </button>
            </div>
        </div>
    );
}