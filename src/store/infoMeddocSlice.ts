import infoMeddocService from "@/services/infoMeddocService";
import { Info_page_meddoc } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InfoMeddocState {
  infoMeddoc: Info_page_meddoc | null;
  isLoading: boolean;
  error: string | null;
  isEditInformationOpen: boolean;
}

const initialState: InfoMeddocState = {
  infoMeddoc: null,
  isLoading: false,
  error: null,
  isEditInformationOpen: false,
};

// Helpers
export const fetchInformations = createAsyncThunk(
  "infoMeddoc/fetchInfos",
  async () => {
    const response = await infoMeddocService.getInfo();
    return response;
  },
);

export const updateInfos = createAsyncThunk(
  "infoMeddoc/updateInfos",
  async ({
    id,
    data,
    files,
  }: {
    id: number;
    data: Partial<Info_page_meddoc>;
    files?: { logo: File; favicon: File };
  }) => {
    const response = await infoMeddocService.updateInfo(
      id,
      data,
      files ? files : null,
    );
    return response;
  },
);

const infoMeddocSlice = createSlice({
  name: "infoMeddoc",
  initialState,
  reducers: {
    setIsEditInfoModal: (state, action: PayloadAction<boolean>) => {
      state.isEditInformationOpen = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInformations.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchInformations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.infoMeddoc = action.payload;
      })
      .addCase(fetchInformations.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ||
          "Erreur lors de la recuperation des informations";
      })
      .addCase(updateInfos.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(updateInfos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.infoMeddoc = { ...action.payload };
        state.isEditInformationOpen = false;
      })
      .addCase(updateInfos.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ||
          "Une erreur s'est produite lors de la mise a jours des informations";
      });
  },
});

export const { setIsEditInfoModal, setError, setIsLoading } =
  infoMeddocSlice.actions;
export default infoMeddocSlice.reducer;
