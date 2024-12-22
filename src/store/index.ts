import { configureStore } from "@reduxjs/toolkit";
import ambulanceReducer from "./ambulanceSlice";
import contactReducer from "./contactSlice";
import couvertureReducer from "./couvertureSlice.ts";
import infoMeddocReducer from "./infoMeddocSlice";
import locationReducer from "./locationSlice.ts";
import numberReducer from "./numberSlice";
import partnerReducer from "./partnerSlice";
import pharmacyReducer from "./pharmacySlice";
import socialMediaReducer from "./socialMediaSlice";

// Configuration du store
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
