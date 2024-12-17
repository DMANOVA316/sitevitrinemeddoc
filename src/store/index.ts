import { configureStore } from "@reduxjs/toolkit";
import partnerReducer from "./partnerSlice";
import pharmacyReducer from "./pharmacySlice";
import numberReducer from "./numberSlice";
import socialMediaReducer from "./socialMediaSlice";
import infoMeddocReducer from "./infoMeddocSlice";
import ambulanceReducer from "./ambulanceSlice";
import locationReducer from "./locationSlice.ts";
import contactReducer from "./contactSlice";
import couvertureReducer from "./couvertureSlice.ts";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    partner: partnerReducer,
    pharmacy: pharmacyReducer,
    number: numberReducer,
    socialMedia: socialMediaReducer,
    infoMedoc: infoMeddocReducer,
    ambulance: ambulanceReducer,
    contact: contactReducer,
    couverture: couvertureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
