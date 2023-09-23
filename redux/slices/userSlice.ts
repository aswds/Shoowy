import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetch_user } from "../actions/userActions";
import { PresetType } from "../../types/Preset";

export type IUser = {
  presets: PresetType[];
  history: any[];
};

interface IState {
  isLoading: boolean;
  error: null | string;
  current_user: IUser;
}

const initialState: IState = {
  isLoading: true,
  error: null,
  current_user: {} as IUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetch_user.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.current_user = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(fetch_user.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetch_user.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
