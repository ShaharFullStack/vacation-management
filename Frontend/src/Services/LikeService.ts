import axios, { AxiosRequestConfig } from "axios";
import { appConfig } from "../Utils/AppConfig";
import { notify } from "../Utils/Notify";
import { VacationModel } from "../Models/VacationModel";
import { vacationActions } from "../Redux/VacationSlice";
import { store } from "../Redux/Store";

class LikeService {
    private getAuthHeaders(): AxiosRequestConfig {
        const token = sessionStorage.getItem("token");
        if (!token) {
            console.error("Authorization token is missing. User might not be logged in.");
            throw new Error("User is not authenticated.");
        }
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    public async getAllLikes(): Promise<VacationModel[]> {
        try {
            const url = appConfig.likesUrl;
            const response = await axios.get<VacationModel[]>(url, this.getAuthHeaders());
            return response.data;
        } catch (err: any) {
            notify.error(err.response?.data?.message || "Failed to fetch likes.");
            throw err;
        }
    }

    public async addLike(vacationId: string, userId: string): Promise<void> {
        try {
            const url = appConfig.likeVacationUrl(vacationId); // Use the function directly
            await axios.post(url, { vacationId, userId }, this.getAuthHeaders());
            
            const action = vacationActions.addLikeToVacation(vacationId);
            store.dispatch(action);
        } catch (err: any) {
            notify.error(err.response?.data?.message || "Failed to add like.");
        }
    }

    public async removeLike(vacationId: string, userId: string): Promise<void> {
        try {
            const url = appConfig.likeVacationUrl(vacationId); // Use the function directly
            await axios.delete(url, {
                ...this.getAuthHeaders(),
                data: { vacationId, userId },
            });
            
            // Remove like from state
            const action = vacationActions.removeLikeFromVacation(vacationId);
            store.dispatch(action);
        } catch (err: any) {
            notify.error(err + "Failed to remove like.");
        }
    }

    public async fetchUserLikedVacations(id: string): Promise<VacationModel[]> {
        try {
            const response = await axios.get<VacationModel[]>(appConfig.userLikesUrl, this.getAuthHeaders());
            
            const action = vacationActions.updateVacationsLikeStatus(response.data);
            store.dispatch(action);
            
            return response.data;
        } catch (err: any) {
            notify.error(err.toString() + "Failed to fetch liked vacations.");
            return [];
        }
    }}

export const likeService = new LikeService();
