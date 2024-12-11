import { configureStore } from "@reduxjs/toolkit";
import partnerReducer from "./partnerSlice";
import pharmacyReducer from "./pharmacySlice";
import numberReducer from "./numberSlice";
import socialMediaReducer from "./socialMediaSlice";

export const store = configureStore({
  reducer: {
    partner: partnerReducer,
    pharmacy: pharmacyReducer,
    number: numberReducer,
    socialMedia: socialMediaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
