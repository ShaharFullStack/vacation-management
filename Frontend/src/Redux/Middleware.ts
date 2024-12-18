import { Middleware } from "@reduxjs/toolkit";

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
    console.group("Redux Logger");
    console.info("Dispatching action:", action);
    const result = next(action);
    console.log("Next state:", store.getState());
    console.groupEnd();
    return result;
};

