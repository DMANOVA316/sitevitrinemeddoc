import { configureStore } from "@reduxjs/toolkit";
import partnerReducer from "./partnerSlice";
import pharmacyReducer from "./pharmacySlice";
import numberReducer from "./numberSlice";
import socialMediaReducer from "./socialMediaSlice";
import infoMeddocReducer from "./infoMeddocSlice";
import ambulanceReducer from './ambulanceSlice';

export const store = configureStore({
  reducer: {
    partner: partnerReducer,
    pharmacy: pharmacyReducer,
    number: numberReducer,
    socialMedia: socialMediaReducer,
    infoMedoc: infoMeddocReducer,
    ambulance: ambulanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
