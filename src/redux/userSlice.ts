import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/user";
import { userInitialState } from "../constants/ReduxState";
import { UserState } from "../types/userState";

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserToStore: (state: UserState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserToStore } = userSlice.actions;
export default userSlice.reducer;