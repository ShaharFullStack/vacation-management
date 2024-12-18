import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

// Define the state type
type UserState = UserModel | null;

// Check if a token is valid (optional utility function):
function isTokenValid(token: string): boolean {
    try {
        const { exp } = JSON.parse(atob(token.split(".")[1])) as { exp: number };
        return exp * 1000 > Date.now();
    } catch {
        return false;
    }
}

// Initialize state from sessionStorage:
const initialState: UserState = (() => {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");
    if (user && token && isTokenValid(token)) {
        return JSON.parse(user);
    }
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    return null;
})();

// Initialize user (on login, on register):
export function initUser(currentState: UserState, action: PayloadAction<UserModel>): UserState {
    const user = action.payload;
    sessionStorage.setItem("user", JSON.stringify(user));
    return user;
}

// Logout user:
export function logoutUser(): UserState {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    return null;
}

// User slice:
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: { initUser, logoutUser },
});

// Export actions:
export const userActions = userSlice.actions;

// Export reducer:
export default userSlice.reducer;
