import { configureStore } from "@reduxjs/toolkit";
import partnerReducer from "./partnerSlice";
import pharmacyReducer from "./pharmacySlice";
import numberReducer from "./numberSlice";
import socialMediaReducer from "./socialMediaSlice";
import infoMeddocReducer from "./infoMeddocSlice";

export const store = configureStore({
  reducer: {
    partner: partnerReducer,
    pharmacy: pharmacyReducer,
    number: numberReducer,
    socialMedia: socialMediaReducer,
    infoMedoc: infoMeddocReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
