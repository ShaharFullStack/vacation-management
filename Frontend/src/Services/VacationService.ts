import axios, { AxiosRequestConfig } from "axios";
import { VacationModel } from "../Models/VacationModel";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { vacationActions } from '../Redux/VacationSlice';

class VacationService {
    private getAuthHeader(): { Authorization: string } | {} {
        const token = sessionStorage.getItem("token");
        if (token) {
            return { Authorization: `Bearer ${token}` };
        }
        return {};
    }

    public async getAllVacations(): Promise<VacationModel[]> {
        if (store.getState().vacations.length > 0) return store.getState().vacations;

        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl, {
            headers: this.getAuthHeader(),
        });
        const vacations = response.data;

        const action = vacationActions.initVacations(vacations);
        store.dispatch(action);
        return vacations;
    }

    public async getVacationById(vacationId: string): Promise<VacationModel> {
        const globalVacation = store.getState().vacations.find(v => v.vacationId === vacationId);
        if (globalVacation) return globalVacation;

        const response = await axios.get<VacationModel>(`${appConfig.vacationsUrl}/${vacationId}`, {
            headers: this.getAuthHeader(),
        });
        return response.data;
    }

    public async getFilteredVacations(filter: string): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(`${appConfig.vacationsUrl}?filter=${filter}`, {
            headers: this.getAuthHeader(),
        });
        return response.data;
    }

    public async addVacation(vacation: VacationModel, imageFile?: File): Promise<void> {
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate);
        formData.append("endDate", vacation.endDate);
        formData.append("price", vacation.price.toString());
        if (imageFile) formData.append("image", imageFile);

        const options: AxiosRequestConfig = {
            headers: {
                ...this.getAuthHeader(),
                "Content-Type": "multipart/form-data",
            },
        };

        await axios.post<VacationModel>(appConfig.vacationsUrl, formData, options);

        // Clear existing vacations from the store to force a refresh
        const clearAction = vacationActions.clearVacations();
        store.dispatch(clearAction);

        // Fetch fresh data from the server
        await this.getAllVacations();
    }

    public async updateVacation(vacation: VacationModel, imageFile?: File): Promise<VacationModel> {
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate);
        formData.append("endDate", vacation.endDate);
        formData.append("price", vacation.price.toString());
        if (imageFile) formData.append("image", imageFile);

        const options: AxiosRequestConfig = {
            headers: {
                ...this.getAuthHeader(),
                "Content-Type": "multipart/form-data",
            },
        };

        const updatedVacation = await axios.put<VacationModel>(`${appConfig.vacationById}${vacation.vacationId}`, formData, options);

        const action = vacationActions.updateVacation(updatedVacation.data);
        store.dispatch(action);
        return updatedVacation.data;
    }

    public async deleteVacation(vacationId: string): Promise<void> {
        const options: AxiosRequestConfig = {
            headers: this.getAuthHeader(),
        };

        await axios.delete(`${appConfig.vacationById}${vacationId}`, options);

        const action = vacationActions.deleteVacation(vacationId);
        store.dispatch(action);
    }

    public async getPagignnationVacations(page: number, pageSize: number): Promise<{ vacations: VacationModel[], total: number }> {
        const response = await axios.get<{ vacations: VacationModel[], total: number }>(
            `${appConfig.vacationsUrl}?page=${page}&pageSize=${pageSize}`,
            {
                headers: this.getAuthHeader(),
            }
        );
        return response.data;
    }

    public async searchVacations(searchValue: string, page: number, pageSize: number): Promise<{ vacations: VacationModel[], total: number }> {
        const response = await axios.get<{ vacations: VacationModel[], total: number }>(
            `${appConfig.vacationsUrl}?search=${searchValue}&page=${page}&pageSize=${pageSize}`,
            {
                headers: this.getAuthHeader(),
            }
        );
        return response.data;
    }

    public async getVacationsByUser(userId: string): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(`${appConfig.userLikesUrl}${userId}`, {
            headers: this.getAuthHeader(),
        });
        return response.data;
    }
}

export const vacationService = new VacationService();