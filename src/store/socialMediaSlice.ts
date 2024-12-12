import SocialMedia from "@/pages/Dashboard/SocialMedia/SocialMedia";
import { socialMediaService } from "@/services/socialMediaService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface SocialMediaState {
  socialMedias: SocialMedia[];
  currentSocialMedia: SocialMedia;
  isLoading: boolean;
  error: string | null;
  isAddSocialMediaOpen: boolean;
  isEditSocialMediaOpen: boolean;
  isRemoveSocialMediaOpen: boolean;
}

const initialState: SocialMediaState = {
  socialMedias: [],
  currentSocialMedia: null,
  isLoading: false,
  error: null,
  isAddSocialMediaOpen: false,
  isEditSocialMediaOpen: false,
  isRemoveSocialMediaOpen: false,
};

export const fetchSocialMedias = createAsyncThunk(
  "socialMedia/fetchSocialMedias",
  async () => {
    const response = await socialMediaService.getAllSocialMedia();
    return response;
  },
);

export const addSocialMedia = createAsyncThunk(
  "socialMedia/addSocialMedia",
  async (newSocialMedia: Omit<SocialMedia, "id">) => {
    const response = await socialMediaService.createSocialMedia(newSocialMedia);
    return response;
  },
);

export const updateSocialMedia = createAsyncThunk(
  "socialMedia/updateSocialMedia",
  async ({
    id,
    socialMedia,
  }: {
    id: number;
    socialMedia: Partial<Omit<SocialMedia, "id">>;
  }) => {
    const response = await socialMediaService.updateSocialMedia(
      id,
      socialMedia,
    );
    return response;
  },
);

export const deleteSocialMedia = createAsyncThunk(
  "socialMedia/deleteSocialMedia",
  async ({ id }: { id: number }) => {
    if (!id) {
      throw new Error("aucun réseau social sélectionné pour suppression.");
    }
    await socialMediaService.deleteSocialMedia(id);
    return id;
  },
);

const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {
    setCurrentSocialMedia: (
      state,
      action: PayloadAction<SocialMedia | null>,
    ) => {
      state.currentSocialMedia = action.payload;
    },
    setModalState: (
      state,
      action: PayloadAction<{
        modalType: "add" | "edit" | "remove";
        isOpen: boolean;
      }>,
    ) => {
      const { modalType, isOpen } = action.payload;
      if (modalType === "add") state.isAddSocialMediaOpen = isOpen;
      if (modalType === "edit") state.isEditSocialMediaOpen = isOpen;
      if (modalType === "remove") state.isRemoveSocialMediaOpen = isOpen;
    },
    setisLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocialMedias.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSocialMedias.fulfilled, (state, action) => {
        state.isLoading = false;
        state.socialMedias = action.payload;
      })
      .addCase(fetchSocialMedias.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      })
      .addCase(addSocialMedia.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addSocialMedia.fulfilled, (state, action) => {
        state.socialMedias.push(action.payload);
        state.isAddSocialMediaOpen = false;
        state.isLoading = false;
      })
      .addCase(addSocialMedia.rejected, (state, action) => {
        state.error = action.error.message || "Une erreur s'est produite";
        state.isLoading = false;
      })
      .addCase(updateSocialMedia.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSocialMedia.fulfilled, (state, action) => {
        const index = state.socialMedias.findIndex(
          (num) => num.id === action.payload.id,
          (state.isEditSocialMediaOpen = false),
        );
        if (index !== -1) state.socialMedias[index] = action.payload;
        state.isEditSocialMediaOpen = false;
        state.isLoading = false;
      })
      .addCase(updateSocialMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      })
      .addCase(deleteSocialMedia.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSocialMedia.fulfilled, (state, action) => {
        state.socialMedias = state.socialMedias.filter(
          (num) => num.id !== action.payload,
        );
        state.currentSocialMedia = null;
        state.isRemoveSocialMediaOpen = false;
        state.isLoading = false;
      })
      .addCase(deleteSocialMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      });
  },
});

export const { setCurrentSocialMedia, setModalState, setisLoading, setError } =
  socialMediaSlice.actions;

export default socialMediaSlice.reducer;
