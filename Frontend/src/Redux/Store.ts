import { configureStore } from "@reduxjs/toolkit";
// import { LikeModel } from "../Models/LikeModel";
import { UserModel } from "../Models/UserModel";
import { VacationModel } from "../Models/VacationModel";
import { loggerMiddleware } from "./Middleware";
import { userSlice } from "./UserSlice";
import { vacationSlice } from "./VacationSlice";


export type AppState = {
    vacations: VacationModel[]; // Vacations state type
    user: UserModel; // Allow null for the initial state
    // likes: LikeModel[]; // Likes state type
};

export const store = configureStore({
    reducer: {
        vacations: vacationSlice.reducer,
        // likes: likeSlice.reducer,
        user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
});