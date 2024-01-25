import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../types/contact";
import {  contactsInitialState } from "../constants/ReduxState";
import { ContactState } from "../types/contactsState";

const contactsSlice = createSlice({
  name: "contact",
  initialState: contactsInitialState,
  reducers: {
    setContactsList: (state: ContactState, action: PayloadAction<Contact[]>) => {
      state.contactsList = action.payload;
    },
  },
});

export const { setContactsList } = contactsSlice.actions;
export default contactsSlice.reducer;