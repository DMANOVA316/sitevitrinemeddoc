import numberService from "@/services/numberService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface NumberState {
  numeros: Numero_meddoc[];
  currentNumber: Numero_meddoc | null;
  isLoading: boolean;
  error: string | null;
  isAddNumberOpen: boolean;
  isEditNumberOpen: boolean;
  isRemoveNumberOpen: boolean;
}

const initialState: NumberState = {
  numeros: [],
  currentNumber: null,
  isLoading: false,
  error: null,
  isAddNumberOpen: false,
  isEditNumberOpen: false,
  isRemoveNumberOpen: false,
};

export const fetchNumbers = createAsyncThunk(
  "number/fetchNumbers",
  async () => {
    const response = await numberService.getAllNumber();
    return response;
  },
);

export const addNumber = createAsyncThunk(
  "number/addNumber",
  async (number: Omit<Numero_meddoc, "id">) => {
    const response = await numberService.createNumber(number);
    return response;
  },
);

export const updateNumber = createAsyncThunk(
  "number/updateNumber",
  async ({
    id,
    data,
  }: {
    id: number;
    data: Partial<Omit<Numero_meddoc, "id">>;
  }) => {
    const response = await numberService.updateNumber(id, data);
    return response;
  },
);

export const deleteNumber = createAsyncThunk(
  "number/deleteNumber",
  async ({ id }: { id: number }) => {
    if (!id) {
      throw new Error("aucun numéro sélectionné pour suppression.");
    }
    await numberService.deleteNumber(id);

    return id; // Retourne l'ID supprimé
  },
);

const numberSlice = createSlice({
  name: "number",
  initialState,
  reducers: {
    setCurrentNumber: (state, action: PayloadAction<Numero_meddoc | null>) => {
      state.currentNumber = action.payload;
    },
    setModalState: (
      state,
      action: PayloadAction<{
        modalType: "add" | "edit" | "remove";
        isOpen: boolean;
      }>,
    ) => {
      const { modalType, isOpen } = action.payload;
      if (modalType == "add") {
        state.isAddNumberOpen = isOpen;
      }
      if (modalType == "edit") {
        state.isEditNumberOpen = isOpen;
      }
      if (modalType == "remove") {
        state.isRemoveNumberOpen = isOpen;
      }
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
      .addCase(fetchNumbers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNumbers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.numeros = action.payload;
      })
      .addCase(fetchNumbers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      })
      .addCase(addNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNumber.fulfilled, (state, action) => {
        state.numeros.push(action.payload);
        state.isAddNumberOpen = false;
        state.isLoading = false;
      })
      .addCase(addNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      })
      .addCase(updateNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateNumber.fulfilled, (state, action) => {
        const index = state.numeros.findIndex(
          (num) => num.id === action.payload.id,
          (state.isEditNumberOpen = false),
        );
        if (index !== -1) state.numeros[index] = action.payload;
        state.isEditNumberOpen = false;
        state.isLoading = false;
      })
      .addCase(updateNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      })
      .addCase(deleteNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNumber.fulfilled, (state, action) => {
        state.numeros = state.numeros.filter(
          (num) => num.id !== action.payload,
        );
        state.currentNumber = null;
        state.isRemoveNumberOpen = false;
        state.isLoading = false;
      })
      .addCase(deleteNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Une erreur s'est produite";
      });
  },
});

export const { setCurrentNumber, setModalState, setIsLoading, setError } =
  numberSlice.actions;

export default numberSlice.reducer;
