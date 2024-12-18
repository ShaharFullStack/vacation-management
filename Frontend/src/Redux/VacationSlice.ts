import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacationModel } from "../Models/VacationModel";

export function initVacations(currentState: VacationModel[], action: PayloadAction<VacationModel[]>): VacationModel[] {
    return action.payload.map(vacation => ({
        ...vacation,
        isLiked: vacation.isLiked || false,
        likeCount: vacation.likeCount || 0
    }));
}

export function addVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const newState = [...currentState];
    newState.push({
        ...action.payload,
        isLiked: false,
        likeCount: 0
    });
    return newState;
}

export function updateVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(v => v.vacationId === action.payload.vacationId);
    newState[index] = {
        ...action.payload,
        isLiked: action.payload.isLiked || false,
        likeCount: action.payload.likeCount || 0
    };
    return newState;
}

export function deleteVacation(currentState: VacationModel[], action: PayloadAction<string>): VacationModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(v => v.vacationId === action.payload);
    newState.splice(index, 1);
    return newState;
}

export function clearVacations(currentState: VacationModel[], action: PayloadAction): VacationModel[] {
    return [];
}

export function updateVacationsLikeStatus(currentState: VacationModel[], action: PayloadAction<VacationModel[]>): VacationModel[] {
    return currentState.map(vacation => {
        const likedVacation = action.payload.find(v => v.vacationId === vacation.vacationId);
        return likedVacation 
            ? { ...vacation, isLiked: true, likeCount: likedVacation.likeCount }
            : { ...vacation, isLiked: false, likeCount: 0 }
    });
}

export function addLikeToVacation(currentState: VacationModel[], action: PayloadAction<string>): VacationModel[] {
    return currentState.map(vacation => 
        vacation.vacationId === action.payload 
            ? { ...vacation, isLiked: true, likeCount: vacation.likeCount + 1 }
            : vacation
    );
}

export function removeLikeFromVacation(currentState: VacationModel[], action: PayloadAction<string>): VacationModel[] {
    return currentState.map(vacation => 
        vacation.vacationId === action.payload 
            ? { ...vacation, isLiked: false, likeCount: vacation.likeCount - 1 }
            : vacation
    );
}

export const vacationSlice = createSlice({
    name: "vacations",
    initialState: [],
    reducers: {
        initVacations,
        addVacation,
        updateVacation,
        deleteVacation,
        clearVacations,
        updateVacationsLikeStatus,
        addLikeToVacation,
        removeLikeFromVacation
    }
});

export const vacationActions = vacationSlice.actions;